"use client";

import { useEffect, useRef } from "react";

/** Elementos que realmente respondem a clique/foco. Projetos entram porque a linha inteira reage ao hover (prévia). */
const INTERACTIVE = 'a[href], button, [role="button"], summary, .proj';

/**
 * Cursor editorial: anel fino em azul-marinho que acompanha o ponteiro com um pequeno atraso.
 *
 * - Só atua com mouse (hover + ponteiro fino); em toque o CSS nem o exibe e nenhum listener é criado.
 * - O cursor nativo NÃO é escondido: o anel é um complemento, então nada depende dele para usar o site.
 * - Cresce sobre links, botões e projetos; em seções escuras (data-cur="inv") troca para a cor do papel.
 * - Um único rAF, que para quando o anel alcança o ponteiro. Movimento reduzido: sem atraso e sem transições (CSS global).
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let detach = () => {};

    const attach = () => {
      detach();
      if (!fine.matches) return;

      let tx = 0;
      let ty = 0;
      let x = 0;
      let y = 0;
      let raf = 0;
      let last = 0;
      let shown = false;

      const flag = (name: string, on: boolean) => el.toggleAttribute(`data-${name}`, on);

      const tick = (now: number) => {
        raf = 0;
        /* suavização por tempo (não por quadro): o atraso é o mesmo a 60 Hz ou a 20 fps */
        const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
        last = now;
        const k = reduced.matches ? 1 : 1 - Math.exp(-13.5 * dt);
        x += (tx - x) * k;
        y += (ty - y) * k;
        el.style.transform = `translate3d(${x}px,${y}px,0)`;
        if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) raf = requestAnimationFrame(tick);
      };
      const show = () => {
        if (shown) return;
        shown = true;
        x = tx; // aparece já no ponteiro, sem deslizar desde o canto
        y = ty;
        el.style.transform = `translate3d(${x}px,${y}px,0)`;
        flag("on", true);
      };
      const hide = () => {
        shown = false;
        flag("on", false);
        flag("down", false);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        tx = e.clientX;
        ty = e.clientY;
        show();
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      };
      const onOver = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const t = e.target instanceof Element ? e.target : null;
        flag("hover", !!t?.closest(INTERACTIVE));
        flag("inv", !!t?.closest('[data-cur="inv"]'));
      };
      const onDown = (e: PointerEvent) => e.pointerType === "mouse" && flag("down", true);
      const onUp = () => flag("down", false);

      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("pointerup", onUp, { passive: true });
      document.addEventListener("pointercancel", onUp, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);

      detach = () => {
        if (raf) cancelAnimationFrame(raf);
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointercancel", onUp);
        document.documentElement.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
        hide();
        flag("hover", false);
        flag("inv", false);
        detach = () => {};
      };
    };

    attach();
    fine.addEventListener("change", attach); // ex.: trocar entre toque e mouse
    return () => {
      fine.removeEventListener("change", attach);
      detach();
    };
  }, []);

  return (
    <div className="cur" ref={root} aria-hidden="true">
      <i />
    </div>
  );
}

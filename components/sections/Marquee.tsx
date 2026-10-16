"use client";

import { useEffect, useRef } from "react";
import { marqueeText } from "@/lib/site";
import { getLenis } from "@/lib/scroll-lock";

const LOOP_SECONDS = 38; // mesma duração do CSS original (meia volta = 50% da largura)
const BOOST = 0.55; // quanto a velocidade do scroll (px/frame) acelera o marquee
const MAX_BOOST = 9; // teto do multiplicador
const RATE = 3.2; // suavização (1/s): maior = responde e volta mais rápido

/**
 * Faixa de texto em loop infinito. O movimento é de um único loop rAF que lê a velocidade
 * e a direção do Lenis (a mesma instância do site): rolar para baixo acelera, rolar para
 * cima inverte o sentido; ao parar, o multiplicador volta suavemente a 1 (velocidade padrão).
 * O loop só roda enquanto a faixa está visível.
 */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // fica estático

    let half = tr.scrollWidth / 2;
    let p = 0; // fase do loop, 0..1 (guardar fração evita salto ao redimensionar)
    let factor = 1; // multiplicador suavizado (negativo = sentido invertido)
    let last = 0;
    let raf = 0;
    let visible = true;

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(0.25, (now - last) / 1000); // teto só evita salto após travadas longas
      last = now;

      const lenis = getLenis();
      const v = lenis ? lenis.velocity : 0;
      const target = 1 + Math.sign(v) * Math.min(MAX_BOOST, Math.abs(v) * BOOST);
      factor += (target - factor) * (1 - Math.exp(-RATE * dt));

      if (half > 0) {
        p = (((p + (factor * dt) / LOOP_SECONDS) % 1) + 1) % 1;
        tr.style.transform = `translate3d(${-p * half}px,0,0)`;
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      half = tr.scrollWidth / 2; // fontes carregando mudam a largura
    });
    ro.observe(tr);
    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return (
    <div className="marq" ref={root} aria-hidden="true">
      <div id="mq" ref={track}>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i}>{marqueeText}</span>
        ))}
      </div>
    </div>
  );
}

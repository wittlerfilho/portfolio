"use client";

import { useEffect } from "react";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Parallax e transições entre seções durante a rolagem.
 * Mesma matemática do protótipo (scroll nativo intacto, valores com lerp),
 * mas o loop só roda enquanto há movimento a animar, em vez de rodar o tempo todo.
 */
export function ScrollEngine() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* com mouse o Lenis já suaviza o scroll; o lerp extra só continua no toque */
    const lerp = reduced || !window.matchMedia("(pointer: coarse)").matches ? 1 : 0.09;
    const byId = (id: string) => document.getElementById(id);

    const ttl = byId("ttl");
    const fr = byId("frame");
    const fre = byId("frect");
    const ft = byId("ftxt");
    const en = byId("ename");
    const sv = byId("serv");
    const ed = byId("end");
    const aim = byId("aim");
    const afr = byId("afr");
    const wk = byId("works");
    const hi = byId("himg");
    const barf = byId("barf");
    const hcp = document.querySelector<HTMLElement>(".hcopy");
    const hct = document.querySelector<HTMLElement>(".hfoot .cta");

    if (!ttl || !fr || !fre || !ft || !en || !sv || !ed || !aim || !afr || !wk || !hi || !barf || !hcp || !hct) {
      return;
    }

    let sy = window.scrollY;
    let raf = 0;

    const draw = () => {
      const s = window.scrollY;
      const vh = window.innerHeight;
      sy += (s - sy) * lerp;

      ttl.style.transform = `translate3d(0,${sy * 0.28}px,0)`;
      const dh = document.documentElement.scrollHeight - vh;
      barf.style.width = `${dh > 0 ? (s / dh) * 100 : 0}%`;

      /* moldura "Processo" */
      const rc = fr.getBoundingClientRect();
      const p = clamp01(-rc.top / (rc.height - vh));
      const w = window.innerWidth;
      const inset = Math.round(12 + p * Math.min(w, vh) * 0.2);
      const rw = w - inset * 2;
      const rh = vh - inset * 2;
      fre.setAttribute("x", String(inset));
      fre.setAttribute("y", String(inset));
      fre.setAttribute("width", String(rw));
      fre.setAttribute("height", String(rh));
      const per = 2 * (rw + rh);
      fre.style.strokeDasharray = String(per);
      fre.style.strokeDashoffset = String(per * (1 - Math.min(1, p * 2.2)));
      ft.style.opacity = String(clamp01(p * 3) * (1 - clamp01((p - 0.88) / 0.12)));
      ft.style.transform = `scale(${1.08 - p * 0.1})`;

      /* nome grande do rodapé */
      const er = en.getBoundingClientRect();
      en.style.transform = `translate3d(${(er.top - vh) * 0.06}px,0,0)`;

      /* "O que entrego" fixo enquanto o rodapé sobe por cima */
      sv.style.top = `${Math.min(0, vh - sv.offsetHeight)}px`;
      const q = clamp01((vh - ed.getBoundingClientRect().top) / vh);
      const rr = clamp01((q - 0.3) / 0.6);
      sv.style.transform = `translate3d(0,${-q * 40}px,0) scale(${1 - q * 0.05})`;
      sv.style.opacity = String(1 - q * 0.55);
      aim.style.clipPath = `inset(${(1 - rr) * 100}% 0 0 0)`;
      aim.style.opacity = String(clamp01(rr * 3));
      aim.style.transform = `translate3d(0,${(1 - rr) * 30}px,0)`;
      (afr as unknown as SVGElement).style.strokeDashoffset = String(1 - clamp01((q - 0.15) / 0.6));

      /* hero some ao rolar; projetos entram deslizando */
      const ph = reduced ? 0 : clamp01(s / (vh * 0.9));
      const wq = reduced ? 0 : clamp01((vh - rc.top) / (vh * 0.9));
      hcp.style.opacity = hct.style.opacity = String(1 - ph);
      hcp.style.transform = hct.style.transform = `translate3d(0,${-ph * 36}px,0)`;
      hi.style.opacity = String(1 - ph * 0.85);
      hi.style.transform = `translate3d(0,${sy * 0.12}px,0)`;
      wk.style.opacity = String(1 - wq * 0.9);
      wk.style.transform = `translate3d(0,${-wq * 50}px,0)`;
    };

    const tick = () => {
      raf = 0;
      draw();
      if (Math.abs(window.scrollY - sy) > 0.1) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    const ro = new ResizeObserver(kick); // fontes/imagens que mudam a altura da página
    ro.observe(document.body);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      ro.disconnect();
    };
  }, []);

  return null;
}

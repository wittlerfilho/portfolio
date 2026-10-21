"use client";

import { useEffect } from "react";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

/* Linha do hero: recolhe para a esquerda durante o primeiro meio viewport de rolagem. */
const HERO_LINE_SPAN = 0.5;
/* Títulos com data-ink: a cor começa quando o topo do título está a 90% da altura da janela e termina a 50%. */
const INK_START = 0.9;
const INK_END = 0.5;
const INK_MAX = 114; // % do --rv (CSS) em que o título está totalmente colorido

/* Declaração com data-fill: cada letra passa de apagada → azul-marinho (borda de avanço) → tinta.
   O preenchimento começa quando o topo do bloco está a 85% da janela e termina quando o fim chega a 40%. */
const FILL_START = 0.85;
const FILL_END = 0.4;
const FILL_SOFT = 12; // largura da borda suave, em letras
const FILL_STEPS = 24; // passos de cor por letra (evita reescrever o estilo a cada subpixel)
type Rgba = [number, number, number, number];
const FILL_DIM: Rgba = [12, 12, 12, 0.22];
const FILL_NAVY: Rgba = [20, 38, 107, 1]; // mesmo valor de --acc
const FILL_INK: Rgba = [12, 12, 12, 1]; // mesmo valor de --ink
const mixRgba = (a: Rgba, b: Rgba, t: number) =>
  `rgba(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)},${(a[3] + (b[3] - a[3]) * t).toFixed(3)})`;
const fillColor = (c: number) => (c < 0.5 ? mixRgba(FILL_DIM, FILL_NAVY, c * 2) : mixRgba(FILL_NAVY, FILL_INK, c * 2 - 1));

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
    const hf = document.querySelector<HTMLElement>(".hfoot");
    const inks = Array.from(document.querySelectorAll<HTMLElement>("[data-ink]"));
    const inkTop = inks.map(() => 0);
    const inkLast = inks.map(() => NaN);
    let hlLast = NaN;
    const fills = Array.from(document.querySelectorAll<HTMLElement>("[data-fill]")).map((el) => {
      const chars = Array.from(el.querySelectorAll<HTMLElement>(".fc"));
      return { el, chars, last: chars.map(() => -1) };
    });

    if (!ttl || !fr || !fre || !ft || !en || !sv || !ed || !aim || !afr || !wk || !hi || !barf || !hcp || !hct || !hf) {
      return;
    }

    let sy = window.scrollY;
    let raf = 0;

    const draw = () => {
      const s = window.scrollY;
      const vh = window.innerHeight;
      sy += (s - sy) * lerp;

      /* leituras de layout dos títulos antes de qualquer escrita deste quadro */
      for (let i = 0; i < inks.length; i++) inkTop[i] = inks[i].getBoundingClientRect().top;

      const fillRect = reduced ? [] : fills.map((f) => f.el.getBoundingClientRect());

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

      /* linha do hero: a ponta direita recua para a esquerda (scaleX com origem à esquerda, via --hl no CSS) */
      const hl = reduced ? 1 : 1 - smooth(clamp01(s / (vh * HERO_LINE_SPAN)));
      if (hl !== hlLast) {
        hlLast = hl;
        hf.style.setProperty("--hl", hl.toFixed(4));
      }

      /* cor dos títulos revelada de cima para baixo; movimento reduzido mantém o estado final do CSS */
      if (!reduced) {
        for (let i = 0; i < inks.length; i++) {
          const t = clamp01((vh * INK_START - inkTop[i]) / (vh * (INK_START - INK_END)));
          const rv = Math.round(t * INK_MAX * 10) / 10;
          if (rv !== inkLast[i]) {
            inkLast[i] = rv;
            inks[i].style.setProperty("--rv", `${rv}%`);
          }
        }
      }

      /* declaração: a cor avança letra a letra com a rolagem (e recua ao subir); movimento reduzido mantém o estado final do CSS */
      for (let i = 0; i < fillRect.length; i++) {
        const { chars, last } = fills[i];
        const r = fillRect[i];
        const from = vh * FILL_START;
        const to = vh * FILL_END;
        const pr = clamp01((from - r.top) / (from - to + r.height));
        const front = pr * (chars.length + FILL_SOFT);
        for (let k = 0; k < chars.length; k++) {
          const q = Math.round(clamp01((front - k) / FILL_SOFT) * FILL_STEPS);
          if (q !== last[k]) {
            last[k] = q;
            chars[k].style.color = fillColor(q / FILL_STEPS);
          }
        }
      }

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
      hf.style.removeProperty("--hl");
      inks.forEach((el) => el.style.removeProperty("--rv"));
      fills.forEach((f) => f.chars.forEach((c) => c.style.removeProperty("color")));
    };
  }, []);

  return null;
}

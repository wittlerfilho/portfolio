"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll-lock";

/** Posição natural no documento (offsetTop ignora transform, que o ScrollEngine aplica nas seções). */
const docTop = (el: HTMLElement) => {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  return y;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Rolagem suave com Lenis. Mantém o scroll nativo (window.scrollY, sticky e
 * IntersectionObserver continuam valendo), só suaviza a entrada da roda do mouse.
 * Também cuida dos links #âncora, já que o `scroll-behavior` global foi removido.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: false });
    setLenis(lenis);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.classList.contains("skip-link")) return; // skip-link usa o foco nativo
      const hash = a.getAttribute("href")!;
      let target: HTMLElement | null = hash === "#top" ? null : document.getElementById(hash.slice(1));
      if (hash !== "#top" && !target) return;

      // elemento sticky "preso" no topo não serve de medida: usa o pai (posição natural)
      if (target && getComputedStyle(target).position === "sticky") target = target.parentElement;

      e.preventDefault();
      lenis.scrollTo(target ? docTop(target) : 0, { duration: 1.5, easing: easeOutExpo });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}

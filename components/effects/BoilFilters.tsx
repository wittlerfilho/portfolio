"use client";

import { useEffect, useRef } from "react";

/**
 * Filtros SVG ("rough", "boil", "boil2") e o tremor das linhas ("boiling lines").
 * A semente só é trocada enquanto algum elemento com o filtro está visível.
 */
export function BoilFilters() {
  const bt = useRef<SVGFETurbulenceElement>(null);
  const bt2 = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
    });
    document.querySelectorAll(".boil, .boil2").forEach((el) => io.observe(el));

    let seed = 1;
    const iv = setInterval(() => {
      if (visible.size && !reduced) {
        seed = (seed % 6) + 1;
        bt.current?.setAttribute("seed", String(seed));
        bt2.current?.setAttribute("seed", String(seed + 3));
      }
    }, 110);

    return () => {
      clearInterval(iv);
      io.disconnect();
    };
  }, []);

  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="rough">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
      </filter>
      <filter id="boil" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence ref={bt} type="fractalNoise" baseFrequency=".035 .05" numOctaves="2" seed="1" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="boil2" x="-2%" y="-2%" width="104%" height="104%">
        <feTurbulence ref={bt2} type="fractalNoise" baseFrequency=".02 .03" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

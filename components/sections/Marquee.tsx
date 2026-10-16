"use client";

import { useEffect, useRef } from "react";
import { marqueeText } from "@/lib/site";

const LOOP_SECONDS = 38; // duração de uma volta completa em velocidade base
const BOOST_PER_PX_S = 1 / 110; // aceleração por px/s de rolagem (equivale a ~0,55 por px/frame a 60 Hz)
const MAX_BOOST = 9; // teto do multiplicador
const RATE = 3.2; // suavização (1/s): maior = responde e volta mais rápido
const COPIES = 8; // cópias por conjunto; cada conjunto precisa ser mais largo que qualquer tela

/**
 * Faixa de texto em loop infinito.
 *
 * Estrutura: dois conjuntos idênticos lado a lado. Deslocar exatamente a largura de UM conjunto
 * volta ao mesmo desenho, então o loop não tem emenda, e a largura é medida com precisão
 * fracionária (getBoundingClientRect), sem o arredondamento de scrollWidth.
 *
 * Quem move: um único loop rAF escreve o transform. A animação CSS (`mq`) existe só como
 * fallback sem JavaScript; ao montar, o JS marca `data-js`, que desliga a animação CSS
 * (uma animação CSS sempre vence o transform inline, o que antes anulava o loop JS).
 *
 * Velocidade: vem da variação de window.scrollY por segundo, que é onde o Lenis (a mesma
 * instância do site) escreve a rolagem, em toque e em mouse. Rolar para baixo acelera, para cima
 * inverte o sentido, e ao parar o multiplicador volta suavemente a 1.
 */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const setA = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    const set = setA.current;
    if (!el || !tr || !set) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // fica estático

    let half = set.getBoundingClientRect().width;
    let p = 0; // fase do loop, 0..1 (guardar a fração evita salto ao redimensionar)
    let factor = 1; // multiplicador suavizado (negativo = sentido invertido)
    let last = 0;
    let lastY = 0;
    let raf = 0;
    let visible = true;

    /* continua exatamente de onde a animação CSS estava, antes de entregar o controle ao JS */
    try {
      const x = new DOMMatrixReadOnly(getComputedStyle(tr).transform).m41;
      if (half > 0) p = Math.min(1, Math.max(0, -x / half)) % 1;
    } catch {
      p = 0;
    }
    tr.dataset.js = "";
    tr.style.transform = `translate3d(${-p * half}px,0,0)`;

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(0.25, (now - last) / 1000); // teto só evita salto após travadas longas
      last = now;

      const y = window.scrollY;
      const v = dt > 0 ? (y - lastY) / dt : 0; // px/s, com sinal
      lastY = y;

      const target = 1 + Math.sign(v) * Math.min(MAX_BOOST, Math.abs(v) * BOOST_PER_PX_S);
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
      lastY = window.scrollY; // sem isso, o scroll feito com a faixa fora da tela viraria um pico de velocidade
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      half = set.getBoundingClientRect().width; // fontes carregando e mudança de largura
    });
    ro.observe(set);
    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", start);
      delete tr.dataset.js;
      tr.style.transform = "";
    };
  }, []);

  const copies = Array.from({ length: COPIES }, (_, i) => <span key={i}>{marqueeText}</span>);

  return (
    <div className="marq" ref={root} aria-hidden="true">
      <div id="mq" ref={track}>
        <div className="mq-set" ref={setA}>
          {copies}
        </div>
        <div className="mq-set">{copies}</div>
      </div>
    </div>
  );
}

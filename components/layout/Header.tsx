"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/site";
import { onLenis } from "@/lib/scroll-lock";

const HIDE_AFTER = 80; // só esconde depois de passar da altura do header
const DELTA = 10; // deslocamento acumulado (px) na mesma direção antes de trocar o estado

/** Navegação fixa (mix-blend-mode: difference) + menu em tela cheia no mobile. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(-1);
  const [hidden, setHidden] = useState(false);
  const openRef = useRef(false);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      setScrolled(window.scrollY > 40);
      let act = -1;
      navLinks.forEach((l, i) => {
        const el = document.getElementById(l.href.slice(1));
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.45 && r.bottom > vh * 0.45) act = i;
      });
      setActive(act);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* some ao rolar para baixo, volta ao rolar para cima. Direção vem do Lenis (mesma instância
     do site); sem Lenis (movimento reduzido) cai para o scroll nativo. */
  useEffect(() => {
    let lastY = window.scrollY;
    let acc = 0; // deslocamento acumulado na direção atual

    const onScrollY = (y: number) => {
      const d = y - lastY;
      lastY = y;
      if (y <= 4) {
        acc = 0;
        setHidden(false); // no topo: sempre visível
        return;
      }
      if (d === 0) return;
      acc = Math.sign(acc) === Math.sign(d) ? acc + d : d; // inverteu a direção: recomeça a contagem
      if (openRef.current) return; // menu aberto: header fica visível
      if (acc > DELTA && y > HIDE_AFTER) setHidden(true);
      else if (acc < -DELTA) setHidden(false);
    };

    /* Lenis dá a direção da rolagem suave; o listener nativo cobre saltos que ele não emite
       (scrollbar, Home/End, scrollTo) e o modo sem Lenis (movimento reduzido). Ambos chamam
       a mesma função, e o segundo a chegar vê delta 0, então não há contagem dupla. */
    const onNative = () => onScrollY(window.scrollY);
    window.addEventListener("scroll", onNative, { passive: true });
    let detach = () => {};
    const off = onLenis((lenis) => {
      detach();
      lastY = window.scrollY;
      acc = 0;
      detach = lenis ? lenis.on("scroll", () => onScrollY(window.scrollY)) : () => {};
    });
    return () => {
      window.removeEventListener("scroll", onNative);
      off();
      detach();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className={`mono${scrolled ? " sc" : ""}${hidden && !open ? " hide" : ""}`}
        aria-label="Principal"
        onFocus={() => setHidden(false)} /* foco por teclado sempre revela o header */
      >
        <a className="nv-logo" href="#top">
          wittler
        </a>
        <div className="nl">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={active === i ? "on" : undefined}
              aria-current={active === i ? "location" : undefined}
            >
              <i>{l.num}</i>
              {l.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="mbtn"
          id="mb"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "[ Fechar ]" : "[ Menu ]"}
        </button>
      </nav>
      <div className={`menu${open ? " open" : ""}`} id="menu">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            <small>{l.num}</small>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

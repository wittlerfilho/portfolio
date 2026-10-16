"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { setScrollLocked } from "@/lib/scroll-lock";
import { usePage } from "./PageProvider";

/** Tela de carregamento com a porcentagem em destaque. Lógica idêntica à do protótipo. */
export function Loader() {
  const { setReady } = usePage();
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let count = 0;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);

    const iv = setInterval(
      () => {
        count += Math.ceil(Math.random() * 14);
        if (count >= 100) {
          count = 100;
          clearInterval(iv);
          timers.push(
            setTimeout(() => {
              setOut(true);
              document.body.style.overflow = "";
              setScrollLocked(false);
              timers.push(setTimeout(() => setReady(true), 500));
            }, 250),
          );
        }
        setN(count);
      },
      reduced ? 1 : 70,
    );

    return () => {
      clearInterval(iv);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
      setScrollLocked(false);
    };
  }, [setReady]);

  return (
    <div id="loader" className={out ? "out" : undefined} aria-hidden="true">
      <div>
        <div className="row mono">
          <span>[ wittler ]</span>
          <span>[ Built with intent ]</span>
        </div>
        <i id="lnp" style={{ "--p": n / 100 } as CSSProperties} />
      </div>
      <div className="num boil">
        <b id="cnt">{("00" + n).slice(-3)}</b>
        <sup>[ % ]</sup>
      </div>
    </div>
  );
}

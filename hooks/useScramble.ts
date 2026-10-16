"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01ABCXZ";

/** Efeito "scramble" do título dos projetos: embaralha e revela da esquerda para a direita. */
export function useScramble(final: string) {
  const [text, setText] = useState(final);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => stop, [stop]);

  const run = useCallback(() => {
    if (timer.current) return; // já em execução (mesma guarda do protótipo)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    timer.current = setInterval(
      () => {
        setText(
          final
            .split("")
            .map((ch, k) =>
              ch === " " || ch === "/" || k < i
                ? ch
                : CHARS[Math.floor(Math.random() * CHARS.length)],
            )
            .join(""),
        );
        i += 0.6;
        if (i >= final.length + 1) {
          stop();
          setText(final);
        }
      },
      reduced ? 1 : 32,
    );
  }, [final, stop]);

  return { text, run };
}

"use client";

import { useEffect, useRef, useState } from "react";

/** Marca o elemento como "visto" na primeira vez que ele entra na viewport (threshold .12, como no protótipo). */
export function useInView<T extends Element>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

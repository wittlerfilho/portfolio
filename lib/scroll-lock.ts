import type Lenis from "lenis";

/**
 * Ponte mínima entre os componentes e o Lenis (que só existe depois do mount).
 * - O Loader pede o bloqueio; o SmoothScroll aplica quando a instância nasce.
 * - Header e Marquee leem a MESMA instância (sem criar outro Lenis) via getLenis/onLenis.
 */
let instance: Lenis | null = null;
let locked = false;
const listeners = new Set<(l: Lenis | null) => void>();

export function setLenis(l: Lenis | null) {
  instance = l;
  if (l && locked) l.stop();
  listeners.forEach((cb) => cb(l));
}

export function getLenis() {
  return instance;
}

/** Avisa quando a instância do Lenis nasce/morre (chama já com o valor atual). */
export function onLenis(cb: (l: Lenis | null) => void) {
  listeners.add(cb);
  cb(instance);
  return () => {
    listeners.delete(cb);
  };
}

export function setScrollLocked(value: boolean) {
  locked = value;
  if (!instance) return;
  if (value) instance.stop();
  else instance.start();
}

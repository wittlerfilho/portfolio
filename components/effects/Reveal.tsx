"use client";

import { createElement, type HTMLAttributes } from "react";
import { useInView } from "@/hooks/useInView";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "div" | "h2" | "a" | "span";
  /** "rv" = fade + subida; "hr" = linha que se desenha (scaleX). */
  kind?: "rv" | "hr";
  delay?: 1 | 2;
  href?: string;
  target?: string;
  rel?: string;
};

/** Revela o elemento ao entrar na viewport (classes .rv/.hr + .in, definidas no CSS original). */
export function Reveal({
  as = "div",
  kind = "rv",
  delay,
  className,
  children,
  ...rest
}: Props) {
  const [ref, seen] = useInView<HTMLElement>();
  const cls = [kind, className, delay ? `d${delay}` : "", seen ? "in" : ""]
    .filter(Boolean)
    .join(" ");
  return createElement(as, { ...rest, ref, className: cls }, children);
}

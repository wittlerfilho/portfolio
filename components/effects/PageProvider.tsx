"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type PageState = { ready: boolean; setReady: (v: boolean) => void };

const PageContext = createContext<PageState>({ ready: false, setReady: () => {} });

/** Guarda se a tela de carregamento terminou (o hero só se revela depois disso). */
export function PageProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export const usePage = () => useContext(PageContext);

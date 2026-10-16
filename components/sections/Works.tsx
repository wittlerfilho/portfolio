"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/site";
import { Reveal } from "@/components/effects/Reveal";
import { useScramble } from "@/hooks/useScramble";

type ItemProps = {
  index: number;
  title: string;
  tag: string;
  text: string;
  active: boolean;
  onEnter: (index: number) => void;
  onFocusItem: (index: number, el: HTMLElement) => void;
  onHide: () => void;
  onTap: (index: number, el: HTMLElement) => void;
};

function ProjectItem({ index, title, tag, text, active, onEnter, onFocusItem, onHide, onTap }: ItemProps) {
  const { text: shown, run } = useScramble(title);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal
      as="div"
      className={`proj${active ? " on" : ""}`}
      tabIndex={0}
      data-i={index}
      onMouseEnter={() => {
        onEnter(index);
        run();
      }}
      onFocus={(e) => {
        onFocusItem(index, e.currentTarget);
        run();
      }}
      onBlur={onHide}
      onClick={(e) => {
        onTap(index, e.currentTarget);
        run();
      }}
    >
      <span className="mono">{num}</span>
      <div>
        <h3 aria-label={title}>{shown}</h3>
        <p>{text}</p>
      </div>
      <span className="mono">[ {tag} ] ↗</span>
    </Reveal>
  );
}

/** Lista de projetos com prévia que segue o cursor (desktop) ou abre ao toque (mobile). */
export function Works() {
  const [active, setActive] = useState(-1);
  const activeRef = useRef(-1);
  const pv = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const touch = useRef(false);
  const raf = useRef(0);

  const setActiveBoth = useCallback((i: number) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  useEffect(() => {
    touch.current = window.matchMedia("(hover:none)").matches;

    /* segue o cursor com lerp; o loop para quando assenta e volta a rodar no mousemove */
    const follow = () => {
      raf.current = 0;
      const p = pos.current;
      p.px += (p.mx - p.px) * 0.12;
      p.py += (p.my - p.py) * 0.12;
      const el = pv.current;
      if (el && !touch.current) {
        el.style.transform = `translate3d(${p.px + 40}px,${p.py - el.offsetHeight / 2}px,0)`;
      }
      if (Math.abs(p.mx - p.px) > 0.1 || Math.abs(p.my - p.py) > 0.1) {
        raf.current = requestAnimationFrame(follow);
      }
    };
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (!raf.current) raf.current = requestAnimationFrame(follow);
    };
    const onScroll = () => {
      if (touch.current && activeRef.current > -1) setActiveBoth(-1);
    };
    document.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [setActiveBoth]);

  /* mouse: a prévia abre no hover (só em dispositivos com hover) */
  const onEnter = (i: number) => {
    if (!touch.current) setActiveBoth(i);
  };

  /* teclado: abre no foco. No toque, o foco gerado pelo próprio toque é ignorado
     (o clique cuida de abrir/fechar), senão o foco abriria e o clique fecharia na hora. */
  const onFocusItem = (i: number, el: HTMLElement) => {
    if (!touch.current || el.matches(":focus-visible")) setActiveBoth(i);
  };

  const onTap = (i: number, el: HTMLElement) => {
    if (!touch.current) return;
    if (activeRef.current === i) {
      setActiveBoth(-1);
      return;
    }
    const top = el.getBoundingClientRect().top;
    const p = pos.current;
    p.px = p.mx = window.innerWidth * 0.22;
    p.py = p.my = top;
    if (pv.current) {
      pv.current.style.transform = `translate3d(${window.innerWidth * 0.42}px,${Math.max(80, top - 120)}px,0)`;
    }
    setActiveBoth(i);
  };

  return (
    <>
      <section className="works" id="works">
        <Reveal className="mono">[ Selected works / 2026 ]</Reveal>
        <Reveal as="h2" className="rough" delay={1}>
          Projetos <em>[ 04 ]</em>
        </Reveal>
        <div id="list" onMouseLeave={() => setActiveBoth(-1)}>
          {projects.map((p, i) => (
            <ProjectItem
              key={p.title}
              index={i}
              title={p.title}
              tag={p.tag}
              text={p.text}
              active={active === i}
              onEnter={onEnter}
              onFocusItem={onFocusItem}
              onHide={() => setActiveBoth(-1)}
              onTap={onTap}
            />
          ))}
        </div>
        <Reveal className="mono" style={{ marginTop: 18, opacity: 0.6 }}>
          Projetos fictícios, apenas demonstração visual. Toque ou passe o cursor.
        </Reveal>
      </section>

      {/* fora da <section>: a seção recebe transform no scroll e quebraria o position:fixed */}
      <div id="pv" ref={pv} className={active > -1 ? "show" : undefined} aria-hidden="true">
        {projects.map((p, i) => (
          <div key={p.title} className={`art ${p.art.className}${active === i ? " on" : ""}`}>
            <span className="mono">[ {p.art.label} ]</span>
            {"circle" in p.art && p.art.circle ? <i /> : null}
            <b>
              {p.art.lines.map((line, k) => (
                <span key={line}>
                  {k > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </b>
          </div>
        ))}
      </div>
    </>
  );
}

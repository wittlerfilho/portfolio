"use client";

import Image from "next/image";
import { usePage } from "@/components/effects/PageProvider";

/** Hero: título gigante com glitch/boil, gravura pendurada e chamada "Ver projetos". */
export function Hero() {
  const { ready } = usePage();
  const on = ready ? " in" : "";

  return (
    <section className="hero" id="top">
      <div className="hstage" aria-hidden="true">
        <div className={`hang${on}`} id="hang">
          <Image
            id="himg"
            src="/angel.webp"
            alt=""
            width={384}
            height={547}
            priority
            unoptimized
          />
        </div>
      </div>
      <h1 className="title boil" id="ttl">
        <span data-t="wittler">wittler</span>
      </h1>
      <div className={`hfoot rv d1${on}`}>
        <div className="hcopy">
          <span className="mono hl">[ Web design e código ]</span>
          <p className="lede">
            Sites e landing pages com identidade própria, desenhados e programados com cuidado.
          </p>
        </div>
        <a className="cta" href="#works">
          <span className="cl">
            <span className="mono">[ 04 projetos ]</span>
            <span className="ct">Ver projetos</span>
          </span>
          <span className="ca" aria-hidden="true">
            <b>↓</b>
            <b>↓</b>
          </span>
        </a>
      </div>
    </section>
  );
}

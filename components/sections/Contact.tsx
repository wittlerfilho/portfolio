import Image from "next/image";
import { Reveal } from "@/components/effects/Reveal";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

/** Bloco final: chamada para o WhatsApp, gravura do anjo e rodapé. */
export function Contact() {
  return (
    <section className="end" id="end">
      <div className="top">
        <div className="fcta">
          <Reveal className="mono">[ Disponível para novos projetos ]</Reveal>
          <Reveal as="h2" className="rough" delay={1}>
            Tem um projeto?
            <br />
            Vamos começar.
          </Reveal>
          <Reveal
            as="a"
            className="btn mono"
            delay={2}
            id="wa"
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            [ Iniciar pelo WhatsApp ↗ ]
          </Reveal>
        </div>
        <figure className="ang" id="ang">
          <svg
            className="afr"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect id="afr" x=".5" y=".5" width="99" height="99" pathLength="1" />
          </svg>
          <div className="aim" id="aim">
            <Image
              className="boil2"
              src="/angel.webp"
              alt="Gravura de um anjo com espada, símbolo da wittler"
              width={384}
              height={547}
              unoptimized
            />
          </div>
          <figcaption className="mono">[ fig. 01 — wittler ]</figcaption>
        </figure>
      </div>
      <Footer />
    </section>
  );
}

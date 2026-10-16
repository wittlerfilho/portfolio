import { Header } from "@/components/layout/Header";
import { PageProvider } from "@/components/effects/PageProvider";
import { Loader } from "@/components/effects/Loader";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { ScrollEngine } from "@/components/effects/ScrollEngine";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Works } from "@/components/sections/Works";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <PageProvider>
      {/* textura VHS (CSS) e barra de progresso de leitura */}
      <div id="vhs" aria-hidden="true" />
      <div id="bar" aria-hidden="true">
        <div id="barf" />
      </div>

      <Loader />
      <Header />

      <main id="conteudo">
        <Hero />
        <Marquee />
        <Works />
        <Process />
        <div className="stack">
          <Services />
          <Contact />
        </div>
      </main>

      <SmoothScroll />
      <ScrollEngine />
    </PageProvider>
  );
}

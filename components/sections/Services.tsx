import { Reveal } from "@/components/effects/Reveal";
import { services } from "@/lib/site";

/** "O que entrego": fica fixa enquanto o rodapé sobe por cima. */
export function Services() {
  return (
    <section className="serv" id="serv">
      <Reveal className="mono">[ Services ]</Reveal>
      <Reveal as="h2" className="rough" delay={1}>
        O que entrego
      </Reveal>
      {services.map((s) => (
        <Reveal key={s.num} className="sv">
          <Reveal kind="hr" />
          <span className="mono">{s.num}</span>
          <h4>{s.title}</h4>
          <p>{s.text}</p>
        </Reveal>
      ))}
      <Reveal className="sv">
        <Reveal kind="hr" />
      </Reveal>
    </section>
  );
}

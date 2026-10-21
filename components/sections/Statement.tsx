import { statement } from "@/lib/site";

/**
 * Declaração entre o marquee e os projetos.
 * O texto é dividido em palavras e caracteres só para a cor poder ser escrita letra a letra:
 * o ScrollEngine lê `[data-fill]` e pinta cada `.fc` conforme o progresso da rolagem.
 * Sem JS, com movimento reduzido ou em alto contraste, o texto fica inteiro na cor final (CSS).
 */
export function Statement() {
  const words = statement.text.split(" ");
  return (
    <section className="stm" aria-label={statement.label}>
      <div className="mono">[ {statement.label} ]</div>
      <p data-fill="">
        {/* leitores de tela recebem o texto corrido; os spans por letra ficam escondidos */}
        <span className="sr-only">{statement.text}</span>
        <span aria-hidden="true">
          {words.map((w, i) => (
            <span key={i}>
              <span className="fw">
                {Array.from(w).map((ch, k) => (
                  <span key={k} className="fc">
                    {ch}
                  </span>
                ))}
              </span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
      </p>
    </section>
  );
}

/** Seção "Processo": moldura que se desenha e encolhe durante a rolagem (ScrollEngine). */
export function Process() {
  return (
    <section className="frame" id="frame" aria-label="Processo">
      <div className="stick">
        <svg id="fsvg" preserveAspectRatio="none" aria-hidden="true">
          <rect id="frect" />
        </svg>
        <div className="txt" id="ftxt">
          <div className="mono">[ Processo ]</div>
          <h2 className="boil">
            cada página,
            <br />
            uma única peça.
          </h2>
        </div>
      </div>
    </section>
  );
}

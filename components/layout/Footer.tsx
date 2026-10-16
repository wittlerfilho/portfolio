import { site } from "@/lib/site";

/** Parte inferior do bloco final: nome gigante, GitHub e copyright. */
export function Footer() {
  return (
    <footer className="bot">
      <div className="name boil" id="ename" aria-hidden="true">
        wittler
      </div>
      <div
        className="mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginTop: 30,
        }}
      >
        <a className="lk" id="gh" href={site.githubUrl} target="_blank" rel="noopener noreferrer">
          [ GitHub ↗ ]
        </a>
        <span style={{ opacity: 0.7 }}>© 2026 wittler</span>
      </div>
    </footer>
  );
}

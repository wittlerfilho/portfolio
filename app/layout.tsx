import type { Metadata, Viewport } from "next";
import { BoilFilters } from "@/components/effects/BoilFilters";
import { site } from "@/lib/site";

/* Fontes autohospedadas (pacotes @fontsource): sem requisição ao Google em tempo de build/execução */
import "@fontsource/dm-mono/latin-400.css";
import "@fontsource/dm-mono/latin-500.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: ["web design", "landing page", "desenvolvimento web", "sites sob medida", "Wittler"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f2ec",
};

const noscriptCss =
  ".rv{opacity:1!important;transform:none!important}.hr{transform:none!important}#loader{display:none!important}.hang{clip-path:none!important;opacity:1!important}.aim{clip-path:none!important;opacity:1!important}.afr rect{stroke-dashoffset:0!important}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <noscript>
          <style>{noscriptCss}</style>
        </noscript>
        <a className="skip-link mono" href="#conteudo">
          Pular para o conteúdo
        </a>
        <BoilFilters />
        {children}
      </body>
    </html>
  );
}

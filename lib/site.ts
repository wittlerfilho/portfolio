/* Configuração central do site. Valores vêm de variáveis de ambiente públicas (veja .env.example). */

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "55DDDNUMERO";
const WA_MSG =
  "Olá, wittler! Vi o portfólio e quero iniciar um projeto de landing page.";

export const site = {
  name: "wittler",
  title: "wittler — landing pages autorais",
  description:
    "Landing pages feitas à mão: tipografia, movimento e código sob medida para marcas que não querem parecer com mais ninguém.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/SEU-USUARIO",
  whatsappUrl: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`,
} as const;

export const navLinks = [
  { href: "#works", num: "01", label: "Projetos" },
  { href: "#serv", num: "02", label: "Serviços" },
  { href: "#end", num: "03", label: "Contato" },
] as const;

export const projects = [
  {
    title: "MAISON ÉLAN",
    tag: "Fashion",
    text: "Editorial de moda. Tipografia serifada e galeria em rolagem lenta.",
    art: { label: "Maison Élan", lines: ["nouvelle", "saison"], className: "a0" },
  },
  {
    title: "ATELIER NORTE",
    tag: "Studio",
    text: "Estúdio criativo. Contraste em preto e azul, grade livre.",
    art: { label: "Atelier Norte", lines: ["feito", "com", "ruído"], className: "a1" },
  },
  {
    title: "OBJETO / 01",
    tag: "Product",
    text: "Lançamento de produto. Molduras e revelação por máscara.",
    art: { label: "Objeto / 01", lines: ["peso", "exato"], className: "a2", circle: true },
  },
  {
    title: "SIGNAL LABS",
    tag: "Tech",
    text: "Marca de tecnologia. Azul profundo e movimento de precisão.",
    art: { label: "Signal Labs", lines: ["sinal,", "sem", "ruído"], className: "a3" },
  },
] as const;

export const services = [
  {
    num: "01",
    title: "Design autoral",
    text: "Direção de arte, tipografia e composição desenhadas para a sua marca. Sem templates.",
  },
  {
    num: "02",
    title: "Responsividade",
    text: "Do celular ao desktop, com atenção a toque, teclado e movimento reduzido.",
  },
  {
    num: "03",
    title: "Performance",
    text: "Animação com propósito, páginas rápidas e rolagem nativa preservada.",
  },
  {
    num: "04",
    title: "Sob medida",
    text: "Funcionalidades de front-end e back-end quando o projeto pede.",
  },
] as const;

export const marqueeText =
  "INDEPENDENT WEB DESIGN — DIGITAL EXPERIENCES — CREATIVE DEVELOPMENT — ";

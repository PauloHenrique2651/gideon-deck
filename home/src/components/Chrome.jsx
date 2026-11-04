import { useEffect, useState } from "react";
import { asset, WHATS } from "../lib/gsap";
import Arrow from "./Arrow.jsx";

export const scrollToId = (id, after) => (e) => {
  e.preventDefault();
  after && after();
  const el = document.getElementById(id);
  const y = el.getBoundingClientRect().top + window.scrollY - 68;
  window.__lenis ? window.__lenis.scrollTo(y, { duration: 1.4 }) : window.scrollTo({ top: y, behavior: "smooth" });
};

// Fixed header; gains a border once the page scrolls.
export default function Chrome() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const close = () => setOpen(false);

  return (
    <header className={"hdr" + (open ? " menu-open" : "") + (scrolled ? " scrolled" : "")}>
      <div className="hdr-in">
        <a className="brand" href="/" onClick={scrollToId("inicio", close)} aria-label="Gideon Systems, voltar ao início">
          <img src={asset("assets/img/gideon-navy.png")} alt="Gideon" />
        </a>
        <nav className="nav" aria-label="Principal">
          <a href="#solucoes" onClick={scrollToId("solucoes", close)}>Soluções</a>
          <a href="#servicos" onClick={scrollToId("servicos", close)}>Serviços</a>
          <a href="#projetos" onClick={scrollToId("projetos", close)}>Projetos</a>
          <a href="/sobre">Sobre</a>
          <a href="#contato" onClick={scrollToId("contato", close)}>Contato</a>
          <a className="btn btn-primary" href={WHATS} target="_blank" rel="noopener noreferrer" data-quote data-cta-location="header">Falar no WhatsApp <Arrow /></a>
        </nav>
        <button className="menu-btn" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </header>
  );
}

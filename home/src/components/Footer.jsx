import { asset, wa, WHATS, PHONE, PHONE_LABEL, INSTAGRAM } from "../lib/gsap";
import { SERVICES } from "./Services.jsx";

// Languages the rest of the site is generated in (scripts/build.mjs)
const LANGS = [["pt-BR", "/", "Português (Brasil)"], ["pt-PT", "/pt-pt", "Português (Portugal)"], ["en", "/en", "English"], ["es", "/es", "Español"], ["de", "/de", "Deutsch"], ["fr", "/fr", "Français"], ["it", "/it", "Italiano"], ["nl", "/nl", "Nederlands"], ["pl", "/pl", "Polski"], ["ja", "/ja", "日本語"], ["zh-CN", "/zh", "中文"], ["ko", "/ko", "한국어"], ["ru", "/ru", "Русский"], ["ar", "/ar", "العربية"]];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="f-brand">
          <a href="/" aria-label="Gideon Systems, início"><img src={asset("assets/img/gideon-navy.png")} alt="Gideon Systems" width="140" height="19" /></a>
          <p>Inteligência de Software que impulsiona negócios.<br />Software house no Rio de Janeiro · Atendimento em todo o Brasil.</p>
          <a className="btn btn-primary" href={WHATS} target="_blank" rel="noopener noreferrer" data-quote data-cta-location="footer">Falar no WhatsApp <span className="arr">↗</span></a>
        </div>
        <nav aria-label="Soluções">
          <h3>Soluções</h3>
          {SERVICES.map(([t, , slug]) => <a key={slug} href={`/${slug}`}>{t}</a>)}
        </nav>
        <nav aria-label="Empresa">
          <h3>Empresa</h3>
          <a href="/sobre">Sobre a Gideon</a>
          <a href="/contato">Contato e orçamento</a>
          <a href="/cases">Projetos</a>
          <a href="/blog">Conteúdo</a>
        </nav>
        <div>
          <h3>Contato</h3>
          <a href={wa()} target="_blank" rel="noopener noreferrer" data-cta-location="footer">WhatsApp {PHONE_LABEL}</a>
          <a href={`tel:+${PHONE}`}>Ligar {PHONE_LABEL}</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram @oficial.gideon</a>
        </div>
      </div>
      <div className="wrap f-bottom">
        <p>© {new Date().getFullYear()} Gideon Systems</p>
        <nav className="f-langs" aria-label="Idioma">
          {LANGS.map(([code, href, name]) => <a key={code} href={href} hrefLang={code} lang={code}>{name}</a>)}
        </nav>
      </div>
    </footer>
  );
}

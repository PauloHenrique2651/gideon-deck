import { useRef } from "react";
import { gsap, useIsoLayoutEffect, onView, whileVisible, asset, WHATS, PHONE, PHONE_LABEL, INSTAGRAM } from "../lib/gsap";
import Arrow from "./Arrow.jsx";

// Scene 5 of the film: screens orbit the closing line.
const TILES = ["prima-hero.jpg", "UI-bars", "max-hero.jpg", "UI-kpi", "prima-serv.jpg", "UI-wa", "max-port.jpg", "UI-ok", "prima-pow.jpg", "max-stats.jpg"];

const STEPS = [
  ["Conversa", "Entendemos o cenário e as ferramentas que você usa."],
  ["Prioridade", "Começamos pelo problema mais importante."],
  ["Entregas por etapa", "Validadas com a sua equipe, evoluindo com o negócio."],
];

function Tile({ src }) {
  if (src === "UI-bars") return <div className="tile tile-ui"><small>Faturamento</small><div className="mini-bars">{[40, 55, 48, 70, 62, 86].map((h, i) => <i key={i} style={{ height: h + "%" }} />)}</div></div>;
  if (src === "UI-kpi") return <div className="tile tile-ui"><small>Pedidos hoje</small><b>128</b><span className="pill p-ok">+12%</span></div>;
  if (src === "UI-wa") return <div className="tile tile-ui"><small>WhatsApp</small><div className="msg">Seu pedido #1042 foi faturado.</div></div>;
  if (src === "UI-ok") return <div className="tile tile-ui"><small>Agente de IA</small><span className="pill p-ok">✓ Aprovado por Ana</span></div>;
  return <div className="tile"><img src={asset("assets/img/" + src)} alt="" loading="lazy" /></div>;
}

export default function Closing() {
  const root = useRef(null);
  useIsoLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const ring = q(".ring")[0], tiles = q(".tile-pos");
      const o = { a: -Math.PI / 2 };
      const place = () => {
        // phones show the ring in its own band above the copy (see styles.css), so it can be tighter
        const w = ring.offsetWidth, h = ring.offsetHeight, small = w < 700;
        const rx = w * (small ? 0.4 : 0.42), ry = h * (small ? 0.27 : 0.38);
        tiles.forEach((t, i) => {
          const ang = o.a + (i / tiles.length) * Math.PI * 2, s = Math.sin(ang);
          gsap.set(t, { x: Math.cos(ang) * rx, y: s * ry, scale: 0.72 + 0.28 * (s + 1) / 2, zIndex: Math.round((s + 1) * 10) });
        });
      };
      place();
      const ro = new ResizeObserver(place);
      ro.observe(ring);

      const spin = () => { o.a += 0.0016; place(); };
      let running = false;
      const on = () => { if (!running) { gsap.ticker.add(spin); running = true; } };
      const off = () => { gsap.ticker.remove(spin); running = false; };
      gsap.set(q(".tile-in"), { opacity: 0, scale: 0.6 });
      gsap.set(q(".close-copy > *"), { opacity: 0, y: 40 });
      let seen = false;
      onView(el, () => {
        seen = true;
        gsap.to(q(".tile-in"), { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)", stagger: 0.04 });
        gsap.to(q(".close-copy > *"), { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", stagger: 0.1, delay: 0.15 });
        on();
      });
      const stop = whileVisible(el, () => seen && on(), off);
      return () => { ro.disconnect(); stop(); off(); };
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="closing" id="contato" ref={root}>
      <div className="ring" aria-hidden="true">
        {TILES.map((s, i) => <div className="tile-pos" key={i}><div className="tile-in"><Tile src={s} /></div></div>)}
      </div>
      <div className="close-copy">
        <h2 className="h1">Inteligência de Software<br />que impulsiona negócios.</h2>
        <p className="close-lead">Conte o que trava sua operação hoje. Vamos entender o cenário, as ferramentas que você usa e o caminho mais útil para sua empresa.</p>
        <ol className="steps">
          {STEPS.map(([t, d], i) => <li key={t}><b>{i + 1}</b><span><strong>{t}</strong>{d}</span></li>)}
        </ol>
        <div className="hero-ctas">
          <a className="btn btn-primary btn-lg" href={WHATS} target="_blank" rel="noopener noreferrer" data-quote data-cta-location="closing">Conversar pelo WhatsApp <Arrow /></a>
          <a className="btn btn-ghost btn-lg" href={`tel:+${PHONE}`} data-cta data-cta-location="closing">Ligar {PHONE_LABEL}</a>
        </div>
        <p className="close-sub">Rio de Janeiro, com atendimento em todo o Brasil. Instagram <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">@oficial.gideon</a></p>
      </div>
    </section>
  );
}

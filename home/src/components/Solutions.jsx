import { useRef } from "react";
import { gsap, useIsoLayoutEffect, reduced, onView, whileVisible, wa } from "../lib/gsap";

// Scene 3 of the film: a deck of product screens. It deals itself while on screen; the list picks a screen.
const ITEMS = ["CRM sob medida", "ERP integrado", "Dashboards e BI", "Automação de processos", "IA com revisão humana"];
// call to action for the screen in front: [button text, WhatsApp topic, service page]
const CTAS = [
  ["Quero um CRM sob medida", "um CRM sob medida", "crm-sob-medida"],
  ["Quero um ERP integrado", "um ERP sob medida", "erp-sob-medida"],
  ["Quero dashboards da minha operação", "dashboards e BI", "desenvolvimento-de-dashboard"],
  ["Quero automatizar processos", "automação de processos", "automacao-de-processos"],
  ["Quero IA na minha operação", "inteligência artificial", "inteligencia-artificial"],
];
const ROTS = [-1.6, 1.2, -1.1, 1.5, -0.9];
const BARS = [38, 52, 44, 66, 58, 74, 62, 80, 71, 88];
const HOLD = 3.6; // seconds each screen stays in front

const Bar = ({ title, tag }) => <div className="pbar"><span className="dots"><i /><i /><i /></span>{title}<span className="tag">{tag}</span></div>;

function Screens() {
  return (
    <>
      <div className="panel ui ui-crm">
        <Bar title="CRM · Funil de vendas" tag="Novembro" />
        <div className="body kanban">
          <div className="col"><h4>Novo lead<span>4</span></h4><div className="lead-c slot" aria-hidden="true">x<span>x</span></div><div className="lead-c">Rede Sul Logística<span>R$ 32 mil</span></div><div className="lead-c">Clínica Vida<span>R$ 18 mil</span></div></div>
          <div className="col"><h4>Proposta<span>3</span></h4><div className="lead-c">Atacado Norte<span>R$ 54 mil</span></div><div className="lead-c">Construtora Lima<span>R$ 71 mil</span></div><div className="lead-c slot" aria-hidden="true">x<span>x</span></div></div>
          <div className="col"><h4>Fechado<span>2</span></h4><div className="lead-c slot" aria-hidden="true">x<span>x</span></div><div className="lead-c">Grupo Atlântico<span>R$ 96 mil</span></div></div>
          <div className="lead-c mover">Metalúrgica Silva<span><b className="mv-a">R$ 48 mil · novo</b><b className="mv-b">R$ 48 mil · fechado ✓</b></span></div>
        </div>
      </div>
      <div className="panel ui ui-erp">
        <Bar title="ERP · Estoque" tag="Compras · Vendas · Financeiro" />
        <div className="body">
          <table className="t">
            <thead><tr><th>Produto</th><th>Qtd.</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Chapa galvanizada 2mm</td><td>420</td><td><span className="pill p-ok">OK</span></td></tr>
              <tr className="erp-row"><td>Perfil alumínio 6m</td><td className="erp-q">12</td><td><span className="pill p-warn erp-s">Repor</span><span className="pill p-ok erp-s2">OK</span></td></tr>
              <tr><td>Parafuso inox M8</td><td>3.200</td><td><span className="pill p-ok">OK</span></td></tr>
              <tr><td>Tinta pó RAL 9010</td><td>86</td><td><span className="pill p-ok">OK</span></td></tr>
            </tbody>
          </table>
          <div className="po"><span>Pedido de compra #2291 gerado automaticamente</span><span className="po-ok">✓ enviado</span></div>
        </div>
      </div>
      <div className="panel ui ui-dash">
        <Bar title="Dashboard · Operação" tag="Hoje" />
        <div className="body">
          <div className="kpis">
            <div className="kpi"><small>Pedidos</small><div className="k1">0</div></div>
            <div className="kpi"><small>Faturamento</small><div>R$ <span className="k2">0</span> mil</div></div>
            <div className="kpi"><small>Prazo médio</small><div>2,4 dias</div></div>
          </div>
          <div className="charts">
            <div className="bars">{BARS.map((h, i) => <i key={i} className={i === 9 ? "hl" : ""} style={{ height: h + "%" }} />)}</div>
            <svg className="line" viewBox="0 0 292 300" preserveAspectRatio="none"><path className="d-line" d="M0 250 L48 220 L96 232 L144 170 L192 150 L240 96 L292 60" fill="none" stroke="#002fa7" strokeWidth="5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>
          </div>
        </div>
      </div>
      <div className="panel ui ui-auto">
        <Bar title="Automação · Novo pedido" tag="Ativa" />
        <div className="body">
          <div className="flow">
            {[["Gatilho", "Pedido criado"], ["Etapa 2", "Validar estoque"], ["Etapa 3", "Emitir nota"], ["Etapa 4", "Avisar cliente"]].map(([s, t]) => <div className="node" key={t}><small>{s}</small>{t}</div>)}
          </div>
          <div className="wa"><div className="wh">WhatsApp · enviado automaticamente</div><div className="wb"><div className="msg">Olá, Ana! Seu pedido #1042 foi faturado e sai hoje.</div></div></div>
        </div>
      </div>
      <div className="panel ui ui-ia">
        <Bar title="Agente de IA · Operações" tag="Com revisão humana" />
        <div className="body chat">
          <div className="chat-u">Quais pedidos estão atrasados?</div>
          <div className="chat-a"><small>Agente Gideon</small><p className="ai-text">3 pedidos atrasados: #1038, #1041 e #1044. Sugiro avisar os clientes e priorizar a produção.</p></div>
          <div className="review"><span className="pill p-warn rv1">Aguardando revisão humana</span><span className="pill p-ok rv2">✓ Aprovado por Ana</span></div>
        </div>
      </div>
    </>
  );
}

// what happens inside each screen when it comes to the front
function inner(panel, i) {
  const q = gsap.utils.selector(panel);
  const tl = gsap.timeline();
  if (i === 0) {
    const mover = q(".mover")[0], slots = q(".slot");
    const at = (s) => ({ x: s.offsetLeft - slots[0].offsetLeft, y: s.offsetTop - slots[0].offsetTop });
    gsap.set(mover, { x: 0, y: 0, left: slots[0].offsetLeft, top: slots[0].offsetTop, width: slots[0].offsetWidth, borderColor: "#002fa7" });
    gsap.set(q(".mv-a"), { display: "inline" }); gsap.set(q(".mv-b"), { display: "none" });
    tl.to(mover, { ...at(slots[1]), duration: 0.45, ease: "power3.inOut" }, 0.5)
      .to(mover, { ...at(slots[2]), duration: 0.45, ease: "power3.inOut" }, 1.1)
      .to(mover, { borderColor: "#17703d", duration: 0.2 }, 1.55)
      .set(q(".mv-a"), { display: "none" }, 1.55).set(q(".mv-b"), { display: "inline" }, 1.55);
  } else if (i === 1) {
    const n = { v: 12 };
    gsap.set(q(".erp-row"), { backgroundColor: "rgba(238,243,251,0)" });
    gsap.set(q(".erp-s"), { display: "inline-block" }); gsap.set(q(".erp-s2"), { display: "none" }); gsap.set(q(".po-ok"), { opacity: 0 });
    q(".erp-q")[0].textContent = "12";
    tl.to(q(".erp-row"), { backgroundColor: "rgba(238,243,251,1)", duration: 0.25 }, 0.4)
      .to(n, { v: 240, duration: 0.7, ease: "power2.out", onUpdate: () => (q(".erp-q")[0].textContent = Math.round(n.v)) }, 0.5)
      .set(q(".erp-s"), { display: "none" }, 1.15).set(q(".erp-s2"), { display: "inline-block" }, 1.15)
      .to(q(".po-ok"), { opacity: 1, duration: 0.25 }, 1.2);
  } else if (i === 2) {
    const k1 = { v: 0 }, k2 = { v: 0 };
    tl.to(k1, { v: 128, duration: 0.9, ease: "power2.out", onUpdate: () => (q(".k1")[0].textContent = Math.round(k1.v)) }, 0.3)
      .to(k2, { v: 482, duration: 0.9, ease: "power2.out", onUpdate: () => (q(".k2")[0].textContent = Math.round(k2.v)) }, 0.3)
      .fromTo(q(".bars i"), { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power3.out", stagger: 0.04 }, 0.3)
      .fromTo(q(".d-line"), { strokeDasharray: 520, strokeDashoffset: 520 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" }, 0.4);
  } else if (i === 3) {
    gsap.set(q(".node"), { borderColor: "#d9e0e8", backgroundColor: "#fff" });
    q(".node").forEach((n, j) => tl.to(n, { borderColor: "#002fa7", backgroundColor: "#eef3fb", duration: 0.2 }, 0.3 + j * 0.2));
    tl.fromTo(q(".wa"), { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, 1.15);
  } else {
    tl.fromTo(q(".chat-u"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.3)
      .fromTo(q(".chat-a"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.6)
      .fromTo(q(".ai-text"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "none" }, 0.7)
      .fromTo(q(".rv1"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.4)
      .fromTo(q(".rv2"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, 1.8)
      .to(q(".rv1"), { opacity: 0.4, duration: 0.2 }, 1.8);
  }
  return tl;
}

export default function Solutions() {
  const root = useRef(null);
  const go = useRef(() => {});
  useIsoLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const panels = q(".ui"), rows = q(".svc"), cta = q(".sl-cta .btn")[0], more = q(".sl-cta .more")[0];
      const still = reduced();
      let cur = -1, timer = null, micro = null;

      const show = (i, instant) => {
        const d = instant ? 0 : 0.7;
        micro && micro.kill();
        panels.forEach((p, j) => {
          const depth = i - j;
          if (depth < 0) gsap.to(p, { x: "60%", y: 30, rotation: 8, scale: 1, opacity: 0, zIndex: 1, duration: d * 0.6, ease: "power3.in" });
          else gsap.to(p, { x: -26 * depth, y: -22 * depth, scale: 1 - 0.05 * depth, rotation: depth ? ROTS[j] - depth * 1.2 : ROTS[j], opacity: depth >= 3 ? 0 : 1 - depth * 0.12, zIndex: 10 - depth, duration: d, ease: depth ? "power3.out" : "expo.out" });
        });
        rows.forEach((r, j) => { r.classList.toggle("on", j === i); r.setAttribute("aria-selected", j === i); });
        const [label, topic, slug] = CTAS[i];
        cta.firstChild.textContent = label + " ";
        cta.href = wa(topic);
        more.href = "/" + slug;
        gsap.to(q(".svc-bar"), { scaleX: (i + 1) / ITEMS.length, duration: d * 0.7, ease: "power3.out" });
        micro = inner(panels[i], i);
        if (instant) micro.progress(1);
        cur = i;
      };
      const tick = () => { timer && timer.kill(); timer = gsap.delayedCall(HOLD, () => { show((cur + 1) % ITEMS.length); tick(); }); };
      go.current = (i) => { show(i); if (!still) tick(); };

      gsap.set(panels, { x: "60%", y: 30, rotation: 8, opacity: 0 });
      if (still) { show(0, true); return; }
      gsap.set(q(".sl-copy .tl, .sl-copy .eyebrow, .svc, .sl-cta"), { opacity: 0, y: 30 });
      onView(el.querySelector(".deck"), () => {
        gsap.to(q(".sl-copy .eyebrow, .sl-copy .tl, .svc, .sl-cta"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 });
        show(0); tick();
      });
      // only deal the deck while it is on screen
      return whileVisible(el, () => cur >= 0 && timer && timer.resume(), () => timer && timer.pause());
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="scene solutions" id="solucoes" ref={root}>
      <div className="wrap scene-in">
        <div className="sl-copy">
          <div className="eyebrow">O que fazemos</div>
          <h2 className="h2"><span className="tl">Sistemas que</span> <span className="tl">trabalham por você.</span></h2>
          <div className="svc-list" role="tablist" aria-label="Soluções">
            <div className="svc-bar" />
            {ITEMS.map((t, i) => (
              <button className="svc" key={t} role="tab" aria-selected={i === 0} onClick={() => go.current(i)}><b className="mono">{String(i + 1).padStart(2, "0")}</b>{t}</button>
            ))}
          </div>
          <div className="sl-cta">
            <a className="btn btn-primary" href={wa(CTAS[0][1])} target="_blank" rel="noopener noreferrer" data-quote data-cta-location="solutions">{CTAS[0][0] + " "}<span className="arr">↗</span></a>
            <a className="more" href={"/" + CTAS[0][2]} data-cta data-cta-location="solutions">Saiba mais <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="deck" aria-hidden="true"><Screens /></div>
      </div>
    </section>
  );
}

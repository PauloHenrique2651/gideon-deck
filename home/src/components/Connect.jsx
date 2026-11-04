import { useRef } from "react";
import { gsap, useIsoLayoutEffect, onView, asset } from "../lib/gsap";

// Scene 2 of the film: loose spreadsheets, e-mails and messages fall into place around one system.
const CH = [
  { ic: "X", bg: "#1f7a44", t1: "planilha_final_v3.xlsx", t2: "editada por 4 pessoas" },
  { ic: "@", bg: "#002fa7", t1: "Re: Re: pedido urgente", t2: "14 e-mails na conversa" },
  { ic: "W", bg: "#128c7e", t1: "WhatsApp", t2: "“e o orçamento?”" },
  { ic: "NF", bg: "#536175", t1: "Nota fiscal 4821", t2: "digitada à mão" },
  { ic: "E", bg: "#b26b00", t1: "Estoque.xls", t2: "atualizado em março" },
  { ic: "!", bg: "#c2410c", t1: "Post-it no monitor", t2: "“ligar p/ fornecedor”" },
];
// messy offset (fraction of card size) and rotation for each card before it snaps into the grid
const MESS = [[0.25, 0.5, -9], [-0.1, -0.35, 7], [-0.2, 0.9, -6], [0.3, -0.6, 6], [-0.15, 0.4, -8], [-0.3, -0.5, 10]];

export default function Connect() {
  const root = useRef(null);
  useIsoLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const stage = q(".cx-stage")[0], hub = q(".hub")[0], cards = q(".chaos"), svg = q(".wires")[0];

      // wires from each card to the nearest edge of the hub, computed from the tidy layout
      const draw = () => {
        svg.innerHTML = "";
        svg.setAttribute("viewBox", `0 0 ${stage.offsetWidth} ${stage.offsetHeight}`);
        const hx = hub.offsetLeft, hy = hub.offsetTop, hw = hub.offsetWidth, hh = hub.offsetHeight;
        return cards.map((c) => {
          const cx = c.offsetLeft + c.offsetWidth / 2, above = c.offsetTop < hy;
          const sy = above ? c.offsetTop + c.offsetHeight : c.offsetTop;
          const ex = Math.min(hx + hw - 24, Math.max(hx + 24, cx)), ey = above ? hy : hy + hh;
          const my = (sy + ey) / 2;
          const d = `M${cx} ${sy} C${cx} ${my} ${ex} ${my} ${ex} ${ey}`;
          const mk = (cls) => { const p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("d", d); p.setAttribute("class", cls); svg.appendChild(p); return p; };
          const w = mk("wire"), pulse = mk("pulse");
          const len = w.getTotalLength();
          return { w, pulse, len };
        });
      };
      const hv = q(".hv")[0];
      // keep wires matching the layout when the screen size changes
      let done = false;
      const ro = new ResizeObserver(() => done && draw());
      ro.observe(stage);


      gsap.set(q(".ok"), { scale: 0, opacity: 0 });
      gsap.set(q(".cx-copy .tl, .cx-copy .lead"), { opacity: 0, y: 40 });
      gsap.set(hub, { opacity: 0, scale: 0.85 });
      const mess = (c, i, k = 1) => ({ x: MESS[i][0] * c.offsetWidth * k, y: MESS[i][1] * c.offsetHeight * k, rotation: MESS[i][2] * k });
      cards.forEach((c, i) => gsap.set(c, { ...mess(c, i, 2.4), y: (i < 3 ? -1 : 1) * 160, opacity: 0 }));

      const play = () => {
      // cards still sit at their tidy layout positions (only transformed), so wires can be measured now
      const wires = draw();
      wires.forEach(({ w, pulse, len }) => { gsap.set(w, { strokeDasharray: len, strokeDashoffset: len }); gsap.set(pulse, { strokeDasharray: `14 ${len}`, strokeDashoffset: 14, opacity: 0 }); });
      const tl = gsap.timeline({ onComplete: () => { done = true; draw(); } });
      tl.to(q(".cx-copy .tl"), { opacity: 1, y: 0, duration: 0.7, ease: "power4.out", stagger: 0.1 }, 0.05)
        .to(q(".cx-copy .lead"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.3)
        .to(hub, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 0.2);
      cards.forEach((c, i) => {
        tl.to(c, { ...mess(c, i), opacity: 1, duration: 0.7, ease: "power3.out" }, 0.05 + i * 0.07);
        tl.to(c, { ...mess(c, i, 0.7), duration: 0.8, ease: "sine.inOut" }, 0.75);
        tl.to(c, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: "expo.inOut" }, 1.5 + i * 0.05);
        tl.to(c.querySelector(".ok"), { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" }, 2.8 + i * 0.07);
      });
      wires.forEach(({ w, pulse, len }, i) => {
        tl.to(w, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" }, 2.15 + i * 0.05);
        tl.set(pulse, { opacity: 1 }, 2.65);
        tl.fromTo(pulse, { strokeDashoffset: 14 }, { strokeDashoffset: -len, duration: 0.7, ease: "none", repeat: 1, immediateRender: false }, 2.65 + i * 0.06);
        tl.set(pulse, { opacity: 0 }, 2.65 + i * 0.06 + 1.4);
      });
      const n = { v: 0 };
      tl.to(n, { v: 128, duration: 1, ease: "power2.out", onUpdate: () => (hv.textContent = Math.round(n.v)) }, 2.75);
      };
      onView(el, play, "top 60%");
      return () => ro.disconnect();
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="scene connect" id="conectada" ref={root}>
      <div className="wrap scene-in">
        <div className="cx-copy">
          <h2 className="h2"><span className="tl">Sua operação,</span> <span className="tl">conectada.</span></h2>
          <p className="lead">Planilhas, e-mails e mensagens soltos viram um só sistema.</p>
        </div>
        <div className="cx-stage">
          <svg className="wires" aria-hidden="true" />
          {CH.map((c, i) => (
            <div className={"chaos c" + i} key={c.t1}>
              <div className="ic" style={{ background: c.bg }}>{c.ic}</div>
              <div className="ct"><div className="t1">{c.t1}</div><div className="t2">{c.t2}</div></div>
              <div className="ok"><svg width="12" height="9" viewBox="0 0 16 12"><path d="M1 6l4.5 4.5L15 1" stroke="#fff" strokeWidth="3" fill="none" /></svg></div>
            </div>
          ))}
          <div className="hub">
            <img src={asset("assets/img/gideon-white.png")} alt="" />
            <div className="hub-t">Seu sistema</div>
            <div className="hrow"><i />Vendas<b className="hv">0</b></div>
            <div className="hrow"><i />Estoque<b>ok</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

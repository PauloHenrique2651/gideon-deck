import { useRef } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect, reduced, asset, WHATS, PHONE, PHONE_LABEL } from "../lib/gsap";
import { scrollToId } from "./Chrome.jsx";

// Scene 1 of the film: the editor types the code, collapses into a seam and the wordmark rises from it.
const CODE = [
  [["k", "import"], " { cliente } ", ["k", "from"], " ", ["s", '"./sua-empresa"'], ";"],
  [" "],
  [["k", "const"], " sistema = gideon.", ["f", "criar"], "({"],
  ["  processos: cliente.processos,"],
  ["  dados: ", ["s", '"conectados"'], ","],
  ["  retrabalho: ", ["n", "0"], ","],
  ["});"],
  ["sistema.", ["f", "evoluir"], "(); ", ["c", "// por etapas"]],
];
// letter images and their left offset (%) inside the 1100 × 151 wordmark
const LETTERS = [["L0", 0.738], ["L1", 20.649], ["L2", 29.193], ["L3", 48.444], ["L4", 65.322], ["L5", 85.417]];
const text = (line) => line.map((p) => (typeof p === "string" ? p : p[1])).join("");

export default function Hero() {
  const root = useRef(null);
  useIsoLayoutEffect(() => {
    const el = root.current;
    const hdr = document.documentElement; // not .hdr: React owns that className
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const lines = q(".ln .tx"), letters = q(".mark img");
      const stage = q(".intro-stage")[0], mark = q(".intro-mark")[0];
      const finish = () => { gsap.set(stage, { height: "auto" }); };

      // header logo only shows once the big wordmark has scrolled away
      const brand = (on) => () => hdr.classList.toggle("brand-on", on);
      ScrollTrigger.create({ trigger: mark, start: "bottom 68px", onEnter: brand(true), onLeaveBack: brand(false) });

      // the prerendered page hides these until the intro takes over (see .js rules in styles.css)
      gsap.set([mark, q(".intro-copy")], { visibility: "visible" });
      if (reduced()) { gsap.set(q(".editor"), { display: "none" }); gsap.set(lines, { clipPath: "none" }); return; }

      gsap.set(stage, { height: q(".editor")[0].offsetHeight });
      gsap.set(mark, { autoAlpha: 1 });
      gsap.set(letters, { y: 60, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set([q(".sys"), q(".intro-copy > *")], { opacity: 0, y: 20 });
      gsap.set(lines, { clipPath: "inset(0% 100% 0% 0%)" });
      const caret = q(".caret")[0];
      const cw = q(".measure")[0].getBoundingClientRect().width / 10;
      const lh = lines[0].parentElement.offsetHeight;

      const tl = gsap.timeline({ delay: 0.35, onComplete: finish });
      tl.to(caret, { opacity: 0, duration: 0.01, repeat: 3, yoyo: true, repeatDelay: 0.22 }, 0);
      let t = 0.3;
      lines.forEach((ln, i) => {
        const n = Math.max(1, ln.textContent.length);
        const d = Math.min(0.42, 0.012 * n + 0.05);
        tl.to(ln, { clipPath: "inset(0% 0% 0% 0%)", duration: d, ease: `steps(${n})` }, t);
        tl.set(caret, { y: i * lh, x: 0 }, t);
        tl.to(caret, { x: n * cw, duration: d, ease: `steps(${n})` }, t);
        t += d + 0.04;
      });
      t += 0.35;
      // collapse into a seam
      tl.to(caret, { opacity: 0, duration: 0.05 }, t);
      tl.to(q(".editor"), { scaleY: 0.006, duration: 0.42, ease: "expo.in" }, t);
      tl.set(q(".editor"), { display: "none" }, t + 0.42);
      tl.fromTo(q(".seam"), { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.01 }, t + 0.41);
      tl.to(q(".seam"), { scaleX: 1.12, opacity: 0, duration: 0.6, ease: "power2.out" }, t + 0.6);
      tl.to(stage, { height: () => mark.offsetHeight, duration: 0.7, ease: "expo.inOut" }, t + 0.42);
      // wordmark rises
      tl.to(letters, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out", stagger: 0.06 }, t + 0.45);
      tl.fromTo(q(".sys"), { opacity: 0, y: 0, scaleX: 1.25 }, { opacity: 1, scaleX: 1, duration: 0.6, ease: "power3.out" }, t + 0.7);
      tl.to(q(".intro-copy > *"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, t + 0.95);
    }, el);
    return () => { ctx.revert(); hdr.classList.remove("brand-on"); };
  }, []);

  return (
    <section className="intro" id="inicio" ref={root}>
      <div className="wrap intro-in">
        <div className="intro-stage">
          <div className="editor panel">
            <div className="pbar"><span className="dots"><i /><i /><i /></span><span className="mono">gideon.ts</span><span className="tag mono">main</span></div>
            <div className="code mono" aria-label={CODE.map(text).join("\n")}>
              {CODE.map((line, i) => (
                <div className="ln" key={i} aria-hidden="true">
                  <span className="no">{i + 1}</span>
                  <span className="tx">{line.map((p, j) => (typeof p === "string" ? p : <span className={p[0]} key={j}>{p[1]}</span>))}</span>
                </div>
              ))}
              <i className="caret" />
              <span className="measure" aria-hidden="true">0000000000</span>
            </div>
          </div>
          <div className="seam" />
          <div className="intro-mark">
            <div className="mark" role="img" aria-label="Gideon Systems">
              {LETTERS.map(([f, l]) => <img key={f} src={asset(`assets/img/${f}.png`)} style={{ left: l + "%" }} alt="" width="200" height="522" />)}
            </div>
            <div className="sys">Systems</div>
          </div>
        </div>
        <div className="intro-copy">
          <h1 className="intro-tag">Software sob medida para sua empresa <em>avançar</em>.</h1>
          <p className="intro-lead">Sistemas, ERP, CRM e automações para reduzir retrabalho e conectar sua operação. Software house no Rio de Janeiro com atendimento em todo o Brasil.</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href={WHATS} target="_blank" rel="noopener noreferrer" data-quote data-cta-location="hero">Conversar sobre meu projeto <span className="arr">↗</span></a>
            <a className="btn btn-ghost" href="#solucoes" onClick={scrollToId("solucoes")}>Ver soluções <span className="arr">↓</span></a>
          </div>
          <p className="cta-note"><span className="pulse" />Atendimento direto pelo WhatsApp · <a href={`tel:+${PHONE}`}>{PHONE_LABEL}</a></p>
        </div>
      </div>
    </section>
  );
}

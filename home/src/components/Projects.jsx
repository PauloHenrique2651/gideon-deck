import { useRef } from "react";
import { gsap, useIsoLayoutEffect, reduced, onView, whileVisible, asset, wa } from "../lib/gsap";

// Scene 4 of the film: the delivered sites scroll by in a browser and a phone; the list switches between them.
const PROJECTS = [
  { name: "Primapox", host: "primapox.com", url: "https://primapox.com", long: "prima-long.jpg", mobile: "prima-mobile.jpg" },
  { name: "Grupo MaxCompany", host: "grupomaxcompany.com.br", url: "https://grupomaxcompany.com.br", long: "max-long.jpg", mobile: "max-mobile.jpg" },
];
const HOLD = 5;
const Lock = () => <svg width="11" height="13" viewBox="0 0 16 18" aria-hidden="true"><rect x="1" y="8" width="14" height="10" fill="#536175" /><path d="M4 8V5a4 4 0 0 1 8 0v3" stroke="#536175" strokeWidth="2" fill="none" /></svg>;

export default function Projects() {
  const root = useRef(null);
  const go = useRef(() => {});
  useIsoLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const browsers = q(".browser"), phones = q(".phone"), clients = q(".client"), cta = q(".pj-cta")[0];
      const still = reduced();
      let cur = -1, timer = null, scroll = null;

      const show = (i, instant) => {
        const d = instant ? 0 : 1;
        scroll && scroll.kill();
        browsers.forEach((b, j) => {
          if (j === i) gsap.fromTo(b, { x: instant ? 0 : "40%", y: 40, rotation: 5, opacity: 0, scale: 1 }, { x: 0, y: 0, rotation: -1, opacity: 1, zIndex: 3, duration: d * 0.8, ease: "expo.out" });
          else gsap.to(b, { x: "-5%", y: -36, scale: 0.92, rotation: -3, opacity: cur === -1 ? 0 : 0.8, zIndex: 1, duration: d * 0.7, ease: "power3.out" });
        });
        phones.forEach((p, j) => {
          if (j === i) gsap.fromTo(p, { x: instant ? 0 : 160, y: 120, rotation: 12, opacity: 0 }, { x: 0, y: 0, rotation: 4, opacity: 1, duration: d * 0.8, delay: d * 0.2, ease: "expo.out" });
          else gsap.to(p, { x: 80, y: 120, rotation: 10, opacity: 0, duration: d * 0.5, ease: "power3.in" });
        });
        clients.forEach((c, j) => { c.classList.toggle("on", j === i); c.setAttribute("aria-selected", j === i); });
        cta.href = wa(`um site como o da ${PROJECTS[i].name}`);
        // scroll the full-page capture down and part of the way back
        const img = browsers[i].querySelector("img"), view = img.parentElement;
        const max = Math.max(0, img.offsetHeight - view.offsetHeight);
        gsap.set(img, { y: 0 });
        if (!instant) scroll = gsap.timeline({ delay: 0.6 }).to(img, { y: -max * 0.45, duration: 1.8, ease: "power2.inOut" }).to(img, { y: -max * 0.25, duration: 0.8, ease: "power2.inOut" });
        cur = i;
      };
      const tick = () => { timer && timer.kill(); timer = gsap.delayedCall(HOLD, () => { show((cur + 1) % PROJECTS.length); tick(); }); };
      go.current = (i) => { show(i); if (!still) tick(); };

      gsap.set([browsers, phones], { opacity: 0 });
      if (still) { show(0, true); return; }
      gsap.set(q(".pj-copy > *:not(.clients), .client"), { opacity: 0, y: 30 });
      onView(el.querySelector(".pj-stage"), () => {
        gsap.to(q(".pj-copy > *:not(.clients), .client"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.07 });
        show(0); tick();
      });
      return whileVisible(el, () => timer && timer.resume(), () => timer && timer.pause());
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="scene projects" id="projetos" ref={root}>
      <div className="wrap scene-in">
        <div className="pj-copy">
          <div className="eyebrow">Projetos entregues</div>
          <h2 className="h2">Sites que viram negócio.</h2>
          <p className="lead">Sites, landing pages e e-commerce conectados à operação.</p>
          <div className="clients" role="tablist" aria-label="Projetos">
            {PROJECTS.map((p, i) => (
              <button className="client" key={p.host} role="tab" aria-selected={i === 0} onClick={() => go.current(i)}>
                <i className="dot" />
                <span><span className="nm">{p.name}</span><span className="u">{p.host}</span></span>
              </button>
            ))}
          </div>
          <a className="btn btn-primary pj-cta" href={wa(`um site como o da ${PROJECTS[0].name}`)} target="_blank" rel="noopener noreferrer" data-quote data-cta-location="projects">Quero um site assim <span className="arr">↗</span></a>
        </div>
        <div className="pj-stage">
          {PROJECTS.map((p) => (
            <a className="browser" key={p.host} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${p.host}`}>
              <div className="addr"><span className="dots"><i /><i /><i /></span><div className="url"><Lock />{p.host}<span className="go">↗</span></div></div>
              <div className="view"><img src={asset("assets/img/" + p.long)} alt={`Página do site ${p.name}`} /></div>
            </a>
          ))}
          {PROJECTS.map((p) => (
            <div className="phone" key={p.host} aria-hidden="true"><div className="scr"><img src={asset("assets/img/" + p.mobile)} alt="" /></div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

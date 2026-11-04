import { useIsoLayoutEffect, gsap, ScrollTrigger } from "../lib/gsap";

// Elements marked .reveal fade up once when they enter the screen (not tied to scroll position).
export default function Reveal() {
  useIsoLayoutEffect(() => {
    const els = gsap.utils.toArray(".reveal");
    gsap.set(els, { y: 32, opacity: 0 });
    const batch = ScrollTrigger.batch(els, {
      start: "top 90%", once: true,
      onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.06, overwrite: true }),
    });
    return () => { batch.forEach((t) => t.kill()); gsap.set(els, { clearProps: "all" }); };
  }, []);
  return null;
}

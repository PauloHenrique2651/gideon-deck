import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

// contact
export const PHONE = "5521976848677";
export const PHONE_LABEL = "(21) 97684-8677";
export const INSTAGRAM = "https://www.instagram.com/oficial.gideon/";
// WhatsApp link with a message that says where the visitor came from
export const wa = (topic) => `https://wa.me/${PHONE}?text=` + encodeURIComponent(topic
  ? `Olá, vim pelo site da Gideon Systems e quero conversar sobre ${topic}.`
  : "Olá, vim pelo site da Gideon Systems e gostaria de conversar sobre um projeto.");
export const WHATS = wa();

// run fn once when el scrolls into view (or right away for visitors who prefer less motion)
export const onView = (el, fn, start = "top 70%") => ScrollTrigger.create({ trigger: el, start, once: true, onEnter: fn });
// keep a looping animation alive only while el is on screen
export const whileVisible = (el, on, off) => {
  const io = new IntersectionObserver(([e]) => (e.isIntersecting ? on() : off()), { threshold: 0.2 });
  io.observe(el);
  return () => io.disconnect();
};

"use client";

import { useEffect, useRef } from "react";

export default function BackgroundLight() {
  const light = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = window.innerWidth / 2, y = window.innerHeight / 3;
    let targetX = x, targetY = y;
    const paint = () => { if (light.current) light.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`; };
    const tick = () => {
      x += (targetX - x) * .12; y += (targetY - y) * .12;
      paint();
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .5) frame = requestAnimationFrame(tick); else frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType === "touch") return;
      targetX = event.clientX; targetY = event.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const preference = () => { cancelAnimationFrame(frame); frame = 0; if (reduced.matches) { x = window.innerWidth / 2; y = window.innerHeight / 3; paint(); } };
    paint();
    window.addEventListener("pointermove", move);
    reduced.addEventListener("change", preference);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); reduced.removeEventListener("change", preference); };
  }, []);
  return <div ref={light} className="page-background-light" aria-hidden="true" />;
}

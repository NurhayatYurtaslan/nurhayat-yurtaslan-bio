"use client";

import { useEffect } from "react";

export default function WidgetExchange() {
  useEffect(() => {
    let stop = () => {};
    const start = (event: PointerEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element) || event.target.closest("a,button,input,textarea")) return;
      const item = event.target.closest<HTMLElement>(".session-widget");
      const row = item?.closest<HTMLElement>(".session-widgets");
      if (!item || !row) return;
      event.stopPropagation();
      const siblings = Array.from(row.children).filter((child): child is HTMLElement => child instanceof HTMLElement).sort((a,b) => Number(a.style.order || 0) - Number(b.style.order || 0));
      const initialX = event.clientX;
      let target = item, moved = false;
      const move = (next: PointerEvent) => {
        if (!moved && Math.abs(next.clientX - initialX) < 6) return;
        moved = true;
        item.classList.add("widget-exchanging");
        document.documentElement.classList.add("widget-exchange-active");
        target = siblings.reduce((nearest, sibling) => {
          const r = sibling.getBoundingClientRect(), n = nearest.getBoundingClientRect();
          return Math.abs(next.clientX - r.left - r.width / 2) < Math.abs(next.clientX - n.left - n.width / 2) ? sibling : nearest;
        }, item);
        siblings.forEach(sibling => sibling.classList.toggle("widget-exchange-target", sibling === target && sibling !== item));
      };
      const end = () => {
        if (moved && target !== item) {
          const from = siblings.indexOf(item), to = siblings.indexOf(target);
          siblings.splice(from, 1); siblings.splice(to, 0, item);
          siblings.forEach((sibling, index) => { sibling.style.order = String(index); });
        }
        siblings.forEach(sibling => sibling.classList.remove("widget-exchanging", "widget-exchange-target"));
        document.documentElement.classList.remove("widget-exchange-active");
        window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); window.removeEventListener("pointercancel", cancel);
        stop = () => {};
      };
      const cancel = () => { moved = false; end(); };
      stop = cancel;
      window.addEventListener("pointermove", move); window.addEventListener("pointerup", end); window.addEventListener("pointercancel", cancel);
    };
    window.addEventListener("pointerdown", start, true);
    return () => { stop(); window.removeEventListener("pointerdown", start, true); };
  }, []);
  return null;
}

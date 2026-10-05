"use client";

import { useEffect, useRef, useState } from "react";
import VectorPet, { type PetAnimal } from "./vector-pet";

type Mark = PetAnimal;
const marks: Mark[] = ["cat", "rabbit", "bear"];

const storageKey = "portfolio-desktop-mark-v1";
const bound = (x: number, y: number) => {
  const dock = document.querySelector(".desktop-dock")?.getBoundingClientRect();
  const position = { x: Math.max(8, Math.min(window.innerWidth - 80, x)), y: Math.max(8, Math.min(window.innerHeight - 84, y)) };
  if (dock && position.x + 72 > dock.left - 8 && position.x < dock.right + 8 && position.y + 76 > dock.top - 8 && position.y < dock.bottom + 8) position.y = Math.max(8, dock.top - 84);
  return position;
};

export default function DesktopMark() {
  const [value, setValue] = useState<{ mark: Mark; x: number; y: number } | null>(null);
  const [choosing, setChoosing] = useState(false);
  const [happy, setHappy] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; initialX: number; initialY: number; moved: boolean } | null>(null);
  const initialized = useRef(false);
  useEffect(() => {
    let saved = { mark: "cat" as Mark, x: window.innerWidth - 76, y: window.innerHeight - 76 };
    try { const data = JSON.parse(localStorage.getItem(storageKey) ?? "null"); if (data && marks.includes(data.mark) && Number.isFinite(data.x) && Number.isFinite(data.y)) saved = data; } catch {}
    setValue({ mark: saved.mark, ...bound(saved.x, saved.y) });
    initialized.current = true;
    const resize = () => setValue(current => current && { mark: current.mark, ...bound(current.x, current.y) });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => { if (value && initialized.current && !drag.current) try { localStorage.setItem(storageKey, JSON.stringify(value)); } catch {} }, [value]);
  useEffect(() => { if (choosing) dialog.current?.querySelector<HTMLButtonElement>("button")?.focus(); }, [choosing]);
  const close = () => { setChoosing(false); button.current?.focus(); };
  if (!value) return null;
  return <>
    <button ref={button} className="desktop-mark" aria-label={`Developer ${value.mark} pet. Drag to move; double-click to choose an animal.`} onDoubleClick={() => setChoosing(true)} style={{ left: value.x, top: value.y }} onClick={() => { if (!drag.current?.moved) setHappy(current => !current); }} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setChoosing(true); } }} onPointerDown={event => { if (event.button !== 0) return; event.stopPropagation(); event.currentTarget.setPointerCapture(event.pointerId); drag.current = { x: event.clientX, y: event.clientY, initialX: value.x, initialY: value.y, moved: false }; }} onPointerMove={event => { const current = drag.current; if (!current) return; const dx = event.clientX - current.x, dy = event.clientY - current.y; if (!current.moved && Math.hypot(dx,dy) < 5) return; current.moved = true; setValue({ mark: value.mark, ...bound(current.initialX + dx, current.initialY + dy) }); }} onPointerUp={event => { drag.current = null; event.currentTarget.releasePointerCapture(event.pointerId); setValue(current => current && { ...current }); }} onPointerCancel={() => { drag.current = null; setValue(current => current && { ...current }); }}><VectorPet happy={happy} animal={value.mark} /></button>
{choosing && <div className="mark-modal-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) close(); }}><div className="mark-modal" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="mark-modal-title" onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); } if (event.key === "Tab") { const options = Array.from(dialog.current?.querySelectorAll<HTMLButtonElement>("button") ?? []); const index = options.indexOf(document.activeElement as HTMLButtonElement); event.preventDefault(); options[(index + (event.shiftKey ? -1 : 1) + options.length) % options.length]?.focus(); } }}><button className="mark-modal-close" aria-label="Close pet chooser" onClick={close}>×</button><h2 id="mark-modal-title">Choose a coding pet</h2><div className="mark-options">{marks.map(mark => <button key={mark} aria-label={mark} aria-pressed={value.mark === mark} onClick={() => { setValue(current => current && { ...current, mark }); close(); }}><VectorPet animal={mark} /><span>{mark}</span></button>)}</div></div></div>}
  </>;
}

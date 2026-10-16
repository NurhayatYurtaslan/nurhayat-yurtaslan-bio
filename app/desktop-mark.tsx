"use client";

import { useEffect, useRef, useState } from "react";
import VectorPet, { type PetAnimal } from "./vector-pet";
import { useSessionThoughts } from "./session-readout";

type Mark = PetAnimal;
const marks: Mark[] = ["penguin", "fox", "panda", "cat", "rabbit", "bear", "dog", "koala"];

const storageKey = "portfolio-desktop-mark-v1";
const codingThoughts = [
  { text: "Turning coffee into code.", code: "const idea = build();" },
  { text: "One tiny refactor…", code: "less code, more clarity" },
  { text: "Checking the edge cases.", code: "if (bugs) fix(bugs);" },
  { text: "Typing something good.", code: "git commit -m 'little wins'" },
  { text: "Giving this function a polish.", code: "return somethingBetter;" },
];
const bound = (x: number, y: number) => {
  const dock = document.querySelector(".desktop-dock")?.getBoundingClientRect();
  const position = { x: Math.max(8, Math.min(window.innerWidth - 120, x)), y: Math.max(8, Math.min(window.innerHeight - 104, y)) };
  if (dock && position.x + 112 > dock.left - 8 && position.x < dock.right + 8 && position.y + 96 > dock.top - 8 && position.y < dock.bottom + 8) position.y = Math.max(8, dock.top - 104);
  return position;
};

export default function DesktopMark({ theme, windows }: { theme: string; windows: number }) {
  const sessionThoughts = useSessionThoughts({ theme, windows });
  const thoughts = useRef(codingThoughts);
  thoughts.current = sessionThoughts.length ? sessionThoughts : codingThoughts;
  const reportIndex = useRef(0);
  const moved = useRef(false);
  const [value, setValue] = useState<{ mark: Mark; x: number; y: number } | null>(null);
  const [choosing, setChoosing] = useState(false);
  const [happy, setHappy] = useState(false);
  const [thought, setThought] = useState<(typeof codingThoughts)[number] | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; initialX: number; initialY: number; moved: boolean } | null>(null);
  const initialized = useRef(false);
  useEffect(() => {
    const randomMark = marks[Math.floor(Math.random() * marks.length)];
    let saved = { mark: randomMark, x: window.innerWidth - 120, y: window.innerHeight - 104 };
    try { const data = JSON.parse(localStorage.getItem(storageKey) ?? "null"); if (data && Number.isFinite(data.x) && Number.isFinite(data.y)) saved = { mark: randomMark, x: data.x, y: data.y }; } catch {}
    setValue({ mark: saved.mark, ...bound(saved.x, saved.y) });
    initialized.current = true;
    const resize = () => setValue(current => current && { mark: current.mark, ...bound(current.x, current.y) });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => { if (value && initialized.current && !drag.current) try { localStorage.setItem(storageKey, JSON.stringify(value)); } catch {} }, [value]);
  useEffect(() => { if (choosing) dialog.current?.querySelector<HTMLButtonElement>("button")?.focus(); }, [choosing]);
  useEffect(() => {
    if (choosing) { setThought(null); return; }
    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      if (!document.hidden && !drag.current) {
        setThought(thoughts.current[reportIndex.current++ % thoughts.current.length]);
      }
      timer = setTimeout(show, 14000);
    };
    timer = setTimeout(show, 2000);
    return () => clearTimeout(timer);
  }, [choosing]);
  useEffect(() => {
    if (!thought) return;
    const hide = setTimeout(() => setThought(null), 10000);
    return () => clearTimeout(hide);
  }, [thought]);
  const close = () => { setChoosing(false); button.current?.focus(); };
  if (!value) return null;
  return <>
    <button ref={button} className="desktop-mark" aria-label={`Developer ${value.mark} pet. Click for live measurements; drag to move; double-click to choose an animal.`} onDoubleClick={() => setChoosing(true)} style={{ left: value.x, top: value.y }} onClick={() => { if (!moved.current) { setHappy(current => !current); setThought(thoughts.current[reportIndex.current++ % thoughts.current.length]); } }} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setChoosing(true); } }} onPointerDown={event => { if (event.button !== 0) return; event.stopPropagation(); moved.current = false; event.currentTarget.setPointerCapture(event.pointerId); drag.current = { x: event.clientX, y: event.clientY, initialX: value.x, initialY: value.y, moved: false }; }} onPointerMove={event => { const current = drag.current; if (!current) return; const dx = event.clientX - current.x, dy = event.clientY - current.y; if (!current.moved && Math.hypot(dx,dy) < 5) return; current.moved = true; setValue({ mark: value.mark, ...bound(current.initialX + dx, current.initialY + dy) }); }} onPointerUp={event => { moved.current = Boolean(drag.current?.moved); drag.current = null; event.currentTarget.releasePointerCapture(event.pointerId); setValue(current => current && { ...current }); }} onPointerCancel={() => { drag.current = null; setValue(current => current && { ...current }); }}><VectorPet happy={happy || Boolean(thought)} animal={value.mark} />{thought && <span className={`pet-speech ${value.y < 110 ? "pet-speech-below" : ""}`} aria-hidden="true" style={{ left: value.x < 100 ? 0 : undefined, right: value.x < 100 ? "auto" : 0 }}><span className="pet-speech-status">{codingThoughts.includes(thought) ? "CODING MODE" : "DESKTOP CHECK"}<span>···</span></span><span>{thought.text}</span><code>{thought.code}</code></span>}</button>
{choosing && <div className="mark-modal-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) close(); }}><div className="glass-card mark-modal" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="mark-modal-title" onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); } if (event.key === "Tab") { const options = Array.from(dialog.current?.querySelectorAll<HTMLButtonElement>("button") ?? []); const index = options.indexOf(document.activeElement as HTMLButtonElement); event.preventDefault(); options[(index + (event.shiftKey ? -1 : 1) + options.length) % options.length]?.focus(); } }}><button className="mark-modal-close" aria-label="Close pet chooser" onClick={close}>×</button><h2 id="mark-modal-title">Choose a coding pet</h2><div className="mark-options">{marks.map(mark => <button key={mark} aria-label={mark} aria-pressed={value.mark === mark} onClick={() => { setValue(current => current && { ...current, mark }); close(); }}><VectorPet animal={mark} /><span>{mark}</span></button>)}</div></div></div>}
  </>;
}

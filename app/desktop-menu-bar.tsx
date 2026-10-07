"use client";

import { useEffect, useRef, useState } from "react";

type Destination = "work" | "writing" | "github" | "about" | "terminal" | "phone";
type Menu = "File" | "View" | "Go";
type MenuItem = { label: string; action: () => void; disabled?: boolean; checked?: boolean };

function IstanbulClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <time className="desktop-menu-clock" dateTime={now?.toISOString()} title="Istanbul · Europe/Istanbul">{now ? new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Istanbul", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now) : "Istanbul"}</time>;
}

export default function DesktopMenuBar({ openWindow, closeWindow, canClose, theme, setTheme, email }: {
  openWindow: (id: Destination) => void;
  closeWindow: () => void;
  canClose: boolean;
  theme: string;
  setTheme: (theme: "neutral" | "ink" | "sand") => void;
  email: string;
}) {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [tip, setTip] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const tipShown = useRef(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closeMenu = () => { setMenu(null); trigger.current?.focus(); };

  useEffect(() => {
    if (!menu) return;
    bar.current?.querySelector<HTMLElement>("[role=menu] button:not(:disabled)")?.focus();
    const outside = (event: PointerEvent) => { if (!bar.current?.contains(event.target as Node)) setMenu(null); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [menu]);
  useEffect(() => {
    if (!tip) return;
    const timer = window.setTimeout(() => setTip(false), 7000);
    return () => window.clearTimeout(timer);
  }, [tip]);

  const items: Record<Menu, MenuItem[]> = {
    File: [
      { label: "Open Work", action: () => openWindow("work") },
      { label: "Open Writing", action: () => openWindow("writing") },
      { label: "Open About", action: () => openWindow("about") },
      { label: "Close Window", action: closeWindow, disabled: !canClose },
    ],
    View: (["neutral", "ink", "sand"] as const).map(value => ({ label: value[0].toUpperCase() + value.slice(1), checked: theme === value, action: () => setTheme(value) })),
    Go: [
      ...([ ["Work", "work"], ["Writing", "writing"], ["GitHub", "github"], ["About", "about"], ["Terminal", "terminal"], ["Phone preview", "phone"] ] as const).map(([label, id]) => ({ label, action: () => openWindow(id) })),
      { label: "Contact", action: () => { window.location.href = `mailto:${email}`; } },
    ],
  };

  return <header className="desktop-topbar" ref={bar} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setMenu(null); }} onKeyDown={event => {
    if (event.key === "Escape" && (menu || tip)) { event.preventDefault(); event.stopPropagation(); setTip(false); closeMenu(); }
    if (menu && ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault(); event.stopPropagation();
      const choices = Array.from(bar.current?.querySelectorAll<HTMLButtonElement>("[role=menu] button:not(:disabled)") ?? []);
      const index = choices.indexOf(document.activeElement as HTMLButtonElement);
      const next = event.key === "Home" ? 0 : event.key === "End" ? choices.length - 1 : (index + (event.key === "ArrowUp" ? -1 : 1) + choices.length) % choices.length;
      choices[next]?.focus();
    }
  }}>
    <strong className="desktop-menu-name">Nurhayat Yurtaslan</strong>
    <nav className="desktop-menu-navigation" aria-label="Desktop menus">
      {(["File", "View", "Go"] as const).map(label => <div className="desktop-menu-group" key={label}>
        <button className="desktop-menu-trigger" aria-expanded={menu === label} aria-haspopup="menu" aria-controls={`desktop-menu-${label.toLowerCase()}`} onClick={event => { trigger.current = event.currentTarget; setMenu(current => current === label ? null : label); }} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); trigger.current = event.currentTarget; setMenu(label); } }}>{label}</button>
        {menu === label && <div className="desktop-menu-popup" role="menu" aria-label={label} id={`desktop-menu-${label.toLowerCase()}`}>{items[label].map(item => <button key={item.label} role={label === "View" ? "menuitemradio" : "menuitem"} aria-checked={label === "View" ? item.checked : undefined} disabled={item.disabled} onClick={() => { closeMenu(); item.action(); }}><span>{item.label}</span>{item.checked && <span aria-hidden="true">✓</span>}</button>)}</div>}
      </div>)}
      <button className="desktop-menu-trigger" aria-expanded={tip} onClick={() => { setMenu(null); if (!tipShown.current) { tipShown.current = true; setTip(true); } }}>Help</button>
    </nav>
    <IstanbulClock />
    {tip && <p className="desktop-menu-tip" role="status">Double-click to open · Space for Quick Look · Esc to close</p>}
  </header>;
}

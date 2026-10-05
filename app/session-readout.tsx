"use client";

import { useEffect, useState } from "react";
import { Timer, Monitor, Wifi, WifiOff, Activity } from "lucide-react";

export default function SessionReadout({ theme, windows }: { theme: string; windows: number }) {
  const [metrics, setMetrics] = useState<{ load?: number; rtt?: number; assets?: number; viewed: number; active: number }>({ viewed: 0, active: 0 });
  useEffect(() => {
    let load: number | undefined;
    let active = 0;
    let last = performance.now();
    let engaged = document.visibilityState === "visible" && document.hasFocus();
    const projects = new Set<string>();
    const measure = () => {
      const now = performance.now();
      if (engaged) active += now - last;
      engaged = document.visibilityState === "visible" && document.hasFocus();
      last = now;
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (load === undefined && navigation && navigation.loadEventEnd > 0) load = Math.round(navigation.loadEventEnd - navigation.startTime);
      const connection = (navigator as Navigator & { connection?: { rtt?: number } }).connection;
      const rtt = connection?.rtt;
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const assets = resources.length ? resources.filter(entry => entry.responseEnd > 0 && (entry.initiatorType === "img" || entry.initiatorType === "script")).length : undefined;
      setMetrics({ load, rtt: typeof rtt === "number" && Number.isFinite(rtt) && rtt >= 0 ? rtt : undefined, assets, viewed: projects.size, active: Math.floor(active / 1000) });
    };
    const view = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== " ") return;
      const element = event.target instanceof Element ? event.target : null;
      const project = element?.closest<HTMLAnchorElement>("a.selected-work-row, a.repo-card, .phone-work a");
      if (project) { projects.add(project.href); measure(); }
    };
    const timer = window.setInterval(measure, 1000);
    document.addEventListener("click", view);
    document.addEventListener("keydown", view);
    document.addEventListener("visibilitychange", measure);
    window.addEventListener("focus", measure);
    window.addEventListener("blur", measure);
    measure();
    return () => { window.clearInterval(timer); document.removeEventListener("click", view); document.removeEventListener("keydown", view); document.removeEventListener("visibilitychange", measure); window.removeEventListener("focus", measure); window.removeEventListener("blur", measure); };
  }, []);
  const [state, setState] = useState<{ elapsed: number; online: boolean; loaded: boolean; width: number; height: number; input: "POINTER" | "KEYBOARD" | null; reduced: boolean } | null>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setState(previous => ({
      elapsed: Math.floor(performance.now() / 1000),
      online: navigator.onLine,
      loaded: document.readyState === "complete",
      width: window.innerWidth,
      height: window.innerHeight,
      input: previous?.input ?? null,
      reduced: motion.matches,
    }));
    const pointer = () => setState(previous => previous && { ...previous, input: "POINTER" });
    const keyboard = () => setState(previous => previous && { ...previous, input: "KEYBOARD" });
    read();
    const timer = window.setInterval(read, 1000);
    window.addEventListener("resize", read);
    window.addEventListener("online", read);
    window.addEventListener("offline", read);
    window.addEventListener("load", read);
    window.addEventListener("pointerdown", pointer);
    window.addEventListener("pointermove", pointer);
    window.addEventListener("keydown", keyboard);
    motion.addEventListener("change", read);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("resize", read);
      window.removeEventListener("online", read);
      window.removeEventListener("offline", read);
      window.removeEventListener("load", read);
      window.removeEventListener("pointerdown", pointer);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("keydown", keyboard);
      motion.removeEventListener("change", read);
    };
  }, []);
  if (!state) return null;
  const duration = [Math.floor(state.elapsed / 3600), Math.floor(state.elapsed / 60) % 60, state.elapsed % 60].map(value => String(value).padStart(2, "0")).join(":");
  return <div className="session-widgets" aria-label="Browser session information">
    <article className="glass-card session-widget session-widget-timer" aria-label="Portfolio session"><header><span className="session-icon"><Timer size={19} strokeWidth={1.5} aria-hidden="true" /></span></header><strong>{duration}</strong><p><span className="session-status-dot" aria-hidden="true" />{state.online ? "ONLINE" : "OFFLINE"} · {state.online ? state.loaded ? "OPERATIONAL" : "LOADING" : "OFFLINE"}</p></article>
    <article className="glass-card session-widget" aria-label="Environment"><header><span className="session-icon"><Monitor size={19} strokeWidth={1.5} aria-hidden="true" /></span></header><strong>{state.width} × {state.height}</strong><div className="session-details"><span>Theme <b>{theme}</b></span><span>Input <b>{state.input ?? "—"}</b></span><span>Motion <b>{state.reduced ? "Reduced" : "On"}</b></span></div></article>
    <article className="glass-card session-widget network-widget" aria-label="Network" data-online={state.online}><header><span className="session-icon">{state.online ? <Wifi size={19} strokeWidth={1.5} aria-hidden="true" /> : <WifiOff size={19} strokeWidth={1.5} aria-hidden="true" />}</span></header><strong>{state.online ? "Online" : "Offline"}</strong><div className="session-details">{metrics.load !== undefined && <span>Load <b>{metrics.load} ms</b></span>}{metrics.rtt !== undefined && <span>RTT <b>{metrics.rtt} ms</b></span>}{metrics.assets !== undefined && <span>Assets <b>{metrics.assets}</b></span>}</div></article>
    <article className="glass-card session-widget" aria-label="Session memory"><header><span className="session-icon"><Activity size={19} strokeWidth={1.5} aria-hidden="true" /></span></header><strong>{Math.floor(metrics.active / 60)}m {metrics.active % 60}s <small>active</small></strong><div className="session-details"><span>Windows <b>{windows}</b></span><span>Viewed <b>{metrics.viewed}</b></span></div></article>
  </div>;
}

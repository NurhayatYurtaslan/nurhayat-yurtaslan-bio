"use client";

import { useEffect, useState } from "react";

export function useSessionThoughts({ theme, windows }: { theme: string; windows: number }) {
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
  if (!state) return [];
  return [
    { text: "I measured your viewport.", code: state.width + " × " + state.height + " px" },
    { text: "I checked the desktop settings.", code: theme + " theme · " + (state.reduced ? "reduced motion" : "motion on") },
    { text: "I checked your connection.", code: (state.online ? "Browser reports online" : "Browser reports offline") + (metrics.rtt !== undefined ? " · estimated RTT " + metrics.rtt + " ms" : "") },
    ...(metrics.load !== undefined ? [{ text: "I timed the page load.", code: metrics.load + " ms · " + (metrics.assets ?? 0) + " image/script resources" }] : []),
    { text: "I counted your active time.", code: Math.floor(metrics.active / 60) + "m " + metrics.active % 60 + "s active · " + windows + " open windows" },
    { text: "I checked this session.", code: Math.floor(state.elapsed / 60) + "m " + state.elapsed % 60 + "s elapsed · " + (state.input?.toLowerCase() ?? "no input yet") },
  ];
}

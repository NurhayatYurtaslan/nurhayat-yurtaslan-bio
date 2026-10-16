"use client";

import { useEffect, useRef, useState } from "react";
import { Github, ArrowUpRight, GitCommitHorizontal, GitPullRequest, Star, CircleDot, FolderGit2 } from "lucide-react";

type Metric = { label: string; value: string };
const metricIcons = [Star, GitCommitHorizontal, GitPullRequest, CircleDot, FolderGit2];

function AnimatedCount({ value }: { value: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const numeric = Number(value.replace(/,/g, "").replace(/[kKmM]$/, ""));
    const suffix = value.match(/[kKmM]$/)?.[0] ?? "";
    const decimals = suffix && value.includes(".") ? 1 : 0;
    const finish = () => { cancelAnimationFrame(frame); setDisplay(value); };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      if (preference.matches || !Number.isFinite(numeric)) { finish(); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1300, 1);
        const amount = numeric * (1 - Math.pow(1 - progress, 3));
        setDisplay(progress === 1 ? value : (decimals ? amount.toFixed(decimals) : Math.round(amount).toLocaleString("en-US")) + suffix);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    if (element.current) observer.observe(element.current);
    preference.addEventListener("change", finish);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener("change", finish); };
  }, [value]);
  return <span ref={element} className="github-counter" aria-label={value}><span aria-hidden="true">{display}</span></span>;
}

function StatisticsCard({ revision }: { revision: number }) {
  const [metrics, setMetrics] = useState<Metric[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/github-cards?kind=stats&format=json&refresh=${revision}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Unavailable"); return response.json(); })
      .then(data => {
        if (!Array.isArray(data.metrics) || data.metrics.length !== 5 || !data.metrics.every((item: Metric) => typeof item.label === "string" && typeof item.value === "string" && /^[\d.,kKmM]+$/.test(item.value))) throw new Error("Invalid statistics");
        setMetrics(data.metrics); setFailed(false);
      })
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [revision]);
  return <article className="github-summary-widget github-infographic" aria-label="GitHub statistics">
    <a className="github-infographic-link" href="https://github.com/NurhayatYurtaslan" target="_blank" rel="noreferrer" aria-label="View Nurhayat Yurtaslan’s GitHub profile">
      <header className="github-info-header"><span><Github size={15} aria-hidden="true" /><strong>GitHub</strong></span><ArrowUpRight size={14} aria-hidden="true" /></header>
      {!metrics ? <p className="github-info-state" role="status">{failed ? "Statistics temporarily unavailable." : "Loading GitHub statistics…"}</p> : <>
        <div className="github-info-hero commit-console"><div className="commit-console-copy"><small>COMMITS</small><strong><AnimatedCount value={metrics[1].value} /></strong><span>Nurhayat Yurtaslan</span></div><div className="commit-stream" aria-hidden="true"><svg viewBox="0 0 150 64"><path className="commit-stream-rail" d="M4 32h142M20 9h32c22 0 22 23 44 23M20 55h32c22 0 22-23 44-23" /><path className="commit-stream-signal" d="M4 32h142" /><circle className="commit-stream-halo" cx="106" cy="32" r="16" /><circle className="commit-stream-hub" cx="106" cy="32" r="7" /><circle className="commit-stream-node" cx="32" cy="9" r="3" /><circle className="commit-stream-node" cx="55" cy="32" r="3" /><circle className="commit-stream-node" cx="32" cy="55" r="3" /></svg><i className="commit-packet commit-packet-top" /><i className="commit-packet commit-packet-bottom" /></div></div>
        <dl className="github-info-metrics">{metrics.map((metric, index) => {
          if (index === 1) return null;
          const Icon = metricIcons[index];
          return <div key={metric.label} className={`github-info-metric github-info-metric-${index}`}><span className="github-info-icon"><Icon size={14} strokeWidth={1.7} aria-hidden="true" /></span><div><dt>{index === 4 ? "Contributed repos" : metric.label}</dt><dd><AnimatedCount value={metric.value} /></dd></div></div>;
        })}</dl>
        {failed && <small className="github-info-stale">Update unavailable · showing last loaded values</small>}
      </>}
    </a>
  </article>;
}

function SummaryCard({ kind, title, revision }: { kind: string; title: string; revision: number }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const check = () => {
      const current = image.current;
      if (current?.complete) {
        if (current.naturalWidth > 0) { setLoaded(true); setFailed(false); }
        else setFailed(true);
      }
    };
    check();
    const timeout = setTimeout(() => {
      check();
      if (!image.current?.complete) setFailed(true);
    }, 15000);
    return () => clearTimeout(timeout);
  }, [revision]);
return <article className="github-summary-widget" aria-label={title}>{failed ? <p className="summary-unavailable">Temporarily unavailable.</p> : <>{!loaded && <p className="summary-unavailable">Loading.</p>}<a href="https://github.com/NurhayatYurtaslan#statistic" target="_blank" rel="noreferrer" aria-label={`View ${title}`}><img ref={image} style={{ display: loaded ? "block" : "none" }} src={`/api/github-cards?kind=${kind}&refresh=${revision}`} alt={title + " for Nurhayat Yurtaslan"} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} /></a></>}</article>;
}
export default function GitHubSummaryWidgets({ mode = "languages" }: { mode?: "stats" | "languages" }) {
  const [revision, setRevision] = useState(0);
  useEffect(() => { const timer = setInterval(() => { if (document.visibilityState === "visible") setRevision(current => current + 1); }, 300000); return () => clearInterval(timer); }, []);
  return <div className={`github-summary-widgets github-summary-${mode}`}>{mode === "stats" ? <StatisticsCard revision={revision} /> : <><SummaryCard key={`commit-${revision}`} revision={revision} kind="most-commit-language" title="Languages by commit" /><SummaryCard key={`repo-${revision}`} revision={revision} kind="repos-per-language" title="Languages by repository" /></>}</div>;
}

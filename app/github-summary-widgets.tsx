"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";

function SummaryCard({ kind, title, revision }: { kind: string; title: string; revision: number }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return <article className="glass-card github-summary-widget"><header><Github size={14} /><h3 className="widget-label">{title}</h3></header>{failed ? <p className="summary-unavailable">Temporarily unavailable.</p> : <>{!loaded && <p className="summary-unavailable">Loading.</p>}<a href="https://github.com/NurhayatYurtaslan#statistic" target="_blank" rel="noreferrer" aria-label={`View ${title}`}><img style={{ display: loaded ? "block" : "none" }} src={`/api/github-cards?kind=${kind}&refresh=${revision}`} alt={title + " for Nurhayat Yurtaslan"} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} /></a></>}</article>;
}
export default function GitHubSummaryWidgets() {
  const [revision, setRevision] = useState(0);
  useEffect(() => { const timer = setInterval(() => { if (document.visibilityState === "visible") setRevision(current => current + 1); }, 300000); return () => clearInterval(timer); }, []);
  return <div className="github-summary-widgets"><SummaryCard key={`stats-${revision}`} revision={revision} kind="stats" title="GitHub statistics" /><SummaryCard key={`commit-${revision}`} revision={revision} kind="most-commit-language" title="Languages by commit" /><SummaryCard key={`repo-${revision}`} revision={revision} kind="repos-per-language" title="Languages by repository" /></div>;
}

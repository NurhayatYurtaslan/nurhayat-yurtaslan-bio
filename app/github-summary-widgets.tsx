"use client";

import { useEffect, useRef, useState } from "react";

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
  return <div className={`github-summary-widgets github-summary-${mode}`}>{mode === "stats" ? <SummaryCard key={`stats-${revision}`} revision={revision} kind="stats" title="GitHub statistics" /> : <><SummaryCard key={`commit-${revision}`} revision={revision} kind="most-commit-language" title="Languages by commit" /><SummaryCard key={`repo-${revision}`} revision={revision} kind="repos-per-language" title="Languages by repository" /></>}</div>;
}

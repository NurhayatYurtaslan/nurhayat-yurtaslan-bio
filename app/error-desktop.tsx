"use client";

import Link from "next/link";
import Home from "./page";

export default function ErrorDesktop({ missing = false, reset }: { missing?: boolean; reset?: () => void }) {
  return <div className="error-desktop">
    <div className="error-desktop-background" inert aria-hidden="true"><Home /></div>
    <div className="error-desktop-overlay">
      <section className="terminal-window error-terminal glass-card" role="alert" aria-labelledby="error-terminal-title">
        <div className="window-bar"><div className="error-window-lights" aria-hidden="true"><i /><i /><i /></div><span>Terminal · System</span></div>
        <div className="terminal-content"><span className="widget-label">{missing ? "PAGE NOT FOUND" : "APPLICATION ERROR"}</span><h1 id="error-terminal-title">{missing ? "404 Not Found" : "Application error"}</h1><p>{missing ? "This page is not on the system." : "This screen could not be loaded."}</p><div className="error-terminal-actions">{reset && <button onClick={reset}>Try again</button>}<Link href="/">Back home</Link></div></div>
      </section>
    </div>
  </div>;
}

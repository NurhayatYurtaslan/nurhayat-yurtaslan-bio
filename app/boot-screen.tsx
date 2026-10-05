"use client";

import { useEffect, useState } from "react";

export default function BootScreen() {
  const [booting, setBooting] = useState(false);
  useEffect(() => {
    // No minimum duration: a ready document never shows a boot overlay.
    if (document.readyState === "complete") return;
    setBooting(true);
    const ready = () => setBooting(false);
    window.addEventListener("load", ready, { once: true });
    return () => window.removeEventListener("load", ready);
  }, []);
  if (!booting) return null;
  return <div className="boot-screen" role="status" aria-label="NURHAYAT.OS. Agentic AI Developer | Mobile Engineer. System ready.">
    <div className="boot-copy" aria-hidden="true"><p>NURHAYAT.OS</p><p>Agentic AI Developer | Mobile Engineer</p><p>System ready.</p></div>
  </div>;
}

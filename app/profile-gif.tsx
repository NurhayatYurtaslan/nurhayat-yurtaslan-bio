"use client";

import { useState } from "react";

export default function ProfileGif() {
  const [failed, setFailed] = useState(false);
  return <article className="glass-card profile-gif-widget" aria-label="GitHub profile animation">{failed ? <p>Animation unavailable.</p> : <picture><source media="(prefers-reduced-motion: reduce)" srcSet="https://media.giphy.com/media/QDjpIL6oNCVZ4qzGs7/giphy_s.gif" /><img src="https://i.giphy.com/media/QDjpIL6oNCVZ4qzGs7/giphy.webp" alt="Animated penguin working at a computer, from Nurhayat’s GitHub profile" width="128" height="128" onError={() => setFailed(true)} /></picture>}</article>;
}

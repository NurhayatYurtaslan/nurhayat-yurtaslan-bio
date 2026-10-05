/** Original SVG family: lost, disconnected, empty, and interrupted. */
export default function StateRobot({ mood = "lost" }: { mood?: "lost" | "offline" | "empty" | "error" }) {
  return <svg className={`state-robot state-robot-${mood}`} viewBox="0 0 280 260" fill="none" aria-hidden="true">
    <ellipse cx="140" cy="239" rx="76" ry="8" fill="currentColor" opacity=".06" />
    <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M140 51v-22" /><circle cx="140" cy="23" r="6" fill="var(--robot-accent, #a7bed0)" />
      <rect x="61" y="55" width="158" height="110" rx="32" fill="var(--window-surface, #f8f8f7)" />
      <rect x="76" y="70" width="128" height="79" rx="23" fill="var(--robot-accent, #a7bed0)" fillOpacity=".3" />
      <path d="M61 96H48v26h13m158-26h13v26h-13" />
      {mood === "error" ? <><path d="m101 97 12 12m0-12-12 12m54-12 12 12m0-12-12 12" /><path d="m122 128 9-5 9 5 9-5 9 5" /></> : mood === "empty" ? <><circle cx="107" cy="103" r="5" /><circle cx="163" cy="103" r="5" /><path d="M128 126h24" /></> : <><path d="m98 104 17-6m43 0 17 6M122 132q18-17 36 0" /></>}
      <path d="M117 165v12m46-12v12" />
      <rect x="95" y="177" width="90" height="44" rx="16" fill="var(--window-surface, #f8f8f7)" />
      <path d="m95 188-21 17m111-17 21 17M118 221v13h-20m64-13v13h20" />
      <circle cx="140" cy="198" r="7" fill="var(--robot-accent, #a7bed0)" />
      {mood === "offline" && <><path d="M242 171v14m0 10v1m-8-32q8-8 16 0M228 156q14-14 28 0" /></>}
      {mood === "lost" && <><path d="M239 53q0-9 8-9t8 8q0 7-8 10v5m0 8v1" /><path d="m31 171 13 4-6 13-13-4z" opacity=".4" /></>}
      {mood === "empty" && <path d="M232 179h23v21h-23zM238 184h11" opacity=".4" />}
    </g>
  </svg>;
}

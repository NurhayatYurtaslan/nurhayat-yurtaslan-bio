import { useId } from "react";

export type PetAnimal = "cat" | "rabbit" | "bear" | "penguin" | "fox" | "panda" | "dog" | "koala";
const palettes: Record<PetAnimal, { coat: string; shade: string; cream: string; accent: string }> = {
  penguin: { coat: "#547f9e", shade: "#28485f", cream: "#fff5db", accent: "#bba0dd" },
  fox: { coat: "#edac69", shade: "#b96e42", cream: "#fff1d6", accent: "#8cb5a4" },
  panda: { coat: "#f2eee2", shade: "#3c4556", cream: "#fff9eb", accent: "#d5a17e" },
  cat: { coat: "#f0c88e", shade: "#bd8b5d", cream: "#fff1d5", accent: "#8ca9ce" },
  rabbit: { coat: "#eee3e3", shade: "#bfa6b5", cream: "#fff9ef", accent: "#b6acd6" },
  bear: { coat: "#bc8866", shade: "#855e4c", cream: "#f8dfb4", accent: "#93b6a0" },
  dog: { coat: "#e8d0a2", shade: "#996e54", cream: "#fff7df", accent: "#d08a84" },
  koala: { coat: "#a9bdc4", shade: "#718795", cream: "#ecf1e5", accent: "#d4b482" },
};

export default function VectorPet({ happy = false, animal = "penguin" }: { happy?: boolean; animal?: PetAnimal }) {
  const id = useId().replace(/:/g, "");
  const p = palettes[animal];
  return <svg className={`vector-pet studio-pet pet-${animal} ${happy ? "pet-happy" : ""}`} viewBox="0 0 160 132" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-fur`} x1="20" y1="30" x2="91" y2="111" gradientUnits="userSpaceOnUse"><stop stopColor={p.coat} /><stop offset="1" stopColor={p.shade} /></linearGradient>
      <linearGradient id={`${id}-screen`} x1="103" y1="41" x2="146" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="#344f5c" /><stop offset="1" stopColor="#1a2939" /></linearGradient>
      <clipPath id={`${id}-clip`}><path d="m105 49 35 5-3 29-35-5Z" /></clipPath>
    </defs>
    <ellipse cx="83" cy="123" rx="65" ry="5" fill="#1c2831" opacity=".12" />
    <g stroke="#364755" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 100v19m37-17v17" stroke={p.shade} strokeWidth="4" />
      <path d="M28 100h45" stroke={p.accent} strokeWidth="7" />
      {animal === "fox" && <path className="studio-tail" d="M34 107C1 117 5 74 30 82q-11 10 4 25Z" fill={p.coat} />}
      {animal === "fox" && <path d="M15 85q-12 7-4 19l9-7Z" fill={p.cream} stroke="none" />}
      {animal === "cat" && <path className="studio-tail" d="M31 106C7 113 6 93 13 90s12 1 7 7" stroke={p.shade} strokeWidth="8" />}
      {animal === "dog" && <path className="studio-tail" d="m31 105-14-8" stroke={p.shade} strokeWidth="7" />}
      <g className="studio-character">
        <path d="M32 72q-9 19 0 35h39q12-16 1-35Z" fill={`url(#${id}-fur)`} />
        <ellipse cx="59" cy="91" rx="17" ry="19" fill={p.cream} stroke="none" />
        {animal === "penguin" ? <>
          <path d="M23 57q-3-35 25-36 33-2 37 35l-1 17q-4 15-29 14-31 0-32-30Z" fill={`url(#${id}-fur)`} />
          <path d="M36 58q-3-22 11-23 10-1 14 10 8-12 16-3 8 10 4 28-3 13-23 11-23-1-22-23Z" fill={p.cream} stroke="none" />
          <path d="m76 60 14 5-13 6" fill="#e9b253" />
          <path d="m44 24 8-7 5 7" fill={p.coat} />
        </> : animal === "fox" ? <>
          <path d="m24 47 0-28 24 15 15-2 18-18 1 35q11 11 1 26-8 12-33 8-26-4-26-36Z" fill={p.coat} />
          <path d="m29 28 12 10-11 4m43-18-9 14 11-2" fill="#d88774" stroke="none" />
          <path d="M25 56q13 0 31 13l29-13q1 25-29 25T25 56Z" fill={p.cream} stroke="none" />
          <path d="m77 64 12 2-10 6" fill={p.shade} />
        </> : animal === "panda" ? <>
          <circle cx="31" cy="32" r="12" fill={p.shade} /><circle cx="76" cy="33" r="11" fill={p.shade} />
          <ellipse cx="55" cy="56" rx="30" ry="28" fill={p.coat} />
          <ellipse cx="49" cy="54" rx="10" ry="13" fill={p.shade} transform="rotate(17 49 54)" />
          <ellipse cx="74" cy="54" rx="7" ry="10" fill={p.shade} />
          <ellipse cx="69" cy="70" rx="13" ry="8" fill={p.cream} stroke="none" />
        </> : animal === "cat" ? <>
          <path d="m25 48 1-28 23 15h15l17-16 1 31q9 18-4 28-14 12-36 3-23-8-17-33Z" fill={p.coat} />
          <path d="m31 29 10 10-11 1m45-12-8 11 10-1" fill="#d89890" stroke="none" />
          <path d="m48 35 3 9m8-9 2 8M28 53l10 3m-9 7 9-1" stroke={p.shade} strokeWidth="3" />
          <ellipse cx="69" cy="70" rx="14" ry="9" fill={p.cream} stroke="none" />
        </> : animal === "rabbit" ? <>
          <path d="M38 40C13 2 34-9 47 36M58 35C55-3 80-2 70 39" fill={p.coat} strokeWidth="2" />
          <path d="M38 14 44 32m23-19-3 18" stroke="#dca9b6" strokeWidth="5" />
          <ellipse cx="55" cy="58" rx="29" ry="25" fill={p.coat} /><ellipse cx="72" cy="70" rx="14" ry="9" fill={p.cream} stroke="none" />
        </> : animal === "bear" ? <>
          <circle cx="30" cy="33" r="11" fill={p.coat} /><circle cx="76" cy="34" r="10" fill={p.coat} />
          <circle cx="30" cy="33" r="5" fill={p.cream} stroke="none" /><circle cx="76" cy="34" r="4" fill={p.cream} stroke="none" />
          <ellipse cx="54" cy="57" rx="31" ry="28" fill={p.coat} /><ellipse cx="68" cy="69" rx="16" ry="12" fill={p.cream} stroke="none" />
        </> : animal === "dog" ? <>
          <ellipse cx="55" cy="54" rx="29" ry="27" fill={p.coat} />
          <path d="M33 33q-22-5-16 32 2 16 13 12 9-4 3-44Z" fill={p.shade} />
          <path d="M52 29h10l5 31H51Z" fill={p.cream} stroke="none" />
          <ellipse cx="77" cy="67" rx="15" ry="12" fill={p.cream} /><ellipse cx="85" cy="63" rx="5" ry="4" fill={p.shade} />
        </> : <>
          <circle cx="27" cy="40" r="17" fill={p.coat} /><circle cx="79" cy="38" r="14" fill={p.coat} />
          <circle cx="27" cy="40" r="11" fill="#e8d8df" stroke="none" /><circle cx="79" cy="38" r="8" fill="#e8d8df" stroke="none" />
          <ellipse cx="55" cy="59" rx="29" ry="26" fill={p.coat} /><ellipse cx="75" cy="63" rx="7" ry="10" fill="#36424a" />
          <path d="m42 33 5-4 4 4 4-5 5 5" fill={p.coat} />
        </>}
        <ellipse cx="41" cy="67" rx="5" ry="3" fill="#e6a4ad" opacity=".6" stroke="none" />
        <g className="studio-eyes">
          <ellipse cx="52" cy="54" rx="3.6" ry={happy ? 3 : 5} fill="#273744" stroke="none" />
          <ellipse cx="74" cy="54" rx="2.6" ry={happy ? 2.8 : 4.2} fill="#273744" stroke="none" />
          <circle cx="53" cy="52" r="1.4" fill="#fff" stroke="none" /><circle cx="75" cy="52" r="1" fill="#fff" stroke="none" />
        </g>
        {!["penguin", "koala", "dog"].includes(animal) && <path d="m68 64 5 1-3 3m0 0q-1 7-6 4" stroke={p.shade} />}
        {animal === "dog" && <path d="M81 72q-2 5-7 2" />}
        <path d="M30 83q12 8 23-1l7 6q-15 12-30 2Z" fill={p.accent} stroke="none" />
        {animal === "penguin" && <path d="m40 85-4 12 9-1 1-9" fill={p.accent} stroke="none" />}
      </g>
      <path d="M30 113h119" stroke="#879291" strokeWidth="3" />
      <path d="M40 115v9m101-9v9" stroke="#879291" strokeWidth="2" />
      <path d="m101 42 45 6-4 43-45-6Z" fill="#697a84" />
      <path d="m105 49 35 5-3 29-35-5Z" fill={`url(#${id}-screen)`} stroke="none" />
      <g clipPath={`url(#${id}-clip)`} strokeWidth="2">
        <g className="studio-code-lines">
          <path d="m108 55 7 1m-7 5 13 2m-9 4 18 3m-23 2 9 2m-9 4 20 3" stroke="#9bd4bb" />
          <path d="m119 57 13 2m-7 5 10 1m-15 10 13 2" stroke="#c1a6de" />
          <path d="m108 85 12 2m-12 4 21 3" stroke="#9bd4bb" />
        </g>
      </g>
      <circle cx="140" cy="87" r="1.2" fill="#b2dbc6" stroke="none" />
      <path d="m117 89-2 12 14 2m-22 0 28 4" stroke="#879ba6" strokeWidth="3" />
      <path d="m62 99 38 4 7 7-44-4Z" fill="#aabac4" />
      <g stroke="#526a78" strokeWidth="1"><path d="m68 101 28 3m-27 0 28 3m-23-6 1 3m5-2 1 3m5-2 1 3m5-2 1 3" /></g>
      <g className="studio-paw studio-paw-back"><path d="M65 84q10 3 18 14" stroke={p.shade} strokeWidth="8" /><ellipse cx="84" cy="99" rx="7" ry="4" fill={p.cream} /></g>
      <g className="studio-paw studio-paw-front"><path d="M55 89q4 8 13 11" stroke={p.coat} strokeWidth="9" /><ellipse cx="71" cy="102" rx="7" ry="4" fill={p.cream} /></g>
    </g>
  </svg>;
}

import { useId } from "react";

export type PetAnimal = "cat" | "rabbit" | "bear" | "penguin" | "fox" | "panda" | "dog" | "koala";
const colors: Record<PetAnimal, { fur: string; dark: string; face: string; sweater: string }> = {
  penguin: { fur: "#416a88", dark: "#294b64", face: "#fff5d9", sweater: "#baa2d4" },
  fox: { fur: "#e7a36b", dark: "#b96f48", face: "#fff0d9", sweater: "#85afa1" },
  panda: { fur: "#f5efdf", dark: "#3d4a5b", face: "#fff8eb", sweater: "#c6a47f" },
  cat: { fur: "#efcb91", dark: "#b58957", face: "#fff1d4", sweater: "#90a9cf" },
  rabbit: { fur: "#e9dfe9", dark: "#b39bad", face: "#fff7ed", sweater: "#b7a9d1" },
  bear: { fur: "#bc8966", dark: "#825e4b", face: "#f4dcba", sweater: "#91b4a0" },
  dog: { fur: "#e9d3aa", dark: "#99755c", face: "#fff3dc", sweater: "#cc9390" },
  koala: { fur: "#a5bcc6", dark: "#6e8895", face: "#e6ece9", sweater: "#d0b584" },
};

export default function VectorPet({ happy = false, animal = "penguin" }: { happy?: boolean; animal?: PetAnimal }) {
  const id = useId().replace(/:/g, "");
  const c = colors[animal];
  const roundEars = ["bear", "panda", "koala"].includes(animal);
  return <svg className={`vector-pet studio-pet pet-${animal} ${happy ? "pet-happy" : ""}`} viewBox="0 0 160 140" fill="none" aria-hidden="true">
    <defs><clipPath id={`${id}-display`}><rect x="108" y="54" width="35" height="30" rx="2" /></clipPath></defs>
    <ellipse cx="82" cy="130" rx="64" ry="4" fill="#26384a" opacity=".1" />
    <g stroke="#455866" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {animal === "cat" && <path d="M34 111C9 116 8 92 17 91q9-1 7 7" stroke={c.dark} strokeWidth="7" />}
      {animal === "fox" && <><path d="M36 112C8 122 7 95 22 88q-2 16 14 24Z" fill={c.fur} /><path d="M13 103q-2-10 9-15l-2 14Z" fill={c.face} stroke="none" /></>}
      <rect x="29" y="108" width="43" height="7" rx="3" fill={c.dark} stroke="none" />
      <path d="M35 115v12m31-12v12" stroke={c.dark} strokeWidth="3" />
      <path d="M36 81q-11 12-7 26 2 9 16 9h25q9-5 8-14L73 83Z" fill={animal === "penguin" ? c.fur : c.sweater} />
      {animal === "penguin" && <ellipse cx="56" cy="101" rx="17" ry="14" fill={c.face} stroke="none" />}
      <path d="M34 98v10q0 5 8 5h26" stroke={c.dark} opacity=".3" />
      <ellipse cx="41" cy="117" rx="10" ry="5" fill={animal === "penguin" ? "#eab058" : c.fur} />
      <ellipse cx="66" cy="117" rx="10" ry="5" fill={animal === "penguin" ? "#eab058" : c.fur} />
      {roundEars && <><circle cx="31" cy="35" r={animal === "koala" ? 14 : 10} fill={animal === "panda" ? c.dark : c.fur} /><circle cx="82" cy="35" r={animal === "koala" ? 14 : 10} fill={animal === "panda" ? c.dark : c.fur} />{animal !== "panda" && <><circle cx="31" cy="35" r={animal === "koala" ? 8 : 5} fill={c.face} stroke="none" /><circle cx="82" cy="35" r={animal === "koala" ? 8 : 5} fill={c.face} stroke="none" /></>}</>}
      {animal === "rabbit" && <><path d="M37 38C23 11 29 1 35 7q9 9 12 28Z" fill={c.fur} /><path d="M62 35C63 6 73 0 77 9q4 13-5 30Z" fill={c.fur} /><path d="m34 14 6 18m32-18-5 18" stroke="#d5acbe" strokeWidth="4" /></>}
      {["cat", "fox"].includes(animal) && <><path d="m29 47-2-27 25 15m15 0 21-17-1 32" fill={c.fur} /><path d="m33 29 12 9-11 2m46-12-10 11 11 1" fill="#d59c95" stroke="none" /></>}
      <path d="M26 58c0-19 12-28 30-28 22 0 34 11 34 30v6c0 17-15 25-32 25S26 82 26 66Z" fill={c.fur} />
      {animal === "penguin" && <><path d="M33 61c0-12 5-20 13-20 6 0 10 4 13 10 3-6 7-10 13-10 8 0 13 8 13 20v6c0 13-11 19-26 19S33 80 33 67Z" fill={c.face} stroke="none" /><path d="M46 32q1-9 9-8l-2 6q7-5 10 1" fill={c.fur} stroke={c.fur} /></>}
      {animal === "fox" && <path d="M27 61q17 1 32 14 15-14 30-14-1 25-29 26-29-1-33-26Z" fill={c.face} stroke="none" />}
      {animal === "cat" && <><path d="m45 34 3 8m8-9 1 8M28 58l9 2m-9 6 9-1" stroke={c.dark} strokeWidth="2.5" /><ellipse cx="64" cy="74" rx="18" ry="11" fill={c.face} stroke="none" /></>}
      {animal === "panda" && <><ellipse cx="48" cy="58" rx="10" ry="12" fill={c.dark} stroke="none" /><ellipse cx="73" cy="58" rx="8" ry="11" fill={c.dark} stroke="none" /></>}
      {animal === "dog" && <><path d="M35 36q-21-5-18 23 1 18 12 17 10-1 6-40Z" fill={c.dark} /><path d="M58 31h8l3 33H55Z" fill={c.face} stroke="none" /><ellipse cx="66" cy="74" rx="18" ry="12" fill={c.face} stroke="none" /></>}
      {["bear", "rabbit"].includes(animal) && <ellipse cx="65" cy="74" rx="17" ry="11" fill={c.face} stroke="none" />}
      <ellipse cx="39" cy="70" rx="5" ry="2.5" fill="#dc9eaa" opacity=".6" stroke="none" />
      <g className="studio-eyes">
        {animal === "panda" && <><ellipse cx="50" cy="58" rx="5" ry="6" fill={c.face} stroke="none" /><ellipse cx="74" cy="58" rx="4" ry="5" fill={c.face} stroke="none" /></>}
        <ellipse cx="51" cy="58" rx="3" ry={happy ? 3 : 4} fill="#293d4b" stroke="none" />
        <ellipse cx="75" cy="58" rx="2.5" ry={happy ? 2.5 : 3.5} fill="#293d4b" stroke="none" />
        <circle cx="52" cy="56.5" r="1" fill="white" stroke="none" /><circle cx="76" cy="57" r=".8" fill="white" stroke="none" />
      </g>
      {animal === "penguin" ? <path d="M57 69q6-4 12 0l-6 6Z" fill="#eab058" stroke="#cc9142" strokeWidth=".7" /> : animal === "koala" ? <ellipse cx="65" cy="72" rx="6" ry="8" fill={c.dark} stroke="none" /> : <><path d="m61 69 7 0-3.5 4Z" fill={c.dark} stroke="none" /><path d="M64.5 73v3q-4 4-7 0m7 0q3 4 6 0" stroke={c.dark} strokeWidth="1" /></>}
      {animal === "penguin" && <><path d="M36 86q15 8 35 0" stroke={c.sweater} strokeWidth="6" /><path d="m43 90-2 12 7-2 1-9" fill={c.sweater} stroke="none" /></>}
      <path d="M44 91q12 7 24-1" stroke={c.face} strokeWidth="2" opacity=".65" />
      <rect x="104" y="48" width="43" height="42" rx="4" fill="#728894" />
      <rect x="108" y="54" width="35" height="30" rx="2" fill="#233b4b" stroke="none" />
      <g clipPath={`url(#${id}-display)`} strokeWidth="2">
        <g className="studio-code-lines"><path d="M112 60h7m-7 5h17m-13 5h19m-23 5h9m-5 5h19m-23 5h12m-8 5h18" stroke="#9bdbba" /><path d="M123 60h13m-3 5h5m-13 10h11m-8 10h9" stroke="#b8a6df" /></g>
      </g>
      <path d="M125 91v12m-10 0h20" stroke="#728894" strokeWidth="3" />
      <path d="m66 104 34 0 8 8H65Z" fill="#c1ced3" />
      <path d="M71 107h24m-23 3h26m-20-4v4m6-4v4m6-4v4" stroke="#6d8592" strokeWidth=".9" />
      <path d="M62 90q11 1 20 14" stroke={c.fur} strokeWidth="9" />
      <path d="M46 96q10 8 23 11" stroke={c.fur} strokeWidth="10" />
      <g className="studio-paw-back"><ellipse className="studio-fingers" cx="84" cy="105" rx="6" ry="3.5" fill={c.face} /></g>
      <g className="studio-paw-front"><ellipse className="studio-fingers" cx="72" cy="108" rx="6" ry="3.5" fill={c.face} /></g>
      <rect x="22" y="115" width="130" height="5" rx="2.5" fill="#8c9fa8" stroke="none" />
      <path d="M30 121v7m114-7v7" stroke="#8c9fa8" strokeWidth="3" />
    </g>
  </svg>;
}

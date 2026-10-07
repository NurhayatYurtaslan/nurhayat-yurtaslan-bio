import { useId } from "react";

export type PetAnimal = "cat" | "rabbit" | "bear" | "penguin" | "fox" | "panda";
export default function VectorPet({ happy = false, animal = "penguin" }: { happy?: boolean; animal?: PetAnimal }) {
  const id = useId().replace(/:/g, "");
  return <svg className={`vector-pet ${happy ? "pet-happy" : ""}`} viewBox="0 0 96 100" fill="none" aria-hidden="true">
    <defs><linearGradient id={`${id}-coat`} x1="22" y1="24" x2="74" y2="86" gradientUnits="userSpaceOnUse"><stop stopColor="#536b80" /><stop offset=".55" stopColor="#293e52" /><stop offset="1" stopColor="#182c3e" /></linearGradient><linearGradient id={`${id}-laptop`} x1="31" y1="70" x2="66" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="#596877" /><stop offset="1" stopColor="#273442" /></linearGradient></defs>
    <ellipse cx="48" cy="93" rx="25" ry="3" fill="#20242b" opacity=".12" />
    <g className="pet-body" stroke="#354454" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {animal === "cat" && <path className="pet-tail" d="M70 78c18 1 21-19 11-23-7-3-10 4-6 7" stroke="#a2bace" strokeWidth="7" />}
      <path d="M28 65q-4 13 2 23h35q6-13 1-23" fill="#bdd0df" />
      {animal === "penguin" ? <><ellipse cx="48" cy="57" rx="29" ry="33" fill={`url(#${id}-coat)`} /><path d="M26 70q-12-5-9-18m53 18q12-5 9-18" stroke="#354c63" strokeWidth="7" /><path d="M26 52q0-18 13-18 6 0 9 7 3-7 9-7 13 0 13 18v14q0 14-22 14T26 66Z" fill="#f6f4eb" stroke="none" /><path d="m29 89-6 3h15m29-3 6 3H58" stroke="#efa64e" strokeWidth="4" /></> : animal === "fox" ? <><path d="m24 43-2-24 22 14h8l22-14-2 24q10 23-24 32-34-9-24-32Z" fill="#e6a16e" /><path d="m27 27 10 9-10 4m42-13-10 9 10 4" fill="#f3d1bc" stroke="none" /><path d="M22 49q13-3 26 10 13-13 26-10-4 20-26 26-22-6-26-26Z" fill="#fff3e6" stroke="none" /></> : animal === "panda" ? <><circle cx="27" cy="32" r="10" fill="#35404c" /><circle cx="69" cy="32" r="10" fill="#35404c" /><ellipse cx="48" cy="50" rx="28" ry="25" fill="#f6f5ef" /><ellipse cx="38" cy="49" rx="9" ry="11" fill="#35404c" transform="rotate(20 38 49)" /><ellipse cx="59" cy="49" rx="9" ry="11" fill="#35404c" transform="rotate(-20 59 49)" /></> : animal === "cat" ? <><path d="M24 42 23 15l20 15h12l18-15-1 27q9 10 2 22-7 12-26 12T22 64q-6-12 2-22Z" fill="#d9e5ed" /><path d="m28 24 9 9-9 4m38-13-8 9 9 4" fill="#cfb3b3" stroke="none" /></> : <>
        {animal === "rabbit" ? <><ellipse cx="35" cy="23" rx="7" ry="20" fill="#eee5df" /><ellipse cx="61" cy="23" rx="7" ry="20" fill="#eee5df" /><path d="M35 10v20m26-20v20" stroke="#d7b5bc" strokeWidth="4" /></> : <><circle cx="27" cy="32" r="10" fill="#bc9d83" /><circle cx="69" cy="32" r="10" fill="#bc9d83" /></>}
        <ellipse cx="48" cy="50" rx="28" ry="25" fill={animal === "rabbit" ? "#eee5df" : "#bc9d83"} />
      </>}
      {!["penguin", "fox", "panda"].includes(animal) && <path d="M29 51q0-12 19-12t20 12q0 13-20 13T29 51Z" fill="#fafafa" stroke="none" />}
      <ellipse cx="32" cy="57" rx="4" ry="2.5" fill="#e9b5bd" stroke="none" opacity=".75" />
      <ellipse cx="65" cy="57" rx="4" ry="2.5" fill="#e9b5bd" stroke="none" opacity=".75" />
      <g className="pet-eyes"><ellipse cx="39" cy="50" rx="3.2" ry="4" fill="#303844" stroke="none" /><ellipse cx="58" cy="50" rx="3.2" ry="4" fill="#303844" stroke="none" /><circle cx="38" cy="48.5" r="1.1" fill="white" stroke="none" /><circle cx="57" cy="48.5" r="1.1" fill="white" stroke="none" /></g>
      {animal === "penguin" ? <path d="m42 57 6 6 6-6-6-3Z" fill="#efa64e" /> : <path d={happy ? "M41 57q7 9 14 0" : "m46 56 2 1.5 2-1.5m-2 1.5q-3 6-6 2m6-2q3 6 6 2"} />}
      {["cat", "rabbit", "fox"].includes(animal) && <path d="m22 54-9-2m10 7-9 2m59-7 9-2m-9 7 9 2" strokeWidth="1.2" />}
      <rect x="31" y="71" width="34" height="19" rx="4" fill={`url(#${id}-laptop)`} stroke="#718393" />
      <path d="M35 73h26" stroke="#b2c4d2" strokeOpacity=".45" />
      <path className="pet-code" d="m38 77 3 2-3 2m8-4-2 6m6-6 3 2-3 2m-6 4h10" stroke="#b8e6dc" strokeWidth="1.3" />
      <path d="M28 90h40l-3 2H31Z" fill="#a8b8c5" stroke="#657b8d" />
      <ellipse className="pet-paw pet-paw-left" cx="31" cy="85" rx="5" ry="3" fill="#e6edf1" />
      <ellipse className="pet-paw pet-paw-right" cx="65" cy="85" rx="5" ry="3" fill="#e6edf1" />
    </g>
  </svg>;
}

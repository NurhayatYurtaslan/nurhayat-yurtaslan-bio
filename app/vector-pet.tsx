export type PetAnimal = "cat" | "rabbit" | "bear";
export default function VectorPet({ happy = false, animal = "cat" }: { happy?: boolean; animal?: PetAnimal }) {
  return <svg className={`vector-pet ${happy ? "pet-happy" : ""}`} viewBox="0 0 96 100" fill="none" aria-hidden="true">
    <ellipse cx="48" cy="92" rx="25" ry="3" fill="#20242b" opacity=".1" />
    <g className="pet-body" stroke="#303844" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {animal === "cat" && <path className="pet-tail" d="M70 78c18 1 21-19 11-23-7-3-10 4-6 7" stroke="#a2bace" strokeWidth="7" />}
      <path d="M28 65q-4 13 2 23h35q6-13 1-23" fill="#bdd0df" />
      {animal === "cat" ? <><path d="M24 42 23 15l20 15h12l18-15-1 27q9 10 2 22-7 12-26 12T22 64q-6-12 2-22Z" fill="#d9e5ed" /><path d="m28 24 9 9-9 4m38-13-8 9 9 4" fill="#cfb3b3" stroke="none" /></> : <>
        {animal === "rabbit" ? <><ellipse cx="35" cy="23" rx="7" ry="20" fill="#eee5df" /><ellipse cx="61" cy="23" rx="7" ry="20" fill="#eee5df" /><path d="M35 10v20m26-20v20" stroke="#d7b5bc" strokeWidth="4" /></> : <><circle cx="27" cy="32" r="10" fill="#bc9d83" /><circle cx="69" cy="32" r="10" fill="#bc9d83" /></>}
        <ellipse cx="48" cy="50" rx="28" ry="25" fill={animal === "rabbit" ? "#eee5df" : "#bc9d83"} />
      </>}
      <path d="M29 51q0-12 19-12t20 12q0 13-20 13T29 51Z" fill="#fafafa" stroke="none" />
      <ellipse cx="32" cy="57" rx="4" ry="2.5" fill="#e9b5bd" stroke="none" opacity=".75" />
      <ellipse cx="65" cy="57" rx="4" ry="2.5" fill="#e9b5bd" stroke="none" opacity=".75" />
      <g className="pet-eyes"><ellipse cx="39" cy="50" rx="3.2" ry="4" fill="#303844" stroke="none" /><ellipse cx="58" cy="50" rx="3.2" ry="4" fill="#303844" stroke="none" /><circle cx="38" cy="48.5" r="1.1" fill="white" stroke="none" /><circle cx="57" cy="48.5" r="1.1" fill="white" stroke="none" /></g>
      <path d={happy ? "M41 57q7 9 14 0" : "m46 56 2 1.5 2-1.5m-2 1.5q-3 6-6 2m6-2q3 6 6 2"} />
      {animal !== "bear" && <path d="m22 54-9-2m10 7-9 2m59-7 9-2m-9 7 9 2" strokeWidth="1.2" />}
      <rect x="34" y="73" width="28" height="15" rx="4" fill="#303844" />
      <path className="pet-code" d="m40 78 3 2-3 2m7 1h7" stroke="#e9f0f5" strokeWidth="1.5" />
      <path d="M31 89h35" strokeWidth="3" />
      <ellipse className="pet-paw pet-paw-left" cx="31" cy="85" rx="5" ry="3" fill="#e6edf1" />
      <ellipse className="pet-paw pet-paw-right" cx="65" cy="85" rx="5" ry="3" fill="#e6edf1" />
    </g>
  </svg>;
}

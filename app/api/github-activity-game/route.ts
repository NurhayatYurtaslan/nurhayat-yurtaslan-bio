import { NextResponse } from "next/server";

const palettes: Record<string, string[]> = {
  neutral: ["#e8edf3", "#cbd5e1", "#94a3b8", "#64748b", "#334155", "#e8954a"],
  ink: ["#303238", "#575b66", "#858c9c", "#bdc6da", "#edf2ff", "#a7f3d0"],
  sand: ["#eee1c9", "#e1c289", "#cda45d", "#a57635", "#754c24", "#c65e40"],
  sky: ["#172f4b", "#245c80", "#328cad", "#56c1d6", "#b0edf3", "#f6c86b"],
  sage: ["#173b30", "#286047", "#41855b", "#78b986", "#c7e7a4", "#f2ba78"],
  lavender: ["#35254d", "#5b3b81", "#855ab3", "#b18be0", "#e0c6ff", "#f0abca"],
  rose: ["#f2d4cc", "#e8b2a2", "#d88978", "#bd625a", "#903f4b", "#695ac4"],
};
export async function GET(request: Request) {
  try {
    const response = await fetch("https://raw.githubusercontent.com/NurhayatYurtaslan/NurhayatYurtaslan/output/github-contribution-grid-snake.svg", { next: { revalidate: 300 }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Unavailable");
    const source = await response.text();
    if (!source.startsWith("<svg") || !source.includes(":root{")) throw new Error("Invalid animation");
    const [empty, c1, c2, c3, c4, snake] = palettes[new URL(request.url).searchParams.get("theme") ?? "neutral"] ?? palettes.neutral;
    const svg = source.replace(/:root\{[^}]*\}/, `:root{--cb:${empty};--cs:${snake};--ce:${empty};--c0:${empty};--c1:${c1};--c2:${c2};--c3:${c3};--c4:${c4}}`).replace("</style>", "@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>");
    return new NextResponse(svg, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=300", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox" } });
  } catch {
    return new NextResponse(null, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

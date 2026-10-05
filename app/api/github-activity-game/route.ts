import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/NurhayatYurtaslan/NurhayatYurtaslan/output/github-contribution-grid-snake.svg", { next: { revalidate: 300 }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Unavailable");
    const source = await response.text();
    if (!source.startsWith("<svg") || !source.includes(":root{")) throw new Error("Invalid animation");
    const svg = source.replace(/:root\{[^}]*\}/, ":root{--cb:#64748b12;--cs:#e8954a;--ce:#e8edf3;--c0:#e8edf3;--c1:#bfdbfe;--c2:#93c5fd;--c3:#3b82f6;--c4:#1d4ed8}").replace("</style>", "@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>");
    return new NextResponse(svg, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=300", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox" } });
  } catch {
    return new NextResponse(null, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

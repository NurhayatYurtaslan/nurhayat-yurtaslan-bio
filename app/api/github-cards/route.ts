import { NextResponse } from "next/server";

const allowed = ["stats", "most-commit-language", "repos-per-language"];
export async function GET(request: Request) {
  const kind = new URL(request.url).searchParams.get("kind") ?? "";
  if (!allowed.includes(kind)) return new NextResponse(null, { status: 400 });
  try {
    const response = await fetch(`https://github-profile-summary-cards.vercel.app/api/cards/${kind}?username=NurhayatYurtaslan&theme=default`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Unavailable");
    const source = await response.text();
    // Remove only the provider's outer card; preserve the live chart and data.
    const svg = source.replace(/(<g class="gpsc-root">)\s*<rect\b[^>]*>\s*<\/rect>/, "$1");
    if (!svg.includes("<svg") || /rate.limit|temporarily|ERROR!!!|something went wrong/i.test(svg)) throw new Error("Unavailable");
    return new NextResponse(svg, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=300", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox" } });
  } catch { return new NextResponse(null, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}

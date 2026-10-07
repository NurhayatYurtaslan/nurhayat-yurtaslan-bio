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
    let svg = source.replace(/(<g class="gpsc-root">)\s*<rect\b[^>]*>\s*<\/rect>/, "$1");
    if (!svg.includes("<svg") || /rate.limit|temporarily|ERROR!!!|something went wrong/i.test(svg)) throw new Error("Unavailable");
    if (kind === "stats") {
      const values = [...source.matchAll(/<text\b[^>]*x="130"[^>]*>([\d.,kKmM]+)<\/text>/g)].map(match => match[1]);
      if (values.length !== 5) throw new Error("Unexpected statistics format");
      const labels = ["Stars", "Commits", "Pull requests", "Issues", "Repositories contributed"];
      const icons = ["M8 1l2 4 4 .6-3 3 .7 4.4L8 11l-3.7 2 .7-4.4-3-3L6 5z", "M1 8h4m6 0h4M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6", "M4 4v8m8-8v4a4 4 0 0 1-4 4M2 2h4v4H2zM10 2h4v4h-4zM2 10h4v4H2z", "M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1M8 4v5m0 2v1", "M2 3h9v10H2zM5 1h9v10"];
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="230" viewBox="0 0 400 230"><style>.metric{animation:appear .7s ease-out both}@keyframes appear{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}@media(prefers-reduced-motion:reduce){.metric{animation:none}}</style><path d="M24 63H376" stroke="#dcdcdc"/><g font-family="Arial,sans-serif"><text x="24" y="30" fill="#777980" font-size="10" letter-spacing="2">GITHUB / OVERVIEW</text><text x="24" y="51" fill="#151517" font-size="12">Nurhayat Yurtaslan</text>${values.map((value, index) => { const x = index % 2 === 0 ? 24 : 214; const y = 94 + Math.floor(index / 2) * 49; return `<g class="metric" style="animation-delay:${index * 80}ms"><g transform="translate(${x} ${y - 15})" fill="none" stroke="#777980" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[index]}"/></g><text x="${x + 25}" y="${y}" fill="#151517" font-size="24" font-weight="700">${value}</text><text x="${x + 25}" y="${y + 16}" fill="#777980" font-size="10">${labels[index]}</text></g>`; }).join("")}</g></svg>`;
    }
    return new NextResponse(svg, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=300", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox" } });
  } catch { return new NextResponse(null, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}

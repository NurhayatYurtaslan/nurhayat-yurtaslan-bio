import { NextResponse } from "next/server";

async function getContributions() {
  let breakdown = null;
  if (process.env.GITHUB_TOKEN) {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: '{ user(login: "NurhayatYurtaslan") { contributionsCollection { totalCommitContributions totalIssueContributions totalPullRequestContributions totalPullRequestReviewContributions } } }' }),
      next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000),
    });
    if (response.ok) {
      const result = await response.json();
      const c = result.data?.user?.contributionsCollection;
      if (c) breakdown = { commits: c.totalCommitContributions, reviews: c.totalPullRequestReviewContributions, issues: c.totalIssueContributions, pullRequests: c.totalPullRequestContributions };
    }
  }
  const response = await fetch("https://github.com/users/NurhayatYurtaslan/contributions", { next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000) });
  if (!response.ok) return null;
  const html = await response.text();
  const total = html.match(/([\d,]+)\s+contributions\s+in the last year/);
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const count = match[2].match(/^(\d[\d,]*) contributions? on /);
    if (count || match[2].startsWith("No contributions")) counts.set(match[1], count ? Number(count[1].replaceAll(",", "")) : 0);
  }
  const days: { date: string; count: number; level: number }[] = [];
  for (const match of html.matchAll(/<td\b[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="([0-4])"[^>]*>/g)) {
    const count = counts.get(match[2]);
    if (count !== undefined) days.push({ date: match[1], count, level: Number(match[3]) });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (!total || days.length < 350) return null;
  return { total: Number(total[1].replaceAll(",", "")), days, breakdown, syncedAt: new Date().toISOString() };
}

export async function GET() {
  const github = await getContributions().catch(() => null);
  return NextResponse.json({ github }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" } });
}

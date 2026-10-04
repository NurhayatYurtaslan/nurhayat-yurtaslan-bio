import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GitHubEvent = {
  type?: string;
  created_at?: string;
  payload?: { commits?: unknown[]; action?: string };
};

function utcDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

function emptyDays(start: Date, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    return { date: utcDay(date), commits: 0, pullRequests: 0 };
  });
}

async function getGitHubUsage() {
  const headers = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  const [profileResponse, eventsResponse] = await Promise.all([
    fetch("https://api.github.com/users/NurhayatYurtaslan", { headers, next: { revalidate: 3600 } }),
    fetch("https://api.github.com/users/NurhayatYurtaslan/events/public?per_page=100", { headers, next: { revalidate: 3600 } }),
  ]);
  if (!profileResponse.ok || !eventsResponse.ok) return null;

  const [profile, events] = await Promise.all([
    profileResponse.json() as Promise<{ public_repos?: number; followers?: number }>,
    eventsResponse.json() as Promise<GitHubEvent[]>,
  ]);
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const start = new Date(today);
  start.setUTCDate(today.getUTCDate() - 13);
  const days = emptyDays(start, 14);
  const dayIndex = new Map(days.map((day, index) => [day.date, index]));

  for (const event of events) {
    if (!event.created_at) continue;
    const index = dayIndex.get(utcDay(new Date(event.created_at)));
    if (index === undefined) continue;
    if (event.type === "PushEvent") days[index].commits += event.payload?.commits?.length ?? 0;
    if (event.type === "PullRequestEvent" && event.payload?.action === "opened") days[index].pullRequests += 1;
  }

  return {
    publicRepositories: profile.public_repos ?? 0,
    followers: profile.followers ?? 0,
    commits: days.reduce((total, day) => total + day.commits, 0),
    pullRequests: days.reduce((total, day) => total + day.pullRequests, 0),
    days,
  };
}

export async function GET() {
  const github = await getGitHubUsage().catch(() => null);
  return NextResponse.json({ github }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" } });
}

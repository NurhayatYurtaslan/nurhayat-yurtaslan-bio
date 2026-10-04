import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GitHubEvent = {
  type?: string;
  created_at?: string;
  payload?: { commits?: unknown[]; action?: string };
};

type CursorDay = {
  date?: number | string;
  day?: string;
  email?: string;
  totalApplies?: number;
  totalAccepts?: number;
  acceptedLinesAdded?: number;
  acceptedLinesDeleted?: number;
  totalTabsAccepted?: number;
  agentRequests?: number;
  composerRequests?: number;
  chatRequests?: number;
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

async function getCursorUsage() {
  const apiKey = process.env.CURSOR_ADMIN_API_KEY;
  const accountEmail = process.env.CURSOR_USAGE_EMAIL?.trim().toLowerCase();
  if (!apiKey || !accountEmail) return { status: "needs-configuration" as const };

  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  start.setUTCDate(start.getUTCDate() - 13);
  const response = await fetch("https://api.cursor.com/teams/daily-usage-data", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate: start.getTime(), endDate: now.getTime() }),
    next: { revalidate: 3600 },
  });
  if (!response.ok) return { status: "unavailable" as const };

  const result = await response.json() as { data?: CursorDay[] };
  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    return { date: utcDay(date), requests: 0 };
  });
  const dayIndex = new Map(days.map((day, index) => [day.date, index]));
  const personalRows = (result.data ?? []).filter((row) => row.email?.trim().toLowerCase() === accountEmail);

  for (const row of personalRows) {
    const rowDate = row.day ?? (row.date === undefined ? undefined : typeof row.date === "number" ? utcDay(new Date(row.date)) : row.date.slice(0, 10));
    const index = rowDate ? dayIndex.get(rowDate) : undefined;
    if (index !== undefined) days[index].requests += (row.agentRequests ?? 0) + (row.composerRequests ?? 0) + (row.chatRequests ?? 0);
  }

  return {
    status: "ready" as const,
    agentRequests: personalRows.reduce((total, row) => total + (row.agentRequests ?? 0), 0),
    composerRequests: personalRows.reduce((total, row) => total + (row.composerRequests ?? 0), 0),
    acceptedTabs: personalRows.reduce((total, row) => total + (row.totalTabsAccepted ?? 0), 0),
    acceptedLines: personalRows.reduce((total, row) => total + (row.acceptedLinesAdded ?? 0) + (row.acceptedLinesDeleted ?? 0), 0),
    days,
  };
}

export async function GET() {
  const [github, cursor] = await Promise.all([
    getGitHubUsage().catch(() => null),
    getCursorUsage().catch(() => ({ status: "unavailable" as const })),
  ]);
  return NextResponse.json({ github, cursor }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" } });
}

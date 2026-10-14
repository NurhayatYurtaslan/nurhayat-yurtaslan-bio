import { NextResponse } from "next/server";
import savedRepos from "../../../data/personal-repos.json";

type Repo = { name: string; description: string | null; language: string | null; html_url: string; fork: boolean; private: boolean; created_at: string };

export async function GET() {
  try {
    const repos: Repo[] = [];
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(`https://api.github.com/users/NurhayatYurtaslan/repos?per_page=100&sort=created&direction=desc&page=${page}`, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store", signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error("GitHub unavailable");
      const batch: Repo[] = await response.json();
      if (!Array.isArray(batch)) throw new Error("Invalid repositories");
      repos.push(...batch);
      if (batch.length < 100) break;
    }
    return NextResponse.json({ offline: false, syncedAt: new Date().toISOString(), repos: repos.filter(repo => !repo.private).map(repo => ({ name: repo.name, description: repo.description, language: repo.language, fork: repo.fork, url: repo.html_url, createdAt: repo.created_at })) });
  } catch {
    return NextResponse.json({ repos: savedRepos, offline: true, syncedAt: null });
  }
}

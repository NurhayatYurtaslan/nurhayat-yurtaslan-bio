import { NextResponse } from "next/server";
import savedRepos from "../../../data/personal-repos.json";

type Repo = { name: string; description: string | null; language: string | null; html_url: string; fork: boolean; private: boolean };

export async function GET() {
  try {
    const repos: Repo[] = [];
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(`https://api.github.com/users/NurhayatYurtaslan/repos?per_page=100&sort=updated&page=${page}`, { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error("GitHub unavailable");
      const batch: Repo[] = await response.json();
      if (!Array.isArray(batch)) throw new Error("Invalid repositories");
      repos.push(...batch);
      if (batch.length < 100) break;
    }
    return NextResponse.json({ repos: repos.filter(repo => !repo.private && !repo.fork && repo.name !== "NurhayatYurtaslan").map(repo => ({ name: repo.name, description: repo.description, language: repo.language, url: repo.html_url })) });
  } catch {
    return NextResponse.json({ repos: savedRepos });
  }
}

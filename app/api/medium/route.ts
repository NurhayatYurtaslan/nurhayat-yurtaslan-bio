import { NextResponse } from "next/server";
import archive from "../../../data/medium.json";

function plain(value: string) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
}

export async function GET() {
  try {
    const response = await fetch("https://medium.com/feed/@nurhayatyurtaslan", { signal: AbortSignal.timeout(8000), next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Feed unavailable");
    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const feed = items.flatMap(item => {
      const field = (name: string) => plain(item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? "");
      const title = field("title");
      const url = field("link").split("?")[0];
      const date = new Date(field("pubDate"));
      if (!title || !/^https:\/\/nurhayatyurtaslan\.medium\.com\//.test(url) || !Number.isFinite(date.getTime())) return [];
      return [{ title, url, date: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }), summary: "" }];
    });
    if (!feed.length) throw new Error("Empty feed");
    const postId = (url: string) => url.split("?")[0].split("-").at(-1);
    const posts = [...feed, ...archive.filter(post => !feed.some(item => postId(item.url) === postId(post.url)))];
    return NextResponse.json({ posts, source: "rss", archiveComplete: false });
  } catch {
    return NextResponse.json({ posts: archive, source: "archive", archiveComplete: false });
  }
}

import { NextResponse } from "next/server";
import posts from "../../../data/medium.json";

export async function GET() {
  try {
    const response = await fetch("https://medium.com/feed/@nurhayatyurtaslan", { signal: AbortSignal.timeout(8000), next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Feed unavailable");
    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const enriched = posts.map(post => {
      const id = post.url.split("-").at(-1);
      const item = items.find(value => id && value.includes(id));
      const content = item?.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1];
      const first = content?.match(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/)?.[1];
      const excerpt = first?.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
      // The interface remains English; keep the existing English summary for Turkish articles.
      return { ...post, summary: excerpt && !/[çğıöşüÇĞİÖŞÜ]/.test(excerpt) ? excerpt.slice(0, 360) : post.summary };
    });
    return NextResponse.json({ posts: enriched });
  } catch {
    return NextResponse.json({ posts });
  }
}

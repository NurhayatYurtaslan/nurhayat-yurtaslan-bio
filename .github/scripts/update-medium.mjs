import { readFile, writeFile } from "node:fs/promises";

const feedUrl = "https://medium.com/feed/@nurhayatyurtaslan";
const outputPath = "data/medium.json";

function decodeXml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function stripTags(value = "") {
  return decodeXml(value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function tag(entry, name) {
  const match = entry.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match ? stripTags(match[1]) : "";
}

function link(entry) {
  const alternate = entry.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*>/i) || entry.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
  return alternate ? decodeXml(alternate[1]) : tag(entry, "link");
}

function displayDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(parsed);
}

const response = await fetch(feedUrl, { headers: { "user-agent": "nurhayat-yurtaslan-bio-medium-sync/1.0" } });
if (!response.ok) throw new Error(`Medium feed returned ${response.status}`);
const feed = await response.text();
const entries = [...feed.matchAll(/<item\b[\s\S]*?<\/item>/gi)].slice(0, 3).map((match) => match[0]);
if (entries.length < 3) throw new Error(`Expected at least three Medium posts, found ${entries.length}`);

const posts = entries.map((entry) => ({
  title: tag(entry, "title"),
  date: displayDate(tag(entry, "pubDate")),
  url: link(entry),
  summary: stripTags(tag(entry, "description")),
}));

if (posts.some((post) => !post.title || !post.date || !post.url)) throw new Error("Medium feed contains an incomplete post");

let previous = [];
try {
  previous = JSON.parse(await readFile(outputPath, "utf8"));
} catch {
  previous = [];
}

const relevantDataChanged = posts.some((post, index) => {
  const oldPost = previous[index];
  return !oldPost || oldPost.title !== post.title || oldPost.date !== post.date || oldPost.url !== post.url;
});

if (!relevantDataChanged) {
  console.log(`Medium widget data is unchanged in ${outputPath}`);
  process.exit(0);
}

await writeFile(outputPath, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`Synced ${posts.length} Medium posts to ${outputPath}`);

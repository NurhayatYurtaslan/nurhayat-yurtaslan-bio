import Link from "next/link";

export default function NotFound() {
  return <main className="desktop theme-neutral not-found-desktop"><h1>404</h1><p>This page is not on the system</p><Link href="/">Back home</Link></main>;
}

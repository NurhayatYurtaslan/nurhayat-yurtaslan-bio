"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { workProjects } from "../data/work-projects";
import { toolGroups } from "../data/tool-files";
import { desktopNotes } from "../data/desktop-notes";
import savedPosts from "../data/medium.json";

type Result = { id: string; name: string; group: string; text: string; folder?: "work" | "tools" | "about"; file?: string; url?: string };

export default function Spotlight({ openFile, linkedinPosts, contactUrl, onContact }: { openFile: (folder: "work" | "tools" | "about", file: string) => void; linkedinPosts: string[][]; contactUrl: string; onContact: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [posts, setPosts] = useState(savedPosts);
  const input = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const origin = useRef<HTMLElement | null>(null);
  const id = useId();
  const close = () => { setOpen(false); origin.current?.focus(); };
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.metaKey && event.key.toLowerCase() === "k") {
        event.preventDefault(); event.stopImmediatePropagation();
        origin.current = document.activeElement as HTMLElement;
        setQuery(""); setSelected(0); setOpen(true);
      }
    };
    window.addEventListener("keydown", shortcut, true);
    return () => window.removeEventListener("keydown", shortcut, true);
  }, []);
  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const controller = new AbortController();
    fetch("/api/medium", { signal: controller.signal }).then(response => response.json()).then(data => { if (Array.isArray(data.posts)) setPosts(data.posts); }).catch(() => {});
    return () => controller.abort();
  }, [open]);
  useEffect(() => { panel.current?.querySelector("[aria-selected=true]")?.scrollIntoView({ block: "nearest" }); }, [selected]);

  if (!open) return null;
  const entries: Result[] = [
    ...workProjects.map(project => ({ id: project.url, name: project.name, group: "Work", text: project.description, folder: "work" as const, file: project.name + ".md" })),
    ...posts.map(post => ({ id: post.url, name: post.title, group: "Writing", text: "Medium", url: post.url })),
    ...linkedinPosts.map(([, title, url]) => ({ id: url, name: title, group: "Writing", text: "LinkedIn", url })),
    ...desktopNotes.map(note => ({ id: note.name, name: note.name, group: "Notes", text: note.text, folder: "about" as const, file: note.name })),
    ...toolGroups.flatMap(group => group.files.map(([name, line]) => ({ id: group.name + "/" + name, name, group: "Tools", text: group.name + " · " + line, folder: "tools" as const, file: group.name + "/" + name }))),
    { id: "contact", name: "Contact", group: "Contact", text: "Send a message", url: contactUrl },
  ];
  const terms = query.trim().toLocaleLowerCase("en").split(/\s+/).filter(Boolean);
  const results = entries.filter(entry => terms.every(term => `${entry.name} ${entry.group} ${entry.text}`.toLocaleLowerCase("en").includes(term)));
  const active = Math.min(selected, Math.max(0, results.length - 1));
  const activate = (result: Result) => {
    close();
    if (result.id === "contact") onContact();
    else if (result.folder && result.file) openFile(result.folder, result.file);
    else if (result.url?.startsWith("/")) window.location.href = result.url;
    else if (result.url) window.open(result.url, "_blank", "noopener,noreferrer");
  };
  return <div className="spotlight-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => {
    event.stopPropagation();
    if (event.key === "Escape") { event.preventDefault(); close(); }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setSelected(results.length ? (active + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length : 0); }
    if (event.key === "Enter") { event.preventDefault(); if ((event.target as HTMLElement).closest(".spotlight-close")) close(); else if (results[active]) activate(results[active]); }
    if (event.key === "Tab") { event.preventDefault(); if (document.activeElement === input.current) panel.current?.querySelector<HTMLButtonElement>(".spotlight-close")?.focus(); else input.current?.focus(); }
  }}><div ref={panel} className="spotlight-panel" role="dialog" aria-modal="true" aria-label="Spotlight search"><div className="spotlight-input-row"><Search size={20} aria-hidden="true" /><input ref={input} placeholder="Search the desktop" aria-label="Search the desktop" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls={`${id}-results`} aria-activedescendant={results[active] ? `${id}-result-${active}` : undefined} value={query} onChange={event => { setQuery(event.target.value); setSelected(0); }} /><button className="spotlight-close" aria-label="Close Spotlight" onClick={close}><X size={17} /></button></div><div className="spotlight-results" id={`${id}-results`} role="listbox" aria-label="Search results">{results.map((result, index) => <button type="button" tabIndex={-1} id={`${id}-result-${index}`} key={result.id} role="option" aria-selected={active === index} onPointerMove={() => setSelected(index)} onClick={() => activate(result)}><span><small>{result.group}</small><strong>{result.name}</strong><em>{result.text.split("\n")[0]}</em></span><ArrowUpRight size={16} aria-hidden="true" /></button>)}{!results.length && <p className="spotlight-empty">No results for “{query}”</p>}</div><footer>↑ ↓ to move · Enter to open · Esc to close</footer></div></div>;
}

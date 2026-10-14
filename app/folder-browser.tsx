"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FileText, Folder, Grid2X2, List, X } from "lucide-react";

export type FolderFile = { name: string; text?: string; url?: string; content?: ReactNode; group?: string; oneLine?: boolean; kind?: string; date?: string; subtitle?: string; icon?: ReactNode; links?: { label: string; url: string }[] };
const keyOf = (file: FolderFile) => `${file.group ?? ""}/${file.name}`;
const kindOf = (file: FolderFile) => file.kind ?? (file.name.endsWith(".txt") ? "Text document" : "Markdown document");
const timestamp = (file: FolderFile) => file.date ? Date.parse(file.date) || 0 : 0;

export default function FolderBrowser({ title, files, initialFile, loading = false, notice, nestedGroups = false, onNavigate }: { title: string; files: FolderFile[]; initialFile?: string; loading?: boolean; notice?: ReactNode; nestedGroups?: boolean; onNavigate?: (id: "work" | "writing" | "github" | "about" | "tools") => void }) {
  const initial = files.find(file => file.name === initialFile || `${file.group}/${file.name}` === initialFile);
  const [group, setGroup] = useState<string | null>(nestedGroups && initial?.group ? initial.group : null);
  const groupNames = Array.from(new Set(files.map(file => file.group).filter((name): name is string => Boolean(name))));
  const showingFolders = nestedGroups && group === null;
  const visibleFiles: FolderFile[] = showingFolders ? groupNames.map(name => ({ name, kind: "Folder", text: `${files.filter(file => file.group === name).length} tools` })) : nestedGroups ? files.filter(file => file.group === group) : files;
  const [selected, setSelected] = useState(initial ? keyOf(initial) : "");
  const [opened, setOpened] = useState<string | null>(initial ? keyOf(initial) : null);
  const [view, setView] = useState<"icon" | "list">("icon");
  const [sort, setSort] = useState<"name" | "kind" | "date">(title === "GitHub" ? "date" : "name");
  const [descending, setDescending] = useState(title === "GitHub");
  const [quick, setQuick] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const documentView = useRef<HTMLElement>(null);
  const origin = useRef<HTMLElement | null>(null);
  const ordered = useMemo(() => {
    const groups = Array.from(new Set(visibleFiles.map(file => file.group)));
    return groups.flatMap(group => visibleFiles.filter(file => file.group === group).sort((a, b) => {
      if (sort === "date" && (!timestamp(a) || !timestamp(b))) return timestamp(a) ? -1 : timestamp(b) ? 1 : a.name.localeCompare(b.name);
      const difference = sort === "date" ? timestamp(a) - timestamp(b) : sort === "kind" ? kindOf(a).localeCompare(kindOf(b)) : a.name.localeCompare(b.name);
      return (descending ? -difference : difference) || a.name.localeCompare(b.name);
    }));
  }, [files, nestedGroups, group, sort, descending]);
  const selection = ordered.some(file => keyOf(file) === selected) ? selected : ordered[0] ? keyOf(ordered[0]) : "";
  const file = visibleFiles.find(item => keyOf(item) === (opened ?? selection));
  const focusSelection = () => requestAnimationFrame(() => Array.from(grid.current?.querySelectorAll<HTMLButtonElement>("button.native-file") ?? []).find(button => button.dataset.fileKey === selection)?.focus());
  const enter = (item: FolderFile) => {
    if (showingFolders) { setGroup(item.name); setSelected(""); requestAnimationFrame(() => grid.current?.querySelector<HTMLButtonElement>("button.native-file")?.focus()); }
    else setOpened(keyOf(item));
  };
  const back = () => {
    if (opened !== null) { setOpened(null); focusSelection(); }
    else { const previous = group; setGroup(null); setSelected("/" + previous); requestAnimationFrame(() => Array.from(grid.current?.querySelectorAll<HTMLButtonElement>("button.native-file") ?? []).find(button => button.dataset.fileKey === "/" + previous)?.focus()); }
  };
  const closeQuick = () => { setQuick(false); origin.current?.focus(); };
  useEffect(() => { if (quick) dialog.current?.querySelector<HTMLButtonElement>("button")?.focus(); }, [quick]);
  useEffect(() => { if (opened !== null) documentView.current?.focus(); }, [opened]);
  return <div className="native-folder" onKeyDown={event => {
    if (event.key === "Escape" && (quick || opened !== null || group !== null)) { event.preventDefault(); event.stopPropagation(); if (quick) closeQuick(); else back(); }
    if (quick && event.key === "Tab") { const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>("button,a") ?? []); event.preventDefault(); const index = items.indexOf(document.activeElement as HTMLElement); items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length]?.focus(); }
  }}>
    <header className="native-folder-toolbar"><button aria-label="Back to folder" disabled={opened === null && group === null} onClick={back}>‹</button><Folder size={17} /><strong>{group ?? title}</strong><div className="finder-view-controls"><button aria-label="Icon view" aria-pressed={view === "icon"} onClick={() => setView("icon")}><Grid2X2 size={16} /></button><button aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")}><List size={16} /></button><label>Sort <select aria-label="Sort files" value={sort} onChange={event => setSort(event.target.value as typeof sort)}><option value="name">Name</option><option value="kind">Kind</option><option value="date">Date</option></select></label><button aria-label={descending ? "Sort ascending" : "Sort descending"} onClick={() => setDescending(value => !value)}>{descending ? "↓" : "↑"}</button></div></header>
    <div className="native-folder-layout"><aside className="finder-sidebar" aria-label="Folder navigation"><small>PORTFOLIO</small>{(["work", "writing", "about", "tools"] as const).map(id => <button key={id} aria-current={title.toLowerCase() === id ? "page" : undefined} onClick={() => onNavigate?.(id)}><Folder size={19} /><span>{id[0].toUpperCase() + id.slice(1)}</span></button>)}</aside><div className="native-folder-area">{notice}{opened !== null && file ? <article ref={documentView} tabIndex={-1} className="folder-document">{!file.oneLine && <h2>{file.name}</h2>}{file.text && <p>{file.text}</p>}{file.content}{file.links && <nav className="finder-document-links" aria-label="Contact links">{file.links.map(link => <a key={link.url} href={link.url} target={link.url.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">{link.label} ↗</a>)}</nav>}{!file.oneLine && file.url && <a href={file.url} target="_blank" rel="noreferrer">Open original ↗</a>}</article> : loading ? <p role="status">Loading files.</p> : <div ref={grid} className={`native-file-grid ${view === "list" ? "native-file-list" : ""}`}>
      {view === "list" && <div className="finder-list-heading"><span>Name</span><span>Kind</span><span>Date</span></div>}
      {ordered.length === 0 && <p>No files available.</p>}
      {ordered.map((item, index) => <Fragment key={keyOf(item)}>{!nestedGroups && item.group && ordered[index - 1]?.group !== item.group && <h2 className="native-file-group-heading">{item.group}</h2>}<button data-file-key={keyOf(item)} className={`native-file ${selection === keyOf(item) ? "is-selected" : ""}`} tabIndex={selection === keyOf(item) ? 0 : -1} aria-label={item.name} aria-pressed={selection === keyOf(item)} onFocus={() => setSelected(keyOf(item))} onClick={() => setSelected(keyOf(item))} onDoubleClick={() => { setSelected(keyOf(item)); enter(item); }} onKeyDown={event => {
        if (event.key === " ") { event.preventDefault(); event.stopPropagation(); setSelected(keyOf(item)); origin.current = event.currentTarget; setQuick(true); }
        else if (event.key === "Enter") { event.preventDefault(); event.stopPropagation(); enter(item); }
        else if (event.key.startsWith("Arrow")) { event.preventDefault(); event.stopPropagation(); const columns = view === "list" ? 1 : Math.max(1, Math.floor((grid.current?.clientWidth ?? 130) / 130)); const step = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" ? -columns : columns; const next = Math.max(0, Math.min(ordered.length - 1, index + step)); setSelected(keyOf(ordered[next])); grid.current?.querySelectorAll<HTMLButtonElement>("button.native-file")[next]?.focus(); }
      }}><span className="finder-file-name">{showingFolders ? <Folder className="native-subfolder-icon" size={view === "list" ? 19 : 44} strokeWidth={1.2} aria-hidden="true" /> : item.icon ?? <FileText size={view === "list" ? 19 : 38} strokeWidth={1.2} aria-hidden="true" />}<span>{item.name}{item.subtitle && <small>{item.subtitle}</small>}</span></span>{view === "list" && <><span>{kindOf(item)}</span><time dateTime={timestamp(item) ? item.date : undefined}>{timestamp(item) ? new Date(item.date!).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}</time></>}</button></Fragment>)}
    </div>}</div></div>
    <footer className="native-folder-footer"><Folder size={12} />{title}{group && <> › {group}</>}{opened && file && <> › {file.name}</>}<small>{visibleFiles.length} items</small></footer>
    {quick && file && <div className="folder-quick-overlay"><div ref={dialog} className="folder-quick-panel" role="dialog" aria-modal="true" aria-label={`Quick Look: ${file.name}`}><button className="folder-quick-close" aria-label="Close Quick Look" onClick={closeQuick}><X size={18} /></button><small>QUICK LOOK</small><h2>{file.name}</h2><p>{file.text?.split("\n").find(Boolean)}</p>{!file.oneLine && file.url && <a href={file.url} target="_blank" rel="noreferrer">Open original ↗</a>}</div></div>}
  </div>;
}

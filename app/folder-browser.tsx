"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FileText, Folder, X } from "lucide-react";

export type FolderFile = { name: string; text?: string; url?: string; content?: ReactNode };

export default function FolderBrowser({ title, files, loading = false, nested = false, onNavigate }: { title: string; files: FolderFile[]; loading?: boolean; nested?: boolean; onNavigate?: (id: "work" | "writing" | "github" | "about") => void }) {
  const [folder, setFolder] = useState<number | null>(null);
  const visibleFiles = nested && folder !== null ? [files[folder]] : files;
  const isFolder = nested && folder === null;
  const enter = (index: number) => { if (isFolder) { setFolder(index); setSelected(0); } else setOpened(index); };
  const back = () => { if (opened !== null) setOpened(null); else { const previous = folder ?? 0; setFolder(null); setSelected(previous); } };
  const [selected, setSelected] = useState(0);
  const [opened, setOpened] = useState<number | null>(null);
  const [quick, setQuick] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const origin = useRef<HTMLElement | null>(null);
  const file = visibleFiles[opened ?? selected];
  useEffect(() => { if (quick) dialog.current?.querySelector<HTMLButtonElement>("button")?.focus(); }, [quick]);
  const closeQuick = () => { setQuick(false); origin.current?.focus(); };
  const preview = file && <article className="folder-document"><h2>{file.name}</h2>{file.text && <p>{file.text}</p>}{file.content}{file.url && <a href={file.url} target="_blank" rel="noreferrer">Open original ↗</a>}</article>;
  return <div className="native-folder" onKeyDown={event => {
    if ((event.target as HTMLElement).closest("input,textarea,[contenteditable=true]")) return;
    if (event.key === "Escape" && (quick || opened !== null || folder !== null)) { event.preventDefault(); event.stopPropagation(); if (quick) closeQuick(); else { back(); requestAnimationFrame(() => grid.current?.querySelectorAll<HTMLButtonElement>("button")[selected]?.focus()); } }
    if (quick && event.key === "Tab") { const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>("button,a") ?? []); const index = items.indexOf(document.activeElement as HTMLElement); event.preventDefault(); items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length]?.focus(); }
  }}>
    <header className="native-folder-toolbar"><button aria-label="Back to folder" disabled={opened === null && folder === null} onClick={back}>‹</button><Folder size={17} /><strong>{folder === null ? title : files[folder]?.name.replace(/\.md$/, "")}</strong><span>{opened !== null ? visibleFiles[opened]?.name : "Icon view"}</span></header>
    <div className="native-folder-layout"><aside className="finder-sidebar" aria-label="Folder navigation"><small>PORTFOLIO</small>{(["work", "writing", "github", "about"] as const).map(id => <button key={id} aria-current={title.toLowerCase() === id ? "page" : undefined} onClick={() => onNavigate?.(id)}><Folder size={19} /><span>{id === "github" ? "GitHub" : id[0].toUpperCase() + id.slice(1)}</span></button>)}</aside><div className="native-folder-area">{opened !== null ? preview : loading ? <div className="glass-inline-state"><span className="loading-mark">✦</span><p>Loading.</p></div> : visibleFiles.length === 0 ? <p>Nothing here yet.</p> : <div className="native-file-grid" ref={grid}>{visibleFiles.map((item, index) => <button key={item.name} className={`native-file ${selected === index ? "is-selected" : ""}`} tabIndex={selected === index ? 0 : -1} aria-label={item.name} aria-pressed={selected === index} onFocus={() => setSelected(index)} onClick={() => setSelected(index)} onDoubleClick={() => { setSelected(index); enter(index); }} onKeyDown={event => {
      if (event.key === " ") { event.preventDefault(); event.stopPropagation(); origin.current = event.currentTarget; setQuick(true); }
      else if (event.key === "Enter") { event.preventDefault(); event.stopPropagation(); enter(index); }
      else if (event.key.startsWith("Arrow")) { event.preventDefault(); event.stopPropagation(); const columns = Math.max(1, Math.floor((grid.current?.clientWidth ?? 130) / 130)); const step = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" ? -columns : columns; const next = Math.max(0, Math.min(visibleFiles.length - 1, index + step)); setSelected(next); grid.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus(); }
    }}>{isFolder ? <Folder className="native-subfolder-icon" size={44} strokeWidth={1.2} aria-hidden="true" /> : <FileText size={38} strokeWidth={1.2} aria-hidden="true" />}<span>{isFolder ? item.name.replace(/\.md$/, "") : item.name}</span></button>)}</div>}</div></div>
    <footer className="native-folder-footer"><Folder size={12} />{title}{folder !== null && <> › {files[folder]?.name.replace(/\.md$/, "")}</>}{opened !== null && <> › {files[opened]?.name}</>}<small>{visibleFiles.length} items</small></footer>
    {quick && file && <div className="folder-quick-overlay"><div ref={dialog} className="folder-quick-panel" role="dialog" aria-modal="true" aria-label={`Quick Look: ${file.name}`}><button className="folder-quick-close" aria-label="Close Quick Look" onClick={closeQuick}><X size={18} /></button><small>QUICK LOOK</small><h2>{file.name.replace(/\.(md|txt)$/, "")}</h2><p>{file.text?.split("\n").find(Boolean) ?? "Nurhayat Yurtaslan’s GitHub contribution history."}</p><a href={file.url ?? "https://github.com/NurhayatYurtaslan"} target="_blank" rel="noreferrer">Open original ↗</a></div></div>}
  </div>;
}

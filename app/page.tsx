"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import mediumPosts from "../data/medium.json";

type WindowId = "work" | "github" | "linkedin" | "medium" | "about" | "terminal" | "phone";
type HomeWidgetId = "now" | "github" | "linkedin" | "medium";
type Theme = "neutral" | "ink" | "sand";
type Offset = { x: number; y: number };
type WidgetPosition = { column: number; row: number };

const identity = {
  name: "Nurhayat Yurtaslan",
  title: "Agentic AI Developer | Mobile Engineer",
  email: "nurhayatyurtaslan38@gmail.com",
  linkedin: "https://www.linkedin.com/in/nurhayat-yurtaslan",
  medium: "https://nurhayatyurtaslan.medium.com",
  github: "https://github.com/NurhayatYurtaslan",
};

const roles = [
  { company: "Ticimax", role: "Mobile Engineer", dates: "Since December 2025", description: "Building mobile products with Flutter." },
  { company: "MasterFabric", role: "Open-source developer", dates: "Since June 2025", description: "Contributing to shared mobile tools and frameworks." },
];

const githubRepos = [
  ["syspect", "https://github.com/NurhayatYurtaslan/syspect"],
  ["learn-widget", "https://github.com/NurhayatYurtaslan/learn-widget"],
  ["pupilica_hackathon", "https://github.com/NurhayatYurtaslan/pupilica_hackathon"],
  ["anka_super_loading_package", "https://github.com/NurhayatYurtaslan/anka_super_loading_package"],
  ["super_button_package", "https://github.com/NurhayatYurtaslan/super_button_package"],
  ["spotify_clone_app", "https://github.com/NurhayatYurtaslan/spotify_clone_app"],
  ["ozgecmis", "https://github.com/NurhayatYurtaslan/ozgecmis"],
  ["data-structures-and-algorithms-in-dart", "https://github.com/NurhayatYurtaslan/data-structures-and-algorithms-in-dart"],
];

const linkedinPosts = [
  ["4 Oct 2026", "How one Laya call becomes a distribution, and where the program has to stop", "https://www.linkedin.com/pulse/how-one-laya-call-becomes-distribution-where-program-has-yurtaslan-wdrvf"],
  ["3 Oct 2026", "Jev, End to End: State, Primitives, Schemas, and the Program That Owns the Decision", "https://www.linkedin.com/pulse/jev-end-state-primitives-schemas-program-owns-nurhayat-yurtaslan-ezjef"],
  ["25 Sep 2026", "What Should a Model Know? Parametric Memory, Retrieval, and the Real Divide Between Fine-Tuning and RAG", "https://www.linkedin.com/pulse/what-should-model-know-parametric-memory-retrieval-real-yurtaslan-quvqf"],
];

const bio = "I build mobile products and agentic AI systems, with a focus on useful interfaces, shared tools, and work that can be understood in public.";

const tools = [
  ["Cursor", "cursor"],
  ["GitHub", "github"],
  ["Flutter", "flutter"],
  ["Dart", "dart"],
  ["Swift", "swift"],
  ["Xcode", "xcode"],
  ["Expo", "expo"],
  ["React Native", "react"],
  ["Next.js", "nextdotjs"],
  ["TypeScript", "typescript"],
  ["Go", "go"],
] as const;

const windowDefaults: Record<WindowId, Offset> = {
  work: { x: 108, y: 30 }, github: { x: 132, y: 54 }, linkedin: { x: 156, y: 78 }, medium: { x: 180, y: 102 }, about: { x: 204, y: 54 }, terminal: { x: 228, y: 30 }, phone: { x: 0, y: 0 },
};

const homeWidgetDefaults: Record<HomeWidgetId, WidgetPosition> = {
  now: { column: 0, row: 0 },
  github: { column: 1, row: 0 },
  linkedin: { column: 2, row: 0 },
  medium: { column: 3, row: 0 },
};

const windowTitles: Record<Exclude<WindowId, "phone">, string> = {
  work: "Work",
  github: "GitHub",
  linkedin: "LinkedIn",
  medium: "Medium",
  about: "About",
  terminal: "Terminal",
};

function ExternalRow({ index, title, meta, description, url }: { index: number; title: string; meta: string; description?: string; url: string }) {
  return <a className="content-row" href={url} target="_blank" rel="noreferrer"><span className="row-index">{String(index).padStart(2, "0")}</span><div className="row-main"><h3>{title}</h3>{description && <p>{description}</p>}<small>{meta}</small></div><span className="row-arrow">↗</span></a>;
}

function WindowBar({ title, close, onDrag }: { title: string; close: () => void; onDrag: (event: ReactPointerEvent<HTMLDivElement>) => void }) {
  return <div className="window-bar" onPointerDown={onDrag}><div className="window-controls"><button onClick={close} aria-label={`Close ${title} window`} /><button aria-hidden="true" /><button aria-hidden="true" /></div><span>{title}</span><span className="window-meta" aria-hidden="true" /></div>;
}

function Clock({ time, date }: { time: string; date: string }) {
  return <article className="clock-card glass-card"><span className="widget-label">ISTANBUL</span><div className="clock-face"><span className="clock-tick t1" /><span className="clock-tick t2" /><span className="clock-tick t3" /><span className="clock-tick t4" /><span className="clock-hand hour" /><span className="clock-hand minute" /><span className="clock-dot" /></div><div className="clock-caption"><span>LOCAL TIME</span><b>{time}</b></div><div className="clock-date">{date}</div></article>;
}

function RoleWidget() {
  return <article className="home-widget glass-card role-widget"><span className="widget-label">NOW</span>{roles.map((role) => <div className="role-line" key={role.company}><strong>{role.company}</strong><span>{role.role}</span></div>)}</article>;
}

function GitHubWidget() {
  return <article className="home-widget glass-card github-widget"><div className="widget-heading"><span className="widget-label">GITHUB</span><a href={identity.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">↗</a></div><h3>Open source</h3><div className="widget-links">{githubRepos.slice(0, 6).map(([name, url]) => <a href={url} target="_blank" rel="noreferrer" key={name}>{name}<span>↗</span></a>)}</div></article>;
}

function StoryWidget({ label, posts, source }: { label: string; posts: string[][]; source: string }) {
  return <article className="home-widget glass-card story-widget"><span className="widget-label">{label}</span>{posts.map(([date, title, url]) => <a className="story-line" href={url} target="_blank" rel="noreferrer" key={url}><strong>{title}</strong><small>{date} · {source}</small></a>)}</article>;
}

function ToolShelf() {
  return <section className="tool-shelf glass-card" aria-label="Tools"><span className="widget-label">TOOLS</span><div className="tool-grid">{tools.map(([name, slug]) => <div className="tool-item" key={name}><span className="tool-mark"><img src={`https://cdn.simpleicons.org/${slug}`} alt={`${name} official mark`} /></span><small>{name}</small></div>)}</div></section>;
}

function TerminalContent() {
  const fullText = ["> whoami", "Nurhayat Yurtaslan — Agentic AI Developer | Mobile Engineer", "> cat now.txt", "Ticimax · MasterFabric"].join("\n");
  const [progress, setProgress] = useState(0);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setProgress(fullText.length); return; } const timer = window.setInterval(() => setProgress((value) => Math.min(value + 1, fullText.length)), 42); return () => window.clearInterval(timer); }, [fullText.length]);
  const lines = fullText.slice(0, progress).split("\n");
  return <div className="terminal-content" aria-label="Read-only terminal output"><div className="terminal-prompt">nurhayat@portfolio:~$</div>{lines.map((line, index) => <div className={index % 2 === 1 ? "terminal-line terminal-output" : "terminal-line"} key={`${index}-${line}`}>{line}{index === lines.length - 1 && progress < fullText.length && <span className="terminal-cursor" />}</div>)}{progress >= fullText.length && <span className="terminal-cursor" />}</div>;
}

function MobilePortfolio({ prefix }: { prefix: string }) {
  return <div className="mobile-portfolio-content" id={`${prefix}-top`}><header className="mobile-profile-head"><span className="mobile-kicker">AGENTIC AI ✦ MOBILE ENGINEERING</span><h2>{identity.name}</h2><p>{identity.title}</p></header><section className="mobile-section" id={`${prefix}-about`}><span className="mobile-section-label">01 / ABOUT</span><p>{bio}</p></section><section className="mobile-section" id={`${prefix}-work`}><span className="mobile-section-label">02 / WORK</span>{roles.map((role) => <div className="mobile-job" key={role.company}><strong>{role.company}</strong><span>{role.role} · {role.dates}</span><p>{role.description}</p></div>)}</section><section className="mobile-section" id={`${prefix}-writing`}><span className="mobile-section-label">03 / WRITING</span>{linkedinPosts.map(([date, title, url]) => <a className="mobile-list-item" href={url} target="_blank" rel="noreferrer" key={url}><div><strong>{title}</strong><small>{date} · LinkedIn</small></div><span>↗</span></a>)}{mediumPosts.slice(0, 3).map((post) => <a className="mobile-list-item" href={post.url} target="_blank" rel="noreferrer" key={post.url}><div><strong>{post.title}</strong><small>{post.date} · Medium</small></div><span>↗</span></a>)}</section><section className="mobile-section mobile-contact"><span className="mobile-section-label">04 / CONTACT</span><div className="mobile-links"><a href={`mailto:${identity.email}`}>Email ↗</a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={identity.medium} target="_blank" rel="noreferrer">Medium ↗</a><a href={identity.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></section></div>;
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("neutral");
  const [time, setTime] = useState("09:41");
  const [date, setDate] = useState("");
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [zOrder, setZOrder] = useState<WindowId[]>([]);
  const [windowOffsets, setWindowOffsets] = useState<Record<WindowId, Offset>>(windowDefaults);
  const [widgetPositions, setWidgetPositions] = useState<Record<HomeWidgetId, WidgetPosition>>(homeWidgetDefaults);
  const [draggingWidget, setDraggingWidget] = useState<HomeWidgetId | null>(null);
  const [cursor, setCursor] = useState({ x: 24, y: 24, hover: false, grabbing: false });
  const widgetBoardRef = useRef<HTMLDivElement>(null);
  const themes: Theme[] = ["neutral", "ink", "sand"];
  const nextTheme = useMemo(() => themes[(themes.indexOf(theme) + 1) % themes.length], [theme]);

  useEffect(() => { const update = () => { const now = new Date(); setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }).format(now)); setDate(new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(now)); }; update(); const timer = window.setInterval(update, 30_000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { document.body.style.overflow = openWindows.includes("phone") ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [openWindows]);
  useEffect(() => { const move = (event: PointerEvent) => { const target = event.target as HTMLElement; setCursor({ x: event.clientX, y: event.clientY, hover: Boolean(target.closest("a,button,.window-bar")), grabbing: event.buttons > 0 }); }; window.addEventListener("pointermove", move); return () => window.removeEventListener("pointermove", move); }, []);

  const openWindow = (id: WindowId) => { setOpenWindows((current) => current.includes(id) ? current : [...current, id]); setZOrder((current) => [...current.filter((item) => item !== id), id]); };
  const closeWindow = (id: WindowId) => { setOpenWindows((current) => current.filter((item) => item !== id)); setZOrder((current) => current.filter((item) => item !== id)); };
  const bringToFront = (id: WindowId) => { setZOrder((current) => [...current.filter((item) => item !== id), id]); setOpenWindows((current) => [...current.filter((item) => item !== id), id]); };
  const snapOffset = (offset: Offset): Offset => { if (typeof window === "undefined") return offset; const viewportWidth = window.innerWidth; const viewportHeight = window.innerHeight; const width = Math.min(720, viewportWidth - 64); const clockRight = viewportWidth * 0.068 + 178; const center = viewportWidth / 2; const safeLeft = clockRight + 24; const minimumX = Math.max(80, safeLeft - (center - width / 2)); const maximumY = Math.max(-24, Math.min(112, viewportHeight - 240)); return { x: Math.round(Math.max(minimumX, Math.min(viewportWidth * 0.38, offset.x)) / 24) * 24, y: Math.round(Math.max(-24, Math.min(maximumY, offset.y)) / 24) * 24 }; };
  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>, id: WindowId) => { if ((event.target as HTMLElement).closest("button,a")) return; event.preventDefault(); bringToFront(id); const start = { x: event.clientX, y: event.clientY }; const initial = windowOffsets[id]; const move = (next: PointerEvent) => setWindowOffsets((current) => ({ ...current, [id]: snapOffset({ x: initial.x + next.clientX - start.x, y: initial.y + next.clientY - start.y }) })); const end = () => { setCursor((current) => ({ ...current, grabbing: false })); setWindowOffsets((current) => ({ ...current, [id]: snapOffset(current[id]) })); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); }; window.addEventListener("pointermove", move); window.addEventListener("pointerup", end); };

  const nearestOpenWidgetCell = (id: HomeWidgetId, target: WidgetPosition, positions: Record<HomeWidgetId, WidgetPosition>) => {
    const cells = Array.from({ length: 8 }, (_, index) => ({ column: index % 4, row: Math.floor(index / 4) }));
    return cells.sort((a, b) => Math.abs(a.column - target.column) + Math.abs(a.row - target.row) - Math.abs(b.column - target.column) - Math.abs(b.row - target.row)).find((cell) => !Object.entries(positions).some(([otherId, position]) => otherId !== id && position.column === cell.column && position.row === cell.row)) ?? positions[id];
  };

  const beginWidgetDrag = (event: ReactPointerEvent<HTMLDivElement>, id: HomeWidgetId) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("a,button")) return;
    const board = widgetBoardRef.current;
    if (!board) return;
    event.preventDefault();
    setDraggingWidget(id);
    const move = (next: PointerEvent) => {
      const bounds = board.getBoundingClientRect();
      const target = { column: Math.max(0, Math.min(3, Math.floor(((next.clientX - bounds.left) / bounds.width) * 4))), row: Math.max(0, Math.min(1, Math.floor(((next.clientY - bounds.top) / bounds.height) * 2))) };
      setWidgetPositions((current) => ({ ...current, [id]: nearestOpenWidgetCell(id, target, current) }));
    };
    const end = () => { setDraggingWidget(null); setCursor((current) => ({ ...current, grabbing: false })); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
  };

  const windowContent = (id: WindowId) => {
    if (id === "terminal") return <TerminalContent />;
    if (id === "phone") return <MobilePortfolio prefix="phone" />;
    if (id === "work") return <><span className="eyebrow">01 / WORK</span><h2>Current roles,<br /><em>clear responsibilities.</em></h2><p className="window-intro">The two roles currently shaping the work.</p><div className="content-list">{roles.map((role, index) => <div className="content-row static-row" key={role.company}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{role.company}</h3><p>{role.description}</p><small>{role.role} · {role.dates}</small></div></div>)}</div></>;
    if (id === "github") return <><span className="eyebrow">02 / GITHUB</span><h2>Open source,<br /><em>without the noise.</em></h2><p className="window-intro">Repositories already selected for this portfolio. No star counts are shown.</p><div className="content-list">{githubRepos.map(([name, url], index) => <ExternalRow key={name} index={index + 1} title={name} meta="GitHub repository" url={url} />)}</div></>;
    if (id === "linkedin") return <><span className="eyebrow">03 / LINKEDIN</span><h2>Latest on LinkedIn,<br /><em>fixed and direct.</em></h2><p className="window-intro">These three links stay fixed. The daily feed never scrapes LinkedIn.</p><div className="content-list">{linkedinPosts.map(([dateValue, title, url], index) => <ExternalRow key={url} index={index + 1} title={title} meta={dateValue} url={url} />)}</div></>;
    if (id === "medium") return <><span className="eyebrow">04 / MEDIUM</span><h2>Latest on Medium,<br /><em>updated automatically.</em></h2><p className="window-intro">The three newest posts from the Medium RSS feed.</p><div className="content-list">{mediumPosts.slice(0, 3).map((post, index) => <ExternalRow key={post.url} index={index + 1} title={post.title} meta={post.date} description={post.summary} url={post.url} />)}</div></>;
    return <><span className="eyebrow">05 / ABOUT</span><h2>{identity.name}<br /><em>{identity.title}</em></h2><p className="window-intro">{bio}</p><span className="group-label">CURRENT ROLES</span><div className="content-list">{roles.map((role, index) => <div className="content-row static-row" key={role.company}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{role.company}</h3><p>{role.description}</p><small>{role.role} · {role.dates}</small></div></div>)}</div><span className="group-label">CONTACT</span><div className="about-links"><a href={`mailto:${identity.email}`}>Email <span>↗</span></a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href={identity.medium} target="_blank" rel="noreferrer">Medium <span>↗</span></a><a href={identity.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></>;
  };

  const dockItems: { label: string; window?: WindowId }[] = [{ label: "Home" }, { label: "Work", window: "work" }, { label: "GitHub", window: "github" }, { label: "LinkedIn", window: "linkedin" }, { label: "Medium", window: "medium" }, { label: "About", window: "about" }, { label: "Phone", window: "phone" }, { label: "Mail" }, { label: "Terminal", window: "terminal" }, { label: "Glow" }];
  const nextThemeLabel = `Switch theme: ${nextTheme}`;

  const homeWidgets = [{ id: "now" as const, content: <RoleWidget /> }, { id: "github" as const, content: <GitHubWidget /> }, { id: "linkedin" as const, content: <StoryWidget label="LATEST ON LINKEDIN" posts={linkedinPosts} source="LinkedIn" /> }, { id: "medium" as const, content: <StoryWidget label="LATEST ON MEDIUM" posts={mediumPosts.slice(0, 3).map((post) => [post.date, post.title, post.url])} source="Medium" /> }];

  return <main className={`desktop theme-${theme} ${cursor.grabbing || draggingWidget ? "is-grabbing" : ""}`}><header className="menu-bar"><strong>{identity.name}</strong><nav><button onClick={() => document.getElementById("home")?.scrollIntoView()}>Home</button><button onClick={() => openWindow("work")}>Work</button><button onClick={() => openWindow("medium")}>Writing</button></nav><span>{time} · {date}</span></header><section className="desktop-scene" id="home"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="home-shell"><div className="home-head"><Clock time={time} date={date} /><div className="hero-copy"><p className="eyebrow">AGENTIC AI ✦ MOBILE ENGINEERING</p><h1>Hello, I&apos;m<br /><em>{identity.name}.</em><br />{identity.title}</h1></div><div className="head-space" /></div><div className="home-widgets" ref={widgetBoardRef} aria-label="Draggable home widgets">{homeWidgets.map(({ id, content }) => { const position = widgetPositions[id]; return <div key={id} className={`home-widget-slot ${draggingWidget === id ? "is-dragging" : ""}`} style={{ "--widget-col": position.column, "--widget-row": position.row } as CSSProperties} onPointerDown={(event) => beginWidgetDrag(event, id)} aria-label={`Move ${id} widget`} role="group">{content}</div>; })}</div><ToolShelf /></div>{openWindows.map((id) => { const offset = windowOffsets[id]; return <div key={id} className={`window-layer ${id === "phone" ? "phone-layer" : ""}`}><div className={`content-window ${id === "terminal" ? "terminal-window" : ""} ${id === "phone" ? "phone-window-shell" : ""}`} style={{ transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px)`, zIndex: 20 + zOrder.indexOf(id) }} onPointerDown={() => bringToFront(id)}>{id === "phone" ? <div className="phone-backdrop"><button className="phone-close" onClick={() => closeWindow("phone")}>Close ×</button><div className="iphone-frame"><div className="dynamic-island" /><div className="iphone-screen"><MobilePortfolio prefix="phone" /></div></div></div> : <><WindowBar title={windowTitles[id as Exclude<WindowId, "phone">]} close={() => closeWindow(id)} onDrag={(event) => beginDrag(event, id)} />{id === "terminal" ? <TerminalContent /> : <div className="content-window-body">{windowContent(id)}</div>}</>}</div></div>; })}</section><section className="mobile-page"><MobilePortfolio prefix="mobile" /></section><nav className="dock desktop-dock" aria-label="Portfolio dock">{dockItems.map((item, index) => item.label === "Mail" ? <a className="dock-item" data-label={item.label} aria-label={item.label} href={`mailto:${identity.email}`} key={item.label}><span className={`dock-mark dock-mark-${index}`} /></a> : item.label === "Glow" ? <button className="dock-item" data-label={`${item.label} · ${nextTheme}`} aria-label={nextThemeLabel} onClick={() => setTheme(nextTheme)} key={item.label}><span className={`dock-mark dock-mark-${index}`} /></button> : <button className="dock-item" data-label={item.label} aria-label={item.label} onClick={() => item.window ? openWindow(item.window) : undefined} key={item.label}><span className={`dock-mark dock-mark-${index}`} /></button>)} </nav><nav className="mobile-dock"><button onClick={() => document.getElementById("mobile-top")?.scrollIntoView({ behavior: "smooth" })}>Home</button><button onClick={() => document.getElementById("mobile-work")?.scrollIntoView({ behavior: "smooth" })}>Work</button><button onClick={() => document.getElementById("mobile-writing")?.scrollIntoView({ behavior: "smooth" })}>Writing</button><button onClick={() => document.getElementById("mobile-about")?.scrollIntoView({ behavior: "smooth" })}>About</button></nav><div className={`custom-cursor ${cursor.hover ? "is-hover" : ""} ${cursor.grabbing ? "is-grabbing" : ""}`} style={{ left: cursor.x, top: cursor.y }} /></main>;
}

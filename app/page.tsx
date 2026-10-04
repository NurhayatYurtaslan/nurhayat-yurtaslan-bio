"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, BookOpen, BriefcaseBusiness, Building2, Folder, Github, GraduationCap, House, Linkedin, Mail, PenLine, Smartphone, Sparkles, SquareTerminal, UserRound, type LucideIcon } from "lucide-react";
import mediumPosts from "../data/medium.json";

type WindowId = "work" | "github" | "writing" | "about" | "terminal" | "phone";
type HomeWidgetId = "now" | "github" | "linkedin" | "medium";
type Theme = "neutral" | "ink" | "sand";
type Offset = { x: number; y: number };

const identity = {
  name: "Nurhayat Yurtaslan",
  title: "Agentic AI Developer | Mobile Engineer",
  homeLine: "Agentic AI Developer and Mobile Engineer. Mobile apps, agents, and open source.",
  email: "nurhayatyurtaslan38@gmail.com",
  linkedin: "https://www.linkedin.com/in/nurhayatyurtaslan",
  medium: "https://medium.com/@nurhayatyurtaslan",
  github: "https://github.com/NurhayatYurtaslan",
};

const roles = [
  { company: "Ticimax", role: "Mobile Engineer", dates: "since December 2025" },
  { company: "MasterFabric", role: "Open-source developer and volunteer trainer", dates: "since June 2025" },
];

const education = { institution: "Erciyes University", degree: "Electrical and Electronic Engineering", dates: "2018–2022" };

const githubProjects = [
  ["Expo", "https://github.com/masterfabric-mobile/masterfabric-expo"],
  ["Website", "https://github.com/masterfabric-mobile/masterfabric-website"],
  ["SwiftCamp", "https://github.com/masterfabric-mobile/swift-camp"],
  ["Manifesto", "https://github.com/masterfabric/manifesto"],
  ["Welcome", "https://github.com/gurkanfikretgunak/welcome"],
  ["Project tracker", "https://github.com/masterfabric/masterfabric-project-tracker"],
  ["One Hundred Days", "https://github.com/masterfabric/one-hundered-days"],
];

const academy = ["Academy", "https://academy-app.masterfabric.co"];

const linkedinPosts = [
  ["4 Oct 2026", "How one Laya call becomes a distribution, and where the program has to stop", "https://www.linkedin.com/pulse/how-one-laya-call-becomes-distribution-where-program-has-yurtaslan-wdrvf"],
  ["3 Oct 2026", "Jev, End to End: State, Primitives, Schemas, and the Program That Owns the Decision", "https://www.linkedin.com/pulse/jev-end-state-primitives-schemas-program-owns-nurhayat-yurtaslan-ezjef"],
  ["25 Sep 2026", "What Should a Model Know? Parametric Memory, Retrieval, and the Real Divide Between Fine-Tuning and RAG", "https://www.linkedin.com/pulse/what-should-model-know-parametric-memory-retrieval-real-yurtaslan-quvqf"],
];

const talks = [
  ["I am an Agentic AI Developer", "AI Startup Factory · Türkiye İş Bankası · Tech Istanbul"],
  ["Flutter and Cursor", "IEEE Karabük"],
];

const bio = identity.homeLine;

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
  work: { x: 84, y: 25 },
  github: { x: 108, y: 49 },
  writing: { x: 132, y: 73 },
  about: { x: 156, y: 97 },
  terminal: { x: 180, y: 25 },
  phone: { x: 0, y: 0 },
};

const windowTitles: Record<Exclude<WindowId, "phone">, string> = {
  work: "Work",
  github: "GitHub",
  writing: "Writing",
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
  return <article className="home-widget glass-card role-widget"><span className="widget-label">NOW</span>{roles.map((role) => <div className="role-line" key={role.company}><strong>{role.company}</strong><span>{role.role}, {role.dates}.</span></div>)}</article>;
}

function GitHubWidget() {
  return <article className="home-widget glass-card github-widget"><div className="widget-heading"><span className="widget-label">GITHUB</span><a href={identity.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile"><Github size={15} strokeWidth={1.7} /></a></div><div className="widget-links">{githubProjects.map(([name, url]) => <a href={url} target="_blank" rel="noreferrer" key={name}>{name}<span>↗</span></a>)}</div></article>;
}

function StoryWidget({ label, posts, source }: { label: string; posts: string[][]; source: string }) {
  return <article className="home-widget glass-card story-widget"><span className="widget-label">{label}</span>{posts.map(([date, title, url]) => <a className="story-line" href={url} target="_blank" rel="noreferrer" key={url}><strong>{title}</strong><small>{date} · {source}</small></a>)}</article>;
}

function ToolShelf() {
  return <section className="tool-shelf glass-card" aria-label="Tools"><span className="widget-label">TOOLS</span><div className="tool-grid">{tools.map(([name, slug]) => <div className="tool-item" key={name}><span className="tool-mark"><img src={`https://cdn.simpleicons.org/${slug}`} alt={`${name} official mark`} /></span><small>{name}</small></div>)}</div></section>;
}

function DesktopFolders({ openWindow }: { openWindow: (id: WindowId) => void }) {
  const folders: { label: string; window: WindowId }[] = [{ label: "Work", window: "work" }, { label: "GitHub", window: "github" }, { label: "Writing", window: "writing" }, { label: "About", window: "about" }];
  return <aside className="desktop-folders" aria-label="Desktop folders">{folders.map((folder) => <button className="desktop-folder" key={folder.label} onClick={() => openWindow(folder.window)}><Folder size={28} strokeWidth={1.5} /><span>{folder.label}</span></button>)}</aside>;
}

function TerminalContent() {
  const fullText = ["> whoami", "Nurhayat Yurtaslan", "> cat now.txt", "Agentic AI Developer | Mobile Engineer", "Ticimax · Mobile Engineer", "MasterFabric · Open-source developer", "Open source, writing, talks."].join("\n");
  const [progress, setProgress] = useState(0);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setProgress(fullText.length); return; } const timer = window.setInterval(() => setProgress((value) => Math.min(value + 1, fullText.length)), 42); return () => window.clearInterval(timer); }, [fullText.length]);
  const lines = fullText.slice(0, progress).split("\n");
  return <div className="terminal-content" aria-label="Read-only terminal output"><div className="terminal-prompt">nurhayat@portfolio:~$</div>{lines.map((line, index) => <div className={line.startsWith("> ") ? "terminal-line" : "terminal-line terminal-output"} key={`${index}-${line}`}>{line}{index === lines.length - 1 && progress < fullText.length && <span className="terminal-cursor" />}</div>)}{progress >= fullText.length && <span className="terminal-cursor" />}</div>;
}

function JobList() {
  return <div className="content-list">{roles.map((role, index) => <div className="content-row static-row" key={role.company}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{role.company}</h3><small>{role.role}, {role.dates}.</small></div></div>)}</div>;
}

function GitHubList() {
  return <div className="repo-grid">{githubProjects.map(([name, url]) => <a className="repo-card" href={url} target="_blank" rel="noreferrer" key={name}><span className="repo-mark"><Github size={19} strokeWidth={1.7} /></span><span className="repo-copy"><strong>{name}</strong><small>{url.replace("https://github.com/", "")}</small></span><ArrowUpRight className="repo-arrow" size={17} strokeWidth={1.6} /></a>)}<a className="repo-card repo-academy" href={academy[1]} target="_blank" rel="noreferrer"><span className="repo-mark"><GraduationCap size={19} strokeWidth={1.7} /></span><span className="repo-copy"><strong>{academy[0]}</strong><small>academy-app.masterfabric.co</small></span><ArrowUpRight className="repo-arrow" size={17} strokeWidth={1.6} /></a></div>;
}

function WritingList() {
  return <><span className="group-label">LINKEDIN</span><div className="content-list">{linkedinPosts.map(([date, title, url], index) => <ExternalRow key={url} index={index + 1} title={title} meta={date} url={url} />)}</div><span className="group-label">MEDIUM</span><div className="content-list">{mediumPosts.slice(0, 3).map((post, index) => <ExternalRow key={post.url} index={index + 1} title={post.title} meta={post.date} description={post.summary} url={post.url} />)}</div></>;
}

function AboutContent() {
  return <><span className="eyebrow">04 / ABOUT</span><h2>{identity.name}<br /><em>{identity.title}</em></h2><p className="window-intro">{bio}</p><span className="group-label">CURRENT ROLES</span><JobList /><span className="group-label">EDUCATION</span><div className="education-row"><strong>{education.institution}</strong><span>{education.degree} · {education.dates}</span></div><span className="group-label">TALKS</span><div className="content-list">{talks.map(([title, venue], index) => <div className="content-row static-row" key={title}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{title}</h3><small>{venue}</small></div></div>)}</div><span className="group-label">CONTACT</span><div className="about-links"><a href={`mailto:${identity.email}`}>Email <span>↗</span></a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href={identity.medium} target="_blank" rel="noreferrer">Medium <span>↗</span></a><a href={identity.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></>;
}

function MobileSectionHeading({ number, title, icon: Icon }: { number: string; title: string; icon: LucideIcon }) {
  return <div className="mobile-section-heading"><span className="mobile-section-icon"><Icon size={17} strokeWidth={1.7} /></span><span><small>{number}</small><strong>{title}</strong></span></div>;
}

function MobilePortfolio({ prefix }: { prefix: string }) {
  return <div className="mobile-portfolio-content" id={`${prefix}-top`}>
    <header className="mobile-profile-head">
      <div className="mobile-profile-mark"><UserRound size={21} strokeWidth={1.6} /></div>
      <span className="mobile-kicker">PERSONAL PORTFOLIO</span>
      <h2>{identity.name}</h2>
      <p>{identity.title}</p>
    </header>
    <section className="mobile-section" id={`${prefix}-about`}>
      <MobileSectionHeading number="01" title="About" icon={UserRound} />
      <p>{bio}</p>
    </section>
    <section className="mobile-section" id={`${prefix}-work`}>
      <MobileSectionHeading number="02" title="Experience" icon={BriefcaseBusiness} />
      <div className="mobile-experience-list">{roles.map((role) => <article className="mobile-experience-card" key={role.company}>
        <span className="mobile-experience-icon"><Building2 size={17} strokeWidth={1.7} /></span>
        <span className="mobile-experience-copy"><strong>{role.company}</strong><span>{role.role}</span><small>{role.dates}</small></span>
      </article>)}</div>
      <div className="mobile-subheading"><Github size={14} strokeWidth={1.8} /><span>Open source</span></div>
      <div className="mobile-repo-list">{githubProjects.map(([name, url]) => <a className="mobile-repo-card" href={url} target="_blank" rel="noreferrer" key={url}>
        <Github size={16} strokeWidth={1.8} /><span><strong>{name}</strong><small>{url.replace("https://github.com/", "")}</small></span><ArrowUpRight size={16} strokeWidth={1.6} />
      </a>)}</div>
      <a className="mobile-repo-card mobile-academy-card" href={academy[1]} target="_blank" rel="noreferrer"><GraduationCap size={17} strokeWidth={1.8} /><span><strong>{academy[0]}</strong><small>academy-app.masterfabric.co</small></span><ArrowUpRight size={16} strokeWidth={1.6} /></a>
    </section>
    <section className="mobile-section" id={`${prefix}-writing`}>
      <MobileSectionHeading number="03" title="Writing" icon={BookOpen} />
      <div className="mobile-subheading"><BookOpen size={14} strokeWidth={1.8} /><span>Medium</span></div>
      <div className="mobile-writing-list">{mediumPosts.slice(0, 3).map((post) => <a className="mobile-writing-card" href={post.url} target="_blank" rel="noreferrer" key={post.url}>
        <span><strong>{post.title}</strong><small>{post.date} · Medium</small></span><ArrowUpRight size={16} strokeWidth={1.6} />
      </a>)}</div>
      <div className="mobile-subheading"><Linkedin size={14} strokeWidth={1.8} /><span>LinkedIn</span></div>
      <div className="mobile-writing-list">{linkedinPosts.map(([date, title, url]) => <a className="mobile-writing-card" href={url} target="_blank" rel="noreferrer" key={url}>
        <span><strong>{title}</strong><small>{date} · LinkedIn</small></span><ArrowUpRight size={16} strokeWidth={1.6} />
      </a>)}</div>
    </section>
    <section className="mobile-section mobile-contact" id={`${prefix}-contact`}>
      <MobileSectionHeading number="04" title="Contact" icon={Mail} />
      <div className="mobile-contact-grid">
        <a href={`mailto:${identity.email}`}><Mail size={17} /><span>Email</span><ArrowUpRight size={14} /></a>
        <a href={identity.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /><span>LinkedIn</span><ArrowUpRight size={14} /></a>
        <a href={identity.medium} target="_blank" rel="noreferrer"><BookOpen size={17} /><span>Medium</span><ArrowUpRight size={14} /></a>
        <a href={identity.github} target="_blank" rel="noreferrer"><Github size={17} /><span>GitHub</span><ArrowUpRight size={14} /></a>
      </div>
    </section>
  </div>;
}

function HomeWidgetGrid({ widgets, onDraggingChange }: {
  widgets: { id: HomeWidgetId; content: ReactNode }[];
  onDraggingChange: (id: HomeWidgetId | null) => void;
}) {
  const [order, setOrder] = useState<HomeWidgetId[]>(["now", "github", "linkedin", "medium"]);
  const [draggingId, setDraggingId] = useState<HomeWidgetId | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const stopDragRef = useRef<(() => void) | null>(null);
  useEffect(() => () => stopDragRef.current?.(), []);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>, id: HomeWidgetId) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("a,button")) return;
    const board = boardRef.current;
    if (!board) return;
    stopDragRef.current?.();
    event.preventDefault();
    const start = { x: event.clientX, y: event.clientY };
    const pointerId = event.pointerId;
    let active = false;
    const move = (next: PointerEvent) => {
      if (next.pointerId !== pointerId) return;
      if (!active && Math.hypot(next.clientX - start.x, next.clientY - start.y) < 5) return;
      if (!active) { active = true; setDraggingId(id); onDraggingChange(id); }
      const slots = Array.from(board.children).map((slot) => slot.getBoundingClientRect());
      const targetIndex = slots.reduce((nearest, rect, index) => {
        const distance = (box: DOMRect) => Math.hypot(next.clientX - (box.left + box.width / 2), next.clientY - (box.top + box.height / 2));
        return distance(rect) < distance(slots[nearest]) ? index : nearest;
      }, 0);
      setOrder((current) => {
        const currentIndex = current.indexOf(id);
        if (currentIndex === targetIndex) return current;
        const reordered = [...current];
        reordered.splice(currentIndex, 1);
        reordered.splice(targetIndex, 0, id);
        return reordered;
      });
    };
    const stop = () => {
      setDraggingId(null);
      onDraggingChange(null);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      stopDragRef.current = null;
    };
    stopDragRef.current = stop;
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  };

  const moveWithKeyboard = (id: HomeWidgetId, direction: number) => {
    setOrder((current) => {
      const index = current.indexOf(id);
      const target = Math.max(0, Math.min(current.length - 1, index + direction));
      const reordered = [...current];
      reordered.splice(index, 1);
      reordered.splice(target, 0, id);
      return reordered;
    });
  };

  return <div className="home-widgets" ref={boardRef} aria-label="Draggable home widgets">
    {order.map((id) => <div key={id} data-widget-id={id} className={`home-widget-slot ${draggingId === id ? "is-dragging" : ""}`} role="group" tabIndex={0} aria-label={`${id} widget. Drag to reorder, or use arrow keys.`} onPointerDown={(event) => beginDrag(event, id)} onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)) {
          event.preventDefault();
          moveWithKeyboard(id, ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1);
        }
      }}>
      {widgets.find((widget) => widget.id === id)?.content}
    </div>)}
  </div>;
}

function PointerLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;
    const enabled = window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 801px)");
    let frame = 0;
    let previousTime = 0;
    let position = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    let target = { ...position };

    const paint = () => {
      light.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
    };
    const animate = (timestamp: number) => {
      frame = 0;
      if (!enabled.matches) return;
      const elapsed = previousTime ? Math.min(timestamp - previousTime, 64) : 16;
      previousTime = timestamp;
      const easing = 1 - Math.exp(-elapsed / 100);
      position = { x: position.x + (target.x - position.x) * easing, y: position.y + (target.y - position.y) * easing };
      paint();
      if (Math.hypot(target.x - position.x, target.y - position.y) > 0.5) {
        frame = window.requestAnimationFrame(animate);
      } else {
        previousTime = 0;
      }
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType === "touch") return;
      target = { x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(animate);
    };
    const syncMotion = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      target = { ...position };
    };

    paint();
    window.addEventListener("pointermove", move, { passive: true });
    enabled.addEventListener("change", syncMotion);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      enabled.removeEventListener("change", syncMotion);
    };
  }, []);

  return <div className="pointer-light" ref={lightRef} aria-hidden="true" />;
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("neutral");
  const [time, setTime] = useState("09:41");
  const [date, setDate] = useState("");
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [zOrder, setZOrder] = useState<WindowId[]>([]);
  const [windowOffsets, setWindowOffsets] = useState<Record<WindowId, Offset>>(windowDefaults);
  const [draggingWidget, setDraggingWidget] = useState<HomeWidgetId | null>(null);
  const [cursor, setCursor] = useState({ x: 24, y: 24, hover: false, grabbing: false, text: false });
  const themes: Theme[] = ["neutral", "ink", "sand"];
  const nextTheme = useMemo(() => themes[(themes.indexOf(theme) + 1) % themes.length], [theme]);

  useEffect(() => { const update = () => { const now = new Date(); setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }).format(now)); setDate(new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(now)); }; update(); const timer = window.setInterval(update, 30_000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { document.body.style.overflow = openWindows.includes("phone") ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [openWindows]);
  useEffect(() => { const move = (event: PointerEvent) => { const target = event.target as HTMLElement; const textField = target.closest("input,textarea,[contenteditable=true]"); setCursor({ x: event.clientX, y: event.clientY, hover: Boolean(target.closest("a,button,.window-bar")), grabbing: event.buttons > 0, text: Boolean(textField) }); }; window.addEventListener("pointermove", move); return () => window.removeEventListener("pointermove", move); }, []);

  const openWindow = (id: WindowId) => { if (id !== "phone") setWindowOffsets((current) => ({ ...current, [id]: snapOffset(current[id]) })); setOpenWindows((current) => current.includes(id) ? current : [...current, id]); setZOrder((current) => [...current.filter((item) => item !== id), id]); };
  const closeWindow = (id: WindowId) => { setOpenWindows((current) => current.filter((item) => item !== id)); setZOrder((current) => current.filter((item) => item !== id)); };
  const goHome = () => { setOpenWindows([]); setZOrder([]); document.getElementById("home")?.scrollIntoView(); };
  const bringToFront = (id: WindowId) => { setZOrder((current) => [...current.filter((item) => item !== id), id]); setOpenWindows((current) => [...current.filter((item) => item !== id), id]); };
  const snapOffset = (offset: Offset): Offset => {
    const clock = document.querySelector(".clock-card")?.getBoundingClientRect();
    const safeLeft = (clock?.right ?? 200) + 18;
    const width = Math.min(720, window.innerWidth - safeLeft - 24);
    const left = window.innerWidth / 2 - width / 2;
    const minimumX = safeLeft - left;
    const maximumX = window.innerWidth - 24 - width - left;
    const maximumY = Math.max(0, window.innerHeight - 140 - Math.min(560, window.innerHeight - 160));
    return { x: Math.max(minimumX, Math.min(maximumX, Math.round(offset.x / 12) * 12)), y: Math.max(0, Math.min(maximumY, Math.round(offset.y / 12) * 12)) };
  };
  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>, id: WindowId) => { if ((event.target as HTMLElement).closest("button,a")) return; event.preventDefault(); bringToFront(id); const start = { x: event.clientX, y: event.clientY }; const initial = windowOffsets[id]; const move = (next: PointerEvent) => setWindowOffsets((current) => ({ ...current, [id]: snapOffset({ x: initial.x + next.clientX - start.x, y: initial.y + next.clientY - start.y }) })); const end = () => { setCursor((current) => ({ ...current, grabbing: false })); setWindowOffsets((current) => ({ ...current, [id]: snapOffset(current[id]) })); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); }; window.addEventListener("pointermove", move); window.addEventListener("pointerup", end); };


  const windowContent = (id: WindowId) => {
    if (id === "terminal") return <TerminalContent />;
    if (id === "phone") return <MobilePortfolio prefix="phone" />;
    if (id === "work") return <><span className="eyebrow">01 / WORK</span><h2>Current roles,<br /><em>clear responsibilities.</em></h2><p className="window-intro">The roles currently listed for this portfolio.</p><JobList /></>;
    if (id === "github") return <><span className="eyebrow">02 / GITHUB</span><h2>Open source,<br /><em>without the noise.</em></h2><p className="window-intro">Selected repositories and the MasterFabric Academy.</p><GitHubList /></>;
    if (id === "writing") return <><span className="eyebrow">03 / WRITING</span><h2>Writing and posts,<br /><em>fixed and direct.</em></h2><p className="window-intro">LinkedIn links stay fixed. Medium data is updated by its daily RSS workflow.</p><WritingList /></>;
    return <AboutContent />;
  };

  const dockItems: { label: string; icon: LucideIcon; window?: WindowId }[] = [{ label: "Home", icon: House }, { label: "Work", icon: BriefcaseBusiness, window: "work" }, { label: "GitHub", icon: Github, window: "github" }, { label: "Writing", icon: PenLine, window: "writing" }, { label: "About", icon: UserRound, window: "about" }, { label: "Phone", icon: Smartphone, window: "phone" }, { label: "Mail", icon: Mail }, { label: "Terminal", icon: SquareTerminal, window: "terminal" }, { label: "Theme", icon: Sparkles }];
  const homeWidgets = [{ id: "now" as const, content: <RoleWidget /> }, { id: "github" as const, content: <GitHubWidget /> }, { id: "linkedin" as const, content: <StoryWidget label="LATEST ON LINKEDIN" posts={linkedinPosts} source="LinkedIn" /> }, { id: "medium" as const, content: <StoryWidget label="LATEST ON MEDIUM" posts={mediumPosts.slice(0, 3).map((post) => [post.date, post.title, post.url])} source="Medium" /> }];

  return <main className={`desktop theme-${theme} ${cursor.grabbing || draggingWidget ? "is-grabbing" : ""}`}><header className="menu-bar"><strong>{identity.name}</strong><nav><button onClick={goHome}>Home</button><button onClick={() => openWindow("work")}>Work</button><button onClick={() => openWindow("writing")}>Writing</button></nav><span>{time} · {date}</span></header><section className="desktop-scene" id="home"><PointerLight /><div className="ambient ambient-one" /><div className="ambient ambient-two" /><DesktopFolders openWindow={openWindow} /><div className="home-shell"><div className="home-head"><Clock time={time} date={date} /><div className="hero-copy"><p className="eyebrow">AGENTIC AI ✦ MOBILE ENGINEERING</p><h1>{identity.name}<br /><em>{identity.title}</em></h1><p className="hero-line">{identity.homeLine}</p></div><div className="head-space" /></div><HomeWidgetGrid widgets={homeWidgets} onDraggingChange={(id) => { setDraggingWidget(id); if (!id) setCursor((current) => ({ ...current, grabbing: false })); }} /><ToolShelf /></div>{openWindows.map((id) => { const offset = windowOffsets[id]; return <div key={id} className={`window-layer ${id === "phone" ? "phone-layer" : ""}`} style={{ zIndex: 20 + zOrder.indexOf(id) }}><div className={`content-window ${id === "terminal" ? "terminal-window" : ""} ${id === "phone" ? "phone-window-shell" : ""}`} style={{ transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px)`, zIndex: 20 + zOrder.indexOf(id) }} onPointerDown={() => bringToFront(id)}>{id === "phone" ? <div className="phone-backdrop"><button className="phone-close" aria-label="Close phone portfolio" onClick={() => closeWindow("phone")}>×</button><div className="iphone-frame"><div className="dynamic-island" /><div className="iphone-screen" tabIndex={0} aria-label="Scrollable phone portfolio"><MobilePortfolio prefix="phone" /></div></div></div> : <><WindowBar title={windowTitles[id]} close={() => closeWindow(id)} onDrag={(event) => beginDrag(event, id)} />{id === "terminal" ? <TerminalContent /> : <div className="content-window-body">{windowContent(id)}</div>}</>}</div></div>; })}</section><section className="mobile-page"><MobilePortfolio prefix="mobile" /></section><nav className="dock desktop-dock" aria-label="Portfolio dock">{dockItems.map((item, index) => { const Icon = item.icon; if (item.label === "Mail") return <a className="dock-item" data-label={item.label} aria-label={item.label} href={`mailto:${identity.email}`} key={item.label}><Icon size={18} strokeWidth={1.7} /></a>; if (item.label === "Theme") return <button className="dock-item" data-label={`${item.label} · ${nextTheme}`} aria-label={`Switch theme to ${nextTheme}`} onClick={() => setTheme(nextTheme)} key={item.label}><Icon size={18} strokeWidth={1.7} /></button>; return <button className="dock-item" data-label={item.label} aria-label={item.label} onClick={() => item.label === "Home" ? goHome() : item.window ? openWindow(item.window) : undefined} key={item.label}><Icon size={18} strokeWidth={1.7} /></button>; })}</nav><nav className="mobile-dock"><button onClick={() => document.getElementById("mobile-top")?.scrollIntoView({ behavior: "smooth" })}>Home</button><button onClick={() => document.getElementById("mobile-work")?.scrollIntoView({ behavior: "smooth" })}>Work</button><button onClick={() => document.getElementById("mobile-writing")?.scrollIntoView({ behavior: "smooth" })}>Writing</button><button onClick={() => document.getElementById("mobile-about")?.scrollIntoView({ behavior: "smooth" })}>About</button></nav><div className={`custom-cursor ${cursor.hover ? "is-hover" : ""} ${cursor.grabbing ? "is-grabbing" : ""} ${cursor.text ? "is-text" : ""}`} style={{ left: cursor.x, top: cursor.y }} /></main>;
}

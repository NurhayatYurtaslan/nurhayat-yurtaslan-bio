"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, BookOpen, BriefcaseBusiness, Building2, Folder, Github, GraduationCap, House, Linkedin, Mail, Maximize2, Minimize2, Minus, PenLine, Smartphone, Sparkles, SquareTerminal, UserRound, type LucideIcon } from "lucide-react";
import mediumPosts from "../data/medium.json";
import StateRobot from "./state-robot";
import SessionReadout from "./session-readout";
import BootScreen from "./boot-screen";

type WindowId = "work" | "github" | "writing" | "about" | "terminal" | `${"terminal" | "work" | "github" | "writing" | "about"}-${number}` | "phone";
type HomeWidgetId = "github" | "linkedin" | "medium";
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

const windowDefaults: Record<string, Offset> = {
  work: { x: 84, y: 25 },
  github: { x: 108, y: 49 },
  writing: { x: 132, y: 73 },
  about: { x: 156, y: 97 },
  terminal: { x: 180, y: 25 },
  phone: { x: 0, y: 0 },
};

const windowTitles: Record<string, string> = {
  work: "Work",
  github: "GitHub",
  writing: "Writing",
  about: "About",
  terminal: "Terminal",
};

function ExternalRow({ index, title, meta, description, url }: { index: number; title: string; meta: string; description?: string; url: string }) {
  return <a className="content-row" href={url} target="_blank" rel="noreferrer"><span className="row-index">{String(index).padStart(2, "0")}</span><div className="row-main"><h3>{title}</h3>{description && <p>{description}</p>}<small>{meta}</small></div><span className="row-arrow">↗</span></a>;
}

function WindowBar({ title, signature, close, minimize, toggleFullscreen, isFullscreen, onDrag }: { title: string; signature: boolean; close: () => void; minimize: () => void; toggleFullscreen: () => void; isFullscreen: boolean; onDrag: (event: ReactPointerEvent<HTMLDivElement>) => void }) {
  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => event.stopPropagation();
  return <div className="window-bar" onPointerDown={onDrag}><div className="window-controls" onPointerDown={stopDrag}><button className="window-control-close" onClick={close} aria-label={`Close ${title} window`}><span>×</span></button><button className="window-control-minimize" onClick={minimize} aria-label={`Minimize ${title} window`}><Minus size={8} /></button><button className="window-control-fullscreen" onClick={toggleFullscreen} aria-label={`${isFullscreen ? "Exit full screen" : "Enter full screen"} for ${title} window`}>{isFullscreen ? <Minimize2 size={7} /> : <Maximize2 size={7} />}</button></div><span>{signature && <span className="signature-mark" aria-hidden="true">✦ </span>}{title}</span><span className="window-meta" aria-hidden="true" /></div>;
}

function Clock({ time, date, hourAngle, minuteAngle }: { time: string; date: string; hourAngle: number; minuteAngle: number }) {
  return <article className="clock-card glass-card"><span className="widget-label">ISTANBUL</span><div className="clock-face"><span className="clock-tick t1" /><span className="clock-tick t2" /><span className="clock-tick t3" /><span className="clock-tick t4" /><span className="clock-hand hour" style={{ transform: `rotate(${hourAngle}deg)` }} /><span className="clock-hand minute" style={{ transform: `rotate(${minuteAngle}deg)` }} /><span className="clock-dot" /></div><div className="clock-caption"><span>LOCAL TIME</span><b>{time}</b></div><div className="clock-date">{date}</div></article>;
}

type GitHubActivity = { syncedAt?: string; total: number; days: { date: string; count: number; level: number }[]; breakdown: { commits: number; reviews: number; issues: number; pullRequests: number } | null };

function GlassState({ loading = false, children }: { loading?: boolean; children?: ReactNode }) {
  return <div className="glass-inline-state" role="status">{loading ? <><span className="loading-mark" aria-hidden="true">✦</span><p>Loading.</p></> : <><StateRobot mood={children ? "offline" : "empty"} /><p>{children ?? "Nothing here yet."}</p></>}</div>;
}

function useMediumFeed() {
  const [posts, setPosts] = useState<typeof mediumPosts>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/medium", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Medium unavailable");
      const data = await response.json();
      if (!Array.isArray(data.posts)) throw new Error("Invalid Medium data");
      setPosts(data.posts); setStatus("ready");
    }).catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, []);
  return { posts, status };
}

function GitHubActivityWidget() {
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [palette, setPalette] = useState("blue");
  const [activity, setActivity] = useState<GitHubActivity | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    try { const saved = localStorage.getItem("github-last-sync"); if (saved && Number.isFinite(Date.parse(saved))) setLastSync(saved); } catch {}
    fetch("/api/usage", { signal: controller.signal }).then(r => r.ok ? r.json() : null).then(data => {
      if (controller.signal.aborted) return;
      setActivity(data?.github ?? null);
      const syncedAt = data?.github?.syncedAt;
      if (typeof syncedAt === "string" && Number.isFinite(Date.parse(syncedAt))) {
        setLastSync(syncedAt);
        try { localStorage.setItem("github-last-sync", syncedAt); } catch {}
      }
    }).catch(() => {}).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  const categories = activity?.breakdown ? [
    ["Commits", activity.breakdown.commits], ["Code review", activity.breakdown.reviews],
    ["Issues", activity.breakdown.issues], ["Pull requests", activity.breakdown.pullRequests],
  ] as const : null;
  const sum = categories?.reduce((total, [, count]) => total + count, 0) ?? 0;
  const values = categories?.map(([, count]) => sum ? count / sum : 0) ?? [];
  const monthStarts = activity?.days.filter((day, index) => index === 0 || day.date.slice(5, 7) !== activity.days[index - 1].date.slice(5, 7)) ?? [];
  return <article className="home-widget glass-card github-activity-widget" data-palette={palette} aria-label="GitHub contributions">
    <div className="usage-card-heading"><span className="widget-label">GITHUB CONTRIBUTIONS</span><a href={identity.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile"><Github size={16} /></a></div>
    {loading ? <GlassState loading /> : !activity ? <div className="glass-inline-state" role="status"><StateRobot mood="offline" /><strong className="widget-label">GITHUB / TEMPORARILY OFFLINE</strong><p>{lastSync ? "Last synced · " + new Date(lastSync).toLocaleString("en-GB", { timeZone: "Europe/Istanbul" }) : "Not synced yet."}</p></div> : null}
    {activity && <><p className="contribution-total"><strong>{activity.total.toLocaleString("en-US")}</strong> contributions in the last year</p>
      <div className="contribution-scroll" tabIndex={0} aria-label="Scrollable yearly contribution calendar">
        <div className="contribution-months">{monthStarts.map(day => <span key={day.date}>{new Date(day.date + "T12:00:00Z").toLocaleString("en-US", { month: "short", timeZone: "UTC" })}</span>)}</div>
        <div className="contribution-grid">{activity.days.map((day, index) => <span key={day.date} data-level={day.level} style={index === 0 ? { gridRowStart: new Date(day.date + "T12:00:00Z").getUTCDay() + 1 } : undefined} title={day.date + ": " + day.count + " contributions"} aria-label={day.date + ": " + day.count + " contributions"} />)}</div>
      </div>
      <div className="contribution-color-controls" role="group" aria-label="Contribution colors">{["blue", "violet", "amber"].map(color => <button key={color} data-color={color} aria-label={color + " contribution colors"} aria-pressed={palette === color} onClick={() => setPalette(color)}><span aria-hidden="true" /><b>{color}</b><i aria-hidden="true">{palette === color ? "✓" : ""}</i></button>)}</div>
      <div className="contribution-legend"><span>Less</span>{[0,1,2,3,4].map(level => <i key={level} data-level={level} />)}<span>More</span></div>
      {categories && sum > 0 && <div className="contribution-breakdown">
        <svg viewBox="0 0 260 170" role="img" aria-label="Contribution activity distribution">
          <path d="M45 85H215M130 25V145" fill="none" stroke="var(--contribution-3)" strokeWidth="1.5" />
          <polygon points={`${130 - values[0] * 85},85 130,${85 - values[1] * 60} ${130 + values[2] * 85},85 130,${85 + values[3] * 60}`} fill="var(--contribution-3)" fillOpacity=".5" stroke="var(--contribution-3)" strokeWidth="2" />
          {categories.map(([label, count], index) => <text key={label} x={[4,130,256,130][index]} y={[78,10,78,160][index]} textAnchor={index === 0 ? "start" : index === 2 ? "end" : "middle"}><tspan>{Math.round(count / sum * 100)}%</tspan><tspan x={[4,130,256,130][index]} dy="12">{label}</tspan></text>)}
        </svg>
      </div>}
    </>}
  </article>;
}

function StoryWidget({ label, posts, source }: { label: string; posts: string[][]; source: string }) {
  return <article className="home-widget glass-card story-widget"><span className="widget-label">{label}</span>{posts.map(([date, title, url]) => <a className="story-line" href={url} target="_blank" rel="noreferrer" key={url}><strong>{title}</strong><small>{date} · {source}</small></a>)}</article>;
}

function ToolShelf() {
  const groups = [
    { label: "Mobile", names: ["Flutter", "Dart", "Swift", "Expo", "React Native"] },
    { label: "Systems", names: ["Go", "TypeScript", "Next.js"] },
    { label: "Build", names: ["Cursor", "GitHub", "Xcode"] },
  ];
  const hints: Record<string, string> = { Flutter: "Primary mobile stack", Go: "Backend and systems", Cursor: "AI-native development" };
  return <section className="tool-shelf glass-card" aria-label="Tools"><span className="widget-label">TOOLS</span><div className="tool-groups">{groups.map(group => <div className="tool-group" key={group.label}><span className="tool-group-label">{group.label}</span><div className="tool-group-marks">{group.names.map(name => { const tool = tools.find(([label]) => label === name)!; return <div className="tool-item" tabIndex={hints[name] ? 0 : undefined} key={name}><span className="tool-mark"><img src={`https://cdn.simpleicons.org/${tool[1]}`} alt={name + " official mark"} /></span><small>{name}</small>{hints[name] && <span className="tool-hint">{hints[name]}</span>}</div>; })}</div></div>)}</div></section>;
}

function DesktopFolders({ openWindow }: { openWindow: (id: WindowId) => void }) {
  const folders: { label: string; window: WindowId }[] = [{ label: "Work", window: "work" }, { label: "Writing", window: "writing" }];
  return <aside className="desktop-folders" aria-label="Desktop folders">{folders.map((folder) => <button className="desktop-folder" key={folder.label} onClick={() => openWindow(folder.window)}><Folder size={28} strokeWidth={1.5} /><span>{folder.label}</span></button>)}</aside>;
}

function TerminalContent({ openWindow }: { openWindow: (id: WindowId) => void }) {
  const terminalId = useId();
  const fullText = ["whoami", "Nurhayat Yurtaslan", "cat now.txt", identity.title, "Ticimax · Mobile Developer", "MasterFabric · Open-source developer"].join("\n");
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState("");
  const [suggestions, setSuggestions] = useState(false);
  const [cleared, setCleared] = useState(false);
  const commands = ["/help", "/whoami", "/now", "/work", "/writing", "/about", "/contact", "/clear"];
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const scroller = outputRef.current?.closest(".terminal-content"); if (scroller) scroller.scrollTop = scroller.scrollHeight; }, [progress, history]);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setProgress(fullText.length); return; } const timer = window.setInterval(() => setProgress((value) => Math.min(value + 1, fullText.length)), 42); return () => window.clearInterval(timer); }, [fullText.length]);
  const lines = cleared ? ["whoami", identity.name] : fullText.slice(0, progress).split("\n");
  function submit(value = command) {
    const raw = value.trim();
    const word = raw.replace(/^\//, "");
    setCommand("");
    setSuggestions(false);
    if (!commands.includes(`/${word}`)) return;
    if (word === "clear") { setHistory([]); setCleared(true); setProgress(fullText.length); inputRef.current?.focus(); return; }
    let output: string[];
    if (word === "help") output = commands;
    else if (word === "whoami") output = [identity.name];
    else if (word === "now") output = [identity.title, "Ticimax · Mobile Developer", "MasterFabric · Open-source developer"];
    else if (word === "contact") output = [identity.email, identity.linkedin, identity.medium, identity.github];
    else if (word === "work" || word === "writing" || word === "about") { openWindow(word); output = []; }
    else return;
    setHistory(previous => [...previous, ...output]);
  }
  return <div ref={outputRef} className="terminal-lines" aria-label="Portfolio terminal"><div role="log" aria-live="polite" aria-relevant="additions">{lines.map((line, index) => <div className="terminal-line" key={index}>{line}{index === lines.length - 1 && progress < fullText.length && <span className="terminal-cursor" />}</div>)}{history.map((line, index) => <div className="terminal-line" key={`history-${index}`}>{line}</div>)}</div>{progress >= fullText.length && <><form className="terminal-command" onSubmit={event => { event.preventDefault(); submit(); }}><button type="button" className="terminal-input-cursor" aria-label="Show commands" aria-expanded={suggestions} aria-controls={`${terminalId}-suggestions`} onClick={() => { setSuggestions(value => !value); inputRef.current?.focus(); }}>│</button><input ref={inputRef} id={`${terminalId}-command`} value={command} onClick={() => setSuggestions(true)} onKeyDown={event => { if (event.key === "Escape" && suggestions) { event.stopPropagation(); setSuggestions(false); } }} onChange={event => { setCommand(event.target.value); setSuggestions(true); }} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Portfolio command" aria-expanded={suggestions} aria-controls={`${terminalId}-suggestions`} /></form>{suggestions && <div id={`${terminalId}-suggestions`} className="terminal-suggestions" role="group" aria-label="Available commands">{commands.map(value => <button key={value} onClick={() => submit(value)}>{value}</button>)}</div>}</>}</div>;
}

function JobList() {
  return <div className="content-list">{roles.map((role, index) => <div className="content-row static-row" key={role.company}><span className="row-index">{String(index + 1).padStart(2, "0")}</span><div className="row-main"><h3>{role.company}</h3><small>{role.role}, {role.dates}.</small></div></div>)}</div>;
}

function GitHubList() {
  return <div className="repo-grid">{githubProjects.length === 0 && <GlassState />}{githubProjects.map(([name, url]) => <a className="repo-card" href={url} target="_blank" rel="noreferrer" key={name}><span className="repo-mark"><Github size={19} strokeWidth={1.7} /></span><span className="repo-copy"><strong>{name}</strong><small>{url.replace("https://github.com/", "")}</small></span><ArrowUpRight className="repo-arrow" size={17} strokeWidth={1.6} /></a>)}<a className="repo-card repo-academy" href={academy[1]} target="_blank" rel="noreferrer"><span className="repo-mark"><GraduationCap size={19} strokeWidth={1.7} /></span><span className="repo-copy"><strong>{academy[0]}</strong><small>academy-app.masterfabric.co</small></span><ArrowUpRight className="repo-arrow" size={17} strokeWidth={1.6} /></a></div>;
}

function SelectedWork() {
  const [selected, setSelected] = useState<number | null>(null);
  const descriptions = ["Cross-platform application framework with theming, internationalization, and developer tools.","The MasterFabric website.","A non-profit Swift project supported by MasterFabric and EduTech.","The MasterFabric Manifesto project.","A developer onboarding portal.","The MasterFabric Project Tracker project.","A developer internship roadmap.","The MasterFabric Academy application."];
  const stacks = ["React Native · Expo · TypeScript","TypeScript","Swift","TypeScript","Next.js · Supabase · TypeScript","TypeScript","TypeScript",""];
  const projects = [...githubProjects, academy].map(([name, url], index) => ({ name: name === "Project tracker" ? "Project Tracker" : name, url, description: descriptions[index], stack: stacks[index] })).filter(project => project.name !== "Website");
  const project = selected === null ? null : projects[selected];
  if (project) return <div className="work-document"><button className="work-back" onClick={() => setSelected(null)}>← Selected Work</button><div className="work-file-label">{project.name.replaceAll(" ", "-")}.md</div><article><h3>{project.name}</h3><p>{project.description}</p>{project.stack && <><h4>Stack</h4><p>{project.stack}</p></>}<h4>Project link</h4><a href={project.url} target="_blank" rel="noreferrer">{project.url} <ArrowUpRight size={16} /></a></article></div>;
  return <div className="work-folders">{projects.length === 0 && <GlassState />}{projects.map((project, index) => <button className="work-project-folder" key={project.url} onClick={() => setSelected(index)}><Folder size={48} strokeWidth={1.2} /><span>{project.name}</span><small>Open project.md</small></button>)}</div>;
}

function WritingList() {
  const feed = useMediumFeed();
  const [selected, setSelected] = useState<string | null>(null);
  const [reading, setReading] = useState(false);
  const post = feed.posts.find(item => item.url === selected);
  if (feed.status === "loading") return <GlassState loading />;
  if (feed.status === "error") return <GlassState>Medium is temporarily unavailable.</GlassState>;
  const root = () => { setSelected(null); setReading(false); };
  return <div className="finder-browser"><aside className="finder-sidebar"><small>FAVORITES</small><button onClick={root} aria-current={!post ? "page" : undefined}><Folder size={16} /> Writing</button><small>MEDIUM</small>{feed.posts.map(item => <button key={item.url} aria-current={item.url === selected ? "page" : undefined} onClick={() => { setSelected(item.url); setReading(false); }}><Folder size={15} /><span>{item.title}</span></button>)}</aside><div className="finder-main"><header className="finder-toolbar"><button aria-label="Back to parent folder" disabled={!post} onClick={() => reading ? setReading(false) : root()}>‹</button><strong>{reading ? "article.md" : post?.title ?? "Writing"}</strong><span className="finder-view-label">{reading ? "Preview" : "Icon view"}</span></header><div className="finder-files">{post ? reading ? <div className="work-document"><article><h3>{post.title}</h3><small>{post.date} · Medium</small><p>{post.summary || "Preview unavailable. Read the original article on Medium."}</p><a href={post.url} target="_blank" rel="noreferrer">Continue on Medium <ArrowUpRight size={16} /></a></article></div> : <button className="writing-md-file finder-file" onClick={() => setReading(true)}><span className="md-document-icon" aria-hidden="true">MD</span><span>article.md</span><small>Markdown document</small></button> : <div className="work-folders writing-folders">{feed.posts.length === 0 && <GlassState />}{feed.posts.map(item => <button className="work-project-folder" key={item.url} onClick={() => { setSelected(item.url); setReading(false); }}><Folder size={48} strokeWidth={1.2} /><span>{item.title}</span><small>{item.date}</small></button>)}</div>}</div><footer className="finder-path"><button onClick={root}>Writing</button>{post && <><span>›</span><button onClick={() => setReading(false)}>{post.title}</button></>}{reading && <><span>›</span><span>article.md</span></>}<small>{post ? "1 item" : `${feed.posts.length} items`}</small></footer></div></div>;
}

function AboutContent({ time, date }: { time: string; date: string }) {
  return <div className="about-page"><span className="eyebrow">ABOUT</span><h2>Nurhayat Yurtaslan</h2>
    <div className="about-bio"><p>Nurhayat works at Ticimax as a Mobile Engineer and contributes to MasterFabric as an open-source developer and volunteer trainer.</p><p>Her work spans mobile applications, agents, and open source. She shares what she learns through technical writing and training.</p></div>
    <section className="editorial-now"><h3 className="group-label">Now</h3>{roles.map(role => <div key={role.company}><h3>{role.role}</h3><p>{role.company}</p><small>{role.dates}</small></div>)}</section>
    <section className="education-block glass-card"><h3>Education</h3><strong>{education.institution}</strong><p>{education.degree}</p><span>{education.dates}</span><p>A bachelor’s degree in electrical and electronic engineering.</p></section>
    <section className="about-group"><h3>Contact</h3><div className="about-links"><a href={`mailto:${identity.email}`}>{identity.email}<span>↗</span></a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href={identity.medium} target="_blank" rel="noreferrer">Medium <span>↗</span></a><a href={identity.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></section>
    <footer className="about-footer"><p>Let's build something that thinks.</p><small>Istanbul · <time>{time}</time> · {date}</small></footer>
  </div>;
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

type PhoneScreen = "home" | "work" | "writing" | "about" | "contact";

function PhoneExperience() {
  const [screen, setScreen] = useState<PhoneScreen>("home");
  const [time, setTime] = useState("--:--");
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const navigate = (next: PhoneScreen) => { setScreen(next); scrollRef.current?.scrollTo({ top: 0 }); };
  return <div className="phone-experience">
    {screen !== "home" && <button className="phone-home-control" onClick={() => navigate("home")} aria-label="Return to phone home">Back</button>}
    <div className={`phone-experience-scroll ${screen === "home" ? "phone-snap-pages" : ""}`} ref={scrollRef} tabIndex={0} aria-label="Phone screen content">
      {screen === "home" ? <><section className="phone-first-screen"><h1>{identity.name}</h1><p>{identity.title}</p><time>Istanbul · {time}</time></section>
        <section className="phone-bio-screen"><h2>Bio</h2><p>Mobile Engineer at Ticimax.</p><p>Open-source developer and volunteer trainer at MasterFabric.</p><small>Erciyes University, Electrical and Electronic Engineering, 2018–2022.</small></section></>
      : <section className="phone-detail-screen"><h2>{screen[0].toUpperCase() + screen.slice(1)}</h2>
        {screen === "work" && <div className="phone-simple-list">{[...githubProjects, academy].map(([name, url]) => <a key={url} href={url} target="_blank" rel="noreferrer">{name === "Project tracker" ? "Project Tracker" : name}</a>)}</div>}
        {screen === "writing" && <div className="phone-simple-list">{[...linkedinPosts.map(([, title, url]) => ({ title, url })), ...mediumPosts.slice(0, 3)].map(post => <a key={post.url} href={post.url} target="_blank" rel="noreferrer">{post.title}</a>)}</div>}
        {screen === "about" && <div className="phone-about-copy"><p>Nurhayat works at Ticimax as a Mobile Engineer and contributes to MasterFabric as an open-source developer and volunteer trainer.</p><p>Her work spans mobile applications, agents, and open source. She shares what she learns through technical writing and training.</p></div>}
        {screen === "contact" && <div className="phone-simple-list"><a href={`mailto:${identity.email}`}>{identity.email}</a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={identity.medium} target="_blank" rel="noreferrer">Medium</a><a href={identity.github} target="_blank" rel="noreferrer">GitHub</a></div>}
      </section>}
    </div>
    <nav className="phone-screen-nav" aria-label="Phone navigation">{(["work", "writing", "about", "contact"] as const).map(id => <button key={id} aria-current={screen === id ? "page" : undefined} onClick={() => navigate(id)}>{id[0].toUpperCase() + id.slice(1)}</button>)}</nav>
  </div>;
}

const phonePresets = [
  { name: "iPhone 16", width: 393, height: 852 },
  { name: "Compact phone", width: 375, height: 812 },
  { name: "Wide phone", width: 430, height: 932 },
] as const;

function PhonePreview({ close, signature }: { close: () => void; signature: boolean }) {
  const [selected, setSelected] = useState(0);
  const [scale, setScale] = useState(1);
  const screenRef = useRef<HTMLDivElement>(null);
  const device = phonePresets[selected];
  useEffect(() => {
    const resize = () => setScale(Math.min(1, (window.innerWidth - 48) / (device.width + 28), Math.max(120, window.innerHeight - 110) / (device.height + 28)));
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [device]);
  return <div className="phone-backdrop">
    <div className="phone-device-controls"><label htmlFor="preview-device">{signature && <span className="signature-mark">✦ </span>}Phone</label><select id="preview-device" value={selected} onChange={event => { setSelected(Number(event.target.value)); screenRef.current?.scrollTo({ top: 0 }); }}>{phonePresets.map((preset, index) => <option value={index} key={preset.name}>{preset.name} · {preset.width} × {preset.height}</option>)}</select></div>
    <button className="phone-close" aria-label="Close phone portfolio" onClick={close}>×</button>
    <div className="phone-size-holder" style={{ width: (device.width + 28) * scale, height: (device.height + 28) * scale }}>
      <div className="iphone-frame device-preview-frame" style={{ width: device.width + 28, height: device.height + 28, transform: `scale(${scale})` }}>
        <div className="dynamic-island" />
        <div className="phone-screen-clip"><div ref={screenRef} className="iphone-screen" tabIndex={0} aria-label={`Scrollable portfolio, ${device.name}`}><PhoneExperience /></div></div>
      </div>
    </div>
  </div>;
}

function HomeWidgetGrid({ widgets, onDraggingChange }: {
  widgets: { id: HomeWidgetId; content: ReactNode }[];
  onDraggingChange: (id: HomeWidgetId | null) => void;
}) {
  const [order, setOrder] = useState<HomeWidgetId[]>(["github", "linkedin", "medium"]);
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

  return <div className="home-widgets" ref={boardRef} aria-label="Draggable home widgets" style={{ gridTemplateColumns: order.map(id => id.startsWith("github") ? "minmax(540px, 2fr)" : "minmax(0, 1fr)").join(" ") }}>
    {order.map((id) => <div key={id} data-widget-id={id} className={`home-widget-slot ${draggingId === id ? "is-dragging" : ""}`} role="group" tabIndex={0} data-desktop-piece="true" aria-label={`${id} piece. Use arrow keys to navigate; Enter to open.`} onPointerDown={(event) => beginDrag(event, id)} >
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
  const [reducedMotion, setReducedMotion] = useState(true);
  const [draggingWindow, setDraggingWindow] = useState<WindowId | null>(null);
  const [quickLook, setQuickLook] = useState<{ name: string; description: string; url: string } | null>(null);
  const quickLookRef = useRef<HTMLDivElement>(null);
  const quickLookOrigin = useRef<HTMLElement | null>(null);
  const [theme, setTheme] = useState<Theme>("neutral");
  const [time, setTime] = useState("--:--");
  const [angles, setAngles] = useState({ hour: -90, minute: -90 });
  const [date, setDate] = useState("");
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowId[]>([]);
  const [fullscreenWindow, setFullscreenWindow] = useState<WindowId | null>(null);
  const [zOrder, setZOrder] = useState<WindowId[]>([]);
  const [windowOffsets, setWindowOffsets] = useState<Record<WindowId, Offset>>(windowDefaults);
  const [draggingWidget, setDraggingWidget] = useState<HomeWidgetId | null>(null);
  const windowDragging = useRef(false);
  const [cursor, setCursor] = useState({ x: 24, y: 24, hover: false, grabbing: false, text: false, visible: false });
  const themes: Theme[] = ["neutral", "ink", "sand"];
  const nextTheme = useMemo(() => themes[(themes.indexOf(theme) + 1) % themes.length], [theme]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(preference.matches);
    sync(); preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let firstUpdate = true;
    const formatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZone: "Europe/Istanbul" });
    const update = () => {
      const now = new Date();
      const [hours, minutes, seconds] = formatter.format(now).split(":").map(Number);
      setTime(formatter.format(now).slice(0, 5));
      setDate(new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(now));
      if (firstUpdate || !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAngles({ hour: (hours % 12) * 30 + minutes / 2 + seconds / 120 - 90, minute: minutes * 6 + seconds / 10 - 90 });
      firstUpdate = false;
    };
    update();
    const timer = window.setInterval(update, 1000);
    window.addEventListener("focus", update);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", update); };
  }, []);
  useEffect(() => { document.body.style.overflow = openWindows.includes("phone") && !minimizedWindows.includes("phone") ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [openWindows, minimizedWindows]);
  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (min-width: 801px)");
    const hide = () => setCursor((current) => ({ ...current, visible: false }));
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType === "touch") { hide(); return; }
      const target = event.target as HTMLElement;
      setCursor({ x: event.clientX, y: event.clientY, hover: Boolean(target.closest("a,button")), grabbing: windowDragging.current, text: Boolean(target.closest("input,textarea,[contenteditable=true]")), visible: true });
    };
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    enabled.addEventListener("change", hide);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", hide); window.removeEventListener("blur", hide); enabled.removeEventListener("change", hide); };
  }, []);

  const terminalSerial = useRef(0);
  const openWindow = (requested: WindowId) => { const id: WindowId = requested !== "phone" && !requested.includes("-") ? `${requested}-${++terminalSerial.current}` as WindowId : requested; if (id !== "phone") setWindowOffsets((current) => ({ ...current, [id]: snapOffset(current[id] ?? { x: 120 + (terminalSerial.current % 5) * 24, y: 25 + (terminalSerial.current % 5) * 24 }, id) })); setMinimizedWindows((current) => current.filter((item) => item !== id)); setOpenWindows((current) => current.includes(id) ? current : [...current, id]); setZOrder((current) => [...current.filter((item) => item !== id), id]); };
  const closeWindow = (id: WindowId) => { setOpenWindows((current) => current.filter((item) => item !== id)); setZOrder((current) => current.filter((item) => item !== id)); setMinimizedWindows((current) => current.filter((item) => item !== id)); setFullscreenWindow((current) => current === id ? null : current); };
  const minimizeWindow = (id: WindowId) => { setMinimizedWindows((current) => current.includes(id) ? current : [...current, id]); setZOrder((current) => current.filter((item) => item !== id)); setFullscreenWindow((current) => current === id ? null : current); };
  const toggleFullscreen = (id: WindowId) => { setFullscreenWindow((current) => current === id ? null : id); bringToFront(id); };
  const goHome = () => {
    setOpenWindows([]);
    setZOrder([]);
    setMinimizedWindows([]);
    setFullscreenWindow(null);
    window.requestAnimationFrame(() => {
      document.getElementById("home")?.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  };
  const bringToFront = (id: WindowId) => { setMinimizedWindows((current) => current.filter((item) => item !== id)); setZOrder((current) => [...current.filter((item) => item !== id), id]); setOpenWindows((current) => [...current.filter((item) => item !== id), id]); };
  const snapOffset = (offset: Offset, id?: WindowId): Offset => {
    const clock = document.querySelector(".clock-card")?.getBoundingClientRect();
    const safeLeft = (clock?.right ?? 200) + 18;
    const width = Math.min(720, window.innerWidth - safeLeft - 24);
    const left = window.innerWidth / 2 - width / 2;
    const minimumX = safeLeft - left;
    const maximumX = window.innerWidth - 24 - width - left;
    const element = id ? document.querySelector<HTMLElement>(`[data-window-id="${id}"]`) : null;
    const rect = element?.getBoundingClientRect();
    const baselineTop = rect && id ? rect.top - windowOffsets[id].y : window.innerHeight * .06;
    const dockTop = document.querySelector(".desktop-dock")?.getBoundingClientRect().top ?? window.innerHeight - 88;
    const height = rect?.height ?? Math.min(id?.startsWith("terminal") ? 280 : 560, window.innerHeight - 180);
    const maximumY = Math.max(0, dockTop - 12 - baselineTop - height);
    return { x: Math.max(minimumX, Math.min(maximumX, Math.round(offset.x / 12) * 12)), y: Math.max(0, Math.min(maximumY, Math.round(offset.y / 12) * 12)) };
  };
  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>, id: WindowId) => { if ((event.target as HTMLElement).closest("button,a")) return; event.preventDefault(); windowDragging.current = true; setDraggingWindow(id); setCursor((current) => ({ ...current, grabbing: true })); bringToFront(id); const start = { x: event.clientX, y: event.clientY }; const initial = windowOffsets[id]; const move = (next: PointerEvent) => setWindowOffsets((current) => ({ ...current, [id]: snapOffset({ x: initial.x + next.clientX - start.x, y: initial.y + next.clientY - start.y }, id) })); const end = () => { windowDragging.current = false; setDraggingWindow(null); setCursor((current) => ({ ...current, grabbing: false })); setWindowOffsets((current) => ({ ...current, [id]: snapOffset(current[id], id) })); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); }; window.addEventListener("pointermove", move); window.addEventListener("pointerup", end); };


  const windowContent = (id: WindowId) => {
    if (id.startsWith("terminal")) return <TerminalContent openWindow={openWindow} />;
    if (id === "phone") return <MobilePortfolio prefix="phone" />;
    if (id.startsWith("work")) return <><span className="eyebrow">WORK</span><h2>Selected Work</h2><p className="window-intro">Mobile, web, and open-source projects.</p><SelectedWork /></>;
    if (id.startsWith("github")) return <><span className="eyebrow">02 / GITHUB</span><h2>Open source,<br /><em>without the noise.</em></h2><p className="window-intro">Selected repositories and the MasterFabric Academy.</p><GitHubActivityWidget /><GitHubList /></>;
    if (id.startsWith("writing")) return <WritingList />;
    return <AboutContent time={time} date={date} />;
  };

  const frontWindow = [...zOrder].reverse().find(id => openWindows.includes(id) && !minimizedWindows.includes(id));

  useEffect(() => {
    const typing = (target: EventTarget | null) => target instanceof HTMLElement && Boolean(target.closest("input,textarea,select,[contenteditable]:not([contenteditable='false'])"));
    const pointer = () => document.documentElement.classList.remove("keyboard-navigation");
    const key = (event: KeyboardEvent) => {
      if (typing(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;
      document.documentElement.classList.add("keyboard-navigation");
      if (event.key === "Escape") {
        if (quickLook) { event.preventDefault(); setQuickLook(null); quickLookOrigin.current?.focus(); }
        else if (frontWindow) { event.preventDefault(); closeWindow(frontWindow); document.querySelector<HTMLElement>(".desktop-folder")?.focus(); }
        return;
      }
      if (quickLook) {
        if (event.key === "Tab") {
          const elements = Array.from(quickLookRef.current?.querySelectorAll<HTMLElement>("button,a") ?? []);
          const index = elements.indexOf(document.activeElement as HTMLElement);
          event.preventDefault(); elements[(index + (event.shiftKey ? -1 : 1) + elements.length) % elements.length]?.focus();
        }
        return;
      }
      const target = event.target as HTMLElement;
      const project = target.closest<HTMLAnchorElement>("[data-quick-name]");
      if (event.key === " " && project) {
        event.preventDefault(); quickLookOrigin.current = project;
        setQuickLook({ name: project.dataset.quickName ?? "", description: project.dataset.quickDescription ?? "", url: project.href });
        return;
      }
      const pieces = Array.from(document.querySelectorAll<HTMLElement>(".desktop-folder, [data-desktop-piece]"));
      const selected = target.closest<HTMLElement>(".desktop-folder, [data-desktop-piece]");
      if (!selected) return;
      const index = pieces.indexOf(selected);
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        const backwards = event.key === "ArrowLeft" || event.key === "ArrowUp";
        pieces[(index + (backwards ? -1 : 1) + pieces.length) % pieces.length]?.focus();
      } else if (event.key === "Enter" && target === selected) {
        event.preventDefault();
        if (selected instanceof HTMLButtonElement) selected.click();
        else selected.querySelector<HTMLAnchorElement>("a")?.click();
      }
    };
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", pointer);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("pointerdown", pointer); };
  }, [frontWindow, quickLook]);
  useEffect(() => { if (quickLook) quickLookRef.current?.querySelector<HTMLButtonElement>("button")?.focus(); }, [quickLook]);

  const fileWindows: WindowId[] = openWindows.filter((id) => id !== "phone");
  const taskWindows = [...fileWindows, ...minimizedWindows.filter(id => !fileWindows.includes(id) && id !== "phone")];

  const dockItems: { label: string; icon: LucideIcon; window?: WindowId }[] = [{ label: "Home", icon: House }, { label: "Phone", icon: Smartphone, window: "phone" }, { label: "Mail", icon: Mail }, { label: "Terminal", icon: SquareTerminal, window: "terminal" }, { label: "Theme", icon: Sparkles }];
  const homeWidgets = [{ id: "github" as const, content: <GitHubActivityWidget /> }, { id: "linkedin" as const, content: <StoryWidget label="LATEST ON LINKEDIN" posts={linkedinPosts} source="LinkedIn" /> }, { id: "medium" as const, content: <StoryWidget label="LATEST ON MEDIUM" posts={mediumPosts.slice(0, 3).map((post) => [post.date, post.title, post.url])} source="Medium" /> }];

  return <main className={`desktop theme-${theme} ${fullscreenWindow ? "has-fullscreen-window" : ""} ${cursor.visible && !cursor.text && !cursor.grabbing && !draggingWidget ? "cursor-ring-on" : ""} ${cursor.grabbing || draggingWidget ? "is-grabbing" : ""}`}><BootScreen /><section className="desktop-scene" id="home"><div className="home-shell"><div className="home-head"><Clock time={time} date={date} hourAngle={angles.hour} minuteAngle={angles.minute} /><div className="hero-copy"><h1>{identity.name}</h1><p className="hero-title">{identity.title}</p></div><DesktopFolders openWindow={openWindow} /></div><HomeWidgetGrid widgets={homeWidgets} onDraggingChange={(id) => { setDraggingWidget(id); if (!id) setCursor((current) => ({ ...current, grabbing: false })); }} /><SessionReadout theme={theme} windows={openWindows.length} /></div>{openWindows.filter((id) => !minimizedWindows.includes(id)).map((id) => { const offset = windowOffsets[id]; const isFullscreen = fullscreenWindow === id; return <div key={id} className={`window-layer ${id === "phone" ? "phone-layer" : ""}`} style={{ zIndex: 20 + zOrder.indexOf(id) }}><div data-window-id={id} data-window-kind={id.split("-")[0]} className={`content-window ${frontWindow === id ? "is-front" : "is-behind"} ${draggingWindow === id ? "is-window-dragging" : ""} ${id.startsWith("terminal") ? "terminal-window" : ""} ${id === "phone" ? "phone-window-shell" : ""} ${isFullscreen ? "is-fullscreen" : ""}`} style={{ transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px)`, zIndex: 20 + zOrder.indexOf(id) }} onPointerDown={() => bringToFront(id)}>{id === "phone" ? <PhonePreview signature={frontWindow === "phone"} close={() => closeWindow("phone")} /> : <><WindowBar title={(id.startsWith("terminal") ? "Terminal " + id.split("-")[1] : windowTitles[id.split("-")[0]])} signature={frontWindow === id} close={() => closeWindow(id)} minimize={() => minimizeWindow(id)} toggleFullscreen={() => toggleFullscreen(id)} isFullscreen={isFullscreen} onDrag={(event) => beginDrag(event, id)} /><div className={id.startsWith("terminal") ? "terminal-content" : "content-window-body"}>{windowContent(id)}</div></>}</div></div>; })}</section><section className="mobile-page"><MobilePortfolio prefix="mobile" /></section><nav className="dock desktop-dock" aria-label="Portfolio dock">{dockItems.map((item, index) => { const Icon = item.icon; if (item.label === "Home") return <button className="dock-item dock-home" data-label="Home" aria-label="Show desktop and return to top" aria-current={openWindows.every((id) => minimizedWindows.includes(id)) ? "page" : undefined} onClick={goHome} key={item.label}><Icon size={18} strokeWidth={1.7} /></button>; if (item.label === "Mail") return <a className="dock-item" data-label={item.label} aria-label={item.label} href={`mailto:${identity.email}`} key={item.label}><Icon size={18} strokeWidth={1.7} /></a>; if (item.label === "Theme") return <button className="dock-item" data-label={`${item.label} · ${nextTheme}`} aria-label={`Switch theme to ${nextTheme}`} onClick={() => setTheme(nextTheme)} key={item.label}><Icon size={18} strokeWidth={1.7} /></button>; return <button className="dock-item" data-label={item.label} aria-label={item.label} onClick={() => item.label === "Home" ? goHome() : item.window ? openWindow(item.window) : undefined} key={item.label}><Icon size={18} strokeWidth={1.7} /></button>; })}{taskWindows.length > 0 && <span className="dock-files-divider" aria-hidden="true" />}{taskWindows.map(id => { const Icon = id.startsWith("github") ? Github : id.startsWith("writing") ? PenLine : id.startsWith("about") ? UserRound : id.startsWith("terminal") ? SquareTerminal : Folder; const title = id.startsWith("terminal") ? "Terminal " + id.split("-")[1] : windowTitles[id.split("-")[0]]; return <button key={id} className="dock-item dock-file-tab" data-label={title} aria-label={`Show ${title}${minimizedWindows.includes(id) ? " (minimized)" : ""}`} aria-current={frontWindow === id ? "page" : undefined} onClick={() => bringToFront(id)}><Icon size={18} strokeWidth={1.7} /><i className={minimizedWindows.includes(id) ? "dock-file-status is-minimized" : "dock-file-status"} aria-hidden="true" /></button>; })}</nav><nav className="mobile-dock"><button onClick={() => document.getElementById("mobile-top")?.scrollIntoView({ behavior: "smooth" })}>Home</button><button onClick={() => document.getElementById("mobile-work")?.scrollIntoView({ behavior: "smooth" })}>Work</button><button onClick={() => document.getElementById("mobile-writing")?.scrollIntoView({ behavior: "smooth" })}>Writing</button><button onClick={() => document.getElementById("mobile-about")?.scrollIntoView({ behavior: "smooth" })}>About</button></nav>{quickLook && <div className="quick-look-overlay"><div className="glass-card quick-look-panel" ref={quickLookRef} role="dialog" aria-modal="true" aria-labelledby="quick-look-title"><button className="quick-look-close" aria-label="Close Quick Look" onClick={() => { setQuickLook(null); quickLookOrigin.current?.focus(); }}>×</button><span className="widget-label">QUICK LOOK</span><h2 id="quick-look-title">{quickLook.name}</h2><p>{quickLook.description}</p><a href={quickLook.url} target="_blank" rel="noreferrer">Open real project ↗</a></div></div>}<div className={`custom-cursor ${cursor.visible ? "is-visible" : ""} ${cursor.hover ? "is-hover" : ""} ${cursor.grabbing ? "is-grabbing" : ""} ${cursor.text ? "is-text" : ""}`} style={{ left: cursor.x, top: cursor.y }} /></main>;
}

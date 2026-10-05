# Nurhayat Yurtaslan — Portfolio

The personal portfolio of Nurhayat Yurtaslan, built with Next.js and the App Router.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3004](http://localhost:3004).

## Content

The portfolio keeps its public content in the page and `data/medium.json`:

- current roles: Ticimax and MasterFabric;
- selected GitHub repositories without invented star counts;
- three fixed LinkedIn links;
- three Medium posts updated by the scheduled GitHub Action.

The Medium workflow reads the public RSS feed once a day and commits only when a title, date, or link changes. It never scrapes LinkedIn.

## Design

The framed phone has its own screen-based experience, independent of desktop components. Home contains only the name, title, and live Istanbul time; swiping or scrolling up reaches a second, scroll-snapped Bio screen. Four persistent 44px-minimum navigation targets open separate Work (names), Writing (titles), About (two paragraphs), and Contact screens. Back returns to Home. No desktop cards, folders, contribution graph, or tool marks appear inside the frame.

The desktop retains its live left-hand Istanbul clock, centered identity, right-hand folders, and cards below on a shared grid with 32px side padding. A single small signature star belongs to Home or the frontmost open window. Background drift and pointer light are disabled; there is no particle field or cursor trail.

Work opens Selected Work: eight full-width numbered project entries with verified descriptions and known stacks only. Writing opens Thought Stream, ordered LinkedIn first and then the three newest stored Medium entries. Tool labels are grouped into Mobile, Systems, and Build without recoloring or replacing the eleven official marks. About includes editorial current roles, a standalone bachelor's Education block, four contact links, and a compact live Istanbul time.

The interface keeps a glass-card desktop metaphor with draggable widgets and windows, three visual themes, a read-only animated terminal, an iPhone-style Phone window, and a separate mobile layout below 800px.

Neutral, ink, and sand share theme-aware surface, border, and text tokens. Ink windows use a solid reading surface with translucent chrome to prevent background text from showing through. The dock, Phone content, and mobile navigation follow the active theme. Reduced motion disables background drift and the custom cursor.

Desktop folders open Work, GitHub, Writing, and About. They sit in a single row as individually colored folder icons with no tile or container, and are not duplicated in the fixed dock, which contains Home, Phone, Mail, Terminal, and the theme control. The home GitHub widget shows live public activity; repository links remain in the GitHub window. Multiple windows may remain open; the last selected window is in front. The terminal only animates `whoami` and `cat now.txt`; it does not execute commands. The tool shelf is separate from the dock and uses the eleven requested brand marks, each in its original colors on a consistent white tile across all themes.

The Home dock control closes open and minimized windows and returns the scrollable desktop to the top. A small indicator marks Home while the desktop is visible. Reduced motion uses an immediate scroll.

About has two short introductory paragraphs and separate Now, Education, and Contact groups. Personal telephone numbers must not be stored, displayed, or published. The Phone preview has its own touch-scrollable, icon-led bio layout, a minimal X close button outside the frame, and contains the background desktop scroll while open. Its frame adapts to short viewport heights so the close control remains accessible; the small-screen portfolio has its own scrollable content.

On the desktop home screen, `HomeWidgetGrid` places the Now, GitHub Activity, LinkedIn, and Medium cards in normal CSS Grid flow, without absolute positioning or reserved empty rows. Dragging a card reorders occupied cells; keyboard users can focus a card and use the arrow keys. There are no visible drag handles. The Tools shelf has its own glass container, while the eleven official brand marks stay in white tiles. Above 1200px, GitHub Activity spans two of five tracks and all four cards occupy one row. At 1001–1200px, all four cards have equal columns; at 801–1000px, they use two columns. Cards grow with their content, and the desktop scene can scroll internally on short screens while the outer page and dock stay fixed.

The GitHub window presents repository and Academy links as a compact, two-column card grid, using only the configured names and destinations (no unverified repository metrics).

The desktop home shows one live GitHub activity card, populated from the public GitHub profile and event APIs. No Cursor usage data is requested or shown. The official tool shelf uses a compact two-column grid. Home cards share aligned headings and compact padding; window titles are centered independently of their controls.

The Istanbul digital clock and analog hands update every second using Europe/Istanbul. The pointer ring is 16px with a dark stroke and light edge; the native pointer is hidden only while the ring is visible. Touch and reduced motion retain the native cursor. Unavailable activity stays empty rather than displaying fabricated data.

## License

### GitHub contribution views

The home GitHub card reads the live public yearly contribution calendar directly from GitHub. Daily counts, intensity levels, and the yearly total are not fabricated. The calendar scrolls horizontally within its card.

An optional server-only `GITHUB_TOKEN` enables contribution totals from GitHub GraphQL for the commits, code reviews, issues, and pull requests distribution. Percentages use those four categories only. Without authenticated totals the breakdown is omitted; no screenshot percentages are hardcoded. Never expose the token through a `NEXT_PUBLIC_` variable. GitHub requests are cached for one hour; unavailable data stays empty.

Original project materials are © 2026 Nurhayat Yurtaslan, all rights reserved. Reuse requires prior written permission. Third-party marks and assets belong to their respective owners; see [LICENSE](LICENSE).

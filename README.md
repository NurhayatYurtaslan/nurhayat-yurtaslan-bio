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

The interface keeps a glass-card desktop metaphor with draggable widgets and windows, three visual themes, a read-only animated terminal, an iPhone-style Phone window, and a separate mobile layout below 800px.

Neutral, ink, and sand share theme-aware surface, border, and text tokens. Ink windows use a solid reading surface with translucent chrome to prevent background text from showing through. The dock, Phone content, and mobile navigation follow the active theme. Reduced motion disables background drift and the custom cursor.

Desktop folders open Work, GitHub, Writing, and About. Those folders are not duplicated in the fixed dock, which contains Home, Phone, Mail, Terminal, and the theme control. Multiple windows may remain open; the last selected window is in front. The terminal only animates `whoami` and `cat now.txt`; it does not execute commands. The tool shelf is separate from the dock and uses the eleven requested brand marks, each in its original colors on a consistent white tile across all themes.

Education and talks are in About only. Personal telephone numbers must not be stored, displayed, or published. The Phone preview has its own touch-scrollable, icon-led bio layout, a minimal X close button outside the frame, and contains the background desktop scroll while open. Its frame adapts to short viewport heights so the close control remains accessible; the small-screen portfolio has its own scrollable content.

On the desktop home screen, `HomeWidgetGrid` places the Now, GitHub, LinkedIn, and Medium cards in normal CSS Grid flow, without absolute positioning or reserved empty rows. Dragging a card reorders occupied cells; keyboard users can focus a card and use the arrow keys. There are no visible drag handles. The Tools shelf has its own glass container, while the eleven official brand marks stay in white tiles. Above 1000px the grid has four columns; at 801–1000px it has two. Cards grow with their content, and the desktop scene can scroll internally on short screens while the outer page and dock stay fixed.

The GitHub window presents repository and Academy links as a compact, two-column card grid, using only the configured names and destinations (no unverified repository metrics).

The desktop home also includes live GitHub and Cursor usage cards. GitHub reads public profile and event data from the GitHub API. Cursor usage is opt-in: configure `CURSOR_ADMIN_API_KEY` and `CURSOR_USAGE_EMAIL` as server-side environment variables (never `NEXT_PUBLIC_*`) to show the account's aggregated recent usage. Without those variables, the widget stays in an honest connection-needed state. The Cursor admin key must have access to the relevant team usage data.

## License

Original project materials are © 2026 Nurhayat Yurtaslan, all rights reserved. Reuse requires prior written permission. Third-party marks and assets belong to their respective owners; see [LICENSE](LICENSE).

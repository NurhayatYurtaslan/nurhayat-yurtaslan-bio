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

Desktop folders open Work, GitHub, Writing, and About. Multiple windows may remain open; the last selected window is in front. The terminal only animates `whoami` and `cat now.txt`; it does not execute commands. The tool shelf is separate from the dock and uses the eleven requested brand marks, each in its original colors on a consistent white tile across all themes.

Education and talks are in About only. Personal telephone numbers must not be stored, displayed, or published. The Phone preview and small-screen portfolio have their own scrollable content; the outer page remains locked.

On the desktop home screen, `HomeWidgetGrid` places the Now, GitHub, LinkedIn, and Medium cards in normal CSS Grid flow, without absolute positioning or reserved empty rows. Dragging reorders occupied cells; the focusable handles also support arrow-key reordering. Above 1000px the grid has four columns; at 801–1000px it has two. Cards grow with their content, and the desktop scene can scroll internally on short screens while the outer page and dock stay fixed.

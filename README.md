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

On the desktop home screen, the Now, GitHub, LinkedIn, and Medium widgets can be dragged between grid cells. The layout keeps the Istanbul clock fixed and prevents widgets from covering one another or the dock.

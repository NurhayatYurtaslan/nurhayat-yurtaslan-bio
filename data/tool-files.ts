export const toolGroups = [
  { name: "Mobile", files: [["Flutter", "primary mobile stack"], ["Dart", "mobile application development"], ["React Native", "cross-platform mobile interfaces"], ["Expo", "cross-platform mobile development"], ["Swift", "native iOS development"], ["SwiftUI", "declarative Apple interfaces"], ["WidgetKit", "Apple home-screen widgets"], ["Xcode", "Apple development tools"]] },
  { name: "Frontend", files: [["TypeScript", "typed frontend development"], ["Next.js", "React web applications"], ["React", "component-based interfaces"], ["Tailwind", "utility-first styling"], ["Electron", "desktop applications"]] },
  { name: "Backend", files: [["Go", "backend and systems"], ["Node.js", "server-side JavaScript"], ["PostgreSQL", "relational data storage"], ["Supabase", "backend services"], ["Firebase", "application backend services"]] },
  { name: "Tools", files: [["Cursor", "AI-native development"], ["GitHub", "repositories and collaboration"], ["GitHub Actions", "automated workflows"], ["Vercel", "web deployments"], ["MCP", "agent tools"], ["App Store Connect", "App Store release management"], ["TestFlight", "iOS beta distribution"], ["Play Console", "Google Play release management"], ["EAS", "Expo builds and releases"]] },
];

// Only supplied or already documented project stacks; no inferred backend stacks.
export const projectStacks: Record<string, { group: "Mobile" | "Frontend" | "Backend"; names: string[] }[]> = {
  Expo: [{ group: "Mobile", names: ["React Native", "Expo", "TypeScript"] }],
  Website: [{ group: "Frontend", names: ["Next.js", "TypeScript", "Tailwind"] }],
  SwiftCamp: [{ group: "Mobile", names: ["Swift", "SwiftUI", "WidgetKit"] }, { group: "Backend", names: ["Go"] }],
  Manifesto: [{ group: "Frontend", names: ["Next.js", "React", "Three.js"] }],
  Welcome: [{ group: "Frontend", names: ["Next.js", "TypeScript"] }],
  "Project Tracker": [{ group: "Mobile", names: ["Expo", "SwiftUI"] }],
};

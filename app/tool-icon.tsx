import { siFlutter, siDart, siReact, siExpo, siSwift, siXcode, siTypescript, siNextdotjs, siTailwindcss, siElectron, siGo, siNodedotjs, siPostgresql, siSupabase, siFirebase, siCursor, siGithub, siGithubactions, siVercel, siModelcontextprotocol, siGoogleplay, type SimpleIcon } from "simple-icons";

const marks: Record<string, SimpleIcon> = { Flutter: siFlutter, Dart: siDart, "React Native": siReact, Expo: siExpo, Swift: siSwift, WidgetKit: siSwift, Xcode: siXcode, TypeScript: siTypescript, "Next.js": siNextdotjs, React: siReact, Tailwind: siTailwindcss, Electron: siElectron, Go: siGo, "Node.js": siNodedotjs, PostgreSQL: siPostgresql, Supabase: siSupabase, Firebase: siFirebase, Cursor: siCursor, GitHub: siGithub, "GitHub Actions": siGithubactions, Vercel: siVercel, MCP: siModelcontextprotocol, "Play Console": siGoogleplay, EAS: siExpo };
const images: Record<string, string> = {
  WidgetKit: "https://developer.apple.com/assets/elements/icons/widgetkit/widgetkit-96x96_2x.png",
  SwiftUI: "https://developer.apple.com/assets/elements/icons/swiftui/swiftui-96x96_2x.png",
  TestFlight: "https://developer.apple.com/assets/elements/icons/testflight-s/testflight-s-96x96_2x.png",
  "App Store Connect": "https://developer.apple.com/assets/elements/icons/app-store-connect/app-store-connect-96x96_2x.png",
};

export default function ToolIcon({ name }: { name: string }) {
  if (images[name]) return <img className="finder-tool-icon" src={images[name]} alt="" width={38} height={38} />;
  const mark = marks[name];
  return mark ? <svg className="finder-tool-icon" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "#" + mark.hex }}><path d={mark.path} /></svg> : null;
}

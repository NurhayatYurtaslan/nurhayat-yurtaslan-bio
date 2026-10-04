import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nurhayat Yurtaslan — Agentic AI Developer | Mobile Engineer",
  description: "Portfolio of Nurhayat Yurtaslan, Agentic AI Developer and Mobile Engineer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

import type { Metadata } from "next";
import "./globals.css";
import { siteUrl, siteTitle, siteDescription } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Nurhayat Yurtaslan",
    locale: "en_US",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-US"><body>{children}</body></html>;
}

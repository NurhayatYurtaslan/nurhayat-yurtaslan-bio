import type { Metadata } from "next";
import Home from "../page";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact — Nurhayat Yurtaslan",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Home />;
}

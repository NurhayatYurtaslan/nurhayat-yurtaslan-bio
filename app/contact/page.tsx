import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./contact-form";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact — Nurhayat Yurtaslan",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <main className="contact-page"><Link href="/">← Back home</Link><section><p className="contact-kicker">LET’S TALK</p><h1>Contact</h1><p>Have a project or a question? Leave a message.</p><ContactForm /></section></main>;
}

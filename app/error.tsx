"use client";
import ErrorDesktop from "./error-desktop";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <ErrorDesktop reset={reset} />;
}

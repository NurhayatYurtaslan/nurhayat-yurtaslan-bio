import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Desktop folders are in-page windows, not separate public routes.
  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }];
}

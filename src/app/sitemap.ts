import type { MetadataRoute } from "next";
import { getIndexableRoutes } from "@/lib/seo/publicRoutes";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

function lastModifiedFromDate(date: string) {
  return new Date(`${date}T12:00:00+09:00`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexableRoutes().map(({ path, lastModified, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: lastModifiedFromDate(lastModified),
    changeFrequency,
    priority
  }));
}

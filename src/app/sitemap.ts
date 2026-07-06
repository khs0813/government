import type { MetadataRoute } from "next";
import { benefits } from "@/data/benefits";
import { guides } from "@/data/guides";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const staticPages = ["/", "/calculators/", "/benefits/", "/benefits/youth/", "/benefits/housing/", "/benefits/childcare/", "/benefits/employment/", "/benefits/senior/", "/benefits/low-income/", "/guides/", "/about/", "/methodology/", "/editorial-policy/", "/privacy/", "/disclaimer/", "/contact/"];
const defaultLastModified = new Date("2026-07-04T12:00:00+09:00");

function lastModifiedFromDate(date: string) {
  return new Date(`${date}T12:00:00+09:00`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const activeBenefits = benefits.filter((benefit) => benefit.isActive);

  const dynamicPages = [
    ...activeBenefits.map((benefit) => ({
      path: `/benefits/${benefit.slug}/`,
      lastModified: lastModifiedFromDate(benefit.sourceCheckedAt),
      priority: 0.8
    })),
    ...activeBenefits.map((benefit) => ({
      path: `/calculators/${benefit.slug}/`,
      lastModified: lastModifiedFromDate(benefit.sourceCheckedAt),
      priority: 0.85
    })),
    ...guides.map((guide) => ({
      path: `/guides/${guide.slug}/`,
      lastModified: defaultLastModified,
      priority: 0.7
    }))
  ];

  return [
    ...staticPages.map((path) => ({
      path,
      lastModified: defaultLastModified,
      priority: path === "/" ? 1 : path.startsWith("/calculators") ? 0.9 : 0.7
    })),
    ...dynamicPages
  ].map(({ path, lastModified, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "daily" as const : "weekly" as const,
    priority
  }));
}

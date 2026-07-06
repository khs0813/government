import { benefits } from "@/data/benefits";
import { guides } from "@/data/guides";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { categoryLabels } from "@/types/benefit";

export const dynamic = "force-static";

const lastBuildDate = new Date("2026-07-06T12:00:00+09:00");

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function itemXml({ title, description, path, category, date }: { title: string; description: string; path: string; category: string; date: Date }) {
  const url = absoluteUrl(path);
  return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(description)}</description>
      <category>${escapeXml(category)}</category>
      <pubDate>${date.toUTCString()}</pubDate>
    </item>`;
}

export function GET() {
  const items = [
    ...benefits
      .filter((benefit) => benefit.isActive)
      .map((benefit) => itemXml({
        title: benefit.title,
        description: benefit.shortDescription,
        path: `/benefits/${benefit.slug}/`,
        category: categoryLabels[benefit.category],
        date: new Date(`${benefit.sourceCheckedAt}T12:00:00+09:00`)
      })),
    ...guides.map((guide) => itemXml({
      title: guide.title,
      description: guide.description,
      path: `/guides/${guide.slug}/`,
      category: guide.category,
      date: lastBuildDate
    }))
  ].join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(absoluteUrl("/"))}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <ttl>1440</ttl>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}

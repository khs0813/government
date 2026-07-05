import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}

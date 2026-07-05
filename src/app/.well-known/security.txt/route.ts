import { absoluteUrl } from "@/lib/site";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "moneyfinancecalculator@gmail.com";

export const dynamic = "force-static";

export function GET() {
  return new Response(`Contact: mailto:${contactEmail}
Preferred-Languages: ko, en
Canonical: ${absoluteUrl("/.well-known/security.txt")}
Expires: 2027-07-05T00:00:00Z
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}

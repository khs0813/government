import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

function createOgImageUrl(title: string, path: string) {
  const params = new URLSearchParams({ title, page: path });
  return absoluteUrl(`${siteConfig.ogImage}?${params.toString()}`);
}

export function createMetadata({
  title,
  description,
  path = "/"
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = createOgImageUrl(title, path);

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/rss.xml")
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

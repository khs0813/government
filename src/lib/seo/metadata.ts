import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function createMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(siteConfig.ogImage);
  const openGraphBase = {
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
        alt: `${title} - ${siteConfig.name}`
      }
    ]
  };
  const openGraph = type === "article"
    ? {
        ...openGraphBase,
        type: "article" as const,
        publishedTime,
        modifiedTime,
        section,
        tags
      }
    : {
        ...openGraphBase,
        type: "website" as const
      };

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
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: `${title} - ${siteConfig.name}`
        }
      ]
    }
  };
}

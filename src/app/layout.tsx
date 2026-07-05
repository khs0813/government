import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { websiteJsonLd } from "@/lib/seo/jsonLd";

const naverVerification = process.env.NEXT_PUBLIC_NAVER_VERIFICATION || "046a8720f56f97fa77fd7ad6a92400fa7c9cc011";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "지원금 계산기 - 내가 받을 수 있는 정부지원금 찾기",
    template: "%s | 지원금 계산기"
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "application/rss+xml": absoluteUrl("/rss.xml")
    }
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "지원금 계산기 - 내가 받을 수 있는 정부지원금 찾기",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    locale: siteConfig.locale,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "지원금 계산기 - 내가 받을 수 있는 정부지원금 찾기",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)]
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
  formatDetection: {
    telephone: false
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: {
      "naver-site-verification": naverVerification
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="text-slate-900 antialiased">
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

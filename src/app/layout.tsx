import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { KakaoMobileAd } from "@/components/ads/KakaoMobileAd";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonLd";

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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
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
      <body className="pb-[calc(116px+env(safe-area-inset-bottom))] text-slate-900 antialiased md:pb-0">
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <KakaoMobileAd />
      </body>
    </html>
  );
}

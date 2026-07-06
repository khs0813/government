import { absoluteUrl, siteConfig } from "@/lib/site";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function faqJsonLd(faq: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  dateModified,
  datePublished
}: {
  headline: string;
  description: string;
  path: string;
  dateModified: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "ko-KR",
    headline,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(siteConfig.ogImage),
    datePublished: datePublished || dateModified,
    dateModified,
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function webApplicationJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    inLanguage: "ko-KR",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web"
  };
}

export function itemListJsonLd({
  name,
  description,
  path,
  items
}: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; description?: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    inLanguage: "ko-KR",
    name,
    description,
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
      description: item.description
    }))
  };
}

export function webPageJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "ko-KR",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function contactPageJsonLd({ name, description, path, email }: { name: string; description: string; path: string; email: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    inLanguage: "ko-KR",
    name,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email
    }
  };
}

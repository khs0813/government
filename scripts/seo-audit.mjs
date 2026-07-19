#!/usr/bin/env node

import { createServer } from "node:http";
import { readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PRODUCTION_ORIGIN = "https://jiwoncalc.co.kr";
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
const GOOGLEBOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const EXTENSIONLESS_FILE_PATHS = new Set(["/opengraph-image"]);
const MAX_REDIRECTS = 10;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "out");

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.SEO_AUDIT_BASE_URL,
    output: process.env.SEO_AUDIT_OUTPUT || "seo-audit-result.json",
    productionOrigin: process.env.SEO_AUDIT_PRODUCTION_ORIGIN || PRODUCTION_ORIGIN,
    serveOut: process.env.SEO_AUDIT_SERVE_OUT === "1",
    port: Number(process.env.SEO_AUDIT_PORT || 0)
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--base-url") args.baseUrl = argv[++index];
    else if (arg === "--output") args.output = argv[++index];
    else if (arg === "--production-origin") args.productionOrigin = argv[++index];
    else if (arg === "--serve-out") args.serveOut = true;
    else if (arg === "--port") args.port = Number(argv[++index]);
  }

  return args;
}

function canonicalPath(inputPath = "/") {
  const pathWithoutQuery = inputPath.split(/[?#]/)[0] || "/";
  const normalizedPath = pathWithoutQuery.startsWith("/") ? pathWithoutQuery : `/${pathWithoutQuery}`;
  const compactPath = normalizedPath.replace(/\/{2,}/g, "/");

  if (compactPath === "/") return "/";
  if (EXTENSIONLESS_FILE_PATHS.has(compactPath)) return compactPath;
  if (/\/[^/]+\.[^/]+$/.test(compactPath)) return compactPath;

  return `${compactPath.replace(/\/+$/, "")}/`;
}

function productionUrlForPath(pathname, productionOrigin) {
  return `${productionOrigin.replace(/\/$/, "")}${canonicalPath(pathname)}`;
}

function toFetchUrl(input, baseUrl, productionOrigin) {
  const base = new URL(baseUrl);
  const url = input.startsWith("http") ? new URL(input) : new URL(input, base);

  if (url.origin === productionOrigin && base.origin !== productionOrigin) {
    return new URL(`${url.pathname}${url.search}${url.hash}`, base).href;
  }

  return url.href;
}

function contentTypeFor(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (filePath.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  return "application/octet-stream";
}

async function sendFile(response, filePath, statusCode = 200) {
  const body = await readFile(filePath);
  response.statusCode = statusCode;
  response.setHeader("Content-Type", contentTypeFor(filePath));
  response.end(body);
}

function safeJoin(root, pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const filePath = path.normalize(path.join(root, decodedPath));
  if (!filePath.startsWith(root)) return null;
  return filePath;
}

async function startOutServer(port) {
  if (!existsSync(outDir)) {
    throw new Error(`Missing static export directory: ${outDir}. Run npm run build first.`);
  }

  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const pathname = requestUrl.pathname;
      const hasExtension = /\/[^/]+\.[^/]+$/.test(pathname);

      if (pathname !== "/" && !pathname.endsWith("/") && !hasExtension) {
        const directoryIndex = safeJoin(outDir, `${pathname}/index.html`);
        if (directoryIndex && existsSync(directoryIndex)) {
          response.statusCode = 308;
          response.setHeader("Location", `${pathname}/${requestUrl.search}`);
          response.end();
          return;
        }
      }

      const candidatePath = pathname.endsWith("/")
        ? safeJoin(outDir, `${pathname}index.html`)
        : safeJoin(outDir, pathname);

      if (!candidatePath) {
        response.statusCode = 400;
        response.end("Bad request");
        return;
      }

      let filePath = candidatePath;
      const fileStat = existsSync(filePath) ? await stat(filePath) : null;
      if (fileStat?.isDirectory()) filePath = path.join(filePath, "index.html");

      if (existsSync(filePath)) {
        await sendFile(response, filePath);
        return;
      }

      const notFoundPath = path.join(outDir, "404", "index.html");
      if (existsSync(notFoundPath)) {
        await sendFile(response, notFoundPath, 404);
        return;
      }

      response.statusCode = 404;
      response.end("Not found");
    } catch (error) {
      response.statusCode = 500;
      response.end(error instanceof Error ? error.message : "Internal server error");
    }
  });

  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Unable to determine local audit server address.");

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

async function fetchWithRedirects(input, userAgent, baseUrl, productionOrigin) {
  const chain = [];
  let currentUrl = toFetchUrl(input, baseUrl, productionOrigin);

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    const response = await fetch(currentUrl, {
      redirect: "manual",
      headers: {
        "User-Agent": userAgent,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7"
      }
    });

    const headers = {
      contentType: response.headers.get("content-type") || "",
      xRobotsTag: response.headers.get("x-robots-tag") || ""
    };
    const location = response.headers.get("location");

    if (response.status >= 300 && response.status < 400 && location) {
      const nextUrl = new URL(location, currentUrl).href;
      chain.push({
        url: currentUrl,
        status: response.status,
        location: nextUrl,
        ...headers
      });
      currentUrl = nextUrl;
      continue;
    }

    const body = await response.text();
    return {
      requestedUrl: input,
      finalUrl: currentUrl,
      status: response.status,
      redirectChain: chain,
      body,
      bodyLength: body.length,
      ...headers
    };
  }

  throw new Error(`Redirect loop or more than ${MAX_REDIRECTS} redirects for ${input}`);
}

function decodeHtmlEntity(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function getAttributes(tag) {
  const attributes = {};
  const attrPattern = /([^\s=/"'>]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let match;
  while ((match = attrPattern.exec(tag))) {
    attributes[match[1].toLowerCase()] = decodeHtmlEntity(match[3] ?? match[4] ?? match[5] ?? "");
  }
  return attributes;
}

function extractTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) || [];
}

function extractMetaContents(html, name) {
  return extractTags(html, "meta")
    .map(getAttributes)
    .filter((attributes) => attributes.name?.toLowerCase() === name)
    .map((attributes) => attributes.content || "");
}

function extractCanonicalUrls(html) {
  return extractTags(html, "link")
    .map(getAttributes)
    .filter((attributes) => (attributes.rel || "").toLowerCase().split(/\s+/).includes("canonical"))
    .map((attributes) => attributes.href || "")
    .filter(Boolean);
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtmlEntity(match[1].replace(/\s+/g, " ").trim()) : "";
}

function extractDescription(html) {
  return extractMetaContents(html, "description")[0] || "";
}

function extractAnchorLinks(html) {
  return extractTags(html, "a")
    .map(getAttributes)
    .map((attributes) => attributes.href || "")
    .filter(Boolean);
}

function inspectResponse(response) {
  const isHtml = response.contentType.toLowerCase().includes("text/html");
  const canonicalUrls = isHtml ? extractCanonicalUrls(response.body) : [];
  const metaRobots = isHtml ? extractMetaContents(response.body, "robots") : [];
  const metaGooglebot = isHtml ? extractMetaContents(response.body, "googlebot") : [];
  const title = isHtml ? extractTitle(response.body) : "";
  const description = isHtml ? extractDescription(response.body) : "";
  const robotsSignals = [
    response.xRobotsTag,
    ...metaRobots,
    ...metaGooglebot
  ].join(",").toLowerCase();

  return {
    ...response,
    canonicalUrls,
    metaRobots,
    metaGooglebot,
    title,
    description,
    noindex: /\b(noindex|none)\b/.test(robotsSignals),
    nofollow: /\b(nofollow|none)\b/.test(robotsSignals)
  };
}

function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) => decodeHtmlEntity(match[1].trim()));
}

function parseRobotsGroups(text) {
  const groups = [];
  let currentGroup = null;
  let hasRule = false;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    if (!line) continue;

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const field = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = line.slice(separatorIndex + 1).trim();

    if (field === "user-agent") {
      if (!currentGroup || hasRule) {
        currentGroup = { agents: [], rules: [] };
        groups.push(currentGroup);
        hasRule = false;
      }
      currentGroup.agents.push(value.toLowerCase());
    } else if (field === "allow" || field === "disallow") {
      if (!currentGroup) {
        currentGroup = { agents: ["*"], rules: [] };
        groups.push(currentGroup);
      }
      hasRule = true;
      currentGroup.rules.push({ type: field, value });
    }
  }

  return groups;
}

function robotsPatternMatches(pattern, urlPath) {
  if (pattern === "") return false;
  const endsWithDollar = pattern.endsWith("$");
  const rawPattern = endsWithDollar ? pattern.slice(0, -1) : pattern;
  const escaped = rawPattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  const anchored = endsWithDollar ? `${escaped}$` : `${escaped}.*`;
  return new RegExp(`^${anchored}`).test(urlPath);
}

function isAllowedByRobots(groups, urlPath, userAgent) {
  const userAgentLower = userAgent.toLowerCase();
  const matchingGroups = groups.filter((group) =>
    group.agents.some((agent) => agent === "*" || userAgentLower.includes(agent))
  );

  if (!matchingGroups.length) return true;

  const bestAgentLength = Math.max(
    ...matchingGroups.flatMap((group) =>
      group.agents
        .filter((agent) => agent === "*" || userAgentLower.includes(agent))
        .map((agent) => (agent === "*" ? 0 : agent.length))
    )
  );
  const selectedRules = matchingGroups
    .filter((group) =>
      group.agents.some((agent) => (agent === "*" ? 0 : agent.length) === bestAgentLength)
    )
    .flatMap((group) => group.rules);
  const matchingRules = selectedRules
    .filter((rule) => robotsPatternMatches(rule.value, urlPath))
    .sort((a, b) => b.value.length - a.value.length || (a.type === "allow" ? -1 : 1));

  return matchingRules[0]?.type !== "disallow";
}

function sitemapPath(url) {
  return new URL(url).pathname;
}

function buildSamplePaths(sitemapUrls) {
  const paths = sitemapUrls.map(sitemapPath);
  const calculatorDetails = paths.filter((item) => /^\/calculators\/[^/]+\/$/.test(item)).slice(0, 2);
  const benefitDetails = paths.filter((item) => /^\/benefits\/[^/]+\/$/.test(item)).slice(0, 2);
  const guideDetails = paths.filter((item) => /^\/guides\/[^/]+\/$/.test(item)).slice(0, 1);
  const required = [
    "/",
    "/robots.txt",
    "/sitemap.xml",
    "/calculators/",
    ...calculatorDetails,
    "/benefits/",
    ...benefitDetails,
    "/guides/",
    ...guideDetails,
    "/methodology/",
    "/editorial-policy/",
    "/privacy/",
    "/disclaimer/",
    "/contact/"
  ];

  return [...new Set(required)];
}

function addFailure(failures, scope, pathOrUrl, message, details = {}) {
  failures.push({ scope, pathOrUrl, message, ...details });
}

function validateRobotsTxt(robotsResponse, robotsText, productionOrigin, failures) {
  const disallowRules = [...robotsText.matchAll(/^\s*Disallow\s*:\s*(.*)$/gim)].map((match) => match[1].trim());
  const googlebotRules = [...robotsText.matchAll(/^\s*User-agent\s*:\s*(googlebot[^\s]*)/gim)].map((match) => match[1]);

  if (robotsResponse.status !== 200) {
    addFailure(failures, "robots", "/robots.txt", "robots.txt must return 200", { status: robotsResponse.status });
  }
  if (!robotsResponse.contentType.toLowerCase().includes("text/plain")) {
    addFailure(failures, "robots", "/robots.txt", "robots.txt must be text/plain", {
      contentType: robotsResponse.contentType
    });
  }
  if (!/^User-agent:\s*\*\s*[\r\n]+Allow:\s*\/\s*[\r\n]+[\r\n]*Sitemap:\s*https:\/\/jiwoncalc\.co\.kr\/sitemap\.xml\s*$/i.test(robotsText.trim())) {
    addFailure(failures, "robots", "/robots.txt", "robots.txt content does not match the canonical allow-all policy");
  }
  if (disallowRules.length) {
    addFailure(failures, "robots", "/robots.txt", "robots.txt contains Disallow rules", { disallowRules });
  }
  if (googlebotRules.length) {
    addFailure(failures, "robots", "/robots.txt", "robots.txt contains Googlebot-specific groups", { googlebotRules });
  }
  if (!robotsText.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) {
    addFailure(failures, "robots", "/robots.txt", "robots.txt sitemap URL is not the production canonical URL");
  }

  return { disallowRules, googlebotRules };
}

function validateInternalLinks(pageUrl, html, productionOrigin, failures) {
  const issues = [];
  for (const href of extractAnchorLinks(html)) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (/^(javascript:|data:)/i.test(href)) continue;

    const url = href.startsWith("http") ? new URL(href) : new URL(href, productionOrigin);
    const isInternal = url.hostname === "jiwoncalc.co.kr" || url.hostname === "www.jiwoncalc.co.kr";
    if (!isInternal) continue;

    const hasExtension = /\/[^/]+\.[^/]+$/.test(url.pathname);
    const isHashOnly = href.startsWith("#");

    if (url.protocol === "http:" || url.hostname === "www.jiwoncalc.co.kr") {
      issues.push({ href, reason: "Internal link does not use https non-www canonical host" });
    }

    if (url.search) {
      issues.push({ href, reason: "Internal link contains query parameters" });
    }

    if (!isHashOnly && !hasExtension && !EXTENSIONLESS_FILE_PATHS.has(url.pathname) && canonicalPath(url.pathname) !== url.pathname) {
      issues.push({ href, reason: "Internal HTML link does not use trailing slash canonical path" });
    }
  }

  for (const issue of issues) {
    addFailure(failures, "internal-link", pageUrl, issue.reason, { href: issue.href });
  }

  return issues;
}

function compareResponses(pathname, browser, googlebot, failures) {
  const comparableFields = [
    ["status", browser.status, googlebot.status],
    ["canonical", browser.canonicalUrls.join("|"), googlebot.canonicalUrls.join("|")],
    ["metaRobots", browser.metaRobots.join("|"), googlebot.metaRobots.join("|")],
    ["metaGooglebot", browser.metaGooglebot.join("|"), googlebot.metaGooglebot.join("|")],
    ["xRobotsTag", browser.xRobotsTag, googlebot.xRobotsTag],
    ["bodyLength", browser.bodyLength, googlebot.bodyLength]
  ];

  for (const [field, browserValue, googlebotValue] of comparableFields) {
    if (browserValue !== googlebotValue) {
      addFailure(failures, "googlebot-compare", pathname, `Browser and Googlebot differ on ${field}`, {
        browserValue,
        googlebotValue
      });
    }
  }
}

function validateHtmlPage({
  pageUrl,
  expectedCanonical,
  response,
  sitemapSet,
  robotsGroups,
  productionOrigin,
  failures,
  requireNoRedirect = false,
  requireSitemap = true
}) {
  const pathname = new URL(expectedCanonical).pathname;
  const robotsAllowed = isAllowedByRobots(robotsGroups, pathname, GOOGLEBOT_UA);

  if (response.status !== 200) {
    addFailure(failures, "html", pageUrl, "HTML page must return 200", { status: response.status });
  }
  if (requireNoRedirect && response.redirectChain.length) {
    addFailure(failures, "html", pageUrl, "Sitemap URL must not redirect", { redirectChain: response.redirectChain });
  }
  if (!response.contentType.toLowerCase().includes("text/html")) {
    addFailure(failures, "html", pageUrl, "HTML page must return text/html", { contentType: response.contentType });
  }
  if (response.noindex) {
    addFailure(failures, "html", pageUrl, "Page contains noindex/none robots signal", {
      xRobotsTag: response.xRobotsTag,
      metaRobots: response.metaRobots,
      metaGooglebot: response.metaGooglebot
    });
  }
  if (response.nofollow) {
    addFailure(failures, "html", pageUrl, "Page contains nofollow/none robots signal", {
      xRobotsTag: response.xRobotsTag,
      metaRobots: response.metaRobots,
      metaGooglebot: response.metaGooglebot
    });
  }
  if (response.canonicalUrls.length !== 1) {
    addFailure(failures, "html", pageUrl, "Page must have exactly one canonical tag", {
      canonicalUrls: response.canonicalUrls
    });
  } else if (response.canonicalUrls[0] !== expectedCanonical) {
    addFailure(failures, "html", pageUrl, "Canonical must be the self production URL", {
      expectedCanonical,
      actualCanonical: response.canonicalUrls[0]
    });
  }
  if (!response.title) {
    addFailure(failures, "html", pageUrl, "Page title is missing");
  }
  if (!response.description) {
    addFailure(failures, "html", pageUrl, "Meta description is missing");
  }
  if (!robotsAllowed) {
    addFailure(failures, "robots-allowance", pageUrl, "robots.txt disallows this URL for Googlebot");
  }
  if (requireSitemap && !sitemapSet.has(expectedCanonical)) {
    addFailure(failures, "sitemap-membership", pageUrl, "Indexable page is missing from sitemap");
  }
  if (new URL(expectedCanonical).origin !== productionOrigin) {
    addFailure(failures, "canonical-host", pageUrl, "Canonical does not use the production origin", { expectedCanonical });
  }

  const internalLinkIssues = validateInternalLinks(pageUrl, response.body, productionOrigin, failures);

  return {
    status: response.status,
    redirectCount: response.redirectChain.length,
    contentType: response.contentType,
    canonical: response.canonicalUrls[0] || "",
    canonicalCount: response.canonicalUrls.length,
    metaRobots: response.metaRobots.join(", "),
    metaGooglebot: response.metaGooglebot.join(", "),
    xRobotsTag: response.xRobotsTag,
    bodyLength: response.bodyLength,
    title: response.title,
    description: response.description,
    sitemapIncluded: sitemapSet.has(expectedCanonical),
    robotsAllowed,
    internalLinkIssues: internalLinkIssues.length
  };
}

async function auditRedirectVariants({ baseUrl, productionOrigin, failures }) {
  const checks = [];
  const canonicalPathVariants = [
    "/calculators",
    "/benefits/youth-rent-support",
    "/guides/how-to-find-government-benefits"
  ];

  for (const variantPath of canonicalPathVariants) {
    const response = await fetchWithRedirects(variantPath, BROWSER_UA, baseUrl, productionOrigin);
    const finalPath = new URL(response.finalUrl).pathname;
    const expectedPath = canonicalPath(variantPath);
    const firstStatus = response.redirectChain[0]?.status;
    const passed = response.redirectChain.length === 1 && [301, 308].includes(firstStatus) && finalPath === expectedPath;

    if (!passed) {
      addFailure(failures, "redirect", variantPath, "Non-trailing-slash URL must redirect once to trailing slash canonical URL", {
        expectedPath,
        finalUrl: response.finalUrl,
        redirectChain: response.redirectChain
      });
    }

    checks.push({
      input: variantPath,
      expectedFinalPath: expectedPath,
      finalUrl: response.finalUrl,
      status: response.status,
      redirects: response.redirectChain.length,
      firstRedirectStatus: firstStatus || null,
      passed
    });
  }

  if (new URL(baseUrl).origin === productionOrigin) {
    const hostVariants = [
      {
        input: "http://jiwoncalc.co.kr/calculators/",
        expectedFinalUrl: `${productionOrigin}/calculators/`
      },
      {
        input: "https://www.jiwoncalc.co.kr/calculators/",
        expectedFinalUrl: `${productionOrigin}/calculators/`
      }
    ];

    for (const variant of hostVariants) {
      const response = await fetchWithRedirects(variant.input, BROWSER_UA, baseUrl, productionOrigin);
      const firstStatus = response.redirectChain[0]?.status;
      const passed =
        response.redirectChain.length === 1 &&
        [301, 308].includes(firstStatus) &&
        response.finalUrl === variant.expectedFinalUrl &&
        response.status === 200;

      if (!passed) {
        addFailure(failures, "redirect", variant.input, "Host/protocol variant must redirect once to the production canonical URL", {
          expectedFinalUrl: variant.expectedFinalUrl,
          finalUrl: response.finalUrl,
          redirectChain: response.redirectChain
        });
      }

      checks.push({
        input: variant.input,
        expectedFinalUrl: variant.expectedFinalUrl,
        finalUrl: response.finalUrl,
        status: response.status,
        redirects: response.redirectChain.length,
        firstRedirectStatus: firstStatus || null,
        passed
      });
    }
  }

  return checks;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const productionOrigin = new URL(args.productionOrigin || PRODUCTION_ORIGIN).origin;
  let localServer = null;
  let baseUrl = args.baseUrl;

  if (args.serveOut) {
    localServer = await startOutServer(args.port);
    baseUrl = localServer.baseUrl;
  }

  if (!baseUrl) baseUrl = productionOrigin;
  baseUrl = new URL(baseUrl).origin;

  const failures = [];

  try {
    const robotsBrowser = inspectResponse(
      await fetchWithRedirects("/robots.txt", BROWSER_UA, baseUrl, productionOrigin)
    );
    const robotsGooglebot = inspectResponse(
      await fetchWithRedirects("/robots.txt", GOOGLEBOT_UA, baseUrl, productionOrigin)
    );
    compareResponses("/robots.txt", robotsBrowser, robotsGooglebot, failures);
    const robotsSummary = validateRobotsTxt(robotsBrowser, robotsBrowser.body, productionOrigin, failures);
    const robotsGroups = parseRobotsGroups(robotsBrowser.body);

    const sitemapBrowser = inspectResponse(
      await fetchWithRedirects("/sitemap.xml", BROWSER_UA, baseUrl, productionOrigin)
    );
    const sitemapGooglebot = inspectResponse(
      await fetchWithRedirects("/sitemap.xml", GOOGLEBOT_UA, baseUrl, productionOrigin)
    );
    compareResponses("/sitemap.xml", sitemapBrowser, sitemapGooglebot, failures);

    if (sitemapBrowser.status !== 200) {
      addFailure(failures, "sitemap", "/sitemap.xml", "sitemap.xml must return 200", {
        status: sitemapBrowser.status
      });
    }
    if (!/xml/i.test(sitemapBrowser.contentType)) {
      addFailure(failures, "sitemap", "/sitemap.xml", "sitemap.xml must return an XML content type", {
        contentType: sitemapBrowser.contentType
      });
    }

    const sitemapUrls = parseSitemapLocs(sitemapBrowser.body);
    const sitemapSet = new Set(sitemapUrls);
    const duplicateSitemapUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);

    if (duplicateSitemapUrls.length) {
      addFailure(failures, "sitemap", "/sitemap.xml", "Sitemap contains duplicate URLs", {
        duplicateSitemapUrls
      });
    }

    for (const sitemapUrl of sitemapUrls) {
      const url = new URL(sitemapUrl);
      if (url.origin !== productionOrigin) {
        addFailure(failures, "sitemap", sitemapUrl, "Sitemap loc must use production canonical origin");
      }
      if (url.search) {
        addFailure(failures, "sitemap", sitemapUrl, "Sitemap loc must not contain query parameters");
      }
      if (productionUrlForPath(url.pathname, productionOrigin) !== sitemapUrl) {
        addFailure(failures, "sitemap", sitemapUrl, "Sitemap loc does not follow canonical trailing slash policy");
      }
    }

    const samplePaths = buildSamplePaths(sitemapUrls);
    const sampleRows = [];

    for (const pathname of samplePaths) {
      const browser = inspectResponse(
        await fetchWithRedirects(pathname, BROWSER_UA, baseUrl, productionOrigin)
      );
      const googlebot = inspectResponse(
        await fetchWithRedirects(pathname, GOOGLEBOT_UA, baseUrl, productionOrigin)
      );
      compareResponses(pathname, browser, googlebot, failures);

      const isHtml = browser.contentType.toLowerCase().includes("text/html");
      const expectedCanonical = productionUrlForPath(pathname, productionOrigin);
      const sitemapIncluded = sitemapSet.has(expectedCanonical);
      const robotsAllowed = isAllowedByRobots(robotsGroups, pathname, GOOGLEBOT_UA);

      if (pathname === "/robots.txt") {
        if (browser.status !== 200 || !browser.contentType.toLowerCase().includes("text/plain")) {
          addFailure(failures, "sample", pathname, "robots.txt sample must be 200 text/plain");
        }
      } else if (pathname === "/sitemap.xml") {
        if (browser.status !== 200 || !/xml/i.test(browser.contentType)) {
          addFailure(failures, "sample", pathname, "sitemap.xml sample must be 200 XML");
        }
      } else if (isHtml) {
        validateHtmlPage({
          pageUrl: pathname,
          expectedCanonical,
          response: browser,
          sitemapSet,
          robotsGroups,
          productionOrigin,
          failures
        });
      } else {
        addFailure(failures, "sample", pathname, "Expected an HTML page for indexable sample", {
          contentType: browser.contentType
        });
      }

      sampleRows.push({
        path: pathname,
        status: browser.status,
        redirects: browser.redirectChain.length,
        contentType: browser.contentType,
        canonical: browser.canonicalUrls[0] || "",
        metaRobots: browser.metaRobots.join(", "),
        metaGooglebot: browser.metaGooglebot.join(", "),
        xRobotsTag: browser.xRobotsTag,
        bodyLength: browser.bodyLength,
        title: browser.title,
        sitemapIncluded,
        robotsAllowed
      });
    }

    const sitemapRows = [];
    const canonicalOwners = new Map();

    for (const sitemapUrl of sitemapUrls) {
      const response = inspectResponse(
        await fetchWithRedirects(sitemapUrl, BROWSER_UA, baseUrl, productionOrigin)
      );
      const row = validateHtmlPage({
        pageUrl: sitemapUrl,
        expectedCanonical: sitemapUrl,
        response,
        sitemapSet,
        robotsGroups,
        productionOrigin,
        failures,
        requireNoRedirect: true
      });
      sitemapRows.push({ url: sitemapUrl, ...row });

      if (row.canonical) {
        const owners = canonicalOwners.get(row.canonical) || [];
        owners.push(sitemapUrl);
        canonicalOwners.set(row.canonical, owners);
      }
    }

    for (const [canonical, owners] of canonicalOwners.entries()) {
      if (owners.length > 1) {
        addFailure(failures, "canonical-duplicate", canonical, "Multiple sitemap URLs share one canonical", {
          owners
        });
      }
    }

    const queryChecks = [];
    const querySamples = [
      "/?utm_source=seo-audit",
      "/calculators/?gclid=seo-audit",
      "/benefits/youth-rent-support/?fbclid=seo-audit"
    ];

    for (const queryPath of querySamples) {
      const response = inspectResponse(
        await fetchWithRedirects(queryPath, BROWSER_UA, baseUrl, productionOrigin)
      );
      const url = new URL(queryPath, productionOrigin);
      const expectedCanonical = productionUrlForPath(url.pathname, productionOrigin);
      const canonical = response.canonicalUrls[0] || "";
      const passed = response.status === 200 && canonical === expectedCanonical && !sitemapSet.has(`${expectedCanonical}${url.search}`);
      if (!passed) {
        addFailure(failures, "query-canonical", queryPath, "Query URL must canonicalize to the clean URL and stay out of sitemap", {
          expectedCanonical,
          actualCanonical: canonical,
          status: response.status
        });
      }
      queryChecks.push({
        path: queryPath,
        status: response.status,
        canonical,
        expectedCanonical,
        sitemapIncluded: sitemapSet.has(`${expectedCanonical}${url.search}`)
      });
    }

    const redirectChecks = await auditRedirectVariants({ baseUrl, productionOrigin, failures });

    const result = {
      auditedAt: new Date().toISOString(),
      baseUrl,
      productionOrigin,
      servedOutDirectory: Boolean(args.serveOut),
      robots: {
        status: robotsBrowser.status,
        contentType: robotsBrowser.contentType,
        disallowRules: robotsSummary.disallowRules,
        googlebotRules: robotsSummary.googlebotRules,
        body: robotsBrowser.body
      },
      sitemap: {
        status: sitemapBrowser.status,
        contentType: sitemapBrowser.contentType,
        urlCount: sitemapUrls.length,
        duplicateUrlCount: duplicateSitemapUrls.length,
        urls: sitemapUrls
      },
      samples: sampleRows,
      sitemapPages: sitemapRows,
      queryChecks,
      redirectChecks,
      failures,
      passed: failures.length === 0
    };

    console.log(`SEO audit base: ${baseUrl}`);
    console.log(`Production canonical origin: ${productionOrigin}`);
    console.log(`Sitemap URL count: ${sitemapUrls.length}`);
    console.table(sampleRows.map((row) => ({
      path: row.path,
      status: row.status,
      redirects: row.redirects,
      canonical: row.canonical,
      robotsAllowed: row.robotsAllowed,
      sitemap: row.sitemapIncluded,
      bodyLength: row.bodyLength
    })));
    console.table(queryChecks.map((row) => ({
      path: row.path,
      status: row.status,
      canonical: row.canonical,
      sitemap: row.sitemapIncluded
    })));
    console.table(redirectChecks.map((row) => ({
      input: row.input,
      finalUrl: row.finalUrl,
      status: row.status,
      redirects: row.redirects,
      passed: row.passed
    })));

    await writeFile(path.resolve(repoRoot, args.output), `${JSON.stringify(result, null, 2)}\n`);

    if (failures.length) {
      console.error(`SEO audit failed with ${failures.length} issue(s).`);
      console.error(JSON.stringify(failures.slice(0, 20), null, 2));
      process.exitCode = 1;
    } else {
      console.log("SEO audit passed.");
    }
  } finally {
    if (localServer) await localServer.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

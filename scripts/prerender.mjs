import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const routes = ["/", "/work", "/about", "/services", "/faq", "/contact"];

function canonicalUrl(siteUrl, route) {
  return new URL(route === "/" ? "/" : route, siteUrl).toString();
}

function replaceTagAttribute(html, selectorPattern, attribute, value) {
  return html.replace(selectorPattern, (tag) => tag.replace(new RegExp(`${attribute}="[^"]*"`), `${attribute}="${value}"`));
}

function applyRouteMeta(html, route, routeMeta, siteUrl) {
  const meta = routeMeta[route] ?? routeMeta["/"];
  const url = canonicalUrl(siteUrl, route);

  return replaceTagAttribute(
    replaceTagAttribute(
      replaceTagAttribute(
        replaceTagAttribute(
          replaceTagAttribute(
            replaceTagAttribute(
              replaceTagAttribute(
                html.replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`),
                /<meta name="description"[^>]*>/,
                "content",
                meta.description,
              ),
              /<link rel="canonical"[^>]*>/,
              "href",
              url,
            ),
            /<meta property="og:title"[^>]*>/,
            "content",
            meta.title,
          ),
          /<meta property="og:description"[^>]*>/,
          "content",
          meta.description,
        ),
        /<meta property="og:url"[^>]*>/,
        "content",
        url,
      ),
      /<meta name="twitter:title"[^>]*>/,
      "content",
      meta.title,
    ),
    /<meta name="twitter:description"[^>]*>/,
    "content",
    meta.description,
  ).replace(/<meta name="twitter:url"[^>]*>/, (tag) => tag.replace(/content="[^"]*"/, `content="${url}"`));
}

function outputFileForRoute(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, route.slice(1), "index.html");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyAssetManifest(html, manifest) {
  return Object.entries(manifest).reduce((currentHtml, [sourcePath, entry]) => {
    if (!entry || typeof entry !== "object" || !("file" in entry)) return currentHtml;

    const sourceUrl = `/${sourcePath}`;
    const builtUrl = `/${entry.file}`;
    return currentHtml.replace(new RegExp(escapeRegExp(sourceUrl), "g"), builtUrl);
  }, html);
}

function stripRootResourceHints(html) {
  return html.replace(/<link rel="(?:preload|preinit)"[^>]*\/>/g, "");
}

function renderStructuredData(items) {
  return items
    .map((item) => {
      const json = JSON.stringify(item, null, 2).replace(/</g, "\\u003c");
      return `    <script type="application/ld+json" data-route-schema="true">\n${json}\n    </script>`;
    })
    .join("\n\n");
}

function applyStructuredData(html, items) {
  const schemaHtml = renderStructuredData(items);
  const withoutSchema = html.replace(/\s*<script type="application\/ld\+json"[\s\S]*?<\/script>/g, "");
  return withoutSchema.replace(/\n\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>/, `\n${schemaHtml}\n\n    <link rel="preconnect" href="https://fonts.googleapis.com" />`);
}

const template = await readFile(path.join(distDir, "index.html"), "utf8");
const manifest = JSON.parse(await readFile(path.join(distDir, ".vite", "manifest.json"), "utf8"));
const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  root: rootDir,
  server: { middlewareMode: true },
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  const { getStructuredData, ROUTE_META, SITE_URL } = await vite.ssrLoadModule("/src/seo.ts");

  for (const route of routes) {
    const appHtml = stripRootResourceHints(renderToString(React.createElement(App, { initialPath: route })));
    const html = applyAssetManifest(
      applyStructuredData(
        applyRouteMeta(
          template.replace(/<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`),
          route,
          ROUTE_META,
          SITE_URL,
        ),
        getStructuredData(route),
      ),
      manifest,
    );

    const outputFile = outputFileForRoute(route);
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, html, "utf8");
    console.log(`Prerendered ${route} -> ${path.relative(rootDir, outputFile)}`);
  }
} finally {
  await vite.close();
}

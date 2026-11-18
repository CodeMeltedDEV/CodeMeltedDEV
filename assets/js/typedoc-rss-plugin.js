// typedoc-rss-plugin.js
const fs = require('node:fs');
const path = require('node:path');
const { RendererEvent, MarkdownEvent, JSX, DocumentReflection } = require('typedoc');
const { Feed } = require('feed');

/**
 * Escapes HTML special characters for safe interpolation in rss/index.html
 *
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Determines whether a DocumentReflection should be excluded from the RSS feed
 * (e.g., static pages under documents/about/* or top-level index pages like Articles).
 *
 * @param {import('typedoc').DocumentReflection} model
 * @returns {boolean}
 */
function isExcludedDocument(model) {
  const sourceFile = model.sources?.[0]?.fullFileName?.replace(/\\/g, '/') || '';
  if (
    sourceFile.includes('/documents/about/') ||
    /\/documents\/about\.md$/i.test(sourceFile) ||
    /\/documents\/articles\.md$/i.test(sourceFile)
  ) {
    return true;
  }

  let current = model;
  while (current && !current.isProject()) {
    if (current.name === 'About') {
      return true;
    }
    current = current.parent;
  }

  if (model.name === 'Articles' && (!model.parent || model.parent.isProject())) {
    return true;
  }

  return false;
}

/**
 * Extracts a clean plain-text excerpt from TypeDoc CommentDisplayPart[]
 *
 * @param {Array<{kind: string, text: string}> | undefined} parts
 * @param {number} maxLength
 * @returns {string}
 */
function extractExcerpt(parts, maxLength = 280) {
  if (!Array.isArray(parts) || parts.length === 0) return '';

  const rawText = parts
    .map((part) => part.text)
    .join('')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_`~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (rawText.length <= maxLength) return rawText;
  return rawText.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Extracts an explicit hero image URL from frontmatter if provided.
 *
 * @param {import('typedoc').DocumentReflection} model
 * @param {string} siteUrl
 * @param {string} outputDir
 * @returns {string | undefined}
 */
function extractHeroImage(model, siteUrl, outputDir) {
  const rawSrc = model.frontmatter?.image || model.frontmatter?.cover || '';
  if (!rawSrc) return undefined;

  if (/^https?:\/\//i.test(rawSrc)) {
    return rawSrc;
  }

  const cleanRel = rawSrc.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '').replace(/^\//, '');
  const filename = path.basename(cleanRel);

  if (fs.existsSync(path.join(outputDir, 'media', filename))) {
    return `${siteUrl}/media/${filename}`;
  }

  return `${siteUrl}/${cleanRel}`;
}

/**
 * Cleans custom Web Components, scripts, and TypeDoc UI chrome from rendered HTML
 * and resolves relative src="..." and href="..." URLs to absolute site URLs.
 *
 * @param {string} bodyHtml
 * @param {string} pageUrl
 * @param {string} siteUrl
 * @param {string} outputDir
 * @returns {string}
 */
function sanitizeAndResolveHtml(bodyHtml, pageUrl, siteUrl, outputDir) {
  if (!bodyHtml) return '';

  const pageDirUrl = `${siteUrl}/${path.posix.dirname(pageUrl)}`.replace(/\/\.$/, '');

  let cleaned = bodyHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<button\b[^>]*>[\s\S]*?<\/button>/gi, '')
    .replace(/<a\b[^>]*\bclass=["'][^"']*\btsd-anchor-icon\b[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<cm-page-header\b[^>]*>[\s\S]*?<\/cm-page-header>/gi, '')
    .replace(/<cm-page-footer\b[^>]*>[\s\S]*?<\/cm-page-footer>/gi, '')
    .replace(/<cm-sw-eng-buttons\b[^>]*>[\s\S]*?<\/cm-sw-eng-buttons>/gi, '')
    .replace(/<cm-embedded-frame\b([^>]*)>[\s\S]*?<\/cm-embedded-frame>/gi, (_, attrs) => {
      const openMatch = attrs.match(/\bopen_src=["']([^"']+)["']/i);
      const frameMatch = attrs.match(/\bframe_src=["']([^"']+)["']/i);
      const labelMatch = attrs.match(/\blabel=["']([^"']+)["']/i);
      const rawHref = openMatch?.[1] || frameMatch?.[1] || '';

      if (!rawHref) return '';

      const resolvedHref = /^https?:\/\//i.test(rawHref)
        ? rawHref
        : new URL(rawHref, `${siteUrl}/`).href;
      const linkText = labelMatch?.[1] || 'View Embedded Content';

      return `<p><a href="${resolvedHref}" target="_blank" rel="noopener">${linkText}</a></p>`;
    })
    .replace(/<p>\s*<\/p>/gi, '');

  cleaned = cleaned.replace(/\b(src|href)=["']([^"']+)["']/gi, (full, attr, val) => {
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(val)) {
      return full;
    }

    const filename = path.basename(val.split(/[?#]/)[0]);
    if (attr.toLowerCase() === 'src' && fs.existsSync(path.join(outputDir, 'media', filename))) {
      return `${attr}="${siteUrl}/media/${filename}"`;
    }

    const resolved = new URL(val, `${pageDirUrl}/`).href;
    return `${attr}="${resolved}"`;
  });

  return cleaned.trim();
}

/**
 * Generates a clean static HTML preview page (rss/index.html) without deprecated XSLT.
 *
 * @param {string} feedTitle
 * @param {string} feedDescription
 * @param {string} feedUrl
 * @param {Array<import('feed').Item>} items
 * @returns {string}
 */
function buildFeedHtml(feedTitle, feedDescription, feedUrl, items) {
  const articlesHtml = items
    .map((item) => {
      const dateStr = item.date instanceof Date ? item.date.toUTCString() : '';
      return `
      <article>
        <h2><a href="${escapeHtml(item.link)}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a></h2>
        <div class="meta">${escapeHtml(dateStr)}</div>
        <p class="desc">${escapeHtml(item.description)}</p>
      </article>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${escapeHtml(feedTitle)} — RSS Feed</title>
    <link rel="alternate" type="application/rss+xml" title="${escapeHtml(feedTitle)}" href="${escapeHtml(feedUrl)}"/>
    <style>
      body { font-family: system-ui, -apple-system, sans-serif; max-width: 820px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; color: #1f2328; background: #ffffff; }
      .banner { background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 2rem; }
      .banner h1 { margin: 0 0 0.25rem 0; font-size: 1.4rem; }
      .banner p { margin: 0.25rem 0; color: #57606a; font-size: 0.95rem; }
      .feed-url { display: inline-block; margin-top: 0.5rem; font-family: monospace; background: #eaeef2; padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.85rem; color: #0969da; text-decoration: none; word-break: break-all; }
      .feed-url:hover { text-decoration: underline; }
      article { border-bottom: 1px solid #d8dee4; padding: 1.25rem 0; }
      article:last-child { border-bottom: none; }
      article h2 { margin: 0 0 0.35rem 0; font-size: 1.2rem; }
      article h2 a { color: #0969da; text-decoration: none; }
      article h2 a:hover { text-decoration: underline; }
      .meta { font-size: 0.85rem; color: #57606a; margin-bottom: 0.5rem; }
      .desc { margin: 0; color: #24292f; }
      @media (prefers-color-scheme: dark) {
        body { background: #0d1117; color: #e6edf3; }
        .banner { background: #161b22; border-color: #30363d; }
        .banner p, .meta { color: #8b949e; }
        .feed-url { background: #21262d; color: #58a6ff; }
        article { border-color: #30363d; }
        article h2 a { color: #58a6ff; }
        .desc { color: #c9d1d9; }
      }
    </style>
  </head>
  <body>
    <div class="banner">
      <h1>${escapeHtml(feedTitle)}</h1>
      <p>${escapeHtml(feedDescription)}</p>
      <p><strong>RSS Feed URL:</strong> Copy and paste this URL into your RSS reader:</p>
      <a class="feed-url" href="${escapeHtml(feedUrl)}" target="_blank" rel="noopener">${escapeHtml(feedUrl)}</a>
    </div>
    ${articlesHtml}
  </body>
</html>`;
}

/**
 * TypeDoc plugin entry point
 *
 * @param {import('typedoc').Application} app
 */
function load(app) {
  const siteUrl = 'https://codemelted.dev';
  const feedUrl = `${siteUrl}/rss/feed.xml`;
  const feedTitle = 'CodeMeltedDEV Articles & Documentation';
  const feedDescription = 'Software engineering articles, domain use cases, and developer guides';

  /** @type {Map<string, string>} */
  const renderedHtmlByPageUrl = new Map();

  app.renderer.on(MarkdownEvent.PARSE, (event) => {
    if (event.page?.url && event.parsedText) {
      renderedHtmlByPageUrl.set(event.page.url, event.parsedText);
    }
  });

  // 1. Inject RSS link tag into the <head> of all generated HTML pages
  app.renderer.hooks.on('head.end', () => {
    return JSX.createElement('link', {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'CodeMeltedDEV Articles & Documentation RSS Feed',
      href: feedUrl,
    });
  });

  // 2. Generate and write rss/feed.xml and rss/index.html synchronously once rendering completes
  app.renderer.on(RendererEvent.END, (event) => {
    const outputDir = event.outputDirectory;

    const feed = new Feed({
      title: feedTitle,
      description: feedDescription,
      id: `${siteUrl}/`,
      link: `${siteUrl}/`,
      language: 'en',
      updated: new Date(),
      generator: 'TypeDoc RSS Generator',
      feedLinks: {
        rss2: feedUrl,
      },
    });

    /** @type {Array<import('feed').Item>} */
    const items = [];

    for (const page of event.pages ?? []) {
      const model = page.model;

      if (!(model instanceof DocumentReflection)) {
        continue;
      }

      if (isExcludedDocument(model)) {
        continue;
      }

      const itemUrl = `${siteUrl}/${page.url}`;

      const title =
        model.parent && !model.parent.isProject()
          ? `${model.parent.name} — ${model.name}`
          : model.name;

      const description =
        model.frontmatter?.description ||
        extractExcerpt(model.content) ||
        `${title} — CodeMeltedDEV`;

      const rawHtml = renderedHtmlByPageUrl.get(page.url) || '';
      const fullHtml = sanitizeAndResolveHtml(rawHtml, page.url, siteUrl, outputDir);
      const imageUrl = extractHeroImage(model, siteUrl, outputDir);

      let pubDate = new Date();
      if (model.frontmatter?.date) {
        const parsed = new Date(model.frontmatter.date);
        if (!Number.isNaN(parsed.getTime())) {
          pubDate = parsed;
        }
      }

      /** @type {import('feed').Item} */
      const item = {
        title: title,
        id: itemUrl,
        link: itemUrl,
        description: description,
        content: fullHtml || description,
        date: pubDate,
      };

      if (imageUrl) {
        item.image = imageUrl;
      }

      items.push(item);
    }

    items.sort((a, b) => b.date.getTime() - a.date.getTime());

    for (const item of items) {
      feed.addItem(item);
    }

    const rssDir = path.join(outputDir, 'rss');
    fs.mkdirSync(rssDir, { recursive: true });

    const feedPath = path.join(rssDir, 'feed.xml');
    fs.writeFileSync(feedPath, feed.rss2(), 'utf-8');

    const htmlPath = path.join(rssDir, 'index.html');
    fs.writeFileSync(htmlPath, buildFeedHtml(feedTitle, feedDescription, feedUrl, items), 'utf-8');

    app.logger.info(
      `Generated RSS feed (${items.length} items) at ${feedPath} and preview at ${htmlPath}`
    );
  });
}

module.exports = { load };
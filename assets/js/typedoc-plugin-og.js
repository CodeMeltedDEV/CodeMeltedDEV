const { JSX, ParameterType } = require("typedoc");

// =========================================================================
// 1. CONFIGURATION
// Ensure this maps perfectly to your production deployment server routing
// =========================================================================
const SITE_DOMAIN = "https://js.codemelted.com/";

/**
 * Strips markdown and HTML artifacts to generate clean plain-text for SEO.
 * @param {string} mdText
 * @returns {string}
 */
function summarizeMarkdown(mdText) {
  if (!mdText) return "";

  const cleanText = mdText
    // Strip HTML wrappers frequently used in readmes (like <center>, <img> blocks)
    .replace(/<[^>]*>/g, "")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`([^`]+)`/g, "\$1")
    // Remove headers
    .replace(/^\s*#+\s+(.*)\$/gm, "\$1")
    // Remove markdown links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "\$1")
    // Remove emphasis
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "\$1")
    // Normalize spacing
    .replace(/\s+/g, " ")
    .trim();

  return cleanText.length > 155 ? cleanText.slice(0, 152) + "..." : cleanText;
}

/**
 * @param {import("typedoc").Application} app
 */
module.exports.load = function load(app) {
  // Declare the custom configuration keys so TypeDoc doesn't throw a validation error
  app.options.addDeclaration({
    name: "customDescription",
    help: "Default SEO description for the main README homepage.",
    type: ParameterType.String,
  });

  app.options.addDeclaration({
    name: "customImage",
    help: "Default Open Graph share image URL.",
    type: ParameterType.String,
  });

  app.options.addDeclaration({
    name: "customTwitter",
    help: "Default Twitter/X site account handle.",
    type: ParameterType.String,
  });

  app.renderer.hooks.on("head.end", (context) => {
    const page = context.page;
    if (!page || !page.model) return JSX.createElement(JSX.Fragment, null);

    // 2. FETCH VALUES DECLARED IN TYPEDOC.JSON
    const globalDescription = app.options.getValue("customDescription") || "";
    const globalImage = app.options.getValue("customImage") || "https://codemelted.com";
    const globalTwitter = app.options.getValue("customTwitter") || "@CodeMeltedDEV";

    // 3. BASELINE DATA FALLBACKS
    const baseTitle = page.title || page.model.name || "API Documentation";
    let baseDescription = globalDescription || "Technical reference and API documentation.";

    if (page.model.comment && page.model.comment.summary) {
      baseDescription = page.model.comment.summary
        .map(part => part.text)
        .join("")
        .slice(0, 150) + "...";
    } else if (page.model.readme && !globalDescription) {
      const markdownBody = page.model.readme.map(part => part.text).join("");
      const generatedSummary = summarizeMarkdown(markdownBody);
      if (generatedSummary) {
        baseDescription = generatedSummary;
      }
    }

    // 4. CANONICAL PATH GENERATOR
    let finalPageUrl = "";
    if (page.url) {
      finalPageUrl = `${SITE_DOMAIN}${page.url.replace(/\\/g, "/")}`;
    }

    // 5. EXTRACT INDIVIDUAL DOC PAGE FRONTMATTER (Works for non-readme markdown files)
    const frontmatter = page.model.frontmatter || {};

    const finalTitle = frontmatter.title || baseTitle;
    const finalDescription = frontmatter.description || baseDescription;
    const finalImage = frontmatter.image || globalImage;
    const twitterHandle = frontmatter.twitter_site || globalTwitter;

    // 6. RENDER VALID METADATA NODES
    return JSX.createElement(
      JSX.Fragment,
      null,
      /* Open Graph Meta Tags */
      JSX.createElement("meta", { property: "og:type", content: "website" }),
      JSX.createElement("meta", { property: "og:title", content: finalTitle }),
      JSX.createElement("meta", { property: "og:description", content: finalDescription }),
      finalPageUrl ? JSX.createElement("meta", { property: "og:url", content: finalPageUrl }) : null,
      JSX.createElement("meta", { property: "og:image", content: finalImage }),

      /* Twitter Card Meta Tags */
      JSX.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
      JSX.createElement("meta", { name: "twitter:site", content: twitterHandle }),
      JSX.createElement("meta", { name: "twitter:title", content: finalTitle }),
      JSX.createElement("meta", { name: "twitter:description", content: finalDescription }),
      JSX.createElement("meta", { name: "twitter:image", content: finalImage })
    );
  });
};

/**
 * Projukti Labs Blog CMS — HTML Sanitizer & Security Policy
 * Complies with Phase 17 Stage 17 (Security & Sanitization).
 * Zero-dependency, Workers-safe DOM/HTML parser and sanitizer.
 */

const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "blockquote", "pre", "code",
  "ul", "ol", "li",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td",
  "a", "img", "hr", "br",
  "strong", "b", "em", "i", "u", "s", "strike", "del", "mark", "sub", "sup",
  "span", "div", "figure", "figcaption", "kbd", "cite",
  "iframe", "video", "audio", "source"
]);

const ALLOWED_ATTRS = new Set([
  "href", "src", "alt", "title", "target", "rel",
  "class", "id", "width", "height", "loading",
  "colspan", "rowspan", "scope", "align",
  "allow", "allowfullscreen", "frameborder", "controls", "type"
]);

const SAFE_URL_PROTOCOLS = /^(https?:|\/|#|mailto:)/i;

const TRUSTED_IFRAME_DOMAINS = [
  /^https:\/\/(www\.)?youtube\.com\/embed\//i,
  /^https:\/\/(www\.)?youtube-nocookie\.com\/embed\//i,
  /^https:\/\/player\.vimeo\.com\/video\//i,
  /^https:\/\/(www\.)?loom\.com\/embed\//i,
];

/**
 * Sanitizes an HTML string by removing scripts, inline event handlers,
 * javascript: protocols, and unauthorized tags or attributes.
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  // 1. Remove script, style, object, embed tags entirely with their contents
  let clean = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "");

  // Sanitize iframes: only preserve trusted video embeds (YouTube, Vimeo, Loom)
  clean = clean.replace(/<iframe\b([^>]*)>([\s\S]*?)<\/iframe>/gi, (match, attrs) => {
    const srcMatch = attrs.match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^>\s]+))/i);
    const src = srcMatch ? (srcMatch[1] ?? srcMatch[2] ?? srcMatch[3] ?? "") : "";
    const isTrusted = TRUSTED_IFRAME_DOMAINS.some((regex) => regex.test(src.trim()));
    if (!isTrusted) return "";
    return `<div class="aspect-video my-6 overflow-hidden rounded-2xl border border-border shadow-sm"><iframe ${attrs} loading="lazy" class="w-full h-full border-0"></iframe></div>`;
  });

  // 2. Remove comments
  clean = clean.replace(/<!--[\s\S]*?-->/g, "");

  // 3. Remove inline event handlers like onclick=..., onload=..., onerror=...
  clean = clean.replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "");
  clean = clean.replace(/\son[a-z]+\s*=\s*[^>\s]+/gi, "");

  // 4. Sanitize tags and attributes using regex tokenization
  clean = clean.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, tag, attrString) => {
    const tagName = tag.toLowerCase();

    // If tag is not allowed, strip it but keep any inner content (or discard self-closing)
    if (!ALLOWED_TAGS.has(tagName)) {
      return "";
    }

    // Closing tag
    if (match.startsWith("</")) {
      return `</${tagName}>`;
    }

    // Process attributes on opening or self-closing tags
    const attrs: string[] = [];
    const attrRegex = /([a-z0-9_-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^>\s]+)))?/gi;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrValue = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";

      // Skip attributes not explicitly allowed
      if (!ALLOWED_ATTRS.has(attrName)) {
        continue;
      }

      // Check URLs for javascript: or other unsafe protocols
      if (attrName === "href" || attrName === "src") {
        const trimmedVal = attrValue.trim();
        if (!SAFE_URL_PROTOCOLS.test(trimmedVal)) {
          continue; // Discard unsafe URL
        }
      }

      // Enforce rel="noopener noreferrer" on target="_blank" links
      if (attrName === "target" && attrValue === "_blank") {
        attrs.push('target="_blank"');
        attrs.push('rel="noopener noreferrer"');
        continue;
      }

      // Add cleaned attribute
      const safeVal = attrValue.replace(/"/g, "&quot;");
      attrs.push(`${attrName}="${safeVal}"`);
    }

    // Build tag
    const isSelfClosing = match.endsWith("/>") || ["img", "hr", "br"].includes(tagName);
    const attrText = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `<${tagName}${attrText}${isSelfClosing ? " />" : ">"}`;
  });

  return clean.trim();
}

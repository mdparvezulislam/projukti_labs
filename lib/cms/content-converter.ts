/**
 * Projukti Labs Blog CMS — Content Converter
 * Supports bidirectional Markdown <-> HTML conversion and format detection.
 */

import { sanitizeHtml } from "./sanitizer";

export function detectContentFormat(content: string): "html" | "markdown" {
  if (!content) return "html";
  const htmlTagPattern = /<\/?(p|h[1-6]|ul|ol|li|blockquote|pre|code|table|div|article|section|figure)[>\s]/i;
  return htmlTagPattern.test(content) ? "html" : "markdown";
}

/**
 * Converts Markdown text into clean, sanitized HTML
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  const lines = markdown.split("\n");
  const htmlParts: string[] = [];
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockLines: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";
  let inTable = false;

  const closeListIfNeeded = () => {
    if (inList) {
      htmlParts.push(`</${listType}>`);
      inList = false;
    }
  };

  const closeTableIfNeeded = () => {
    if (inTable) {
      htmlParts.push("</tbody></table></div>");
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith("```")) {
      closeListIfNeeded();
      closeTableIfNeeded();
      if (inCodeBlock) {
        const langAttr = codeBlockLang ? ` class="language-${codeBlockLang}"` : "";
        const escapedCode = codeBlockLines
          .join("\n")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        htmlParts.push(`<pre><code${langAttr}>${escapedCode}</code></pre>`);
        inCodeBlock = false;
        codeBlockLines = [];
        codeBlockLang = "";
      } else {
        inCodeBlock = true;
        codeBlockLang = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Empty lines
    if (!trimmed) {
      closeListIfNeeded();
      closeTableIfNeeded();
      continue;
    }

    // Horizontal Rule
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      closeListIfNeeded();
      closeTableIfNeeded();
      htmlParts.push("<hr />");
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeListIfNeeded();
      closeTableIfNeeded();
      const level = headingMatch[1].length;
      const text = inlineFormat(headingMatch[2]);
      htmlParts.push(`<h${level}>${text}</h${level}>`);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      closeListIfNeeded();
      closeTableIfNeeded();
      const text = inlineFormat(trimmed.replace(/^>\s+/, ""));
      htmlParts.push(`<blockquote><p>${text}</p></blockquote>`);
      continue;
    }

    // Markdown Table
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      closeListIfNeeded();
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());

      // Check if delimiter row like | --- | --- |
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue; // delimiter row, skip
      }

      if (!inTable) {
        inTable = true;
        htmlParts.push('<div class="table-container my-6 overflow-x-auto"><table class="w-full text-left border-collapse border border-border">');
        htmlParts.push("<thead><tr class=\"bg-surface-elevated border-b border-border\">");
        for (const cell of cells) {
          htmlParts.push(`<th class="p-3 font-semibold text-text-primary text-sm">${inlineFormat(cell)}</th>`);
        }
        htmlParts.push("</tr></thead><tbody>");
      } else {
        htmlParts.push('<tr class="border-b border-border/50 hover:bg-surface/30">');
        for (const cell of cells) {
          htmlParts.push(`<td class="p-3 text-text-secondary text-sm">${inlineFormat(cell)}</td>`);
        }
        htmlParts.push("</tr>");
      }
      continue;
    } else {
      closeTableIfNeeded();
    }

    // Unordered List
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      closeTableIfNeeded();
      if (!inList || listType !== "ul") {
        closeListIfNeeded();
        inList = true;
        listType = "ul";
        htmlParts.push("<ul>");
      }
      const itemText = inlineFormat(trimmed.slice(2));
      htmlParts.push(`<li>${itemText}</li>`);
      continue;
    }

    // Ordered List
    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      closeTableIfNeeded();
      if (!inList || listType !== "ol") {
        closeListIfNeeded();
        inList = true;
        listType = "ol";
        htmlParts.push("<ol>");
      }
      const itemText = inlineFormat(olMatch[2]);
      htmlParts.push(`<li>${itemText}</li>`);
      continue;
    }

    // Default Paragraph
    closeListIfNeeded();
    closeTableIfNeeded();
    htmlParts.push(`<p>${inlineFormat(trimmed)}</p>`);
  }

  closeListIfNeeded();
  closeTableIfNeeded();

  return sanitizeHtml(htmlParts.join("\n"));
}

/**
 * Formats inline Markdown elements into HTML
 */
function inlineFormat(text: string): string {
  let result = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Inline images: ![alt](url)
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" class="rounded-lg my-4" />');

  // Inline links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">$1</a>');

  // Bold & Italic: ***text***
  result = result.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");

  // Bold: **text** or __text__
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__([^_]+)__/g, "<strong>$1</strong>");

  // Italic: *text* or _text_
  result = result.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  result = result.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Strikethrough: ~~text~~
  result = result.replace(/~~([^~]+)~~/g, "<s>$1</s>");

  // Inline code: `text`
  result = result.replace(/`([^`]+)`/g, '<code class="bg-surface-elevated px-1.5 py-0.5 rounded text-accent font-mono text-sm border border-border">$1</code>');

  return result;
}

/**
 * Converts clean HTML back into readable Markdown
 */
export function htmlToMarkdown(html: string): string {
  if (!html) return "";

  let md = html
    // Headings
    .replace(/<h1\b[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2\b[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3\b[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<h4\b[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
    .replace(/<h5\b[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
    .replace(/<h6\b[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")
    // Blockquote
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, c) => {
      const cleanInner = c.replace(/<p\b[^>]*>(.*?)<\/p>/gi, "$1\n").trim();
      return `> ${cleanInner}\n\n`;
    })
    // Pre / Code blocks
    .replace(/<pre\b[^>]*><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/gi, (m, lang, c) => {
      const decoded = c
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
      return "```" + (lang || "") + "\n" + decoded.trim() + "\n```\n\n";
    })
    // Paragraphs
    .replace(/<p\b[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    // Horizontal Rule
    .replace(/<hr\s*\/?>/gi, "---\n\n")
    // Lists
    .replace(/<li\b[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<\/?(ul|ol)\b[^>]*>/gi, "\n")
    // Inline elements
    .replace(/<strong\b[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b\b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em\b[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i\b[^>]*>(.*?)<\/i>/gi, "*$1*")
    .replace(/<s\b[^>]*>(.*?)<\/s>/gi, "~~$1~~")
    .replace(/<code\b[^>]*>(.*?)<\/code>/gi, "`$1`")
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<img\b[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
    .replace(/<img\b[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)")
    .replace(/<br\s*\/?>/gi, "\n")
    // Strip remaining tags
    .replace(/<[^>]*>/g, "");

  // Normalize excessive line breaks
  md = md.replace(/\n{3,}/g, "\n\n").trim();
  return md;
}

import React from "react";
import { sanitizeHtml } from "@/lib/cms/sanitizer";
import { detectContentFormat } from "@/lib/cms/content-converter";

interface MarkdownRendererProps {
  content: string;
  format?: "html" | "markdown";
  className?: string;
}

export function MarkdownRenderer({
  content,
  format,
  className = "",
}: MarkdownRendererProps) {
  if (!content) return null;

  // Determine whether to render as HTML or Markdown
  const isHtml = format === "html" || detectContentFormat(content) === "html";

  if (isHtml) {
    const cleanHtml = sanitizeHtml(content);
    return (
      <div
        className={`prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4 ${className}`}
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    );
  }

  // Split Markdown into lines
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let index = 0;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = "";

  while (index < lines.length) {
    const line = lines[index];

    // Code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <div
            key={`code-${index}`}
            className="my-6 rounded-xl border border-border bg-surface-elevated overflow-x-auto p-4 shadow-xs"
          >
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-border/50 text-[11px] font-mono text-text-muted uppercase tracking-wider">
              <span>{codeBlockLang || "Snippet"}</span>
              <span className="text-accent font-semibold">Code</span>
            </div>
            <pre className="font-mono text-xs text-text-primary leading-relaxed">
              <code>{codeBlockContent.join("\n")}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = [];
        codeBlockLang = "";
      } else {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
      }
      index++;
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      index++;
      continue;
    }

    // Blank line
    if (!line.trim()) {
      index++;
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***") {
      elements.push(<hr key={`hr-${index}`} className="my-8 border-border" />);
      index++;
      continue;
    }

    // Headers
    if (line.startsWith("#### ")) {
      const headingText = line.replace("#### ", "").trim();
      const id = headingText.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, "-");
      elements.push(
        <h4 key={`h4-${index}`} id={id} className="mt-6 mb-2 text-lg font-bold text-text-primary scroll-mt-24">
          {renderFormattedInline(headingText)}
        </h4>
      );
      index++;
      continue;
    }

    if (line.startsWith("### ")) {
      const headingText = line.replace("### ", "").trim();
      const id = headingText.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, "-");
      elements.push(
        <h3 key={`h3-${index}`} id={id} className="mt-8 mb-3 text-xl sm:text-2xl font-bold text-text-primary scroll-mt-24">
          {renderFormattedInline(headingText)}
        </h3>
      );
      index++;
      continue;
    }

    if (line.startsWith("## ")) {
      const headingText = line.replace("## ", "").trim();
      const id = headingText.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, "-");
      elements.push(
        <h2
          key={`h2-${index}`}
          id={id}
          className="mt-12 mb-4 text-2xl sm:text-3xl font-extrabold text-text-primary border-b border-border/60 pb-3 scroll-mt-24"
        >
          {renderFormattedInline(headingText)}
        </h2>
      );
      index++;
      continue;
    }

    if (line.startsWith("# ")) {
      const headingText = line.replace("# ", "").trim();
      const id = headingText.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, "-");
      elements.push(
        <h1 key={`h1-${index}`} id={id} className="mt-12 mb-6 text-3xl sm:text-4xl font-extrabold text-text-primary scroll-mt-24">
          {renderFormattedInline(headingText)}
        </h1>
      );
      index++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteText = line.replace(/^>\s*/, "").trim();
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="my-6 border-l-4 border-accent bg-surface-elevated/40 pl-4 py-3 italic text-text-primary rounded-r-lg"
        >
          {renderFormattedInline(quoteText)}
        </blockquote>
      );
      index++;
      continue;
    }

    // Markdown Table
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableRows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|") && lines[index].trim().endsWith("|")) {
        const rowCells = lines[index]
          .trim()
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim());
        if (!rowCells.every((c) => /^:?-+:?$/.test(c))) {
          tableRows.push(rowCells);
        }
        index++;
      }
      elements.push(
        <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-xl border border-border bg-surface shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-elevated border-b border-border">
                {tableRows[0]?.map((th, i) => (
                  <th key={i} className="p-3 text-xs font-bold text-text-primary uppercase tracking-wider">
                    {renderFormattedInline(th)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {tableRows.slice(1).map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-surface-elevated/30 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3 text-xs text-text-secondary">
                      {renderFormattedInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered List item
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const listItems: string[] = [];
      while (index < lines.length && (lines[index].trim().startsWith("- ") || lines[index].trim().startsWith("* "))) {
        listItems.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index++;
      }
      elements.push(
        <ul key={`ul-${index}`} className="my-4 space-y-2 pl-5 list-disc text-text-secondary text-sm sm:text-base leading-relaxed">
          {listItems.map((item, i) => (
            <li key={i}>{renderFormattedInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List item
    if (/^\d+\.\s+/.test(line.trim())) {
      const listItems: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        listItems.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index++;
      }
      elements.push(
        <ol key={`ol-${index}`} className="my-4 space-y-2 pl-5 list-decimal text-text-secondary text-sm sm:text-base leading-relaxed">
          {listItems.map((item, i) => (
            <li key={i}>{renderFormattedInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Auto-Embed standalone URLs or markdown links (YouTube, Vimeo, Loom)
    let candidateUrl = line.trim();
    const mdLinkMatch = candidateUrl.match(/^\[.*?\]\((https?:\/\/[^\s)]+)\)$/i);
    if (mdLinkMatch) {
      candidateUrl = mdLinkMatch[1];
    }

    const ytMatch = candidateUrl.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/i);
    if (ytMatch) {
      const videoId = ytMatch[1];
      elements.push(
        <div key={`yt-${index}`} className="my-6 overflow-hidden rounded-2xl border border-border bg-black shadow-md aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      );
      index++;
      continue;
    }

    const vimeoMatch = candidateUrl.match(/^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)(?:\S+)?$/i);
    if (vimeoMatch) {
      const vimeoId = vimeoMatch[1];
      elements.push(
        <div key={`vimeo-${index}`} className="my-6 overflow-hidden rounded-2xl border border-border bg-black shadow-md aspect-video">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title="Vimeo video player"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      );
      index++;
      continue;
    }

    const loomMatch = candidateUrl.match(/^(?:https?:\/\/)?(?:www\.)?loom\.com\/share\/([a-zA-Z0-9]+)(?:\S+)?$/i);
    if (loomMatch) {
      const loomId = loomMatch[1];
      elements.push(
        <div key={`loom-${index}`} className="my-6 overflow-hidden rounded-2xl border border-border bg-black shadow-md aspect-video">
          <iframe
            src={`https://www.loom.com/embed/${loomId}`}
            title="Loom video player"
            allowFullScreen
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      );
      index++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${index}`} className="my-4 text-sm sm:text-base text-text-secondary leading-[1.8] sm:leading-[1.85]">
        {renderFormattedInline(line)}
      </p>
    );
    index++;
  }

  return <div className={`space-y-2 text-text-secondary ${className}`}>{elements}</div>;
}

export const ArticleRenderer = MarkdownRenderer;

function renderFormattedInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    // Check for inline images ![alt](url)
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      parts.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={keyIdx++}
          src={imgMatch[2]}
          alt={imgMatch[1]}
          loading="lazy"
          className="rounded-xl border border-border my-4 max-h-[480px] w-full object-cover shadow-sm"
        />
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    // Check for inline code `...`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={keyIdx++} className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[0.85em] text-accent border border-border">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Check for bold **...**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={keyIdx++} className="font-bold text-text-primary">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Check for italic *...*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(
        <em key={keyIdx++} className="italic text-text-primary">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Check for link [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={keyIdx++}
          href={linkMatch[2]}
          className="text-accent hover:underline font-medium"
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Otherwise grab text up to next special delimiter
    const nextSpecial = remaining.search(/[`*![]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return <>{parts}</>;
}

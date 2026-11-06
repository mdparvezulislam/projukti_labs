import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Split into lines
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
          <div key={`code-${index}`} className="my-6 rounded-lg border border-border bg-surface-elevated overflow-x-auto p-4">
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-border/50 text-[11px] font-mono text-text-muted uppercase">
              <span>{codeBlockLang || "Code"}</span>
              <span>Snippet</span>
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

    // Headers
    if (line.startsWith("### ")) {
      const headingText = line.replace("### ", "").trim();
      const id = headingText.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, "-");
      elements.push(
        <h3 key={`h3-${index}`} id={id} className="mt-8 mb-3 text-xl font-bold text-text-primary scroll-mt-24">
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
        <h2 key={`h2-${index}`} id={id} className="mt-12 mb-4 text-2xl sm:text-3xl font-extrabold text-text-primary border-b border-border/60 pb-3 scroll-mt-24">
          {renderFormattedInline(headingText)}
        </h2>
      );
      index++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteText = line.replace("> ", "").trim();
      elements.push(
        <blockquote key={`quote-${index}`} className="my-6 border-l-4 border-accent bg-surface/50 pl-4 py-2 italic text-text-primary rounded-r">
          {renderFormattedInline(quoteText)}
        </blockquote>
      );
      index++;
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---") {
      elements.push(<hr key={`hr-${index}`} className="my-8 border-border" />);
      index++;
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

    // Regular paragraph
    elements.push(
      <p key={`p-${index}`} className="my-4 text-sm sm:text-base text-text-secondary leading-[1.8] sm:leading-[1.85]">
        {renderFormattedInline(line)}
      </p>
    );
    index++;
  }

  return <div className="space-y-2 text-text-secondary">{elements}</div>;
}

function renderFormattedInline(text: string): React.ReactNode {
  // Regex to match inline code, bold, links
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
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
    const nextSpecial = remaining.search(/[`*[]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // Single character delimiter that didn't match pattern
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return <>{parts}</>;
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Undo2,
  Redo2,
  RemoveFormatting,
  Code2,
  Eye,
  CheckSquare,
  Copy,
  Check,
} from "lucide-react";
import { sanitizeHtml } from "@/lib/cms/sanitizer";
import { markdownToHtml, htmlToMarkdown } from "@/lib/cms/content-converter";

interface RichTextEditorProps {
  value: string;
  format?: "html" | "markdown";
  onChange: (value: string, plainText: string) => void;
  onAnalyze?: () => void;
  className?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  format = "html",
  onChange,
  onAnalyze,
  className = "",
  minHeight = "480px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"visual" | "html" | "markdown">("visual");
  const [sourceCode, setSourceCode] = useState(value);
  const [isCopied, setIsCopied] = useState(false);

  // Dialog states
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkNewTab, setLinkNewTab] = useState(true);

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [tableHasHeader, setTableHasHeader] = useState(true);

  // Saved selection range when opening dialogs
  const savedSelectionRef = useRef<Range | null>(null);
  const [prevVal, setPrevVal] = useState(value);

  // Synchronize sourceCode during render when value changes externally
  if (value !== prevVal) {
    setPrevVal(value);
    setSourceCode(value);
  }

  // Sync incoming value to visual editor when value changes externally
  useEffect(() => {
    if (editorRef.current && mode === "visual") {
      const currentHtml = editorRef.current.innerHTML;
      const targetHtml = format === "markdown" ? markdownToHtml(value) : value;
      if (currentHtml !== targetHtml) {
        editorRef.current.innerHTML = targetHtml;
      }
    }
  }, [value, format, mode]);

  // Save current DOM selection
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  // Restore saved DOM selection
  const restoreSelection = () => {
    if (savedSelectionRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelectionRef.current);
      }
    }
  };

  // Execute standard formatting commands
  const execCmd = (command: string, arg: string | undefined = undefined) => {
    if (mode !== "visual") return;
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleEditorChange();
  };

  // Trigger change handler
  const handleEditorChange = useCallback(() => {
    if (!editorRef.current) return;
    const rawHtml = editorRef.current.innerHTML;
    const cleanHtml = sanitizeHtml(rawHtml);
    const plain = editorRef.current.innerText || "";

    if (format === "markdown") {
      const md = htmlToMarkdown(cleanHtml);
      onChange(md, plain);
      setSourceCode(md);
    } else {
      onChange(cleanHtml, plain);
      setSourceCode(cleanHtml);
    }
  }, [format, onChange]);

  // Handle Paste: detects HTML, Markdown or plain text
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const htmlData = clipboardData.getData("text/html");
    const textData = clipboardData.getData("text/plain");

    let cleanToInsert = "";

    if (htmlData) {
      // Clean and sanitize pasted HTML
      cleanToInsert = sanitizeHtml(htmlData);
    } else if (textData) {
      // Check if textData looks like Markdown (has headings, lists, tables)
      const isMd = /^(\s*#{1,6}\s+|\s*[-*]\s+|\s*\d+\.\s+|\|.+?\||```)/m.test(textData);
      if (isMd) {
        cleanToInsert = markdownToHtml(textData);
      } else {
        // Plain text: convert paragraphs
        const paragraphs = textData
          .split(/\n\s*\n/)
          .map((p) => `<p>${p.trim().replace(/\n/g, "<br />")}</p>`)
          .join("");
        cleanToInsert = paragraphs;
      }
    }

    if (cleanToInsert) {
      document.execCommand("insertHTML", false, cleanToInsert);
      handleEditorChange();
    }
  };

  // Handle Keyboard Shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey) {
      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        execCmd("bold");
      } else if (e.key === "i" || e.key === "I") {
        e.preventDefault();
        execCmd("italic");
      } else if (e.key === "u" || e.key === "U") {
        e.preventDefault();
        execCmd("underline");
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        openLinkDialog();
      }
    }
  };

  // Link Dialog Handlers
  const openLinkDialog = () => {
    saveSelection();
    const sel = window.getSelection();
    setLinkText(sel ? sel.toString() : "");
    setLinkUrl("");
    setLinkNewTab(true);
    setIsLinkDialogOpen(true);
  };

  const applyLink = () => {
    restoreSelection();
    if (linkUrl) {
      const formattedUrl = linkUrl.startsWith("http") || linkUrl.startsWith("/") || linkUrl.startsWith("mailto:")
        ? linkUrl
        : `https://${linkUrl}`;
      const targetAttr = linkNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
      const textToUse = linkText.trim() || formattedUrl;
      const html = `<a href="${formattedUrl}"${targetAttr} class="text-accent hover:underline">${textToUse}</a>`;
      document.execCommand("insertHTML", false, html);
      handleEditorChange();
    }
    setIsLinkDialogOpen(false);
  };

  // Image Dialog Handlers
  const openImageDialog = () => {
    saveSelection();
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setIsImageDialogOpen(true);
  };

  const applyImage = () => {
    restoreSelection();
    if (imageUrl) {
      const captionHtml = imageCaption ? `<figcaption class="text-xs text-text-muted text-center mt-1.5">${imageCaption}</figcaption>` : "";
      const html = `<figure class="my-6 block"><img src="${imageUrl}" alt="${imageAlt || ""}" loading="lazy" class="rounded-xl border border-border w-full max-h-[480px] object-cover" />${captionHtml}</figure><p><br /></p>`;
      document.execCommand("insertHTML", false, html);
      handleEditorChange();
    }
    setIsImageDialogOpen(false);
  };

  // Table Dialog Handlers
  const openTableDialog = () => {
    saveSelection();
    setIsTableDialogOpen(true);
  };

  const applyTable = () => {
    restoreSelection();
    let tableHtml = '<div class="table-container my-6 overflow-x-auto"><table class="w-full text-left border-collapse border border-border rounded-lg overflow-hidden">';
    if (tableHasHeader) {
      tableHtml += '<thead><tr class="bg-surface-elevated border-b border-border">';
      for (let c = 1; c <= tableCols; c++) {
        tableHtml += `<th class="p-3 text-xs font-bold text-text-primary uppercase tracking-wider">Header ${c}</th>`;
      }
      tableHtml += "</tr></thead>";
    }
    tableHtml += "<tbody>";
    for (let r = 1; r <= tableRows; r++) {
      tableHtml += '<tr class="border-b border-border/50 hover:bg-surface/40">';
      for (let c = 1; c <= tableCols; c++) {
        tableHtml += `<td class="p-3 text-sm text-text-secondary">Data ${r}-${c}</td>`;
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</tbody></table></div><p><br /></p>";
    document.execCommand("insertHTML", false, tableHtml);
    handleEditorChange();
    setIsTableDialogOpen(false);
  };

  // Insert Code Snippet
  const insertCodeSnippet = () => {
    saveSelection();
    const sample = prompt("প্রোগ্রামিং ল্যাঙ্গুয়েজ নাম লিখুন (e.g. typescript, bash, html):", "typescript");
    restoreSelection();
    const lang = (sample || "typescript").toLowerCase().trim();
    const snippetHtml = `<pre class="my-6 rounded-lg border border-border bg-surface-elevated p-4 overflow-x-auto font-mono text-xs"><code class="language-${lang}">// Write ${lang} code here\nconsole.log("Projukti Labs");</code></pre><p><br /></p>`;
    document.execCommand("insertHTML", false, snippetHtml);
    handleEditorChange();
  };

  // Insert Checklist
  const insertChecklist = () => {
    const checklistHtml = `<ul class="task-list my-4 space-y-2 list-none pl-1">
      <li class="flex items-center gap-2"><input type="checkbox" class="rounded accent-accent h-4 w-4" /> <span>Task item 1</span></li>
      <li class="flex items-center gap-2"><input type="checkbox" class="rounded accent-accent h-4 w-4" /> <span>Task item 2</span></li>
    </ul><p><br /></p>`;
    document.execCommand("insertHTML", false, checklistHtml);
    handleEditorChange();
  };

  // Mode switching (Visual <-> HTML / Markdown)
  const handleModeChange = (newMode: "visual" | "html" | "markdown") => {
    if (newMode === mode) return;

    if (mode === "visual") {
      // Extract current HTML from visual editor
      const rawHtml = editorRef.current?.innerHTML || "";
      const cleanHtml = sanitizeHtml(rawHtml);
      if (newMode === "markdown") {
        setSourceCode(htmlToMarkdown(cleanHtml));
      } else {
        setSourceCode(cleanHtml);
      }
    } else {
      // Switching from source to visual or another source
      let targetHtml = sourceCode;
      if (mode === "markdown") {
        targetHtml = markdownToHtml(sourceCode);
      }
      if (newMode === "visual") {
        if (editorRef.current) {
          editorRef.current.innerHTML = sanitizeHtml(targetHtml);
        }
        onChange(targetHtml, editorRef.current?.innerText || "");
      } else if (newMode === "html") {
        setSourceCode(targetHtml);
      } else if (newMode === "markdown") {
        setSourceCode(htmlToMarkdown(targetHtml));
      }
    }
    setMode(newMode);
  };

  // Handle manual source code edits
  const handleSourceCodeChange = (newCode: string) => {
    setSourceCode(newCode);
    if (mode === "markdown") {
      const plain = newCode.replace(/[#*`[\]()]/g, "");
      onChange(newCode, plain);
    } else {
      const clean = sanitizeHtml(newCode);
      const plain = clean.replace(/<[^>]*>/g, " ");
      onChange(clean, plain);
    }
  };

  // Copy HTML source
  const handleCopySource = () => {
    navigator.clipboard.writeText(sourceCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Format HTML indentation
  const handleFormatHtml = () => {
    if (mode === "html") {
      let formatted = "";
      const reg = /(>)(<)(\/*)/g;
      const xml = sourceCode.replace(reg, "$1\r\n$2$3");
      let pad = 0;
      xml.split("\r\n").forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/)) {
          if (pad !== 0) pad -= 1;
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        } else {
          indent = 0;
        }
        const padding = "  ".repeat(pad);
        formatted += padding + node + "\r\n";
        pad += indent;
      });
      setSourceCode(formatted.trim());
      handleSourceCodeChange(formatted.trim());
    }
  };

  return (
    <div className={`flex flex-col rounded-xl border border-border bg-surface shadow-sm overflow-hidden ${className}`}>
      {/* 1. Main Editor Topbar: Mode Switcher & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-elevated/80 px-3 py-2 text-xs">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-border/80 bg-surface p-0.5">
          <button
            type="button"
            onClick={() => handleModeChange("visual")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === "visual"
                ? "bg-accent text-background font-bold shadow-xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            ভিজুয়াল এডিটর
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("html")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              mode === "html"
                ? "bg-accent text-background font-bold shadow-xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            HTML Source
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("markdown")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              mode === "markdown"
                ? "bg-accent text-background font-bold shadow-xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            Markdown
          </button>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          {mode !== "visual" && (
            <>
              {mode === "html" && (
                <button
                  type="button"
                  onClick={handleFormatHtml}
                  className="px-2.5 py-1 text-[11px] font-mono rounded border border-border bg-surface text-text-secondary hover:text-accent transition-colors"
                  title="Format HTML Indentation"
                >
                  Beautify HTML
                </button>
              )}
              <button
                type="button"
                onClick={handleCopySource}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded border border-border bg-surface text-text-secondary hover:text-accent transition-colors"
              >
                {isCopied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                {isCopied ? "Copied" : "Copy Source"}
              </button>
            </>
          )}

          {onAnalyze && (
            <button
              type="button"
              onClick={onAnalyze}
              className="px-3 py-1 rounded-md border border-accent/40 bg-accent/10 hover:bg-accent hover:text-background text-accent font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>⚡ Analyze Content</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Visual Toolbar (Visible only in Visual mode) */}
      {mode === "visual" && (
        <div className="flex flex-wrap items-center gap-1 border-b border-border/80 bg-surface/50 p-2 text-xs">
          {/* Headings Dropdown */}
          <select
            aria-label="টেক্সট ফরম্যাট"
            onChange={(e) => {
              const val = e.target.value;
              if (val === "p") execCmd("formatBlock", "<p>");
              else if (val) execCmd("formatBlock", `<${val}>`);
              e.target.value = "";
            }}
            defaultValue=""
            className="h-8 rounded border border-border bg-surface px-2 text-xs text-text-primary focus:border-accent focus:outline-hidden"
          >
            <option value="" disabled>
              ফরম্যাট
            </option>
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1 (H1)</option>
            <option value="h2">Heading 2 (H2)</option>
            <option value="h3">Heading 3 (H3)</option>
            <option value="h4">Heading 4 (H4)</option>
          </select>

          <div className="h-5 w-px bg-border mx-1" />

          {/* Inline Styles */}
          <button
            type="button"
            onClick={() => execCmd("bold")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("italic")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("underline")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Underline (Ctrl+U)"
          >
            <Underline className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("strikeThrough")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("hiliteColor", "#fef08a")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Highlight Text"
          >
            <Highlighter className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              const sel = window.getSelection();
              if (sel && sel.toString()) {
                document.execCommand(
                  "insertHTML",
                  false,
                  `<code class="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-accent text-xs border border-border">${sel.toString()}</code>`
                );
                handleEditorChange();
              }
            }}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors font-mono text-xs"
            title="Inline Code"
          >
            <Code className="h-4 w-4" />
          </button>

          <div className="h-5 w-px bg-border mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => execCmd("justifyLeft")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("justifyCenter")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("justifyRight")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("justifyFull")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </button>

          <div className="h-5 w-px bg-border mx-1" />

          {/* Lists & Blocks */}
          <button
            type="button"
            onClick={() => execCmd("insertUnorderedList")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Bulleted List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("insertOrderedList")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={insertChecklist}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Checklist / Task List"
          >
            <CheckSquare className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<blockquote>")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Quote Block"
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={insertCodeSnippet}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Insert Code Block Snippet"
          >
            <Code2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={openTableDialog}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Insert Table"
          >
            <TableIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("insertHorizontalRule")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Horizontal Divider"
          >
            <Minus className="h-4 w-4" />
          </button>

          <div className="h-5 w-px bg-border mx-1" />

          {/* Media & Links */}
          <button
            type="button"
            onClick={openLinkDialog}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Insert Link (Ctrl+K)"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={openImageDialog}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>

          <div className="h-5 w-px bg-border mx-1" />

          {/* History & Formatting */}
          <button
            type="button"
            onClick={() => execCmd("undo")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("redo")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("removeFormat")}
            className="p-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors"
            title="Clear Formatting"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 3. Editor Canvas */}
      <div className="relative flex-1 bg-surface">
        {mode === "visual" ? (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            style={{ minHeight }}
            className="prose prose-invert max-w-none p-6 outline-hidden text-text-primary leading-relaxed focus:ring-0 overflow-y-auto"
            data-placeholder="এখানে আপনার নিবন্ধ লিখুন বা পেস্ট করুন... (Markdown ও HTML পেস্ট স্বয়ংক্রিয়ভাবে সনাক্ত হবে)"
          />
        ) : (
          <div className="relative">
            <textarea
              value={sourceCode}
              onChange={(e) => handleSourceCodeChange(e.target.value)}
              style={{ minHeight }}
              placeholder={mode === "markdown" ? "# Write Markdown..." : "<!-- Paste or edit HTML here -->"}
              className="w-full p-6 font-mono text-xs leading-relaxed bg-surface-elevated text-text-primary border-none outline-hidden resize-y"
            />
          </div>
        )}
      </div>

      {/* 4. Link Dialog Modal */}
      {isLinkDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-accent" />
              লিঙ্ক যুক্ত করুন (Insert Link)
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-text-muted mb-1">লিঙ্ক টেক্সট (Anchor Text)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="যেমন: Projukti Labs"
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-text-muted mb-1">টার্গেট ইউআরএল (URL)</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com বা /services"
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={linkNewTab}
                  onChange={(e) => setLinkNewTab(e.target.checked)}
                  className="rounded accent-accent h-4 w-4"
                />
                নতুন ট্যাবে ওপেন হবে (Open in new tab)
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(false)}
                className="px-4 py-2 rounded-md border border-border bg-surface text-text-secondary hover:bg-surface-elevated text-xs transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={applyLink}
                className="px-4 py-2 rounded-md bg-accent text-background font-bold text-xs hover:bg-accent/90 transition-colors"
              >
                লিঙ্ক যোগ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Image Dialog Modal */}
      {isImageDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-accent" />
              ছবি যুক্ত করুন (Insert Image)
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-text-muted mb-1">ইমেজ ইউআরএল (Image URL) *</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-text-muted mb-1">Alt Text (এসইও ও অ্যাক্সেসিবিলিটি)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="ছবির বর্ণনা লিখুন..."
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-text-muted mb-1">ক্যাপশন (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="ছবির নিচে প্রদর্শিত ক্যাপশন..."
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              {imageUrl && (
                <div className="mt-2 rounded-lg border border-border bg-surface-elevated p-2">
                  <p className="text-[11px] text-text-muted mb-1 font-mono">লাইভ প্রিভিউ:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={imageAlt || "প্রিভিউ"}
                    className="max-h-36 w-full object-contain rounded"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsImageDialogOpen(false)}
                className="px-4 py-2 rounded-md border border-border bg-surface text-text-secondary hover:bg-surface-elevated text-xs transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={applyImage}
                disabled={!imageUrl}
                className="px-4 py-2 rounded-md bg-accent text-background font-bold text-xs hover:bg-accent/90 disabled:opacity-50 transition-colors"
              >
                ছবি প্রবেশ করান
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Table Dialog Modal */}
      {isTableDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <TableIcon className="h-4 w-4 text-accent" />
              টেবিল তৈরি করুন (Insert Table)
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-text-muted mb-1">কলাম সংখ্যা (Columns)</label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={tableCols}
                  onChange={(e) => setTableCols(parseInt(e.target.value, 10) || 1)}
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-text-muted mb-1">সারি সংখ্যা (Rows)</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={tableRows}
                  onChange={(e) => setTableRows(parseInt(e.target.value, 10) || 1)}
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-text-secondary text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={tableHasHeader}
                onChange={(e) => setTableHasHeader(e.target.checked)}
                className="rounded accent-accent h-4 w-4"
              />
              শীর্ষ হেডার রো রাখুন (Include Header Row)
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsTableDialogOpen(false)}
                className="px-4 py-2 rounded-md border border-border bg-surface text-text-secondary hover:bg-surface-elevated text-xs transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={applyTable}
                className="px-4 py-2 rounded-md bg-accent text-background font-bold text-xs hover:bg-accent/90 transition-colors"
              >
                টেবিল যুক্ত করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

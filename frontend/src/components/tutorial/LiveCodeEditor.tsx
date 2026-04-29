"use client";

import { useState, useRef, useCallback, useEffect, KeyboardEvent } from "react";
import { RotateCcw, Maximize2, Minimize2, Copy, Check, RefreshCw } from "lucide-react";

interface LiveCodeEditorProps {
  initialCode: string;
  language: string;
  title?: string;
  description?: string;
}

export default function LiveCodeEditor({ initialCode, language, title, description }: LiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isModified = code !== initialCode;
  const isHtml = language === "html";

  // Trigger a brief "updating" flash in the preview header on each code change
  useEffect(() => {
    if (!isHtml) return;
    setIsUpdating(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setIsUpdating(false), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, isHtml]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setPreviewKey((k) => k + 1);
  }, [initialCode]);

  // Support Tab key indentation and auto-close < >
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    const { selectionStart, selectionEnd, value } = ta;

    if (e.key === "Tab") {
      e.preventDefault();
      const indent = "  ";
      const newValue = value.slice(0, selectionStart) + indent + value.slice(selectionEnd);
      setCode(newValue);
      // Move cursor after the indent
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = selectionStart + indent.length;
      });
    }

    // Auto-close brackets/quotes
    const pairs: Record<string, string> = { "{": "}", "(": ")", "[": "]", '"': '"', "'": "'" };
    if (pairs[e.key] && selectionStart === selectionEnd) {
      e.preventDefault();
      const close = pairs[e.key];
      const newValue = value.slice(0, selectionStart) + e.key + close + value.slice(selectionEnd);
      setCode(newValue);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = selectionStart + 1;
      });
    }
  }, []);

  const getPreviewHtml = useCallback(() => {
    if (language !== "html") return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (code.includes("<!DOCTYPE") || code.includes("<html")) {
      // Inject base href so relative image paths resolve from the app root
      return code.replace(
        /<head([^>]*)>/i,
        `<head$1><base href="${origin}/">`
      );
    }
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <base href="${origin}/">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; padding: 1rem; margin: 0; color: #1a1a2e; line-height: 1.6; font-size: 14px; }
        table { border-collapse: collapse; width: 100%; margin: 0.5rem 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f0f0ff; font-weight: 600; }
        tr:nth-child(even) { background: #f9f9ff; }
        img { max-width: 100%; height: auto; border-radius: 8px; }
        figure { margin: 0; } figcaption { font-style: italic; color: #666; margin-top: 0.5rem; font-size: 0.875rem; }
        ul, ol { padding-left: 1.5rem; } a { color: #6366f1; }
        details { margin: 0.5rem 0; } summary { cursor: pointer; font-weight: 500; }
        progress, meter { width: 200px; }
        fieldset { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin: 0.5rem 0; }
        legend { font-weight: 600; padding: 0 0.5rem; }
        input, select, textarea { padding: 0.4rem; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; }
        button { padding: 0.5rem 1rem; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: inherit; }
        button:hover { background: #4f46e5; }
        hr { border: none; border-top: 1px solid #e0e0e0; margin: 1rem 0; }
        address { font-style: normal; }
        code { background: #f0f0ff; padding: 2px 6px; border-radius: 3px; font-size: 0.9em; }
        pre { background: #1a1a2e; color: #e0e0e0; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        pre code { background: none; padding: 0; color: inherit; }
        [contenteditable] { border: 2px dashed #6366f1; padding: 0.5rem; border-radius: 4px; }
    </style>
</head>
<body>${code}</body>
</html>`;
  }, [code, language]);

  const lines = code.split("\n");

  return (
    <div className={`rounded-2xl overflow-hidden border border-gray-700/60 my-6 bg-[#0d1117] shadow-xl shadow-black/20 transition-all duration-200 ${expanded ? "fixed inset-3 z-50" : ""}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-gray-700/60">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110" />
          </div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            {title || language}
          </span>
          {isModified && (
            <span className="flex items-center gap-1 text-[10px] text-amber-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              modified
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          {isHtml && (
            <button
              onClick={handleReset}
              title="Reset to original"
              className={`flex items-center gap-1 text-xs px-2 py-1.5 rounded-md transition-colors ${
                isModified
                  ? "text-amber-400 hover:bg-amber-400/10"
                  : "text-gray-600 cursor-default"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-400 transition-colors px-2 py-1.5 rounded-md hover:bg-indigo-400/10"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
          </button>
          {isHtml && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-400 transition-colors px-2 py-1.5 rounded-md hover:bg-indigo-400/10"
              title={expanded ? "Minimize" : "Expand"}
            >
              {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      <div className={isHtml ? "grid grid-cols-1 lg:grid-cols-2" : ""}>
        {/* ── Code editor pane ── */}
        <div className={isHtml ? "border-b lg:border-b-0 lg:border-r border-gray-700/60 flex flex-col" : ""}>
          {isHtml && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border-b border-gray-700/40">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">editor</span>
              <span className="text-[10px] text-gray-600 ml-auto">Tab = indent · brackets auto-close</span>
            </div>
          )}

          {/* Line numbers + textarea */}
          <div
            className={`flex items-start overflow-auto bg-[#0d1117] ${
              expanded ? "h-[calc(100vh-10rem)]" : isHtml ? "h-64 sm:h-80" : "h-56 sm:h-72"
            }`}
          >
            {/* Line numbers */}
            <div
              aria-hidden
              className="select-none text-right pr-3 pl-3 pt-4 text-gray-600 font-mono text-sm leading-relaxed shrink-0 bg-[#0d1117] border-r border-gray-800 min-w-[2.8rem]"
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              rows={lines.length}
              className="flex-1 bg-transparent text-gray-200 font-mono text-sm leading-relaxed px-4 pt-4 pb-4 resize-none focus:outline-none w-full caret-indigo-400 overflow-hidden"
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#161b22] border-t border-gray-700/40 text-[10px] text-gray-600">
            <span>{lines.length} lines · {code.length} chars</span>
            <span className="uppercase tracking-wider">{language}</span>
          </div>
        </div>

        {/* ── Live preview pane ── */}
        {isHtml && (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border-b border-gray-700/40">
              <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${isUpdating ? "bg-amber-400 animate-pulse" : "bg-green-400"}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 ${isUpdating ? "text-amber-400" : "text-green-400"}`}>
                {isUpdating ? "updating…" : "live preview"}
              </span>
              <button
                onClick={() => setPreviewKey((k) => k + 1)}
                className="ml-auto text-gray-600 hover:text-gray-400 transition-colors"
                title="Refresh preview"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
            <div className={`bg-white ${expanded ? "h-[calc(100vh-10rem)]" : "h-64 sm:h-80"} relative`}>
              <iframe
                key={previewKey}
                srcDoc={getPreviewHtml()}
                title="Live Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

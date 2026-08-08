"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent,
} from "react";
import { useCodeSnippets } from "@/hooks/useCodeSnippets";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  RefreshCw,
  Terminal,
  Share2,
  Save,
  ChevronDown,
  ChevronUp,
  Play,
  Trash2,
  X,
  Plus,
  FileText,
  Layers,
} from "lucide-react";
import type { CodeFile } from "@/hooks/useCodeSnippets";

interface LiveCodeEditorProps {
  initialCode: string;
  language: string;
  title?: string;
  description?: string;
}

export default function LiveCodeEditor({
  initialCode,
  language,
  title,
  description,
}: LiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [showSavePanel, setShowSavePanel] = useState(false);
  const [isMultiFileMode, setIsMultiFileMode] = useState(false);
  const [files, setFiles] = useState<CodeFile[]>([{ name: "main", content: initialCode, language }]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<number | null>(null);
  const isModified = isMultiFileMode ? files.some(f => f.content !== initialCode) : code !== initialCode;
  const isHtml = language === "html";
  const isJavaScript = language === "javascript";
  const activeFile = files[activeFileIndex];
  
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const { snippets, loading: snippetsLoading, createSnippet, updateSnippet, deleteSnippet, getSharedSnippet, parseFiles, stringifyFiles } = useCodeSnippets();

  const handleFileContentChange = useCallback((index: number, content: string) => {
    setFiles(prev => prev.map((f, i) => i === index ? { ...f, content } : f));
  }, []);

  const handleCopy = useCallback(() => {
    const contentToCopy = isMultiFileMode ? activeFile?.content || '' : code;
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code, isMultiFileMode, activeFile]);

  const handleCodeChange = useCallback(
    (nextCode: string) => {
      if (isMultiFileMode) {
        handleFileContentChange(activeFileIndex, nextCode);
      } else {
        setCode(nextCode);
      }
      if (!isHtml) return;

      setIsUpdating(true);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => setIsUpdating(false), 400);
    },
    [isHtml, isMultiFileMode, activeFileIndex, handleFileContentChange],
  );

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setPreviewKey((k) => k + 1);
    setConsoleOutput([]);
  }, [initialCode]);

  const handleRunCode = useCallback(() => {
    if (!isJavaScript) return;
    
    try {
      // Capture console.log output
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      const logs: string[] = [];
      
      console.log = (...args: any[]) => {
        logs.push(`LOG: ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ')}`);
        originalLog(...args);
      };
      
      console.error = (...args: any[]) => {
        logs.push(`ERROR: ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ')}`);
        originalError(...args);
      };
      
      console.warn = (...args: any[]) => {
        logs.push(`WARN: ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ')}`);
        originalWarn(...args);
      };
      
      // Execute the code
      const codeToRun = isMultiFileMode ? (activeFile?.content || '') : code;
      eval(codeToRun);
      
      setConsoleOutput(logs);
      
      // Restore console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    } catch (error) {
      setConsoleOutput([`ERROR: ${error instanceof Error ? error.message : String(error)}`]);
    }
  }, [code, isJavaScript, isMultiFileMode, activeFile]);

  const handleShare = useCallback(async () => {
    if (!user) {
      toastError('Authentication required', 'Please log in to share snippets');
      return;
    }

    // First save the snippet
    try {
      const snippetData: any = {
        name: `${title || language} snippet`,
        code: isMultiFileMode ? (activeFile?.content || '') : code,
        language: language
      };
      
      if (isMultiFileMode) {
        snippetData.files = stringifyFiles(files);
      }
      
      const saved = await createSnippet(snippetData);

      if (saved && saved.shareId) {
        const url = `${window.location.origin}/share/${saved.shareId}`;
        setShareUrl(url);
        setShowSharePanel(true);
        success('Snippet saved!', 'You can now share this snippet with others');
      }
    } catch (err: any) {
      toastError('Failed to save', err.message);
    }
  }, [user, title, language, code, isMultiFileMode, activeFile, files, createSnippet, success, toastError, stringifyFiles]);

  const handleSaveSnippet = useCallback(async () => {
    if (!user) {
      toastError('Authentication required', 'Please log in to save snippets');
      return;
    }

    const snippetName = prompt('Enter a name for this snippet:');
    if (!snippetName) return;
    
    try {
      const snippetData: any = {
        name: snippetName,
        code: isMultiFileMode ? (activeFile?.content || '') : code,
        language: language
      };
      
      if (isMultiFileMode) {
        snippetData.files = stringifyFiles(files);
      }
      
      await createSnippet(snippetData);
      success('Snippet saved!', 'Your code has been saved to your account');
      setShowSavePanel(false);
    } catch (err: any) {
      toastError('Failed to save', err.message);
    }
  }, [user, code, language, isMultiFileMode, activeFile, files, createSnippet, success, toastError, stringifyFiles]);

  const handleLoadSnippet = useCallback((snippetId: number) => {
    const snippet = snippets.find(s => s.id === snippetId);
    if (snippet) {
      if (snippet.files) {
        // Load multi-file snippet
        const parsedFiles = parseFiles(snippet.files);
        if (parsedFiles.length > 0) {
          setFiles(parsedFiles);
          setActiveFileIndex(0);
          setIsMultiFileMode(true);
        } else {
          // Fallback to single file if parsing fails
          setCode(snippet.code);
          setIsMultiFileMode(false);
        }
      } else {
        // Load single-file snippet
        setCode(snippet.code);
        setIsMultiFileMode(false);
      }
      setShowSavePanel(false);
    }
  }, [snippets, parseFiles]);

  const handleDeleteSnippet = useCallback(async (snippetId: number) => {
    try {
      await deleteSnippet(snippetId);
      success('Snippet deleted', 'The snippet has been removed from your account');
    } catch (err: any) {
      toastError('Failed to delete', err.message);
    }
  }, [deleteSnippet, success, toastError]);

  // Multi-file management functions
  const handleAddFile = useCallback(() => {
    const newFileName = prompt('Enter file name (e.g., script.js):');
    if (!newFileName) return;
    
    const extension = newFileName.split('.').pop()?.toLowerCase() || 'txt';
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown',
    };
    
    const newFile: CodeFile = {
      name: newFileName,
      content: '',
      language: languageMap[extension] || 'text'
    };
    
    setFiles(prev => [...prev, newFile]);
    setActiveFileIndex(files.length);
  }, [files.length]);

  const handleRemoveFile = useCallback((index: number) => {
    if (files.length <= 1) {
      toastError('Cannot remove last file', 'At least one file must remain');
      return;
    }
    
    setFiles(prev => prev.filter((_, i) => i !== index));
    setActiveFileIndex(prev => prev >= index ? Math.max(0, prev - 1) : prev);
  }, [files.length, toastError]);

  const handleRenameFile = useCallback((index: number) => {
    const file = files[index];
    const newName = prompt('Enter new file name:', file.name);
    if (!newName) return;
    
    const extension = newName.split('.').pop()?.toLowerCase() || 'txt';
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown',
    };
    
    setFiles(prev => prev.map((f, i) => 
      i === index 
        ? { ...f, name: newName, language: languageMap[extension] || 'text' }
        : f
    ));
  }, [files]);

  const toggleMultiFileMode = useCallback(() => {
    if (isMultiFileMode) {
      // Switch to single-file mode - use the active file's content
      const activeFileContent = files[activeFileIndex]?.content || code;
      setCode(activeFileContent);
      setIsMultiFileMode(false);
    } else {
      // Switch to multi-file mode - convert current code to a file
      setFiles([{ name: 'main', content: code, language }]);
      setActiveFileIndex(0);
      setIsMultiFileMode(true);
    }
  }, [isMultiFileMode, files, activeFileIndex, code, language]);

  // Support Tab key indentation and auto-close < >
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    const { selectionStart, selectionEnd, value } = ta;

    if (e.key === "Tab") {
      e.preventDefault();
      const indent = "  ";
      const newValue =
        value.slice(0, selectionStart) + indent + value.slice(selectionEnd);
      
      if (isMultiFileMode) {
        handleFileContentChange(activeFileIndex, newValue);
      } else {
        setCode(newValue);
      }
      
      // Move cursor after the indent
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = selectionStart + indent.length;
      });
    }

    // Auto-close brackets/quotes
    const pairs: Record<string, string> = {
      "{": "}",
      "(": ")",
      "[": "]",
      '"': '"',
      "'": "'",
    };
    if (pairs[e.key] && selectionStart === selectionEnd) {
      e.preventDefault();
      const close = pairs[e.key];
      const newValue =
        value.slice(0, selectionStart) +
        e.key +
        close +
        value.slice(selectionEnd);
      
      if (isMultiFileMode) {
        handleFileContentChange(activeFileIndex, newValue);
      } else {
        setCode(newValue);
      }
      
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = selectionStart + 1;
      });
    }
  }, [isMultiFileMode, activeFileIndex, handleFileContentChange]);

  const getPreviewHtml = useCallback(() => {
    if (language !== "html") return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    
    let htmlContent = code;
    let cssContent = '';
    let jsContent = '';
    
    if (isMultiFileMode) {
      // Combine files for preview
      files.forEach(file => {
        if (file.language === 'html') {
          htmlContent = file.content;
        } else if (file.language === 'css') {
          cssContent = file.content;
        } else if (file.language === 'javascript') {
          jsContent = file.content;
        }
      });
    }
    
    if (htmlContent.includes("<!DOCTYPE") || htmlContent.includes("<html")) {
      // Inject base href and additional files
      let modifiedHtml = htmlContent.replace(/<head([^>]*)>/i, `<head$1><base href="${origin}/">`);
      
      if (cssContent) {
        modifiedHtml = modifiedHtml.replace('</head>', `<style>${cssContent}</style></head>`);
      }
      
      if (jsContent) {
        modifiedHtml = modifiedHtml.replace('</body>', `<script>${jsContent}</script></body>`);
      }
      
      return modifiedHtml;
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
        ${cssContent}
    </style>
</head>
<body>${htmlContent}<script>${jsContent}</script></body>
</html>`;
  }, [code, language, isMultiFileMode, files]);

  const lines = (isMultiFileMode ? activeFile?.content : code)?.split("\n") || [];

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-gray-700/60 my-6 bg-[#0d1117] shadow-xl shadow-black/20 transition-all duration-200 ${expanded ? "fixed inset-3 z-50" : ""}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-gray-700/60">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              {title || language}
            </span>
            {description && (
              <span className="text-[10px] text-gray-500 mt-0.5">
                {description}
              </span>
            )}
          </div>
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
          {isJavaScript && (
            <button
              onClick={handleRunCode}
              title="Run code"
              className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors px-2 py-1.5 rounded-md hover:bg-green-400/10"
            >
              <Play className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Run</span>
            </button>
          )}
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`flex items-center gap-1 text-xs px-2 py-1.5 rounded-md transition-colors ${
              showConsole
                ? "text-green-400 bg-green-400/10"
                : "text-gray-500 hover:text-gray-300"
            }`}
            title="Toggle console"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Console</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-400 transition-colors px-2 py-1.5 rounded-md hover:bg-indigo-400/10"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-400 transition-colors px-2 py-1.5 rounded-md hover:bg-indigo-400/10"
            title="Share snippet"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowSavePanel(!showSavePanel)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-400 transition-colors px-2 py-1.5 rounded-md hover:bg-indigo-400/10"
            title="Save snippet"
          >
            <Save className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleMultiFileMode}
            className={`flex items-center gap-1 text-xs px-2 py-1.5 rounded-md transition-colors ${
              isMultiFileMode
                ? "text-indigo-400 bg-indigo-400/10"
                : "text-gray-500 hover:text-indigo-400"
            }`}
            title={isMultiFileMode ? "Switch to single-file mode" : "Switch to multi-file mode"}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isMultiFileMode ? "Multi" : "Single"}
            </span>
          </button>
          {isHtml && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-400 transition-colors px-2 py-1.5 rounded-md hover:bg-indigo-400/10"
              title={expanded ? "Minimize" : "Expand"}
            >
              {expanded ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row h-[500px] md:h-[600px]">
        {/* Code editor */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* File tabs (multi-file mode) */}
          {isMultiFileMode && (
            <div className="flex items-center gap-1 px-2 py-1.5 bg-[#0d1117] border-b border-gray-700/60 overflow-x-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                    index === activeFileIndex
                      ? 'bg-[#161b22] text-gray-100 border-t border-l border-r border-gray-700/60'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                  onClick={() => setActiveFileIndex(index)}
                  onDoubleClick={() => handleRenameFile(index)}
                  title={`${file.name} (double-click to rename)`}
                >
                  <FileText className="w-3 h-3" />
                  <span>{file.name}</span>
                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      className="ml-1 text-gray-500 hover:text-red-400 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddFile}
                className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 hover:text-indigo-400 hover:bg-gray-800/50 rounded-md transition-colors"
                title="Add new file"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
          
          <div className="flex-1 flex relative">
            {/* Line numbers */}
            {showLineNumbers && (
              <div className="flex-shrink-0 w-12 bg-[#0d1117] text-gray-600 text-right pr-3 py-4 font-mono text-xs leading-6 select-none border-r border-gray-800">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            )}
            
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={isMultiFileMode ? (activeFile?.content || '') : code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 w-full h-full bg-[#0d1117] text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
              style={{ fontSize: `${fontSize}px` }}
              spellCheck={false}
              placeholder="Type your code here..."
            />
          </div>
        </div>

        {/* Preview (HTML only) */}
        {isHtml && (
          <div className="flex-1 border-l border-gray-700/60 bg-white">
            <iframe
              key={previewKey}
              srcDoc={getPreviewHtml()}
              sandbox="allow-scripts"
              className="w-full h-full border-0"
              title="Preview"
            />
          </div>
        )}

        {/* Console Panel */}
        {showConsole && (
          <div className="border-t border-gray-700/60 bg-[#0d1117]40 p-4 max-h-40 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase">Console Output</span>
              <button
                onClick={() => setConsoleOutput([])}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1">
              {consoleOutput.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No output yet. Click "Run" to execute JavaScript code.</p>
              ) : (
                consoleOutput.map((log, i) => (
                  <div
                    key={i}
                    className={`text-xs font-mono ${
                      log.startsWith('ERROR') ? 'text-red-400' :
                      log.startsWith('WARN') ? 'text-yellow-400' :
                      'text-green-400'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Share Panel */}
      {showSharePanel && (
        <div className="absolute top-16 left-4 right-4 bg-[#161b22] border border-gray-700/60 rounded-lg p-4 shadow-xl z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-300">Share Snippet</span>
            <button
              onClick={() => setShowSharePanel(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Share URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-[#0d1117] border border-gray-700 rounded px-2 py-1 text-sm text-gray-300"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                  }}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded"
                >
                  Copy
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Share this URL to let others view your code. (Feature requires backend implementation)
            </p>
          </div>
        </div>
      )}

      {/* Save Panel */}
      {showSavePanel && (
        <div className="absolute top-16 left-4 right-4 bg-[#161b22] border border-gray-700/60 rounded-lg p-4 shadow-xl z-10 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-300">Saved Snippets</span>
            <button
              onClick={() => setShowSavePanel(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {user ? (
            <>
              <button
                onClick={handleSaveSnippet}
                className="w-full mb-3 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Current Code
              </button>

              {snippetsLoading ? (
                <p className="text-xs text-gray-500 italic">Loading snippets...</p>
              ) : snippets.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No saved snippets yet.</p>
              ) : (
                <div className="space-y-2">
                  {snippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="flex items-center justify-between p-2 bg-[#0d1117] rounded border border-gray-700/60 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-300 truncate">{snippet.name}</div>
                          {snippet.files && (
                            <span className="flex items-center gap-1 text-[10px] text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded">
                              <Layers className="w-3 h-3" />
                              Multi
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(snippet.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleLoadSnippet(snippet.id)}
                          className="text-xs text-indigo-400 hover:text-indigo-300"
                          title="Load"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSnippet(snippet.id)}
                          className="text-xs text-red-400 hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-xs text-gray-500 italic">Please log in to save snippets.</p>
          )}
        </div>
      )}

      {/* Bottom toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-t border-gray-700/60">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded-md hover:bg-gray-700/50"
            title="Decrease font size"
          >
            <span className="text-xs">A-</span>
          </button>
          <span className="text-xs text-gray-500 min-w-[60px] text-center">{fontSize}px</span>
          <button
            onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded-md hover:bg-gray-700/50"
            title="Increase font size"
          >
            <span className="text-xs">A+</span>
          </button>
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors ${
              showLineNumbers
                ? "text-indigo-400 bg-indigo-400/10"
                : "text-gray-500 hover:text-gray-300"
            }`}
            title="Toggle line numbers"
          >
            #{showLineNumbers ? '1, 2, 3' : '🚫'}
          </button>
        </div>
        
        <div className="text-xs text-gray-500">
          {lines.length} lines
        </div>
      </div>
    </div>
  );
}

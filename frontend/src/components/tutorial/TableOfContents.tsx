"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(content: string): TocItem[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace("## ", "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      return { id, text };
    });
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  if (headings.length < 2) return null;

  return (
    <>
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <List className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          On this page
        </span>
      </div>

      {/* Links */}
      <nav className="space-y-0.5">
        {headings.map(({ id, text }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
              setActiveId(id);
            }}
            className={cn(
              "block text-xs py-1.5 px-2.5 rounded-lg transition-all duration-150 leading-snug",
              activeId === id
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold"
                : "text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
            )}
          >
            {text}
          </a>
        ))}
      </nav>
    </>
  );
}

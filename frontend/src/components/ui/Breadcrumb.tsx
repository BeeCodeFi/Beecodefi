import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.url} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            {isLast ? (
              <span
                className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate max-w-[200px]"
              >
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

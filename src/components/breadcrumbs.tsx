import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center  text-sm text-muted-foreground"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isFirst = idx === 0;

          return (
            <li key={idx} className="flex items-center">
              {idx > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}

              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {isFirst && <Home className="w-4 h-4" />}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center gap-1 font-medium text-foreground">
                  {isFirst && <Home className="w-4 h-4" />}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

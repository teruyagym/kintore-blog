import type { TocItem } from "@/lib/posts"

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null

  return (
    <nav className="not-prose my-12 py-7 border-t border-b border-rule">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-4">
        Contents
      </p>
      <ol className="space-y-2.5">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-steel flex-shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${item.id}`}
              className="text-[15px] text-ink hover:text-steel transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

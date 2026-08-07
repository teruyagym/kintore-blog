import type { TocItem } from "@/lib/posts"

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null

  return (
    <nav className="not-prose my-10 p-5 rounded-2xl border border-neutral-200 bg-neutral-50">
      <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400 mb-3">
        目次
      </p>
      <ol className="space-y-2">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm text-neutral-700 hover:text-emerald-600 transition-colors"
            >
              {i + 1}. {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

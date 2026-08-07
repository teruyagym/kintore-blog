import Link from "next/link"

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="breadcrumb" className="text-xs text-neutral-400 mb-6">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            トップ
          </Link>
        </li>
        <li>/</li>
        <li>
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            ブログ
          </Link>
        </li>
        <li>/</li>
        <li className="text-neutral-600 truncate max-w-[200px]">{current}</li>
      </ol>
    </nav>
  )
}

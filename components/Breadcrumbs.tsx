import Link from "next/link"

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="breadcrumb" className="font-mono text-[11px] text-mute mb-3">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-steel transition-colors">
            トップ
          </Link>
        </li>
        <li className="text-rule">/</li>
        <li className="truncate max-w-[220px]">{current}</li>
      </ol>
    </nav>
  )
}

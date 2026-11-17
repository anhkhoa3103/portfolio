import type { ReactNode } from 'react'

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'ocean' }) {
  const cls =
    tone === 'ocean'
      ? 'bg-ocean-100 text-ocean-800 ring-ocean-300/60'
      : 'bg-cream text-ink-soft ring-[#e9dcbf]'
  return <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[13px] font-semibold ring-1 ${cls}`}>{children}</span>
}

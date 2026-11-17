export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <polygon points="44,26 34,43.3 14,43.3 4,26 14,8.7 34,8.7" fill="#c98a12" />
      <polygon points="44,22 34,39.3 14,39.3 4,22 14,4.7 34,4.7" fill="#ffc547" />
      <polygon points="38,22 31,34 17,34 10,22 17,10 31,10" fill="#ffd977" />
      <path d="M19 14.5v15M19 22l9.5-7.5M22 19.5l7 10" stroke="#5e3c04" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group flex items-center gap-2.5 rounded-2xl pr-2 text-left" aria-label="Khoa's Island — back to the island">
      <span className="transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
        <LogoMark />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[19px] font-bold tracking-wide text-white drop-shadow-[0_2px_0_rgba(5,43,69,0.35)]">
          KHOA'S ISLAND
        </span>
        <span className="mt-0.5 block text-[11px] font-semibold tracking-[0.14em] text-ocean-100/80 uppercase max-sm:hidden">
          Build · Explore · Discover
        </span>
      </span>
    </button>
  )
}

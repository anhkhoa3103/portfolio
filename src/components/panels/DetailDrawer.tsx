import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface DetailDrawerProps {
  title: string
  eyebrow: string
  accent: { from: string; to: string; ink: string }
  illustration?: ReactNode
  onClose: () => void
  nav?: { prevLabel: string; nextLabel: string; onPrev: () => void; onNext: () => void }
  children: ReactNode
}

/** Full-height dossier: right drawer on large screens, full screen on phones. */
export function DetailDrawer({ title, eyebrow, accent, illustration, onClose, nav, children }: DetailDrawerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useFocusTrap(ref, true, onClose)

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        className="absolute inset-0 bg-ocean-950/55 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-paper outline-none sm:inset-y-3 sm:right-3 sm:w-[min(760px,calc(100vw-24px))] sm:rounded-[var(--radius-panel)] sm:shadow-[var(--shadow-panel)]"
        initial={reduce ? { opacity: 0 } : { x: '104%' }}
        animate={reduce ? { opacity: 1 } : { x: 0 }}
        exit={reduce ? { opacity: 0 } : { x: '104%', transition: { duration: 0.22, ease: 'easeIn' } }}
        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
      >
        <header
          className="relative shrink-0 overflow-hidden px-5 pt-4 pb-5 sm:rounded-t-[var(--radius-panel)] sm:px-8"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        >
          <svg className="pointer-events-none absolute -top-10 right-24 h-44 w-44 opacity-20 max-sm:hidden" viewBox="-50 -50 100 100" aria-hidden>
            <polygon points="45,0 22.5,39 -22.5,39 -45,0 -22.5,-39 22.5,-39" fill="#fff" />
          </svg>
          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0 pt-2">
              <p className="eyebrow" style={{ color: accent.ink }}>
                {eyebrow}
              </p>
              <h2 id="detail-title" className="mt-1 font-display text-[28px] leading-[1.08] font-bold text-ink sm:text-[36px]">
                {title}
              </h2>
            </div>
            <div className="flex shrink-0 items-start gap-2">
              {illustration && <div className="-my-2 h-24 w-28 max-sm:hidden">{illustration}</div>}
              <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-xl bg-white/80 text-ink hover:bg-white" aria-label="Close details" data-autofocus>
                <X size={20} aria-hidden />
              </button>
            </div>
          </div>
        </header>

        <div key={title} className="scroll-soft flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {children}
        </div>

        {nav && (
          <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-ink/8 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-6">
            <button type="button" onClick={nav.onPrev} className="btn btn-ghost min-w-0 max-w-[48%] justify-start">
              <ChevronLeft size={18} aria-hidden className="shrink-0" />
              <span className="truncate">{nav.prevLabel}</span>
            </button>
            <button type="button" onClick={nav.onNext} className="btn btn-ghost min-w-0 max-w-[48%] justify-end">
              <span className="truncate">{nav.nextLabel}</span>
              <ChevronRight size={18} aria-hidden className="shrink-0" />
            </button>
          </footer>
        )}
      </motion.div>
    </div>
  )
}

export function SectionTitle({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 font-display text-[20px] font-bold text-ink">
      {icon && <span className="grid h-8 w-8 place-items-center rounded-xl bg-ocean-100 text-ocean-700">{icon}</span>}
      {children}
    </h3>
  )
}

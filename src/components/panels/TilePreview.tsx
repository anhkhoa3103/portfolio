import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react'
import { LocationIllustration } from '@/components/hex-tile/TileArt'
import { zones } from '@/data/zones'
import { locationPalettes, zoneColors } from '@/lib/palette'
import type { IslandLocation } from '@/types/content'

interface PreviewProps {
  location: IslandLocation
  discovered: boolean
  nextTitle: string
  onExplore: () => void
  onNext: () => void
  onClose: () => void
}

function PreviewBody({ location, discovered, nextTitle, onExplore, onNext, onClose }: PreviewProps) {
  const zone = zoneColors[location.zone]
  const pal = locationPalettes[location.id]
  return (
    <div>
      <div className="relative overflow-hidden rounded-t-[var(--radius-panel)] px-5 pt-4 pb-2" style={{ background: `linear-gradient(160deg, ${pal.top[0]}, ${pal.top[1]})` }}>
        <svg className="pointer-events-none absolute -right-8 -bottom-10 h-40 w-40 opacity-25" viewBox="-50 -50 100 100" aria-hidden>
          <polygon points="45,0 22.5,39 -22.5,39 -45,0 -22.5,-39 22.5,-39" fill="#ffffff" />
        </svg>
        <div className="flex items-start justify-between gap-2">
          <span className="chip bg-white/85" style={{ color: zone.ink }}>
            <span className="h-2 w-2 rounded-full" style={{ background: zone.deep }} />
            {zones[location.zone].name}
          </span>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 text-ink hover:bg-white" aria-label="Close location preview">
            <X size={18} aria-hidden />
          </button>
        </div>
        <LocationIllustration id={location.id} className="mx-auto -mt-2 h-28 w-32 drop-shadow-[0_6px_0_rgba(0,0,0,0.08)]" />
      </div>

      <div className="px-5 pt-4 pb-5">
        <p className="eyebrow" style={{ color: zone.deep }}>
          {location.placeName}
        </p>
        <h2 className="mt-1 font-display text-[26px] leading-[1.1] font-bold">{location.title}</h2>
        <p className="mt-1 text-[14px] font-semibold text-ink-muted">{location.category}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{location.summary}</p>

        <AnimatePresence>
          {discovered && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-mint-deep"
            >
              <CheckCircle2 size={16} aria-hidden /> Location charted
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={onExplore} className="btn btn-primary flex-1" data-autofocus>
            {location.exploreLabel}
            <ArrowRight size={18} aria-hidden />
          </button>
          <button type="button" onClick={onNext} className="btn btn-ghost" aria-label={`Next location: ${nextTitle}`}>
            Next <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}

/** Desktop: card that lives in the side rail. */
export function PreviewCard(props: PreviewProps) {
  const reduce = useReducedMotion()
  return (
    <motion.section
      key={props.location.id}
      aria-label={`${props.location.title} preview`}
      className="panel overflow-hidden"
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24, rotate: -1.5 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16, transition: { duration: 0.14 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    >
      <PreviewBody {...props} />
    </motion.section>
  )
}

/** Phones & tablets: draggable bottom sheet that leaves the island visible. */
export function PreviewSheet(props: PreviewProps) {
  const drag = useDragControls()
  return (
    <motion.section
      aria-label={`${props.location.title} preview`}
      className="panel fixed inset-x-0 bottom-0 z-40 mx-auto max-h-[70dvh] w-full max-w-[560px] overflow-y-auto rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_-10px_rgba(5,43,69,0.5)]"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%', transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
      drag="y"
      dragControls={drag}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.6 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 90 || info.velocity.y > 600) props.onClose()
      }}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex h-6 cursor-grab touch-none justify-center pt-2" onPointerDown={(e) => drag.start(e)} aria-hidden>
        <span className="h-1.5 w-12 rounded-full bg-white/80" />
      </div>
      <PreviewBody {...props} />
    </motion.section>
  )
}

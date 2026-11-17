import { motion } from 'framer-motion'
import { Flag, LayoutList, MousePointerClick } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function IntroCard({ onStart, onQuickView }: { onStart: () => void; onQuickView: () => void }) {
  return (
    <motion.section
      key="intro"
      aria-labelledby="intro-title"
      className="panel p-5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.14 } }}
      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
    >
      <p className="eyebrow text-coral-deep">Welcome aboard</p>
      <h1 id="intro-title" className="mt-1.5 font-display text-[30px] leading-[1.05] font-bold">
        Hi, I'm {siteConfig.shortName}.<br />
        <span className="text-ocean-700">This is my island.</span>
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
        Software Engineering student at FPT University, building full-stack, AI-powered and playful products. Every tile is a
        piece of my work — go find them.
      </p>
      <p className="mt-3 flex items-center gap-2 rounded-xl bg-cream px-3 py-2 text-[13.5px] font-semibold text-ink-soft">
        <MousePointerClick size={16} aria-hidden className="shrink-0 text-coral-deep" />
        Click a tile, use arrow keys, or roll the die.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={onStart}>
          <Flag size={17} aria-hidden /> Start at Basecamp
        </button>
        <button type="button" className="btn btn-ghost" onClick={onQuickView}>
          <LayoutList size={17} aria-hidden /> Quick View
        </button>
      </div>
    </motion.section>
  )
}

/** One-line greeting for phones and tablets, sitting above the island. */
export function IntroStrip() {
  return (
    <div className="px-1 text-white">
      <h1 className="font-display text-[22px] leading-tight font-bold drop-shadow-[0_2px_0_rgba(5,43,69,0.35)] sm:text-[26px]">
        Hi, I'm {siteConfig.shortName} — welcome to my island.
      </h1>
      <p className="text-[13.5px] font-medium text-white/85 sm:text-[14.5px]">Tap a tile to explore my work, or open Quick View.</p>
    </div>
  )
}

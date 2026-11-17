import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo } from 'react'

const COLORS = ['#ffc547', '#ff8a6b', '#2fc49a', '#5c8ff0', '#fffdf8']

/** Hex-confetti burst shown once when the whole island has been charted. */
export function Celebration({ active, onDone }: { active: boolean; onDone: () => void }) {
  const reduce = useReducedMotion()
  const pieces = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const angle = (i / 34) * Math.PI * 2 + (i % 3) * 0.2
        const dist = 160 + ((i * 37) % 140)
        return { i, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist * 0.75, color: COLORS[i % COLORS.length]!, size: 10 + ((i * 7) % 10), spin: ((i * 53) % 360) - 180 }
      }),
    [],
  )

  useEffect(() => {
    if (!active) return
    const t = window.setTimeout(onDone, 4200)
    return () => window.clearTimeout(t)
  }, [active, onDone])

  return (
    <AnimatePresence>
      {active && (
        <motion.div className="pointer-events-none fixed inset-0 z-[55] grid place-items-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }} role="status">
          {!reduce &&
            pieces.map((p) => (
              <motion.span
                key={p.i}
                className="absolute [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]"
                style={{ width: p.size, height: p.size * 0.9, background: p.color }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
                animate={{ x: p.x, y: [0, p.y, p.y + 120], opacity: [1, 1, 0], rotate: p.spin, scale: 1 }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
              />
            ))}
          <motion.div
            className="panel px-6 py-4 text-center"
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <p className="eyebrow text-mint-deep">Achievement unlocked · Island Explorer</p>
            <p className="font-display text-[26px] font-bold">You explored every corner!</p>
            <p className="text-[14px] text-ink-soft">Thanks for visiting — let's build something together.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

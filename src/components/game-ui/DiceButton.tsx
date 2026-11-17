import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[30, 30], [70, 70]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[30, 30], [70, 30], [30, 70], [70, 70]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[30, 26], [70, 26], [30, 50], [70, 50], [30, 74], [70, 74]],
}

function DieFace({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <rect x="4" y="10" width="92" height="88" rx="24" fill="#c24d33" />
      <rect x="4" y="2" width="92" height="88" rx="24" fill="#ff8a6b" />
      <rect x="12" y="8" width="76" height="20" rx="10" fill="#ffffff" opacity="0.18" />
      {(PIPS[value] ?? []).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y - 4} r="8.5" fill="#fffdf8" />
      ))}
    </svg>
  )
}

interface DiceButtonProps {
  /** Called once the roll settles; receives the face that landed. */
  onRolled: (face: number) => void
  label?: string
  size?: 'md' | 'lg'
}

export function DiceButton({ onRolled, label = 'Roll the island die', size = 'lg' }: DiceButtonProps) {
  const controls = useAnimationControls()
  const reduce = useReducedMotion()
  const [face, setFace] = useState(5)
  const [rolling, setRolling] = useState(false)
  const busy = useRef(false)

  const roll = async () => {
    if (busy.current) return
    busy.current = true
    setRolling(true)
    const final = 1 + Math.floor(Math.random() * 6)
    if (!reduce) {
      const flicker = window.setInterval(() => setFace(1 + Math.floor(Math.random() * 6)), 70)
      await controls.start({
        rotate: [0, -200, -340, -360],
        y: [0, -26, -6, 0],
        scale: [1, 1.12, 0.96, 1],
        transition: { duration: 0.7, ease: 'easeOut' },
      })
      window.clearInterval(flicker)
      controls.set({ rotate: 0 })
    }
    setFace(final)
    setRolling(false)
    busy.current = false
    onRolled(final)
  }

  const dim = size === 'lg' ? 'h-14 w-14' : 'h-11 w-11'
  return (
    <button
      type="button"
      onClick={() => void roll()}
      aria-label={`${label}: highlights a random location you have not discovered yet`}
      aria-busy={rolling}
      className="group relative grid place-items-center rounded-2xl p-1 transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
    >
      <motion.span animate={controls} className={`block ${dim}`}>
        <DieFace value={face} />
      </motion.span>
      <span className="sr-only" aria-live="polite">
        {rolling ? 'Rolling…' : `Rolled a ${face}`}
      </span>
    </button>
  )
}

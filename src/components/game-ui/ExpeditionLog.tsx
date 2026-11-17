import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, Trophy } from 'lucide-react'
import { achievementIcon } from './achievementIcons'
import { useEffect, useState } from 'react'
import { achievements } from '@/data/achievements'
import { wideLayout } from '@/data/islandLayout'
import { allLocationIds, locationsById } from '@/data/locations'
import { axialToPixel, hexVertices, toPoints } from '@/lib/hex'
import { zoneColors } from '@/lib/palette'
import type { AchievementId, LocationId } from '@/types/content'


const MINI = 0.14
const MINI_HEX = toPoints(hexVertices(100 * MINI * 0.92))
const miniCells = wideLayout.cells.map((c) => ({ c, ...axialToPixel(c) }))

/** A miniature chart of the real island: discovered locations light up. */
function MiniChart({ discovered }: { discovered: LocationId[] }) {
  return (
    <svg viewBox="-80 -62 160 116" className="h-[92px] w-[128px] shrink-0" role="img" aria-label={`Island chart: ${discovered.length} of ${allLocationIds.length} locations discovered`}>
      {miniCells.map(({ c, x, y }) => {
        const mx = x * MINI
        const my = y * MINI
        if (c.type === 'terrain') return <polygon key={`${c.q},${c.r}`} points={MINI_HEX} transform={`translate(${mx} ${my})`} fill="#f1dca6" />
        const found = discovered.includes(c.id)
        const color = zoneColors[locationsById[c.id].zone]
        return (
          <g key={c.id} transform={`translate(${mx} ${my})`}>
            <title>{locationsById[c.id].title}</title>
            <motion.polygon
              points={MINI_HEX}
              initial={false}
              animate={{ fill: found ? color.base : '#e4edf2', scale: found ? 1 : 0.9 }}
              stroke={found ? color.deep : '#7e97a8'}
              strokeWidth={1.6}
              strokeDasharray={found ? undefined : '2 2'}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          </g>
        )
      })}
    </svg>
  )
}

interface ExpeditionLogProps {
  discovered: LocationId[]
  unlocked: AchievementId[]
  onReset: () => void
}

export function ExpeditionLog({ discovered, unlocked, onReset }: ExpeditionLogProps) {
  const [confirming, setConfirming] = useState(false)
  const total = allLocationIds.length
  const pct = Math.round((discovered.length / total) * 100)

  useEffect(() => {
    if (!confirming) return
    const t = window.setTimeout(() => setConfirming(false), 4000)
    return () => window.clearTimeout(t)
  }, [confirming])

  return (
    <section aria-labelledby="expedition-title" className="panel-glass p-4">
      <div className="flex items-center gap-3">
        <MiniChart discovered={discovered} />
        <div className="min-w-0 flex-1">
          <h2 id="expedition-title" className="eyebrow text-ocean-700">
            Expedition log
          </h2>
          <p className="mt-1 font-display text-[26px] leading-none font-bold text-ink">
            <motion.span key={discovered.length} initial={{ scale: 1.35, color: '#d8951a' }} animate={{ scale: 1, color: '#12324a' }} className="inline-block">
              {discovered.length}
            </motion.span>
            <span className="text-[17px] text-ink-muted"> / {total} charted</span>
          </p>
          <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-ocean-100" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={discovered.length} aria-label="Island explored">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-mint via-sun to-coral" initial={false} animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-ink/8 pt-3">
        <ul className="flex gap-1.5" aria-label="Achievements">
          {achievements.map((a) => {
            const Icon = achievementIcon[a.id]
            const on = unlocked.includes(a.id)
            return (
              <li key={a.id}>
                <span
                  title={`${a.name} — ${on ? a.description : a.hint}`}
                  className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${on ? 'bg-sun text-[#5e3c04] shadow-[0_3px_0_#c58612]' : 'bg-ink/6 text-ink/30'}`}
                >
                  <Icon size={18} aria-hidden />
                  <span className="sr-only">
                    {a.name}: {on ? 'unlocked' : `locked — ${a.hint}`}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
        <AnimatePresence mode="wait" initial={false}>
          {confirming ? (
            <motion.div key="confirm" className="flex items-center gap-1" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <button
                type="button"
                className="rounded-lg bg-coral-deep px-2.5 py-1.5 text-[13px] font-bold text-white"
                onClick={() => {
                  setConfirming(false)
                  onReset()
                }}
              >
                Reset
              </button>
              <button type="button" className="rounded-lg px-2 py-1.5 text-[13px] font-semibold text-ink-soft hover:bg-ink/5" onClick={() => setConfirming(false)}>
                Keep
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="reset"
              type="button"
              disabled={discovered.length === 0 && unlocked.length === 0}
              onClick={() => setConfirming(true)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-semibold text-ink-soft hover:bg-ink/5 disabled:opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RotateCcw size={14} aria-hidden /> Reset
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/** Compact pill used on phones / tablets. */
export function ExpeditionPill({ discovered, unlocked }: { discovered: LocationId[]; unlocked: AchievementId[] }) {
  const total = allLocationIds.length
  return (
    <div className="panel-glass flex items-center gap-3 rounded-2xl px-3 py-2" role="status" aria-label={`${discovered.length} of ${total} locations charted, ${unlocked.length} achievements`}>
      <div className="flex gap-[3px]" aria-hidden>
        {allLocationIds.map((id) => (
          <span
            key={id}
            className="h-3.5 w-3 transition-colors [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]"
            style={{ background: discovered.includes(id) ? zoneColors[locationsById[id].zone].base : '#c9d6de' }}
          />
        ))}
      </div>
      <span className="font-display text-[15px] font-bold text-ink">
        {discovered.length}/{total}
      </span>
      <span className="flex items-center gap-1 text-[13px] font-semibold text-ink-soft" aria-hidden>
        <Trophy size={14} /> {unlocked.length}
      </span>
    </div>
  )
}

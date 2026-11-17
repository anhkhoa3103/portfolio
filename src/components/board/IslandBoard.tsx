import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useMemo, useRef, type KeyboardEvent } from 'react'
import { LocationTile, TerrainTile } from '@/components/hex-tile/HexTile'
import type { IslandCell, IslandLayout } from '@/data/islandLayout'
import { locationsById } from '@/data/locations'
import { HEX_R, SQUASH, axialToPixel, hexVertices, layoutBounds, nearestInDirection, toPoints, type Direction } from '@/lib/hex'
import { locationPalettes, terrainPalettes, zoneColors } from '@/lib/palette'
import type { LocationId } from '@/types/content'
import { IslandDecor } from './IslandDecor'

interface IslandBoardProps {
  layout: IslandLayout
  compact: boolean
  selectedId: LocationId | null
  hoveredId: LocationId | null
  beaconId: LocationId | null
  discovered: LocationId[]
  showTooltips: boolean
  onSelect: (id: LocationId) => void
  onHover: (id: LocationId | null) => void
}

type Placed = { cell: IslandCell; x: number; y: number }

const SHORE = toPoints(hexVertices(HEX_R))
const ARROWS: Record<string, Direction> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }

export function IslandBoard({
  layout,
  compact,
  selectedId,
  hoveredId,
  beaconId,
  discovered,
  showTooltips,
  onSelect,
  onHover,
}: IslandBoardProps) {
  const reduce = useReducedMotion()
  const tileRefs = useRef(new Map<LocationId, SVGGElement>())

  const placed = useMemo<Placed[]>(
    () =>
      layout.cells
        .map((cell) => ({ cell, ...axialToPixel(cell) }))
        .sort((a, b) => a.y - b.y || a.x - b.x),
    [layout],
  )

  const bounds = useMemo(
    () => layoutBounds(layout.cells, compact ? { x: 34, top: 70, bottom: 46 } : { x: 120, top: 96, bottom: 70 }),
    [layout, compact],
  )

  const locationPoints = useMemo(() => {
    const map = new Map<LocationId, { id: LocationId; x: number; y: number; elevation: number }>()
    for (const p of placed) if (p.cell.type === 'location') map.set(p.cell.id, { id: p.cell.id, x: p.x, y: p.y, elevation: p.cell.elevation })
    return map
  }, [placed])

  const routeSegments = useMemo(() => {
    const segs: { key: string; d: string; charted: boolean; color: string }[] = []
    for (let i = 0; i < layout.route.length - 1; i++) {
      const a = locationPoints.get(layout.route[i]!)
      const b = locationPoints.get(layout.route[i + 1]!)
      if (!a || !b) continue
      const mx = (a.x + b.x) / 2
      const my = (a.y + b.y) / 2
      const dx = b.x - a.x
      const dy = b.y - a.y
      const bend = i % 2 === 0 ? 0.22 : -0.22
      const cx = mx - dy * bend
      const cy = my + dx * bend * SQUASH
      segs.push({
        key: `${a.id}-${b.id}`,
        d: `M${a.x} ${a.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`,
        charted: discovered.includes(a.id) && discovered.includes(b.id),
        color: zoneColors[locationsById[b.id].zone].base,
      })
    }
    return segs
  }, [layout.route, locationPoints, discovered])

  const center = useMemo(() => {
    const xs = placed.map((p) => p.x)
    const ys = placed.map((p) => p.y)
    return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 }
  }, [placed])

  const delayFor = useCallback(
    (x: number, y: number) => Math.min(0.9, (Math.hypot(x - center.x, (y - center.y) / SQUASH) / HEX_R) * 0.07 + 0.1),
    [center],
  )

  const handleKey = useCallback(
    (id: LocationId) => (e: KeyboardEvent<SVGGElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect(id)
        return
      }
      const dir = ARROWS[e.key]
      if (!dir) return
      e.preventDefault()
      const from = locationPoints.get(id)
      if (!from) return
      const next = nearestInDirection(from, [...locationPoints.values()], dir)
      if (next) tileRefs.current.get(next.id)?.focus()
    },
    [locationPoints, onSelect],
  )

  const tooltipTarget = showTooltips && hoveredId && hoveredId !== selectedId ? locationPoints.get(hoveredId) : undefined
  const pct = (v: number, min: number, size: number) => `${((v - min) / size) * 100}%`
  const ratio = bounds.width / bounds.height

  return (
    <div className="relative flex h-full w-full items-center justify-center [container-type:size]">
      <div className="relative" style={{ aspectRatio: `${bounds.width} / ${bounds.height}`, width: `min(100cqw, calc(100cqh * ${ratio.toFixed(4)}))` }}>
        <svg
          viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          role="group"
          aria-label="Khoa's Island map. Use Tab or arrow keys to move between locations and Enter to select."
        >
          <defs>
            {Object.entries(locationPalettes).map(([id, p]) => (
              <linearGradient key={id} id={`loc-${id}`} x1="0" y1="0" x2="0.35" y2="1">
                <stop offset="0" stopColor={p.top[0]} />
                <stop offset="1" stopColor={p.top[1]} />
              </linearGradient>
            ))}
            {Object.entries(terrainPalettes).map(([id, p]) => (
              <linearGradient key={id} id={`terrain-${id}`} x1="0" y1="0" x2="0.35" y2="1">
                <stop offset="0" stopColor={p.top[0]} />
                <stop offset="1" stopColor={p.top[1]} />
              </linearGradient>
            ))}
          </defs>

          {!compact && <IslandDecor bounds={bounds} />}

          {/* shoreline: shallow lagoon, foam, island base and sand */}
          <g aria-hidden="true" strokeLinejoin="round">
            <g fill="#7fd3ee" stroke="#7fd3ee" strokeWidth={compact ? 70 : 110} opacity={0.42}>
              {placed.map((p, i) => (
                <polygon key={i} points={SHORE} transform={`translate(${p.x} ${p.y + 10})`} />
              ))}
            </g>
            <g className="anim-foam" fill="#ffffff" stroke="#ffffff" strokeWidth={compact ? 40 : 56} opacity={0.6}>
              {placed.map((p, i) => (
                <polygon key={i} points={SHORE} transform={`translate(${p.x} ${p.y + 8})`} />
              ))}
            </g>
            <g fill="#c99a4f" stroke="#c99a4f" strokeWidth={30}>
              {placed.map((p, i) => (
                <polygon key={i} points={SHORE} transform={`translate(${p.x} ${p.y + 22})`} />
              ))}
            </g>
            <g fill="#f4dc9e" stroke="#f4dc9e" strokeWidth={30}>
              {placed.map((p, i) => (
                <polygon key={i} points={SHORE} transform={`translate(${p.x} ${p.y})`} />
              ))}
            </g>
          </g>

          {placed.map((p) =>
            p.cell.type === 'terrain' ? (
              <TerrainTile key={`t-${p.cell.q}-${p.cell.r}`} kind={p.cell.terrain} x={p.x} y={p.y} elevation={p.cell.elevation} delay={delayFor(p.x, p.y)} />
            ) : null,
          )}

          {/* footpaths between locations — they light up once both ends are charted */}
          <g aria-hidden="true" fill="none" strokeLinecap="round">
            {routeSegments.map((s) => (
              <g key={s.key}>
                <path d={s.d} stroke="#5e3c04" strokeOpacity={0.18} strokeWidth={9} strokeDasharray="0.1 16" />
                <path d={s.d} stroke="#fffdf8" strokeOpacity={0.85} strokeWidth={6} strokeDasharray="0.1 16" />
                {s.charted && (
                  <motion.path
                    d={s.d}
                    stroke={s.color}
                    strokeWidth={6}
                    strokeDasharray="0.1 16"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                )}
              </g>
            ))}
          </g>

          {placed.map((p) => {
            if (p.cell.type !== 'location') return null
            const id = p.cell.id
            const loc = locationsById[id]
            return (
              <LocationTile
                key={id}
                ref={(el) => {
                  if (el) tileRefs.current.set(id, el)
                  else tileRefs.current.delete(id)
                }}
                location={loc}
                label={compact ? loc.shortLabel : loc.tileLabel}
                labelSize={compact ? 21 : 17}
                x={p.x}
                y={p.y}
                elevation={p.cell.elevation}
                delay={delayFor(p.x, p.y)}
                selected={selectedId === id}
                hovered={hoveredId === id}
                discovered={discovered.includes(id)}
                beacon={beaconId === id}
                onSelect={() => onSelect(id)}
                onHoverChange={(h) => onHover(h ? id : null)}
                onKeyDown={handleKey(id)}
              />
            )
          })}
        </svg>

        <AnimatePresence>
          {tooltipTarget && (
            <motion.div
              key={tooltipTarget.id}
              role="tooltip"
              className="pointer-events-none absolute z-10 w-max max-w-[240px] -translate-x-1/2 -translate-y-full"
              style={{
                left: pct(tooltipTarget.x, bounds.minX, bounds.width),
                top: pct(tooltipTarget.y - HEX_R * 0.9 * SQUASH - 26, bounds.minY, bounds.height),
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.1 } }}
              transition={{ duration: 0.16 }}
            >
              <div className="rounded-2xl bg-ink px-3.5 py-2.5 text-white shadow-lg">
                <p className="font-display text-[15px] leading-tight font-semibold">{locationsById[tooltipTarget.id].placeName}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-white/80">{locationsById[tooltipTarget.id].teaser}</p>
              </div>
              <div className="mx-auto h-2.5 w-4 bg-ink [clip-path:polygon(0_0,100%_0,50%_100%)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

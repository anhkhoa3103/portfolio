import { motion, useReducedMotion } from 'framer-motion'
import { forwardRef, memo, type KeyboardEvent, type PointerEvent } from 'react'
import type { TerrainKind } from '@/data/islandLayout'
import { HEX_R, LOCATION_SCALE, TILE_SCALE, hexSideVertices, hexVertices, toPoints } from '@/lib/hex'
import { locationPalettes, terrainPalettes } from '@/lib/palette'
import type { IslandLocation } from '@/types/content'
import { LocationArt, TerrainArt } from './TileArt'

const RT = HEX_R * TILE_SCALE
const R = HEX_R * LOCATION_SCALE
const T_TOP = toPoints(hexVertices(RT))
const TOP = toPoints(hexVertices(R))
const RIM = toPoints(hexVertices(R - 4))
const INNER_RIM = toPoints(hexVertices(R - 11))
const FOCUS_RING = toPoints(hexVertices(R + 9))

const sideCache = new Map<string, string>()
function side(radius: number, height: number) {
  const key = `${radius}:${height}`
  let s = sideCache.get(key)
  if (!s) {
    s = toPoints(hexSideVertices(radius, height))
    sideCache.set(key, s)
  }
  return s
}

const enter = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, y: -46, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: reduce ? { duration: 0.2 } : { type: 'spring' as const, stiffness: 240, damping: 20, delay },
})

/* ── Terrain tile (decorative, not interactive) ───────────── */

export const TerrainTile = memo(function TerrainTile({
  kind,
  x,
  y,
  elevation,
  delay,
}: {
  kind: TerrainKind
  x: number
  y: number
  elevation: number
  delay: number
}) {
  const reduce = useReducedMotion()
  const p = terrainPalettes[kind]
  const gid = `terrain-${kind}`
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <motion.g {...enter(delay, reduce)}>
        <polygon points={side(RT, elevation)} fill={p.side} />
        <polygon points={T_TOP} fill={`url(#${gid})`} />
        <g transform="translate(0 -4) scale(0.92)" opacity={0.92}>
          <TerrainArt kind={kind} />
        </g>
      </motion.g>
    </g>
  )
})

/* ── Location tile (interactive) ──────────────────────────── */

interface LocationTileProps {
  location: IslandLocation
  label: string
  labelSize: number
  x: number
  y: number
  elevation: number
  delay: number
  selected: boolean
  hovered: boolean
  discovered: boolean
  beacon: boolean
  onSelect: () => void
  onHoverChange: (hovering: boolean) => void
  onKeyDown: (e: KeyboardEvent<SVGGElement>) => void
}

export const LocationTile = memo(
  forwardRef<SVGGElement, LocationTileProps>(function LocationTile(
    { location, label, labelSize, x, y, elevation, delay, selected, hovered, discovered, beacon, onSelect, onHoverChange, onKeyDown },
    ref,
  ) {
    const reduce = useReducedMotion()
    const p = locationPalettes[location.id]
    const lift = selected ? -18 : hovered ? -11 : 0
    const plateW = Math.round(label.length * labelSize * 0.56 + labelSize * 1.5)
    const plateH = Math.round(labelSize * 1.55)
    const plateY = 30

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') onHoverChange(true)
    }

    return (
      <g transform={`translate(${x} ${y})`}>
        <motion.g {...enter(delay, reduce)}>
          {/* ground shadow, grows as the tile lifts */}
          <motion.polygon
            points={TOP}
            fill="#0b2a3c"
            animate={{ opacity: lift ? 0.26 : 0.16, scale: lift ? 1.03 : 1 }}
            transform={`translate(0 ${elevation + 8})`}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <g
            ref={ref}
            className="hex-tile"
            role="button"
            tabIndex={0}
            aria-label={`${location.title} — ${location.category}${discovered ? ' (discovered)' : ''}`}
            aria-pressed={selected}
            data-location={location.id}
            onClick={onSelect}
            onKeyDown={onKeyDown}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={() => onHoverChange(false)}
            onFocus={() => onHoverChange(true)}
            onBlur={() => onHoverChange(false)}
          >
            <motion.g
              animate={{ y: lift }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 24 }}
            >
              <polygon className="hex-focus" points={FOCUS_RING} fill="none" stroke="#ffc547" strokeWidth={6} />
              <polygon points={side(R, elevation)} fill={p.side} />
              <polygon points={TOP} fill={`url(#loc-${location.id})`} />
              <polygon points={RIM} fill="none" stroke="#fffdf8" strokeOpacity={selected ? 1 : 0.85} strokeWidth={selected ? 7 : 4} strokeLinejoin="round" />
              <polygon points={INNER_RIM} fill="none" stroke="#ffffff" strokeOpacity={0.3} strokeWidth={1.5} strokeDasharray="3 5" />
              <g transform="translate(0 -6)">
                <LocationArt id={location.id} />
              </g>

              {/* name plate */}
              <g transform={`translate(0 ${plateY})`}>
                <rect x={-plateW / 2} y={2.5} width={plateW} height={plateH} rx={plateH / 2} fill={p.side} opacity={0.6} />
                <rect x={-plateW / 2} y={0} width={plateW} height={plateH} rx={plateH / 2} fill="#fffdf8" />
                <text
                  x={0}
                  y={plateH / 2 + labelSize * 0.36}
                  textAnchor="middle"
                  fontSize={labelSize}
                  fontWeight={600}
                  fill={p.ink}
                  fontFamily="Fredoka, sans-serif"
                >
                  {label}
                </text>
              </g>

              {/* discovery seal */}
              <g transform={`translate(${R * 0.62} ${-R * 0.62})`}>
                {discovered ? (
                  <motion.g
                    key="found"
                    initial={reduce ? false : { scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 16 }}
                  >
                    <circle r={13} fill="#fffdf8" />
                    <circle r={10} fill="#2fc49a" />
                    <path d="M-4.5 0 L-1.2 3.4 L5 -3.6" stroke="#fffdf8" strokeWidth={2.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.g>
                ) : (
                  <g key="unknown" opacity={0.92}>
                    <circle r={12} fill="#fffdf8" fillOpacity={0.85} />
                    <text y={5} textAnchor="middle" fontSize={14} fontWeight={700} fill={p.side} fontFamily="Fredoka, sans-serif">
                      ?
                    </text>
                  </g>
                )}
              </g>
            </motion.g>
          </g>

          {beacon && (
            <g pointerEvents="none">
              <polygon className="anim-beacon" points={TOP} fill="none" stroke="#ffc547" strokeWidth={8} />
              <polygon className="anim-beacon" style={{ animationDelay: '0.5s' }} points={TOP} fill="none" stroke="#fffdf8" strokeWidth={5} />
            </g>
          )}

          {selected && (
            <motion.g
              pointerEvents="none"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transform={`translate(0 ${-R * 0.95 - 18})`}
            >
              <g className="anim-bob">
                <path d="M0 22 C-6 12 -14 6 -14 -4 a14 14 0 0 1 28 0 C14 6 6 12 0 22 Z" fill="#ff7a5c" stroke="#fffdf8" strokeWidth={3} />
                <circle cy={-4} r={5.5} fill="#fffdf8" />
              </g>
            </motion.g>
          )}
        </motion.g>
      </g>
    )
  }),
)

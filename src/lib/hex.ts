import type { Axial } from '@/data/islandLayout'

/** Hex circumradius in board units. */
export const HEX_R = 100
/** Vertical squash that tilts the board like a table seen at an angle. */
export const SQUASH = 0.8
/** Tiles are drawn smaller than their cell to leave sandy paths between them. */
export const TILE_SCALE = 0.88
/** Portfolio locations are slightly bigger "pieces" than the terrain around them. */
export const LOCATION_SCALE = 0.95

const SQRT3 = Math.sqrt(3)

export type Point = readonly [number, number]

export function axialToPixel({ q, r }: Axial): { x: number; y: number } {
  return {
    x: 1.5 * HEX_R * q,
    y: SQRT3 * HEX_R * (r + q / 2) * SQUASH,
  }
}

/** Flat-top hexagon vertices, starting at the east vertex, clockwise (y down). */
export function hexVertices(radius: number, squash = SQUASH): Point[] {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return [round(radius * Math.cos(a)), round(radius * Math.sin(a) * squash)] as const
  })
}

/** The visible "cliff" below a tile: the lower half outline extruded by `height`. */
export function hexSideVertices(radius: number, height: number, squash = SQUASH): Point[] {
  const v = hexVertices(radius, squash)
  // Lower edge runs east (0) → south-east (1) → south-west (2) → west (3).
  const lower = [v[0]!, v[1]!, v[2]!, v[3]!]
  const dropped = [...lower].reverse().map(([x, y]) => [x, round(y + height)] as const)
  return [...lower, ...dropped]
}

export function toPoints(points: Point[]): string {
  return points.map(([x, y]) => `${x},${y}`).join(' ')
}

export interface Bounds {
  minX: number
  minY: number
  width: number
  height: number
}

export function layoutBounds(cells: Axial[], margin: { x: number; top: number; bottom: number }): Bounds {
  const pts = cells.map(axialToPixel)
  const halfH = (SQRT3 / 2) * HEX_R * SQUASH
  const minX = Math.min(...pts.map((p) => p.x)) - HEX_R - margin.x
  const maxX = Math.max(...pts.map((p) => p.x)) + HEX_R + margin.x
  const minY = Math.min(...pts.map((p) => p.y)) - halfH - margin.top
  const maxY = Math.max(...pts.map((p) => p.y)) + halfH + margin.bottom
  return { minX: round(minX), minY: round(minY), width: round(maxX - minX), height: round(maxY - minY) }
}

export type Direction = 'up' | 'down' | 'left' | 'right'

/**
 * Pick the candidate that lies most directly in `dir` from `from`.
 * Used for arrow-key navigation between tiles.
 */
export function nearestInDirection<T extends { x: number; y: number }>(from: T, candidates: T[], dir: Direction): T | undefined {
  let best: T | undefined
  let bestScore = Infinity
  for (const c of candidates) {
    if (c === from) continue
    const dx = c.x - from.x
    const dy = c.y - from.y
    const along = dir === 'left' ? -dx : dir === 'right' ? dx : dir === 'up' ? -dy : dy
    const across = dir === 'left' || dir === 'right' ? Math.abs(dy) : Math.abs(dx)
    if (along <= 1) continue
    const score = along + across * 2
    if (score < bestScore) {
      bestScore = score
      best = c
    }
  }
  return best
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}

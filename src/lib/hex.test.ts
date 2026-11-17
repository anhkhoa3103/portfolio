import { describe, expect, it } from 'vitest'
import { axialToPixel, hexSideVertices, hexVertices, nearestInDirection } from './hex'

describe('hex geometry', () => {
  it('places the origin at 0,0 and neighbours symmetrically', () => {
    expect(axialToPixel({ q: 0, r: 0 })).toEqual({ x: 0, y: 0 })
    const east = axialToPixel({ q: 1, r: 0 })
    const west = axialToPixel({ q: -1, r: 0 })
    expect(east.x).toBeCloseTo(-west.x)
    expect(east.y).toBeCloseTo(-west.y)
  })

  it('builds a 6-vertex flat-top hex and an 8-vertex side face', () => {
    const v = hexVertices(100, 1)
    expect(v).toHaveLength(6)
    expect(v[0]).toEqual([100, 0])
    expect(hexSideVertices(100, 20, 1)).toHaveLength(8)
  })

  it('finds the nearest tile in a direction', () => {
    const a = { x: 0, y: 0 }
    const right = { x: 150, y: 10 }
    const farRight = { x: 300, y: 0 }
    const up = { x: 0, y: -150 }
    expect(nearestInDirection(a, [a, right, farRight, up], 'right')).toBe(right)
    expect(nearestInDirection(a, [a, right, up], 'up')).toBe(up)
    expect(nearestInDirection(a, [a, right], 'left')).toBeUndefined()
  })
})

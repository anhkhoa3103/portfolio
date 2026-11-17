import { describe, expect, it } from 'vitest'
import { getSocialLinks, isRealUrl, siteConfig } from '@/config/site'
import { tallLayout, wideLayout } from './islandLayout'
import { allLocationIds, locations, projectLocationIds } from './locations'
import { projects } from './projects'

describe('island content integrity', () => {
  it('has exactly eight unique locations', () => {
    expect(new Set(allLocationIds).size).toBe(8)
    expect(locations).toHaveLength(8)
  })

  it.each([wideLayout, tallLayout])('$name layout places every location exactly once without overlaps', (layout) => {
    const placed = layout.cells.flatMap((c) => (c.type === 'location' ? [c.id] : []))
    expect([...placed].sort()).toEqual([...allLocationIds].sort())
    const coords = layout.cells.map((c) => `${c.q},${c.r}`)
    expect(new Set(coords).size).toBe(coords.length)
    layout.route.forEach((id) => expect(allLocationIds).toContain(id))
  })

  it('has a project entry for every project location', () => {
    expect(projects.map((p) => p.id).sort()).toEqual([...projectLocationIds].sort())
  })

  it('never ships invented links', () => {
    for (const p of projects) {
      if (p.repoUrl !== undefined) expect(isRealUrl(p.repoUrl)).toBe(true)
      if (p.demoUrl !== undefined) expect(isRealUrl(p.demoUrl)).toBe(true)
    }
    // Social links are hidden until configured.
    const configured = [siteConfig.githubUrl, siteConfig.linkedinUrl].filter((u) => isRealUrl(u))
    expect(getSocialLinks()).toHaveLength(configured.length)
  })

  it('isRealUrl rejects placeholders', () => {
    expect(isRealUrl('')).toBe(false)
    expect(isRealUrl('#')).toBe(false)
    expect(isRealUrl('github.com/me')).toBe(false)
    expect(isRealUrl('https://github.com/someone')).toBe(true)
  })
})

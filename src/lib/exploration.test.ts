import { describe, expect, it } from 'vitest'
import { allLocationIds, projectLocationIds } from '@/data/locations'
import { explorationReducer, initialExploration, newlyUnlocked, sanitizeExploration, type ExplorationState } from './exploration'

const run = (actions: Parameters<typeof explorationReducer>[1][], from: ExplorationState = initialExploration) =>
  actions.reduce(explorationReducer, from)

describe('exploration reducer', () => {
  it('unlocks First Discovery on the first discovered location', () => {
    const s = run([{ type: 'discover', id: 'about' }])
    expect(s.discovered).toEqual(['about'])
    expect(s.achievements).toEqual(['first-discovery'])
    expect(newlyUnlocked(initialExploration, s)).toEqual(['first-discovery'])
  })

  it('does not duplicate discoveries and returns the same state object', () => {
    const s1 = run([{ type: 'discover', id: 'about' }])
    const s2 = explorationReducer(s1, { type: 'discover', id: 'about' })
    expect(s2).toBe(s1)
  })

  it('unlocks Project Explorer only after every project dossier is opened', () => {
    const someOpened = run(projectLocationIds.slice(0, 3).map((id) => ({ type: 'openProject' as const, id })))
    expect(someOpened.achievements).not.toContain('project-explorer')
    const allOpened = explorationReducer(someOpened, { type: 'openProject', id: projectLocationIds[3]! })
    expect(allOpened.achievements).toContain('project-explorer')
    // Opening a project also discovers its tile.
    expect(allOpened.discovered).toEqual(expect.arrayContaining(projectLocationIds))
  })

  it('unlocks Skill Collector when the skills location is viewed', () => {
    const s = run([{ type: 'viewSkills' }])
    expect(s.skillsViewed).toBe(true)
    expect(s.discovered).toContain('skills')
    expect(s.achievements).toEqual(['first-discovery', 'skill-collector'])
  })

  it('unlocks Island Explorer when all locations are discovered', () => {
    const s = run(allLocationIds.map((id) => ({ type: 'discover' as const, id })))
    expect(s.achievements).toContain('island-explorer')
    expect(s.discovered).toHaveLength(allLocationIds.length)
  })

  it('reset clears everything', () => {
    const s = run([{ type: 'viewSkills' }, { type: 'reset' }])
    expect(s).toEqual(initialExploration)
  })
})

describe('sanitizeExploration', () => {
  it('returns the initial state for garbage', () => {
    expect(sanitizeExploration(null)).toEqual(initialExploration)
    expect(sanitizeExploration('nope')).toEqual(initialExploration)
    expect(sanitizeExploration(42)).toEqual(initialExploration)
  })

  it('drops unknown ids and recomputes earned achievements', () => {
    const s = sanitizeExploration({
      discovered: ['about', 'atlantis'],
      projectsOpened: ['not-a-project'],
      skillsViewed: 'yes',
      achievements: ['made-up'],
    })
    expect(s.discovered).toEqual(['about'])
    expect(s.projectsOpened).toEqual([])
    expect(s.skillsViewed).toBe(false)
    expect(s.achievements).toEqual(['first-discovery'])
  })
})

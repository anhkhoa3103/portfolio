import { allLocationIds, projectLocationIds } from '@/data/locations'
import type { AchievementId, LocationId, ProjectId } from '@/types/content'

export const STORAGE_KEY = 'khoas-island:exploration:v1'

export interface ExplorationState {
  discovered: LocationId[]
  projectsOpened: ProjectId[]
  skillsViewed: boolean
  achievements: AchievementId[]
}

export type ExplorationAction =
  | { type: 'discover'; id: LocationId }
  | { type: 'openProject'; id: ProjectId }
  | { type: 'viewSkills' }
  | { type: 'reset' }

export const initialExploration: ExplorationState = {
  discovered: [],
  projectsOpened: [],
  skillsViewed: false,
  achievements: [],
}

const ACHIEVEMENT_ORDER: AchievementId[] = ['first-discovery', 'project-explorer', 'skill-collector', 'island-explorer']

/** Which achievements the given progress has earned. Pure, order-stable. */
export function earnedAchievements(s: Pick<ExplorationState, 'discovered' | 'projectsOpened' | 'skillsViewed'>): AchievementId[] {
  const earned = new Set<AchievementId>()
  if (s.discovered.length >= 1) earned.add('first-discovery')
  if (projectLocationIds.every((id) => s.projectsOpened.includes(id))) earned.add('project-explorer')
  if (s.skillsViewed) earned.add('skill-collector')
  if (allLocationIds.every((id) => s.discovered.includes(id))) earned.add('island-explorer')
  return ACHIEVEMENT_ORDER.filter((id) => earned.has(id))
}

function addUnique<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list : [...list, item]
}

function withAchievements(next: Omit<ExplorationState, 'achievements'> & { achievements: AchievementId[] }): ExplorationState {
  const earned = earnedAchievements(next)
  // Achievements are permanent once unlocked (until a reset).
  const merged = ACHIEVEMENT_ORDER.filter((id) => earned.includes(id) || next.achievements.includes(id))
  return { ...next, achievements: merged }
}

export function explorationReducer(state: ExplorationState, action: ExplorationAction): ExplorationState {
  switch (action.type) {
    case 'discover': {
      if (state.discovered.includes(action.id)) return state
      return withAchievements({ ...state, discovered: addUnique(state.discovered, action.id) })
    }
    case 'openProject': {
      const discovered = addUnique(state.discovered, action.id)
      const projectsOpened = addUnique(state.projectsOpened, action.id)
      if (discovered === state.discovered && projectsOpened === state.projectsOpened) return state
      return withAchievements({ ...state, discovered, projectsOpened })
    }
    case 'viewSkills': {
      if (state.skillsViewed && state.discovered.includes('skills')) return state
      return withAchievements({ ...state, skillsViewed: true, discovered: addUnique(state.discovered, 'skills') })
    }
    case 'reset':
      return initialExploration
  }
}

/** Validate anything read from storage; unknown ids are dropped. */
export function sanitizeExploration(raw: unknown): ExplorationState {
  if (!raw || typeof raw !== 'object') return initialExploration
  const r = raw as Record<string, unknown>
  const pick = <T extends string>(value: unknown, allowed: readonly T[]): T[] =>
    Array.isArray(value) ? allowed.filter((id) => value.includes(id)) : []

  const discovered = pick(r.discovered, allLocationIds)
  const projectsOpened = pick(r.projectsOpened, projectLocationIds)
  const skillsViewed = r.skillsViewed === true
  const achievements = pick(r.achievements, ACHIEVEMENT_ORDER)
  return withAchievements({ discovered, projectsOpened, skillsViewed, achievements })
}

/** Achievements present in `next` but not in `prev`. */
export function newlyUnlocked(prev: ExplorationState, next: ExplorationState): AchievementId[] {
  return next.achievements.filter((id) => !prev.achievements.includes(id))
}

export type ZoneId = 'creation' | 'intelligence' | 'engineering' | 'discovery'

export type ProjectId = 'phong-312' | 'ielts-coach' | 'vietnam-history' | 'debate-practice'

export type LocationId = ProjectId | 'about' | 'experience' | 'skills' | 'contact'

export type LocationKind = 'project' | 'about' | 'experience' | 'skills' | 'contact'

export interface Zone {
  id: ZoneId
  name: string
  blurb: string
}

export interface IslandLocation {
  id: LocationId
  kind: LocationKind
  zone: ZoneId
  /** Short label printed on the tile itself. */
  tileLabel: string
  /** Compact label for the phone-sized island. */
  shortLabel: string
  /** Full title shown in panels. */
  title: string
  /** Themed place name on the island. */
  placeName: string
  category: string
  /** One-liner used for hover tooltips. */
  teaser: string
  /** 1–3 sentence description for the preview panel. */
  summary: string
  exploreLabel: string
}

export interface ArchitectureNode {
  title: string
  detail: string
  tech?: string[]
}

export interface ProjectMetric {
  value: string
  label: string
  note?: string
}

export interface Project {
  id: ProjectId
  name: string
  category: string
  tagline: string
  overview: string
  problem: string
  contribution: string[]
  architecture: {
    caption: string
    flow: ArchitectureNode[]
    /** Supporting pieces (storage, models…) drawn beneath the flow. */
    foundations?: ArchitectureNode[]
  }
  technologies: string[]
  implementation: { title: string; detail: string }[]
  results: ProjectMetric[]
  /** Real URLs only. Leave undefined until they exist. */
  repoUrl?: string
  demoUrl?: string
}

export interface ExperienceItem {
  id: string
  organization: string
  role: string
  period: string
  type: 'work' | 'teaching' | 'education'
  points: string[]
}

export interface SkillGroup {
  id: string
  name: string
  caption: string
  skills: string[]
}

export type AchievementId = 'first-discovery' | 'project-explorer' | 'skill-collector' | 'island-explorer'

export interface Achievement {
  id: AchievementId
  name: string
  description: string
  hint: string
}

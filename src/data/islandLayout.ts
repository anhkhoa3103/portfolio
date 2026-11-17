import type { LocationId } from '@/types/content'

export type TerrainKind = 'forest' | 'meadow' | 'peak' | 'pond' | 'field' | 'beach' | 'grove' | 'rocks'

/** Axial coordinates on a flat-top hex grid. */
export interface Axial {
  q: number
  r: number
}

export interface LocationCell extends Axial {
  type: 'location'
  id: LocationId
  /** Height of the tile's side face, in board units. */
  elevation: number
}

export interface TerrainCell extends Axial {
  type: 'terrain'
  terrain: TerrainKind
  elevation: number
}

export type IslandCell = LocationCell | TerrainCell

export interface IslandLayout {
  name: 'wide' | 'tall'
  cells: IslandCell[]
  /** Suggested route between locations, drawn as a footpath. */
  route: LocationId[]
}

const loc = (id: LocationId, q: number, r: number, elevation = 26): LocationCell => ({ type: 'location', id, q, r, elevation })
const ter = (terrain: TerrainKind, q: number, r: number, elevation = 14): TerrainCell => ({ type: 'terrain', terrain, q, r, elevation })

const route: LocationId[] = [
  'about',
  'phong-312',
  'ielts-coach',
  'vietnam-history',
  'debate-practice',
  'skills',
  'experience',
  'contact',
  'about',
]

/**
 * Desktop / tablet island: a wide, crescent-like landmass with the
 * Intelligence ridge to the north, the Creation cape to the west,
 * the Engineering coast to the east and Message Pier to the south.
 */
export const wideLayout: IslandLayout = {
  name: 'wide',
  route,
  cells: [
    ter('peak', 0, -2, 24),
    loc('ielts-coach', -1, -1),
    loc('vietnam-history', 1, -2, 30),
    loc('debate-practice', 2, -2),
    ter('beach', 3, -2, 10),
    ter('grove', -2, 0, 14),
    ter('forest', 0, -1, 18),
    ter('meadow', 1, -1, 14),
    loc('phong-312', -3, 1, 24),
    ter('forest', -1, 0, 16),
    ter('forest', 2, -1, 16),
    loc('skills', 3, -1, 24),
    loc('about', 0, 0, 36),
    ter('meadow', -2, 1, 12),
    ter('grove', 1, 0, 14),
    ter('rocks', -3, 2, 12),
    ter('field', -1, 1, 14),
    ter('pond', 0, 1, 10),
    loc('experience', 2, 0, 24),
    ter('beach', -2, 2, 10),
    ter('grove', -1, 2, 12),
    ter('beach', 1, 1, 10),
    loc('contact', 0, 2, 22),
  ],
}

/** Mobile island: a tall three-column isle that fits a phone screen. */
export const tallLayout: IslandLayout = {
  name: 'tall',
  route,
  cells: [
    loc('vietnam-history', 0, -2, 28),
    loc('ielts-coach', -1, -1),
    loc('debate-practice', 1, -2),
    ter('peak', 0, -1, 20),
    ter('forest', -1, 0, 14),
    ter('meadow', 1, -1, 14),
    loc('about', 0, 0, 34),
    loc('phong-312', -1, 1, 24),
    loc('skills', 1, 0, 24),
    ter('pond', 0, 1, 10),
    ter('beach', -1, 2, 10),
    loc('experience', 1, 1, 24),
    loc('contact', 0, 2, 22),
  ],
}

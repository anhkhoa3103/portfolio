import type { TerrainKind } from '@/data/islandLayout'
import type { LocationId, ZoneId } from '@/types/content'

export interface TilePalette {
  /** Top-face gradient, light → dark. */
  top: [string, string]
  /** Cliff / side-face colour. */
  side: string
  /** Accent used for rims, badges and highlights. */
  accent: string
  /** Text colour for the name plate. */
  ink: string
}

/** Zone accents — used for chips, progress segments and panel headers. */
export const zoneColors: Record<ZoneId, { base: string; soft: string; deep: string; ink: string }> = {
  creation: { base: '#ff8a6b', soft: '#ffe3d9', deep: '#d4573d', ink: '#7a2a17' },
  intelligence: { base: '#2fc49a', soft: '#d3f5e9', deep: '#178a69', ink: '#0d4d3b' },
  engineering: { base: '#5c8ff0', soft: '#dfe8fd', deep: '#365fc0', ink: '#1b3270' },
  discovery: { base: '#ffc547', soft: '#fff1cc', deep: '#d8951a', ink: '#6b4505' },
}

export const locationPalettes: Record<LocationId, TilePalette> = {
  'phong-312': { top: ['#ffb199', '#ff7a5c'], side: '#c24d33', accent: '#ffe3d9', ink: '#6e2513' },
  'ielts-coach': { top: ['#7fe6c2', '#33c497'], side: '#168362', accent: '#d3f5e9', ink: '#0b4434' },
  'vietnam-history': { top: ['#9ae7d5', '#3fb8a4'], side: '#1e7c6f', accent: '#d7f4ee', ink: '#0d4239' },
  'debate-practice': { top: ['#a6eab4', '#4cc46d'], side: '#2b8545', accent: '#dcf6e2', ink: '#14461f' },
  skills: { top: ['#a9c4ff', '#6a95f2'], side: '#3a5fbd', accent: '#e1e9fe', ink: '#182f6b' },
  experience: { top: ['#9fd9ff', '#4fb0eb'], side: '#2577b3', accent: '#dcf0fd', ink: '#0f3b5e' },
  about: { top: ['#ffe28a', '#ffbf3c'], side: '#c98a12', accent: '#fff1cc', ink: '#5e3c04' },
  contact: { top: ['#ffd3a3', '#ffa95c'], side: '#c77129', accent: '#ffead4', ink: '#663407' },
}

export const terrainPalettes: Record<TerrainKind, { top: [string, string]; side: string }> = {
  forest: { top: ['#acdca4', '#8ccb8c'], side: '#5f9f68' },
  grove: { top: ['#bfe3a6', '#9fd28c'], side: '#6aa25c' },
  meadow: { top: ['#d8efb0', '#c0e293'], side: '#8fb563' },
  peak: { top: ['#e3dfd7', '#c9c2b7'], side: '#968d82' },
  pond: { top: ['#c9efe6', '#a6e1d4'], side: '#68b0a2' },
  field: { top: ['#f8e9b6', '#f0d98e'], side: '#c8a65a' },
  beach: { top: ['#fcf2d6', '#f6e4b6'], side: '#d6b878' },
  rocks: { top: ['#dde2e5', '#c0c8cd'], side: '#86939a' },
}

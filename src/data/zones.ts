import type { Zone, ZoneId } from '@/types/content'

export const zones: Record<ZoneId, Zone> = {
  creation: {
    id: 'creation',
    name: 'Creation Zone',
    blurb: 'Interactive projects and playful experiments.',
  },
  intelligence: {
    id: 'intelligence',
    name: 'Intelligence Zone',
    blurb: 'AI products and intelligent systems.',
  },
  engineering: {
    id: 'engineering',
    name: 'Engineering Zone',
    blurb: 'Tools, skills and hands-on industry work.',
  },
  discovery: {
    id: 'discovery',
    name: 'Discovery Zone',
    blurb: 'Who I am and how to reach me.',
  },
}

import type { Achievement } from '@/types/content'

export const achievements: Achievement[] = [
  {
    id: 'first-discovery',
    name: 'First Discovery',
    description: 'Charted your first location on the island.',
    hint: 'Select any tile on the island.',
  },
  {
    id: 'project-explorer',
    name: 'Project Explorer',
    description: 'Opened the full dossier of all four projects.',
    hint: 'Open the details of every project.',
  },
  {
    id: 'skill-collector',
    name: 'Skill Collector',
    description: 'Browsed the complete toolbox in the Toolsmith Workshop.',
    hint: 'Open the Technical Skills location.',
  },
  {
    id: 'island-explorer',
    name: 'Island Explorer',
    description: 'Charted every location on the island.',
    hint: 'Discover all eight locations.',
  },
]

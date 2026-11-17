import { Compass, FolderOpen, Trophy, Wrench } from 'lucide-react'
import type { AchievementId } from '@/types/content'

export const achievementIcon: Record<AchievementId, typeof Compass> = {
  'first-discovery': Compass,
  'project-explorer': FolderOpen,
  'skill-collector': Wrench,
  'island-explorer': Trophy,
}

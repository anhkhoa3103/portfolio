import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { achievements } from '@/data/achievements'
import type { AchievementToast } from '@/hooks/useExploration'
import { achievementIcon } from './achievementIcons'

function Toast({ toast, onDismiss }: { toast: AchievementToast; onDismiss: (key: number) => void }) {
  const a = achievements.find((x) => x.id === toast.id)
  useEffect(() => {
    const t = window.setTimeout(() => onDismiss(toast.key), 4800)
    return () => window.clearTimeout(t)
  }, [onDismiss, toast.key])
  if (!a) return null
  const Icon = achievementIcon[a.id]
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className="panel pointer-events-auto flex w-[min(92vw,360px)] items-center gap-3 p-3 pr-2"
    >
      <motion.span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sun text-[#5e3c04] shadow-[0_3px_0_#c58612]"
        initial={{ rotate: -25, scale: 0.6 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.1 }}
      >
        <Icon size={24} aria-hidden />
      </motion.span>
      <div className="min-w-0 flex-1">
        <p className="eyebrow text-sun-deep">Achievement unlocked</p>
        <p className="font-display text-[17px] leading-tight font-bold">{a.name}</p>
        <p className="text-[13px] leading-snug text-ink-soft">{a.description}</p>
      </div>
      <button type="button" onClick={() => onDismiss(toast.key)} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-ink-muted hover:bg-ink/5" aria-label="Dismiss notification">
        <X size={16} aria-hidden />
      </button>
    </motion.li>
  )
}

export function AchievementToasts({ toasts, onDismiss }: { toasts: AchievementToast[]; onDismiss: (key: number) => void }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex justify-center px-4 sm:top-auto sm:bottom-24">
      <ul className="flex flex-col items-center gap-2 max-sm:[&>li:not(:last-child)]:hidden">
        <AnimatePresence>
          {toasts.slice(-3).map((t) => (
            <Toast key={t.key} toast={t} onDismiss={onDismiss} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

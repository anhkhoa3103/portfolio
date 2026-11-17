import { useCallback, useEffect, useRef, useState } from 'react'
import {
  STORAGE_KEY,
  explorationReducer,
  newlyUnlocked,
  sanitizeExploration,
  type ExplorationAction,
  type ExplorationState,
} from '@/lib/exploration'
import { readJSON, writeJSON } from '@/lib/storage'
import type { AchievementId } from '@/types/content'

export interface AchievementToast {
  key: number
  id: AchievementId
}

export function useExploration() {
  const [state, setState] = useState<ExplorationState>(() => sanitizeExploration(readJSON(STORAGE_KEY)))
  const [toasts, setToasts] = useState<AchievementToast[]>([])
  const [celebrating, setCelebrating] = useState(false)
  const stateRef = useRef(state)
  const toastKey = useRef(0)

  useEffect(() => {
    writeJSON(STORAGE_KEY, state)
  }, [state])

  const dispatch = useCallback((action: ExplorationAction) => {
    const prev = stateRef.current
    const next = explorationReducer(prev, action)
    if (next === prev) return
    stateRef.current = next
    setState(next)
    const unlocked = newlyUnlocked(prev, next)
    if (unlocked.length > 0) {
      // Island Explorer is announced by the full-screen celebration instead of a toast.
      const toastIds = unlocked.filter((id) => id !== 'island-explorer')
      setToasts((t) => [...t, ...toastIds.map((id) => ({ key: ++toastKey.current, id }))])
      if (unlocked.includes('island-explorer')) setCelebrating(true)
    }
    if (action.type === 'reset') setToasts([])
  }, [])

  const dismissToast = useCallback((key: number) => setToasts((t) => t.filter((x) => x.key !== key)), [])
  const endCelebration = useCallback(() => setCelebrating(false), [])

  return { state, dispatch, toasts, dismissToast, celebrating, endCelebration }
}

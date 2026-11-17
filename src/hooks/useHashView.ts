import { useCallback, useEffect, useState } from 'react'

export type AppView = 'island' | 'quick'

const QUICK_HASH = '#quick-view'

function readView(): AppView {
  return window.location.hash === QUICK_HASH ? 'quick' : 'island'
}

/** Quick View lives at `#quick-view` so recruiters can link straight to it. */
export function useHashView() {
  const [view, setViewState] = useState<AppView>(readView)

  useEffect(() => {
    const onHash = () => setViewState(readView())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const setView = useCallback((next: AppView) => {
    if (next === 'quick') {
      if (window.location.hash !== QUICK_HASH) window.location.hash = QUICK_HASH
    } else if (window.location.hash) {
      history.pushState(null, '', window.location.pathname + window.location.search)
    }
    setViewState(next)
  }, [])

  return [view, setView] as const
}

import { useCallback, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Phones get compact labels and smaller HUD controls. */
export const useIsMobile = () => useMediaQuery('(max-width: 639px)')
/** Phones and portrait tablets get the tall island. */
export const useTallIsland = () => useMediaQuery('(max-width: 639px), (max-aspect-ratio: 4/5)')
/** Wide screens get the side rail layout. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1100px)')
/** True when the primary pointer can hover (mouse / trackpad). */
export const useCanHover = () => useMediaQuery('(hover: hover) and (pointer: fine)')

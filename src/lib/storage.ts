/** localStorage helpers that never throw (private mode, quota, SSR). */
export function readJSON(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key)
    return raw == null ? undefined : (JSON.parse(raw) as unknown)
  } catch {
    return undefined
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — progress simply won't persist */
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

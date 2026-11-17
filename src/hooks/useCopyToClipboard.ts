import { useCallback, useEffect, useRef, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'error'

async function writeText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  // Fallback for non-secure contexts (e.g. LAN preview over http).
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  if (!ok) throw new Error('copy failed')
}

export function useCopyToClipboard(resetMs = 2200) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      window.clearTimeout(timer.current)
      try {
        await writeText(text)
        setStatus('copied')
      } catch {
        setStatus('error')
      }
      timer.current = window.setTimeout(() => setStatus('idle'), resetMs)
    },
    [resetMs],
  )

  return { status, copy }
}

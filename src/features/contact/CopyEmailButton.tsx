import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

export function CopyEmailButton({ className = 'btn btn-ghost', showAddress = false }: { className?: string; showAddress?: boolean }) {
  const { status, copy } = useCopyToClipboard()
  const label = status === 'copied' ? 'Copied!' : status === 'error' ? 'Copy failed' : showAddress ? siteConfig.email : 'Copy email'
  return (
    <button type="button" className={`${className} relative`} onClick={() => void copy(siteConfig.email)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          className="inline-flex"
        >
          {status === 'copied' ? <Check size={18} aria-hidden /> : status === 'error' ? <X size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
        </motion.span>
      </AnimatePresence>
      <span className={showAddress && status === 'idle' ? 'break-all' : ''}>{label}</span>
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? 'Email address copied to clipboard' : status === 'error' ? 'Could not copy the email address' : ''}
      </span>
    </button>
  )
}

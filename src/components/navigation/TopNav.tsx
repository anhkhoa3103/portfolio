import { AnimatePresence, motion } from 'framer-motion'
import { LayoutList, Map as MapIcon, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import type { AppView } from '@/hooks/useHashView'

export type NavTarget = 'explore' | 'about' | 'projects' | 'experience' | 'skills' | 'contact'

const items: { id: NavTarget; label: string }[] = [
  { id: 'explore', label: 'Explore' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

interface TopNavProps {
  view: AppView
  active: NavTarget | null
  onNavigate: (target: NavTarget) => void
  onToggleView: () => void
}

export function TopNav({ view, active, onNavigate, onToggleView }: TopNavProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const go = (t: NavTarget) => {
    setOpen(false)
    onNavigate(t)
  }

  const quick = view === 'quick'

  return (
    <header className={`z-[45] ${quick ? 'sticky top-0 bg-ocean-800 shadow-[0_4px_0_rgb(5_43_69/0.25)]' : 'relative'}`}>
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6" ref={menuRef}>
        <Logo onClick={() => go('explore')} />

        <nav aria-label="Main" className="max-lg:hidden">
          <ul className="flex items-center gap-1 rounded-2xl bg-ocean-950/35 p-1.5 ring-1 ring-white/10 backdrop-blur-sm">
            {items.map((it) => {
              const isActive = active === it.id
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    onClick={() => go(it.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-xl px-3.5 py-2 font-display text-[15px] font-semibold tracking-wide transition-colors ${
                      isActive ? 'text-ink' : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span layoutId="nav-active" className="absolute inset-0 rounded-xl bg-sun" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />
                    )}
                    <span className="relative">{it.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onToggleView} className="btn btn-primary px-3 whitespace-nowrap sm:px-4">
            {quick ? <MapIcon size={18} aria-hidden className="max-[360px]:hidden" /> : <LayoutList size={18} aria-hidden className="max-[360px]:hidden" />}
            <span>{quick ? 'Island View' : 'Quick View'}</span>
          </button>
          <button
            type="button"
            className="btn btn-ghost w-11 px-0 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Main"
              className="panel absolute top-full right-4 left-4 mt-1 p-2 sm:left-auto sm:w-72 lg:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 34 }}
            >
              <ul className="grid gap-1">
                {items.map((it) => (
                  <li key={it.id}>
                    <button
                      type="button"
                      onClick={() => go(it.id)}
                      aria-current={active === it.id ? 'page' : undefined}
                      className={`flex min-h-12 w-full items-center rounded-xl px-4 text-left font-display text-[17px] font-semibold ${
                        active === it.id ? 'bg-sun text-ink' : 'text-ink hover:bg-cream'
                      }`}
                    >
                      {it.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

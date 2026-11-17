import { Briefcase, Code2, ExternalLink, Mail } from 'lucide-react'
import { getSocialLinks, siteConfig, type SocialLink } from '@/config/site'

const socialIcon = (label: SocialLink['label']) => (label === 'GitHub' ? <Code2 size={18} aria-hidden /> : <Briefcase size={18} aria-hidden />)

/** Renders only social links that have real URLs configured in src/config/site.ts. */
export function SocialLinks({ variant = 'ghost' }: { variant?: 'ghost' | 'ocean' }) {
  const links = getSocialLinks()
  if (links.length === 0) return null
  return (
    <>
      {links.map((l) => (
        <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className={`btn ${variant === 'ocean' ? 'btn-ocean' : 'btn-ghost'}`}>
          {socialIcon(l.label)}
          {l.label}
          <ExternalLink size={14} aria-hidden className="opacity-60" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </>
  )
}

export function EmailLink({ className = 'btn btn-ocean' }: { className?: string }) {
  return (
    <a href={`mailto:${siteConfig.email}`} className={className}>
      <Mail size={18} aria-hidden />
      Email me
    </a>
  )
}

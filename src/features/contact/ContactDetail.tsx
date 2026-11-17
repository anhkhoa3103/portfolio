import { Mail } from 'lucide-react'
import { EmailLink, SocialLinks } from '@/components/ui/LinkButtons'
import { getSocialLinks, siteConfig } from '@/config/site'
import { CopyEmailButton } from './CopyEmailButton'

export function ContactDetail() {
  const hasSocial = getSocialLinks().length > 0
  return (
    <article className="space-y-6">
      <p className="text-[15.5px] leading-relaxed text-ink-soft">
        I'm open to internship opportunities and always happy to talk about building interesting products. The fastest way to
        reach me is email.
      </p>

      <div className="rounded-2xl bg-ocean-100 p-5">
        <p className="eyebrow text-ocean-700">Email</p>
        <p className="mt-1 flex items-center gap-2 font-display text-[20px] font-bold break-all text-ink sm:text-[22px]">
          <Mail size={20} aria-hidden className="shrink-0 text-ocean-700" />
          {siteConfig.email}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <EmailLink />
          <CopyEmailButton />
        </div>
      </div>

      {hasSocial && (
        <div>
          <p className="eyebrow mb-2 text-ink-muted">Elsewhere</p>
          <div className="flex flex-wrap gap-2">
            <SocialLinks />
          </div>
        </div>
      )}
    </article>
  )
}

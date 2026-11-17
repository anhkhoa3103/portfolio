import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Map as MapIcon, MapPin } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { LocationIllustration } from '@/components/hex-tile/TileArt'
import { Tag } from '@/components/ui/Tag'
import { EmailLink, SocialLinks } from '@/components/ui/LinkButtons'
import { LogoMark } from '@/components/ui/Logo'
import { siteConfig } from '@/config/site'
import { education, experience } from '@/data/experience'
import { locationsById } from '@/data/locations'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { CopyEmailButton } from '@/features/contact/CopyEmailButton'
import { Timeline } from '@/features/experience/ExperienceDetail'
import { SkillGroups } from '@/features/skills/SkillsDetail'
import { locationPalettes, zoneColors } from '@/lib/palette'
import type { ProjectId } from '@/types/content'

export type QuickSection = 'top' | 'about' | 'projects' | 'experience' | 'skills' | 'education' | 'contact'

function Section({ id, title, kicker, children }: { id: QuickSection; title: string; kicker: string; children: ReactNode }) {
  return (
    <section id={`qv-${id}`} aria-labelledby={`qv-${id}-title`} className="scroll-mt-24 border-t border-ink/8 py-12 sm:py-14">
      <p className="eyebrow text-ocean-600">{kicker}</p>
      <h2 id={`qv-${id}-title`} className="mt-1 mb-6 font-display text-[30px] leading-tight font-bold sm:text-[34px]">
        {title}
      </h2>
      {children}
    </section>
  )
}

interface QuickViewProps {
  scrollTarget: { section: QuickSection; nonce: number } | null
  onOpenProject: (id: ProjectId) => void
  onBackToIsland: () => void
}

export function QuickView({ scrollTarget, onOpenProject, onBackToIsland }: QuickViewProps) {
  useEffect(() => {
    if (!scrollTarget) return
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    if (scrollTarget.section === 'top') {
      window.scrollTo({ top: 0 })
      return
    }
    document.getElementById(`qv-${scrollTarget.section}`)?.scrollIntoView({ behavior, block: 'start' })
  }, [scrollTarget])

  return (
    <motion.main
      id="qv-main"
      className="relative z-10 min-h-[calc(100dvh-64px)] bg-paper"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    >
      <div className="mx-auto max-w-[980px] px-4 sm:px-8">
        {/* Hero */}
        <header className="grid gap-8 py-12 sm:py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="chip bg-mint/15 text-mint-deep">
              <span className="h-2 w-2 rounded-full bg-mint" /> Open to internship opportunities
            </p>
            <h1 className="mt-4 font-display text-[40px] leading-[1.02] font-bold sm:text-[56px]">{siteConfig.ownerName}</h1>
            <p className="mt-2 text-[18px] font-semibold text-ocean-700 sm:text-[20px]">{siteConfig.role}</p>
            <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">{profile.intro}</p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[14px] font-semibold text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={16} aria-hidden /> FPT University, 2024 – 2027 (expected)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} aria-hidden /> {siteConfig.location}
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <EmailLink />
              <CopyEmailButton />
              <SocialLinks />
            </div>
          </div>
          <button
            type="button"
            onClick={onBackToIsland}
            className="group panel relative hidden w-[230px] overflow-hidden bg-ocean-700 p-4 text-left text-white md:block"
          >
            <div className="flex justify-center py-3">
              <LogoMark className="h-20 w-20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
            </div>
            <p className="font-display text-[18px] font-bold">Prefer to explore?</p>
            <p className="mt-0.5 text-[13.5px] text-white/80">The same portfolio, as an island you can wander.</p>
            <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-sun">
              <MapIcon size={16} aria-hidden /> Back to the island
            </span>
          </button>
        </header>

        <Section id="about" title="About" kicker="Who I am">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
            <div className="space-y-3 text-[16px] leading-relaxed text-ink-soft">
              <p>{profile.studies}</p>
              <p>{profile.philosophy}</p>
            </div>
            <ul className="flex flex-wrap content-start gap-2" aria-label="Interests">
              {profile.interests.map((i) => (
                <li key={i}>
                  <Tag>{i}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="projects" title="Featured projects" kicker="What I've built">
          <ul className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => {
              const loc = locationsById[p.id]
              const zone = zoneColors[loc.zone]
              const pal = locationPalettes[p.id]
              const headline = p.results[0]
              return (
                <li key={p.id} className="flex flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-ink/8">
                  <div className="flex items-center gap-3 px-5 pt-5">
                    <span className="grid h-14 w-16 shrink-0 place-items-center rounded-xl" style={{ background: `linear-gradient(160deg, ${pal.top[0]}, ${pal.top[1]})` }}>
                      <LocationIllustration id={p.id} className="h-12 w-14" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-bold" style={{ color: zone.deep }}>
                        {p.category}
                      </p>
                      <h3 className="font-display text-[21px] leading-tight font-bold">{p.name}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pt-3 pb-5">
                    <p className="text-[14.5px] leading-relaxed text-ink-soft">{p.overview}</p>
                    {headline && (
                      <p className="mt-3 rounded-xl px-3 py-2 text-[14px] font-bold" style={{ background: zone.soft, color: zone.ink }}>
                        {headline.value} — {headline.label}
                      </p>
                    )}
                    <p className="mt-3 flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <Tag key={t} tone="ocean">
                          {t}
                        </Tag>
                      ))}
                    </p>
                    <div className="mt-auto pt-4">
                      <button type="button" onClick={() => onOpenProject(p.id)} className="btn btn-ghost">
                        Read case study <ArrowRight size={16} aria-hidden />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Section>

        <Section id="experience" title="Experience" kicker="Where I've worked">
          <Timeline items={experience} animate={false} />
        </Section>

        <Section id="skills" title="Technical skills" kicker="My toolbox">
          <SkillGroups animate={false} />
        </Section>

        <Section id="education" title="Education" kicker="Where I study">
          <Timeline items={[education]} animate={false} />
        </Section>

        <Section id="contact" title="Let's talk" kicker="Contact">
          <div className="rounded-[22px] bg-ocean-700 p-6 text-white sm:p-8">
            <p className="max-w-[52ch] text-[16px] leading-relaxed text-white/85">
              The fastest way to reach me is email — I'm happy to chat about internships, projects, or anything you saw on the island.
            </p>
            <p className="mt-3 font-display text-[22px] font-bold break-all sm:text-[26px]">{siteConfig.email}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <EmailLink className="btn btn-primary" />
              <CopyEmailButton />
              <SocialLinks />
            </div>
          </div>
        </Section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/8 py-8 text-[13.5px] text-ink-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.ownerName} · {siteConfig.brand}
          </p>
          <button type="button" onClick={onBackToIsland} className="inline-flex items-center gap-1.5 font-semibold text-ocean-700 hover:underline">
            <MapIcon size={15} aria-hidden /> Explore the island version
          </button>
        </footer>
      </div>
    </motion.main>
  )
}

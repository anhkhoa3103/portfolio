import { Blocks, Cpu, ExternalLink, Lightbulb, Sparkles, Trophy, UserRound } from 'lucide-react'
import { SectionTitle } from '@/components/panels/DetailDrawer'
import { Tag } from '@/components/ui/Tag'
import { isRealUrl } from '@/config/site'
import { locationsById } from '@/data/locations'
import { zoneColors } from '@/lib/palette'
import type { Project } from '@/types/content'
import { ArchitectureDiagram } from './ArchitectureDiagram'

export function ProjectDetail({ project }: { project: Project }) {
  const zone = zoneColors[locationsById[project.id].zone]
  const links = [
    { label: 'View code', url: project.repoUrl },
    { label: 'Live demo', url: project.demoUrl },
  ].filter((l): l is { label: string; url: string } => isRealUrl(l.url))

  return (
    <article className="space-y-8">
      <section>
        <p className="font-display text-[19px] leading-snug font-semibold text-ink">{project.tagline}</p>
        <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">{project.overview}</p>
        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.map((t) => (
            <Tag key={t} tone="ocean">
              {t}
            </Tag>
          ))}
        </div>
        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-ocean">
                {l.label} <ExternalLink size={16} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {project.results.length > 0 && (
        <section aria-labelledby={`${project.id}-results`}>
          <SectionTitle icon={<Trophy size={16} aria-hidden />}>
            <span id={`${project.id}-results`}>Results</span>
          </SectionTitle>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.results.map((r) => (
              <li key={r.label} className="rounded-2xl p-4" style={{ background: zone.soft }}>
                <p className="font-display text-[28px] leading-none font-bold" style={{ color: zone.ink }}>
                  {r.value}
                </p>
                <p className="mt-1.5 text-[14px] font-semibold text-ink">{r.label}</p>
                {r.note && <p className="mt-0.5 text-[13px] text-ink-soft">{r.note}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <SectionTitle icon={<Lightbulb size={16} aria-hidden />}>Problem & motivation</SectionTitle>
        <p className="text-[15.5px] leading-relaxed text-ink-soft">{project.problem}</p>
      </section>

      <section>
        <SectionTitle icon={<UserRound size={16} aria-hidden />}>My contribution</SectionTitle>
        <ul className="space-y-2">
          {project.contribution.map((c) => (
            <li key={c} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
              <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rotate-45 rounded-[3px]" style={{ background: zone.base }} aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle icon={<Blocks size={16} aria-hidden />}>Technical architecture</SectionTitle>
        <ArchitectureDiagram architecture={project.architecture} accent={zone.deep} />
      </section>

      <section>
        <SectionTitle icon={<Cpu size={16} aria-hidden />}>Implementation highlights</SectionTitle>
        <ul className="grid gap-3 sm:grid-cols-2">
          {project.implementation.map((it) => (
            <li key={it.title} className="rounded-2xl bg-white p-4 ring-1 ring-ink/8">
              <p className="flex items-center gap-2 font-display text-[16px] font-bold">
                <Sparkles size={15} aria-hidden style={{ color: zone.deep }} />
                {it.title}
              </p>
              <p className="mt-1 text-[14px] leading-snug text-ink-soft">{it.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {links.length === 0 && (
        <p className="rounded-xl bg-cream px-4 py-3 text-[13.5px] text-ink-muted">
          Code and demo links will appear here once they are published.
        </p>
      )}
    </article>
  )
}

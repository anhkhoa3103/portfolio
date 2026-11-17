import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Presentation } from 'lucide-react'
import { education, experience } from '@/data/experience'
import type { ExperienceItem } from '@/types/content'

const typeStyle: Record<ExperienceItem['type'], { icon: typeof Briefcase; color: string; label: string }> = {
  work: { icon: Briefcase, color: '#5c8ff0', label: 'Work' },
  teaching: { icon: Presentation, color: '#2fc49a', label: 'Teaching' },
  education: { icon: GraduationCap, color: '#ffc547', label: 'Education' },
}

export function Timeline({ items, animate = true }: { items: ExperienceItem[]; animate?: boolean }) {
  return (
    <div className="relative">
      <span className="absolute top-3 bottom-3 left-[19px] w-1 rounded-full bg-[repeating-linear-gradient(to_bottom,#c9d6de_0_8px,transparent_8px_14px)]" aria-hidden />
      <ol className="relative space-y-4 pl-12">
      {items.map((item, i) => {
        const s = typeStyle[item.type]
        const Icon = s.icon
        return (
          <motion.li
            key={item.id}
            className="relative"
            initial={animate ? { opacity: 0, x: 12 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <span
              className="absolute top-3 -left-12 grid h-10 w-10 place-items-center text-ink [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]"
              style={{ background: s.color }}
              aria-hidden
            >
              <Icon size={18} />
            </span>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-ink/8 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h4 className="font-display text-[18px] leading-tight font-bold">{item.organization}</h4>
                <p className="text-[13px] font-bold text-ink-muted">{item.period}</p>
              </div>
              <p className="mt-0.5 text-[14.5px] font-semibold text-ocean-700">
                {item.role} <span className="sr-only">({s.label})</span>
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2 text-[14.5px] leading-relaxed text-ink-soft">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-muted" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        )
      })}
      </ol>
    </div>
  )
}

export function ExperienceDetail() {
  return (
    <article className="space-y-6">
      <p className="text-[15.5px] leading-relaxed text-ink-soft">
        Every voyage that shaped how I work — from automation projects with international stakeholders to supporting bilingual
        classrooms.
      </p>
      <Timeline items={[...experience, education]} />
    </article>
  )
}

import { motion } from 'framer-motion'
import { BrainCircuit, Code2, Database, LayoutTemplate, Server } from 'lucide-react'
import { skillGroups } from '@/data/skills'

const skillGroupStyle: Record<string, { icon: typeof Code2; color: string; soft: string }> = {
  programming: { icon: Code2, color: '#ff8a6b', soft: '#ffe3d9' },
  backend: { icon: Server, color: '#5c8ff0', soft: '#dfe8fd' },
  frontend: { icon: LayoutTemplate, color: '#ffc547', soft: '#fff1cc' },
  database: { icon: Database, color: '#7fd3ee', soft: '#dff5fb' },
  'ai-engineering': { icon: BrainCircuit, color: '#2fc49a', soft: '#d3f5e9' },
}

export function SkillGroups({ animate = true }: { animate?: boolean }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {skillGroups.map((g, i) => {
        const st = skillGroupStyle[g.id] ?? skillGroupStyle.programming!
        const Icon = st.icon
        return (
          <motion.li
            key={g.id}
            className={`rounded-2xl p-4 ${g.id === 'ai-engineering' ? 'sm:col-span-2' : ''}`}
            style={{ background: st.soft }}
            initial={animate ? { opacity: 0, y: 12 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-ink shadow-[0_2px_0_rgb(5_43_69/0.1)]">
                <Icon size={18} aria-hidden style={{ color: st.color }} />
              </span>
              <div>
                <h4 className="font-display text-[17px] leading-tight font-bold">{g.name}</h4>
                <p className="text-[12.5px] font-semibold text-ink-muted">{g.caption}</p>
              </div>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${g.name} skills`}>
              {g.skills.map((s) => (
                <li key={s} className="rounded-xl bg-white px-3 py-1.5 text-[14px] font-semibold text-ink shadow-[0_2px_0_rgb(5_43_69/0.08)]">
                  {s}
                </li>
              ))}
            </ul>
          </motion.li>
        )
      })}
    </ul>
  )
}

export function SkillsDetail() {
  return (
    <article className="space-y-5">
      <p className="text-[15.5px] leading-relaxed text-ink-soft">
        The tools I reach for, grouped by where they sit in a product. No made-up percentages — just what I use to build.
      </p>
      <SkillGroups />
    </article>
  )
}

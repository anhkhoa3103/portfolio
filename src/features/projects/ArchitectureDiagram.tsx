import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Fragment } from 'react'
import type { Project } from '@/types/content'

/** Flow of hex-numbered stages plus the foundations they rest on. */
export function ArchitectureDiagram({ architecture, accent }: { architecture: Project['architecture']; accent: string }) {
  const { flow, foundations, caption } = architecture
  return (
    <figure className="rounded-2xl bg-cream p-4 ring-1 ring-[#eadfc6] sm:p-5">
      <figcaption className="mb-3 text-[13px] font-semibold text-ink-muted">{caption}</figcaption>
      <ol className="flex flex-col items-stretch gap-1.5 md:flex-row md:items-stretch">
        {flow.map((node, i) => (
          <Fragment key={node.title}>
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex-1 rounded-xl bg-paper p-3 shadow-[0_3px_0_rgb(5_43_69/0.08)] ring-1 ring-ink/6"
            >
              <span
                className="mb-1.5 grid h-7 w-7 place-items-center font-display text-[13px] font-bold text-white [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]"
                style={{ background: accent }}
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="font-display text-[15px] leading-tight font-bold">{node.title}</p>
              <p className="mt-1 text-[13px] leading-snug text-ink-soft">{node.detail}</p>
              {node.tech && (
                <p className="mt-2 flex flex-wrap gap-1">
                  {node.tech.map((t) => (
                    <span key={t} className="rounded-md bg-ocean-100 px-1.5 py-0.5 text-[11px] font-bold text-ocean-800">
                      {t}
                    </span>
                  ))}
                </p>
              )}
            </motion.li>
            {i < flow.length - 1 && (
              <li aria-hidden className="grid place-items-center text-ink-muted">
                <ArrowRight size={18} className="max-md:hidden" />
                <ArrowDown size={18} className="md:hidden" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      {foundations && foundations.length > 0 && (
        <div className="mt-3 rounded-xl border-2 border-dashed border-[#e2d3b0] p-3">
          <p className="eyebrow mb-2 text-ink-muted">Foundations</p>
          <ul className="grid gap-2 sm:grid-cols-3">
            {foundations.map((f) => (
              <li key={f.title} className="rounded-lg bg-white/70 px-3 py-2">
                <p className="text-[14px] font-bold">{f.title}</p>
                <p className="text-[12.5px] leading-snug text-ink-soft">{f.detail}</p>
                {f.tech && <p className="mt-1 text-[11.5px] font-bold text-ocean-700">{f.tech.join(' · ')}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  )
}

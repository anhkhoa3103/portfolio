import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { LocationIllustration } from '@/components/hex-tile/TileArt'
import { locationsById } from '@/data/locations'
import { projects } from '@/data/projects'
import { locationPalettes } from '@/lib/palette'
import type { ProjectId } from '@/types/content'

export function ProjectsOverview({ opened, onOpen }: { opened: ProjectId[]; onOpen: (id: ProjectId) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-[15.5px] leading-relaxed text-ink-soft">
        Four projects live on the island — one in the Creation Zone and three along the Intelligence ridge. Open each dossier to
        read the problem, my contribution and the architecture.
      </p>
      <ul className="grid gap-3">
        {projects.map((p) => {
          const pal = locationPalettes[p.id]
          const seen = opened.includes(p.id)
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onOpen(p.id)}
                className="group flex w-full items-center gap-4 rounded-2xl bg-white p-3 text-left ring-1 ring-ink/8 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_6px_0_rgb(5_43_69/0.08)]"
              >
                <span className="grid h-20 w-24 shrink-0 place-items-center rounded-xl" style={{ background: `linear-gradient(160deg, ${pal.top[0]}, ${pal.top[1]})` }}>
                  <LocationIllustration id={p.id} className="h-16 w-20" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block text-ink-muted">{locationsById[p.id].placeName}</span>
                  <span className="block font-display text-[18px] leading-tight font-bold">{p.name}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-soft">{p.tagline}</span>
                  {seen && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[12px] font-bold text-mint-deep">
                      <CheckCircle2 size={13} aria-hidden /> Dossier opened
                    </span>
                  )}
                </span>
                <ArrowRight size={20} className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-1" aria-hidden />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

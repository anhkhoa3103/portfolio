import { GraduationCap, Heart, MapPin, Sparkles } from 'lucide-react'
import { SectionTitle } from '@/components/panels/DetailDrawer'
import { siteConfig } from '@/config/site'
import { profile } from '@/data/profile'

export function AboutDetail() {
  return (
    <article className="space-y-8">
      <section>
        <p className="font-display text-[22px] leading-snug font-semibold">
          Hi, I'm {siteConfig.ownerName}. {profile.headline}
        </p>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{profile.intro}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-[13.5px] font-semibold text-ink-soft">
          <li className="chip bg-cream">
            <GraduationCap size={15} aria-hidden /> FPT University · Software Engineering
          </li>
          <li className="chip bg-cream">
            <MapPin size={15} aria-hidden /> {siteConfig.location}
          </li>
        </ul>
      </section>

      <section>
        <SectionTitle icon={<Heart size={16} aria-hidden />}>What I'm into</SectionTitle>
        <ul className="grid gap-2 sm:grid-cols-2">
          {profile.interests.map((i, idx) => (
            <li key={i} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-ink/8">
              <span
                className="h-6 w-6 shrink-0 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]"
                style={{ background: ['#ffc547', '#2fc49a', '#5c8ff0', '#ff8a6b', '#7fd3ee'][idx % 5] }}
                aria-hidden
              />
              <span className="text-[15px] font-semibold">{i}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-sun/25 p-5">
        <p className="flex items-start gap-3 font-display text-[18px] leading-snug font-semibold text-[#5e3c04]">
          <Sparkles className="mt-1 shrink-0" size={20} aria-hidden />
          {profile.philosophy}
        </p>
      </section>
    </article>
  )
}

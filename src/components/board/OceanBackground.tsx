import { memo } from 'react'

const WAVE_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='120' viewBox='0 0 240 120'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2.2' stroke-linecap='round'%3E%3Cpath d='M14 30 q14 -10 28 0 t28 0' opacity='0.22'/%3E%3Cpath d='M140 86 q12 -9 24 0 t24 0' opacity='0.16'/%3E%3Cpath d='M96 52 q8 -6 16 0' opacity='0.18'/%3E%3C/g%3E%3C/svg%3E\")"

const sparkles = [
  { left: '12%', top: '22%', delay: '0s' },
  { left: '84%', top: '18%', delay: '1.6s' },
  { left: '70%', top: '78%', delay: '3.1s' },
  { left: '22%', top: '72%', delay: '2.2s' },
  { left: '50%', top: '9%', delay: '4s' },
  { left: '92%', top: '56%', delay: '0.8s' },
]

const bubbles = [
  { left: '8%', delay: '0s', size: 10 },
  { left: '31%', delay: '5s', size: 7 },
  { left: '63%', delay: '9s', size: 9 },
  { left: '88%', delay: '3s', size: 6 },
]

/** Fixed, GPU-friendly ocean: gradient + drifting wave textures + a few sparkles. */
export const OceanBackground = memo(function OceanBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 55% 52%, #2fb3e0 0%, #1a8fc9 38%, #0e679e 70%, #0a4f7d 100%)',
        }}
      />
      <div className="anim-wave absolute -inset-y-0 left-0 w-[calc(100%+240px)] opacity-90" style={{ backgroundImage: WAVE_TILE }} />
      <div
        className="anim-wave-rev absolute top-[60px] left-0 h-full w-[calc(100%+240px)] opacity-60"
        style={{ backgroundImage: WAVE_TILE, backgroundSize: '320px 160px' }}
      />

      {/* distant islands */}
      <svg className="absolute bottom-[6%] left-[3%] w-40 opacity-35 max-sm:hidden" viewBox="0 0 160 40">
        <path d="M0 40 Q30 6 64 16 Q90 0 120 18 Q142 26 160 40 Z" fill="#0a4f7d" />
      </svg>
      <svg className="absolute top-[14%] right-[4%] w-28 opacity-30 max-sm:hidden" viewBox="0 0 120 30">
        <path d="M0 30 Q24 4 54 12 Q80 2 120 30 Z" fill="#0a4f7d" />
      </svg>

      {/* clouds */}
      <svg className="anim-cloud absolute top-[9%] left-0 w-48 opacity-70" style={{ animationDuration: '140s', animationDelay: '-50s' }} viewBox="0 0 200 70">
        <path d="M30 60 a22 22 0 0 1 4 -43 a30 30 0 0 1 56 -6 a26 26 0 0 1 48 10 a22 22 0 0 1 32 39 Z" fill="#ffffff" opacity="0.55" />
      </svg>
      <svg className="anim-cloud absolute top-[74%] left-0 w-36 opacity-60" style={{ animationDuration: '180s', animationDelay: '-120s' }} viewBox="0 0 200 70">
        <path d="M30 60 a22 22 0 0 1 4 -43 a30 30 0 0 1 56 -6 a26 26 0 0 1 48 10 a22 22 0 0 1 32 39 Z" fill="#ffffff" opacity="0.5" />
      </svg>

      {sparkles.map((s, i) => (
        <span
          key={i}
          className="anim-twinkle absolute h-1.5 w-1.5 rounded-full bg-white"
          style={{ left: s.left, top: s.top, animationDelay: s.delay }}
        />
      ))}
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="anim-bubble absolute bottom-[-20px] rounded-full border-2 border-white/60"
          style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay }}
        />
      ))}
    </div>
  )
})

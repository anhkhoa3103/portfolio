import type { TerrainKind } from '@/data/islandLayout'
import type { LocationId } from '@/types/content'

/*
 * Hand-built SVG illustrations for every island location and terrain.
 * All art is drawn around (0, 0) in tile space: roughly x ∈ [-50, 50],
 * y ∈ [-70, 18], leaving room for the name plate under it.
 */

const Shadow = ({ rx = 36, cy = 16 }: { rx?: number; cy?: number }) => (
  <ellipse cx={0} cy={cy} rx={rx} ry={rx * 0.2} fill="#0b2a3c" opacity={0.16} />
)

function gearPath(cx: number, cy: number, outer: number, inner: number, teeth: number): string {
  const pts: string[] = []
  const step = (Math.PI * 2) / teeth
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const corners = [
      [inner, a - step * 0.32],
      [outer, a - step * 0.18],
      [outer, a + step * 0.18],
      [inner, a + step * 0.32],
    ] as const
    for (const [rad, ang] of corners) {
      pts.push(`${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`)
    }
  }
  return `M${pts.join(' L')} Z`
}

function MysteryDoor() {
  return (
    <g>
      <Shadow rx={34} />
      <path d="M12 14 L46 22 L36 8 Z" fill="#fff4b8" opacity={0.75} />
      <path d="M-24 15 V-28 a24 24 0 0 1 48 0 V15 Z" fill="#6e2513" />
      <path d="M-17 15 V-26 a17 17 0 0 1 34 0 V15 Z" fill="#b04f36" />
      <path d="M9 15 V-41 a17 17 0 0 1 8 15 V15 Z" fill="#ffe27a" />
      <rect x={-12} y={-20} width={17} height={13} rx={2.5} fill="#8f3b27" />
      <rect x={-12} y={-3} width={17} height={13} rx={2.5} fill="#8f3b27" />
      <rect x={-12} y={-37} width={20} height={11} rx={3} fill="#fffdf8" />
      <text x={-2} y={-28.6} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="#6e2513" fontFamily="Fredoka, sans-serif">
        312
      </text>
      <circle cx={5.5} cy={-1} r={2.4} fill="#ffc547" />
      <g className="anim-bob">
        <circle cx={36} cy={-38} r={13} fill="#fffdf8" />
        <text x={36} y={-32} textAnchor="middle" fontSize={19} fontWeight={700} fill="#d4573d" fontFamily="Fredoka, sans-serif">
          ?
        </text>
      </g>
    </g>
  )
}

function EssayGrove() {
  return (
    <g>
      <Shadow rx={42} />
      <path d="M0 -4 C-15 -13 -32 -13 -45 -6 L-45 16 C-32 9 -15 9 0 18 C15 9 32 9 45 16 L45 -6 C32 -13 15 -13 0 -4 Z" fill="#0f6b50" />
      <path d="M0 -8 C-14 -16 -30 -16 -42 -10 L-42 11 C-30 5 -14 5 0 13 Z" fill="#fffdf8" />
      <path d="M0 -8 C14 -16 30 -16 42 -10 L42 11 C30 5 14 5 0 13 Z" fill="#effaf5" />
      <g stroke="#9ccbb9" strokeWidth={2} strokeLinecap="round" fill="none">
        <path d="M-34 -5 C-26 -8 -16 -8 -8 -4" />
        <path d="M-34 1 C-26 -2 -16 -2 -8 2" />
        <path d="M-34 7 C-28 4 -22 4 -16 6" />
        <path d="M8 -4 C16 -8 26 -8 34 -5" />
        <path d="M8 2 C16 -2 26 -2 34 1" />
      </g>
      <path d="M0 -8 V13" stroke="#c7e6da" strokeWidth={1.5} />
      <g transform="translate(14 -38) rotate(38)">
        <rect x={-4} y={-22} width={8} height={36} rx={2} fill="#ffc547" />
        <rect x={-4} y={-26} width={8} height={6} rx={2} fill="#ff8a6b" />
        <path d="M-4 14 L0 22 L4 14 Z" fill="#f6dfa4" />
        <path d="M-1.4 19 L0 22 L1.4 19 Z" fill="#12324a" />
      </g>
      <g className="anim-bob">
        <circle cx={-28} cy={-34} r={12} fill="#ffc547" stroke="#fffdf8" strokeWidth={3} />
        <path d="M-33 -34 L-29.5 -30.5 L-23 -38" stroke="#5e3c04" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  )
}

function ChronicleCliffs() {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    const r = i % 2 === 0 ? 11 : 5
    return `${(r * Math.cos(a)).toFixed(1)},${(-24 + r * Math.sin(a) * 0.85).toFixed(1)}`
  }).join(' ')
  return (
    <g>
      <Shadow rx={40} />
      <ellipse cx={0} cy={-24} rx={32} ry={27} fill="#b5763a" />
      <ellipse cx={0} cy={-24} rx={26} ry={22} fill="none" stroke="#e8b16b" strokeWidth={2} />
      <ellipse cx={0} cy={-24} rx={19} ry={16} fill="none" stroke="#e8b16b" strokeWidth={1.5} strokeDasharray="3 3" />
      <polygon points={rays} fill="#ffe28a" />
      <g>
        <rect x={-38} y={-2} width={76} height={20} rx={3} fill="#fbeec6" />
        <ellipse cx={-38} cy={8} rx={6} ry={11} fill="#e0b96a" />
        <ellipse cx={38} cy={8} rx={6} ry={11} fill="#e0b96a" />
        <ellipse cx={38} cy={8} rx={2.5} ry={5} fill="#b5763a" />
        <g stroke="#c49a52" strokeWidth={1.8} strokeLinecap="round">
          <path d="M-28 4 H6" />
          <path d="M-28 10 H18" />
          <path d="M14 4 H28" />
        </g>
      </g>
      <g className="anim-bob">
        <g stroke="#fffdf8" strokeWidth={2.2}>
          <path d="M-34 -50 L-6 -60 L26 -54" fill="none" />
        </g>
        <circle cx={-34} cy={-50} r={5} fill="#fffdf8" />
        <circle cx={-6} cy={-60} r={6} fill="#ff8a6b" stroke="#fffdf8" strokeWidth={2} />
        <circle cx={26} cy={-54} r={5} fill="#fffdf8" />
      </g>
    </g>
  )
}

function EchoAmphitheatre() {
  return (
    <g>
      <Shadow rx={40} />
      <path d="M-30 16 Q0 4 30 16" stroke="#1d6b36" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-13 15 L-10 -6 L10 -6 L13 15 Z" fill="#2b8545" />
      <rect x={-14} y={-10} width={28} height={6} rx={2} fill="#1d6b36" />
      <circle cx={0} cy={4} r={4} fill="#ffc547" />
      <g>
        <rect x={-50} y={-54} width={42} height={28} rx={11} fill="#fffdf8" />
        <path d="M-22 -27 L-14 -18 L-14 -28 Z" fill="#fffdf8" />
        <circle cx={-38} cy={-40} r={3} fill="#4cc46d" />
        <circle cx={-29} cy={-40} r={3} fill="#4cc46d" />
        <circle cx={-20} cy={-40} r={3} fill="#4cc46d" />
      </g>
      <g className="anim-bob">
        <rect x={8} y={-44} width={42} height={28} rx={11} fill="#ffc547" />
        <path d="M22 -17 L14 -8 L14 -18 Z" fill="#ffc547" />
        <path d="M19 -31 L25 -25 L38 -37" stroke="#5e3c04" strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  )
}

function BasecampSummit() {
  return (
    <g>
      <Shadow rx={46} />
      <circle cx={26} cy={-34} r={15} fill="#fff6c9" />
      <path d="M-48 16 Q-30 -16 -8 -36 Q2 -44 12 -34 Q32 -14 48 16 Z" fill="#6cbf5e" />
      <path d="M-8 -36 Q2 -44 12 -34 Q8 -30 4 -33 Q0 -28 -4 -32 Z" fill="#fffdf8" />
      <path d="M-48 16 Q-30 -16 -8 -36 Q-16 -10 -22 16 Z" fill="#4fa64a" />
      <path d="M-24 16 L-8 -10 L8 16 Z" fill="#ff8a6b" />
      <path d="M-8 -10 L8 16 L-1 16 Z" fill="#d4573d" />
      <path d="M-12 16 L-8 6 L-4 16 Z" fill="#6e2513" />
      <path d="M2 -40 V-74" stroke="#5e3c04" strokeWidth={3} strokeLinecap="round" />
      <g className="anim-bob">
        <path d="M3.5 -74 L30 -66 L3.5 -57 Z" fill="#ff8a6b" />
        <text x={13} y={-62} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fffdf8" fontFamily="Fredoka, sans-serif">
          K
        </text>
      </g>
    </g>
  )
}

function VoyagerHarbour() {
  return (
    <g>
      <Shadow rx={42} />
      <path d="M-20 -40 L-52 -54 L-52 -30 Z" fill="#fff4b8" opacity={0.6} />
      <path d="M6 -40 L40 -56 L40 -30 Z" fill="#fff4b8" opacity={0.6} />
      <ellipse cx={-7} cy={12} rx={24} ry={8} fill="#8b97a0" />
      <ellipse cx={-14} cy={10} rx={12} ry={6} fill="#a8b3ba" />
      <path d="M-17 10 L-13 -34 L-1 -34 L3 10 Z" fill="#fffdf8" />
      <path d="M-16 -4 L2 -4 L2.6 3 L-16.6 3 Z" fill="#ff7a5c" />
      <path d="M-14.6 -20 L0.6 -20 L1 -14 L-15 -14 Z" fill="#ff7a5c" />
      <rect x={-15} y={-45} width={16} height={11} rx={2} fill="#ffe27a" />
      <path d="M-18 -45 L-7 -56 L4 -45 Z" fill="#d4573d" />
      <g className="anim-bob">
        <path d="M18 8 H46 L40 16 H24 Z" fill="#2577b3" />
        <path d="M31 6 V-24 L46 4 Z" fill="#fffdf8" />
        <path d="M29 6 V-16 L18 4 Z" fill="#ffc547" />
      </g>
    </g>
  )
}

function ToolsmithWorkshop() {
  return (
    <g>
      <Shadow rx={40} />
      <path d={gearPath(-10, -20, 28, 21, 9)} fill="#fffdf8" />
      <circle cx={-10} cy={-20} r={13} fill="#6a95f2" />
      <circle cx={-10} cy={-20} r={6} fill="#fffdf8" />
      <path d={gearPath(24, 2, 15, 11, 7)} fill="#ffc547" />
      <circle cx={24} cy={2} r={5} fill="#3a5fbd" />
      <g transform="translate(-18 6) rotate(-38)">
        <rect x={-4} y={-4} width={42} height={8} rx={4} fill="#12324a" />
        <path d="M38 -10 a10 10 0 1 1 0 20 l0 -6 h-5 v-8 h5 Z" fill="#12324a" />
      </g>
      <g className="anim-bob">
        <rect x={12} y={-60} width={36} height={22} rx={8} fill="#12324a" />
        <text x={30} y={-44.5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#7fd3ee" fontFamily="Fredoka, sans-serif">
          {'</>'}
        </text>
      </g>
    </g>
  )
}

function MessagePier() {
  return (
    <g>
      <Shadow rx={44} />
      <path d="M-48 12 L-8 -6 L26 2 L-14 20 Z" fill="#a86b3c" />
      <g stroke="#7d4b25" strokeWidth={1.6}>
        <path d="M-38 7.5 L-4 15.5" />
        <path d="M-28 3 L6 11" />
        <path d="M-18 -1.5 L16 6.5" />
      </g>
      <rect x={-36} y={8} width={4} height={12} fill="#7d4b25" />
      <rect x={-6} y={16} width={4} height={10} fill="#7d4b25" />
      <rect x={12} y={-18} width={5} height={30} rx={1.5} fill="#7d4b25" />
      <path d="M2 -20 V-36 a12 12 0 0 1 24 0 V-20 Z" fill="#2577b3" />
      <path d="M2 -36 a12 12 0 0 1 24 0" fill="none" stroke="#9fd9ff" strokeWidth={2} />
      <rect x={6} y={-30} width={9} height={5} rx={1.5} fill="#0f3b5e" />
      <path d="M26 -34 V-50 H36 V-44 H28" fill="#ff7a5c" />
      <g className="anim-bob">
        <rect x={-46} y={-48} width={34} height={23} rx={4} fill="#fffdf8" />
        <path d="M-46 -46 L-29 -34 L-12 -46" stroke="#ffa95c" strokeWidth={2.4} fill="none" strokeLinejoin="round" />
        <circle cx={-29} cy={-30} r={3.5} fill="#ff7a5c" />
      </g>
    </g>
  )
}

const locationArt: Record<LocationId, () => React.JSX.Element> = {
  'phong-312': MysteryDoor,
  'ielts-coach': EssayGrove,
  'vietnam-history': ChronicleCliffs,
  'debate-practice': EchoAmphitheatre,
  about: BasecampSummit,
  experience: VoyagerHarbour,
  skills: ToolsmithWorkshop,
  contact: MessagePier,
}

export function LocationArt({ id }: { id: LocationId }) {
  const Art = locationArt[id]
  return <Art />
}

/** Standalone illustration for panels and cards. */
export function LocationIllustration({ id, className }: { id: LocationId; className?: string }) {
  return (
    <svg viewBox="-60 -80 120 104" className={className} aria-hidden="true" focusable="false">
      <LocationArt id={id} />
    </svg>
  )
}

/* ── Terrain ──────────────────────────────────────────────── */

const Tree = ({ x, y, s = 1, c = '#3f9a55' }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={10} ry={3} fill="#0b2a3c" opacity={0.15} />
    <rect x={-2} y={-6} width={4} height={10} rx={1.5} fill="#7d5531" />
    <circle cx={0} cy={-14} r={11} fill={c} />
    <circle cx={-3.5} cy={-17.5} r={4} fill="#ffffff" opacity={0.22} />
  </g>
)

const Palm = ({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <ellipse cx={0} cy={3} rx={11} ry={3} fill="#0b2a3c" opacity={0.15} />
    <path d="M0 2 Q-2 -14 4 -28" stroke="#9b6b3d" strokeWidth={4} fill="none" strokeLinecap="round" />
    <g fill="#3f9a55">
      <path d="M4 -28 Q-10 -36 -20 -26 Q-8 -30 4 -28 Z" />
      <path d="M4 -28 Q16 -38 26 -28 Q14 -31 4 -28 Z" />
      <path d="M4 -28 Q-4 -42 -12 -42 Q-2 -36 4 -28 Z" />
      <path d="M4 -28 Q14 -44 22 -40 Q12 -36 4 -28 Z" />
    </g>
    <circle cx={4} cy={-27} r={2.6} fill="#7d5531" />
  </g>
)

function TerrainArtInner({ kind }: { kind: TerrainKind }) {
  switch (kind) {
    case 'forest':
      return (
        <g>
          <Tree x={-26} y={-6} />
          <Tree x={6} y={-18} s={1.15} c="#358a4a" />
          <Tree x={30} y={-2} s={0.9} />
          <Tree x={-6} y={18} s={0.85} c="#358a4a" />
          <Tree x={24} y={24} s={0.7} />
        </g>
      )
    case 'grove':
      return (
        <g>
          <Palm x={-18} y={10} />
          <Palm x={20} y={0} s={0.85} flip />
          <circle cx={-34} cy={22} r={3} fill="#fbeec6" />
        </g>
      )
    case 'meadow':
      return (
        <g>
          {[
            [-30, 0],
            [-6, -22],
            [22, -8],
            [8, 16],
            [-22, 24],
            [36, 18],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M-5 0 Q-4 -7 -2 -9 M0 0 V-10 M5 0 Q4 -7 2 -9" stroke="#5f9a39" strokeWidth={2} strokeLinecap="round" fill="none" />
            </g>
          ))}
          {[
            [-14, -6, '#fffdf8'],
            [14, 4, '#ffc547'],
            [30, -24, '#ff8a6b'],
            [-34, 14, '#ffc547'],
          ].map(([x, y, c], i) => (
            <circle key={i} cx={x as number} cy={y as number} r={3.2} fill={c as string} />
          ))}
        </g>
      )
    case 'peak':
      return (
        <g>
          <ellipse cx={0} cy={18} rx={44} ry={8} fill="#0b2a3c" opacity={0.14} />
          <path d="M-46 18 L-12 -40 L6 -14 L18 -30 L48 18 Z" fill="#8c8378" />
          <path d="M-12 -40 L6 -14 L-2 18 L-46 18 Z" fill="#a39a8e" />
          <path d="M-12 -40 L-2 -23 L-8 -26 L-14 -20 L-21 -25 Z" fill="#fffdf8" />
          <path d="M18 -30 L26 -17 L20 -19 L14 -15 L12 -21 Z" fill="#fffdf8" />
        </g>
      )
    case 'pond':
      return (
        <g>
          <ellipse cx={0} cy={0} rx={46} ry={26} fill="#4fb7cf" />
          <ellipse cx={0} cy={-2} rx={40} ry={21} fill="#7fd3ee" />
          <ellipse cx={-10} cy={-6} rx={14} ry={5} fill="none" stroke="#dff5fb" strokeWidth={2} className="anim-foam" />
          <path d="M14 4 a8 5 0 1 0 0.1 0 Z" fill="#4cc46d" />
          <path d="M14 4 L22 2" stroke="#7fd3ee" strokeWidth={2} />
          <circle cx={18} cy={1} r={2.6} fill="#ff8a6b" />
          <Tree x={-40} y={-18} s={0.7} />
        </g>
      )
    case 'field':
      return (
        <g>
          {[-24, -10, 4, 18].map((y, i) => (
            <path key={y} d={`M${-44 + i * 4} ${y} Q0 ${y - 8} ${44 - i * 4} ${y}`} stroke="#d9a93a" strokeWidth={4} fill="none" strokeLinecap="round" />
          ))}
          <g transform="translate(24 -12)">
            <ellipse cx={0} cy={10} rx={12} ry={3} fill="#0b2a3c" opacity={0.15} />
            <path d="M-12 10 Q-12 -12 0 -12 Q12 -12 12 10 Z" fill="#f2c24f" />
            <path d="M-8 0 H8 M-10 6 H10" stroke="#c49a2f" strokeWidth={1.6} />
          </g>
        </g>
      )
    case 'beach':
      return (
        <g>
          <path d="M-44 14 Q-30 8 -16 14 T12 14 T40 14" stroke="#ffffff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8} />
          <path
            d="M-14 -14 l3 -8 l3 8 l8 0 l-6 5 l2 8 l-7 -5 l-7 5 l2 -8 l-6 -5 Z"
            fill="#ff8a6b"
            transform="translate(-6 0)"
          />
          <path d="M18 -10 a8 8 0 0 1 16 0 Z" fill="#fffdf8" />
          <path d="M22 -10 V-16 M26 -10 V-17.5 M30 -10 V-16" stroke="#e8c98a" strokeWidth={1.2} />
          <circle cx={4} cy={0} r={2.2} fill="#e0b96a" />
          <circle cx={-30} cy={-4} r={1.8} fill="#e0b96a" />
        </g>
      )
    case 'rocks':
      return (
        <g>
          <ellipse cx={0} cy={14} rx={40} ry={7} fill="#0b2a3c" opacity={0.15} />
          <path d="M-36 14 Q-38 -6 -22 -12 Q-6 -16 -4 2 Q-2 14 -36 14 Z" fill="#8b97a0" />
          <path d="M-8 14 Q-6 -20 16 -22 Q36 -20 36 14 Z" fill="#a8b3ba" />
          <path d="M2 -12 Q12 -20 22 -16" stroke="#dfe5e8" strokeWidth={3} fill="none" strokeLinecap="round" />
          <circle cx={-26} cy={-16} r={4} fill="#4cc46d" />
        </g>
      )
  }
}

export function TerrainArt({ kind }: { kind: TerrainKind }) {
  return <TerrainArtInner kind={kind} />
}

import type { Bounds } from '@/lib/hex'

/** Small sea-life decorations around the island (purely visual). */
export function IslandDecor({ bounds }: { bounds: Bounds }) {
  const left = bounds.minX
  const right = bounds.minX + bounds.width
  const top = bounds.minY
  const bottom = bounds.minY + bounds.height

  return (
    <g aria-hidden="true" pointerEvents="none">
      {/* sailboat, bottom-left */}
      <g transform={`translate(${left + 95} ${bottom - 70})`}>
        <g className="anim-bob">
          <ellipse cx={0} cy={18} rx={34} ry={6} fill="#052b45" opacity={0.2} />
          <path d="M-30 6 H30 L20 18 H-20 Z" fill="#fffdf8" />
          <path d="M-30 6 H30 L28 9 H-28 Z" fill="#ff8a6b" />
          <path d="M2 4 V-44 L28 0 Z" fill="#ffc547" />
          <path d="M-2 4 V-34 L-22 0 Z" fill="#fffdf8" />
          <path d="M0 4 V-48" stroke="#12324a" strokeWidth={2.5} />
        </g>
        <path d="M-46 22 q8 -6 16 0 t16 0" stroke="#dff5fb" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.7} />
      </g>

      {/* buoy, bottom-right */}
      <g transform={`translate(${right - 90} ${bottom - 60})`}>
        <g className="anim-bob" style={{ animationDelay: '-2s' }}>
          <ellipse cx={0} cy={12} rx={16} ry={4} fill="#052b45" opacity={0.2} />
          <path d="M-12 10 Q-12 -10 0 -10 Q12 -10 12 10 Z" fill="#ff7a5c" />
          <path d="M-12 2 H12" stroke="#fffdf8" strokeWidth={4} />
          <rect x={-2} y={-24} width={4} height={14} fill="#12324a" />
          <circle cx={0} cy={-26} r={4} fill="#ffe27a" />
        </g>
      </g>

      {/* tiny rock islet, top-right */}
      <g transform={`translate(${right - 70} ${top + 70})`}>
        <ellipse cx={0} cy={6} rx={30} ry={9} fill="#7fd3ee" opacity={0.45} />
        <path d="M-16 6 Q-14 -10 -2 -12 Q14 -12 16 6 Z" fill="#a8b3ba" />
        <path d="M-6 -6 Q0 -10 6 -8" stroke="#dfe5e8" strokeWidth={2.5} strokeLinecap="round" fill="none" />
      </g>

      {/* gulls, top-left */}
      <g transform={`translate(${left + 80} ${top + 60})`} stroke="#fffdf8" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9}>
        <path d="M-14 0 q7 -8 14 0 q7 -8 14 0" />
        <path d="M18 18 q5 -6 10 0 q5 -6 10 0" strokeWidth={2.4} />
      </g>
    </g>
  )
}

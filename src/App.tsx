import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Dices, MapPin } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Celebration } from '@/components/animations/Celebration'
import { IslandBoard } from '@/components/board/IslandBoard'
import { OceanBackground } from '@/components/board/OceanBackground'
import { AchievementToasts } from '@/components/game-ui/AchievementToasts'
import { DiceButton } from '@/components/game-ui/DiceButton'
import { ExpeditionLog, ExpeditionPill } from '@/components/game-ui/ExpeditionLog'
import { LocationIllustration } from '@/components/hex-tile/TileArt'
import { TopNav, type NavTarget } from '@/components/navigation/TopNav'
import { DetailDrawer } from '@/components/panels/DetailDrawer'
import { PreviewCard, PreviewSheet } from '@/components/panels/TilePreview'
import { tallLayout, wideLayout } from '@/data/islandLayout'
import { allLocationIds, isProjectId, locationsById } from '@/data/locations'
import { projectsById } from '@/data/projects'
import { AboutDetail } from '@/features/about/AboutDetail'
import { ContactDetail } from '@/features/contact/ContactDetail'
import { ExperienceDetail } from '@/features/experience/ExperienceDetail'
import { ProjectDetail } from '@/features/projects/ProjectDetail'
import { ProjectsOverview } from '@/features/projects/ProjectsOverview'
import { IntroCard, IntroStrip } from '@/features/quick-view/IntroCard'
import { QuickView, type QuickSection } from '@/features/quick-view/QuickView'
import { SkillsDetail } from '@/features/skills/SkillsDetail'
import { useExploration } from '@/hooks/useExploration'
import { useHashView } from '@/hooks/useHashView'
import { useCanHover, useIsDesktop, useIsMobile, useTallIsland } from '@/hooks/useMediaQuery'
import { locationPalettes, zoneColors } from '@/lib/palette'
import { zones } from '@/data/zones'
import type { LocationId } from '@/types/content'

type Detail = { kind: 'location'; id: LocationId } | { kind: 'projects' }

/** Tour order used by "Next" buttons — same as the footpath on the island. */
const tour: LocationId[] = wideLayout.route.slice(0, -1)
const step = (id: LocationId, delta: number) => tour[(tour.indexOf(id) + delta + tour.length) % tour.length]!

export default function App() {
  const [view, setView] = useHashView()
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()
  const canHover = useCanHover()
  const tall = useTallIsland()
  const { state, dispatch, toasts, dismissToast, celebrating, endCelebration } = useExploration()

  const [selectedId, setSelectedId] = useState<LocationId | null>(null)
  const [hoveredId, setHoveredId] = useState<LocationId | null>(null)
  const [beacon, setBeacon] = useState<{ id: LocationId; face: number } | null>(null)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [quickScroll, setQuickScroll] = useState<{ section: QuickSection; nonce: number } | null>(null)

  const layout = tall ? tallLayout : wideLayout

  const select = useCallback(
    (id: LocationId) => {
      setBeacon((b) => (b?.id === id ? null : b))
      if (selectedId === id) {
        // A second click on the selected tile opens its full dossier.
        setDetail({ kind: 'location', id })
        dispatch(isProjectId(id) ? { type: 'openProject', id } : id === 'skills' ? { type: 'viewSkills' } : { type: 'discover', id })
        return
      }
      setSelectedId(id)
      dispatch({ type: 'discover', id })
    },
    [dispatch, selectedId],
  )

  const openDetail = useCallback(
    (id: LocationId) => {
      setDetail({ kind: 'location', id })
      if (view === 'island') setSelectedId(id)
      if (isProjectId(id)) dispatch({ type: 'openProject', id })
      else if (id === 'skills') dispatch({ type: 'viewSkills' })
      else dispatch({ type: 'discover', id })
    },
    [dispatch, view],
  )

  const closeDetail = useCallback(() => setDetail(null), [])

  const handleNav = useCallback(
    (target: NavTarget) => {
      if (target === 'explore') {
        setDetail(null)
        setSelectedId(null)
        setView('island')
        return
      }
      if (view === 'quick') {
        setDetail(null)
        setQuickScroll({ section: target, nonce: Date.now() })
        return
      }
      if (target === 'projects') setDetail({ kind: 'projects' })
      else openDetail(target)
    },
    [openDetail, setView, view],
  )

  const toggleView = useCallback(() => {
    setDetail(null)
    if (view === 'quick') {
      setView('island')
    } else {
      setView('quick')
      setQuickScroll({ section: 'top', nonce: Date.now() })
    }
  }, [setView, view])

  // Read the latest progress when the die settles (a tile may be discovered mid-roll).
  const discoveredRef = useRef(state.discovered)
  useEffect(() => {
    discoveredRef.current = state.discovered
  }, [state.discovered])

  const roll = useCallback((face: number) => {
    const undiscovered = allLocationIds.filter((id) => !discoveredRef.current.includes(id))
    const pool = undiscovered.length > 0 ? undiscovered : allLocationIds
    const id = pool[Math.floor(Math.random() * pool.length)]!
    setBeacon({ id, face })
  }, [])

  useEffect(() => {
    if (!beacon) return
    const t = window.setTimeout(() => setBeacon(null), 6000)
    return () => window.clearTimeout(t)
  }, [beacon])

  // Escape closes the preview when no dialog is open.
  useEffect(() => {
    if (detail || !selectedId) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedId(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [detail, selectedId])

  useEffect(() => {
    if (view === 'quick') window.scrollTo({ top: 0 })
  }, [view])

  const activeNav: NavTarget | null = useMemo(() => {
    if (view === 'quick') return null
    if (!detail) return 'explore'
    if (detail.kind === 'projects') return 'projects'
    if (isProjectId(detail.id)) return 'projects'
    return detail.id as NavTarget
  }, [detail, view])

  const selected = selectedId ? locationsById[selectedId] : null
  const previewProps = selected && {
    location: selected,
    discovered: state.discovered.includes(selected.id),
    nextTitle: locationsById[step(selected.id, 1)].title,
    onExplore: () => openDetail(selected.id),
    onNext: () => select(step(selected.id, 1)),
    onClose: () => setSelectedId(null),
  }

  return (
    <MotionConfig reducedMotion="user">
      <a href="#quick-view" className="sr-only z-[100] rounded-xl bg-sun px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to Quick View (classic portfolio)
      </a>
      {view === 'island' && <OceanBackground />}

      <div className={view === 'island' ? 'flex h-dvh flex-col overflow-hidden' : 'min-h-dvh bg-paper'}>
        <TopNav view={view} active={activeNav} onNavigate={handleNav} onToggleView={toggleView} />

        <AnimatePresence mode="wait" initial={false}>
          {view === 'island' ? (
            <motion.main
              key="island"
              className="relative flex min-h-0 flex-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            >
              {isDesktop && (
                <aside className="scroll-soft flex w-[370px] shrink-0 flex-col gap-3 overflow-y-auto px-4 pt-1 pb-4" aria-label="Island guide">
                  <AnimatePresence mode="wait" initial={false}>
                    {previewProps ? (
                      <PreviewCard key={previewProps.location.id} {...previewProps} />
                    ) : (
                      <IntroCard key="intro" onStart={() => select('about')} onQuickView={toggleView} />
                    )}
                  </AnimatePresence>
                  <ExpeditionLog discovered={state.discovered} unlocked={state.achievements} onReset={() => dispatch({ type: 'reset' })} />
                </aside>
              )}

              <div className="relative flex min-w-0 flex-1 flex-col">
                {!isDesktop && (
                  <div className="flex items-end justify-between gap-3 px-4 pt-1 sm:px-6">
                    <IntroStrip />
                  </div>
                )}
                <div className="relative min-h-0 flex-1 px-2 pt-2 pb-16 sm:px-4 lg:pb-4">
                  <IslandBoard
                    layout={layout}
                    compact={tall}
                    selectedId={selectedId}
                    hoveredId={hoveredId}
                    beaconId={beacon?.id ?? null}
                    discovered={state.discovered}
                    showTooltips={canHover}
                    onSelect={select}
                    onHover={setHoveredId}
                  />
                </div>

                {/* bottom HUD: progress (small screens) + dice */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                  <div className="pointer-events-auto">
                    {!isDesktop && (
                      <div className="flex items-center gap-2">
                        <ExpeditionPill discovered={state.discovered} unlocked={state.achievements} />
                        {state.discovered.length > 0 && (
                          <button type="button" className="panel-glass rounded-xl px-3 py-2 text-[13px] font-semibold text-ink-soft" onClick={() => dispatch({ type: 'reset' })}>
                            Reset
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="pointer-events-auto flex items-end gap-2">
                    <AnimatePresence>
                      {beacon && (
                        <motion.div
                          key={`${beacon.id}-${beacon.face}`}
                          className="panel-glass flex items-center gap-2 py-2 pr-2 pl-3"
                          initial={{ opacity: 0, x: 16, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 10, transition: { duration: 0.15 } }}
                          role="status"
                        >
                          <LocationIllustration id={beacon.id} className="h-9 w-10 max-sm:hidden" />
                          <span className="text-[13px] leading-tight">
                            <span className="block font-semibold text-ink-muted">Rolled {beacon.face} →</span>
                            <span className="block font-display text-[15px] font-bold">{locationsById[beacon.id].placeName}</span>
                          </span>
                          <button type="button" className="btn btn-primary min-h-10 px-3 text-[14px]" onClick={() => select(beacon.id)}>
                            <MapPin size={15} aria-hidden /> Go
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="panel-glass flex items-center gap-1 rounded-2xl py-1 pr-1 pl-3">
                      <span className="text-[13px] leading-tight font-semibold text-ink-soft max-sm:hidden">
                        <Dices size={14} aria-hidden className="mr-1 inline" />
                        Roll for a
                        <br />
                        destination
                      </span>
                      <DiceButton onRolled={roll} size={isMobile ? 'md' : 'lg'} />
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>{!isDesktop && previewProps && !detail && <PreviewSheet key="sheet" {...previewProps} />}</AnimatePresence>
            </motion.main>
          ) : (
            <QuickView
              key="quick"
              scrollTarget={quickScroll}
              onOpenProject={(id) => openDetail(id)}
              onBackToIsland={() => handleNav('explore')}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {detail && (
          <DetailView
            key="detail"
            detail={detail}
            openedProjects={state.projectsOpened}
            onClose={closeDetail}
            onOpen={openDetail}
          />
        )}
      </AnimatePresence>

      <AchievementToasts toasts={toasts} onDismiss={dismissToast} />
      <Celebration active={celebrating} onDone={endCelebration} />
    </MotionConfig>
  )
}

function DetailView({
  detail,
  openedProjects,
  onClose,
  onOpen,
}: {
  detail: Detail
  openedProjects: LocationId[]
  onClose: () => void
  onOpen: (id: LocationId) => void
}) {
  if (detail.kind === 'projects') {
    return (
      <DetailDrawer title="Projects" eyebrow="Creation & Intelligence Zones" accent={{ from: '#ffe3d9', to: '#d3f5e9', ink: '#178a69' }} onClose={onClose}>
        <ProjectsOverview opened={openedProjects.filter(isProjectId)} onOpen={onOpen} />
      </DetailDrawer>
    )
  }
  const loc = locationsById[detail.id]
  const pal = locationPalettes[loc.id]
  const zone = zoneColors[loc.zone]
  const prev = step(loc.id, -1)
  const next = step(loc.id, 1)
  const body = isProjectId(loc.id) ? (
    <ProjectDetail project={projectsById[loc.id]} />
  ) : loc.id === 'about' ? (
    <AboutDetail />
  ) : loc.id === 'experience' ? (
    <ExperienceDetail />
  ) : loc.id === 'skills' ? (
    <SkillsDetail />
  ) : (
    <ContactDetail />
  )
  return (
    <DetailDrawer
      title={loc.title}
      eyebrow={`${zones[loc.zone].name} · ${loc.placeName}`}
      accent={{ from: pal.top[0], to: pal.accent, ink: zone.ink }}
      illustration={<LocationIllustration id={loc.id} className="h-full w-full" />}
      onClose={onClose}
      nav={{
        prevLabel: locationsById[prev].tileLabel,
        nextLabel: locationsById[next].tileLabel,
        onPrev: () => onOpen(prev),
        onNext: () => onOpen(next),
      }}
    >
      <p className="mb-5 text-[13px] font-bold text-ink-muted">{loc.category}</p>
      {body}
    </DetailDrawer>
  )
}

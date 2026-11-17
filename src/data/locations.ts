import type { IslandLocation, LocationId, ProjectId } from '@/types/content'

export const locations: IslandLocation[] = [
  {
    id: 'about',
    kind: 'about',
    zone: 'discovery',
    tileLabel: 'About Me',
    shortLabel: 'About',
    title: 'About Me',
    placeName: 'Basecamp Summit',
    category: 'Personal Profile',
    teaser: 'Start here — who I am and what I love building.',
    summary:
      'Software Engineering student at FPT University who enjoys turning ideas into working products across full-stack, AI and interactive experiences.',
    exploreLabel: 'Read my story',
  },
  {
    id: 'phong-312',
    kind: 'project',
    zone: 'creation',
    tileLabel: 'Phòng 312',
    shortLabel: 'Phòng 312',
    title: 'Phòng 312',
    placeName: 'The Mystery Door',
    category: 'Interactive Game · Creative Project',
    teaser: 'A philosophical mystery game with four endings.',
    summary:
      'An interactive philosophical mystery built with React and Vite — branching narrative, clue images, timed questions, character cards, audio and four endings.',
    exploreLabel: 'View project',
  },
  {
    id: 'ielts-coach',
    kind: 'project',
    zone: 'intelligence',
    tileLabel: 'IELTS Coach',
    shortLabel: 'IELTS',
    title: 'My IELTS Coach',
    placeName: 'Essay Grove',
    category: 'AI Product · Education Technology',
    teaser: 'Two-pass LLM essay evaluation · r 0.39 → 0.61.',
    summary:
      'AI coaching for IELTS Writing Task 2 using two-pass LLM evaluation, an eight-category error taxonomy and confidence gating. Reported scoring correlation improved from r = 0.39 to r = 0.61.',
    exploreLabel: 'View project',
  },
  {
    id: 'vietnam-history',
    kind: 'project',
    zone: 'intelligence',
    tileLabel: 'Vietnam History',
    shortLabel: 'History',
    title: 'Vietnam History Discovery',
    placeName: 'Chronicle Cliffs',
    category: 'AI · Knowledge Discovery',
    teaser: 'GraphRAG over Đại Việt Sử Ký Toàn Thư.',
    summary:
      'Discover Vietnamese history through a Neo4j knowledge graph, vector search and GraphRAG. Five microservices and a frontend MVP built independently in under a week with Claude Code.',
    exploreLabel: 'View project',
  },
  {
    id: 'debate-practice',
    kind: 'project',
    zone: 'intelligence',
    tileLabel: 'Debate Practice',
    shortLabel: 'Debate',
    title: 'AI Debate Practice Platform',
    placeName: 'Echo Amphitheatre',
    category: 'AI · Intelligent Systems',
    teaser: 'RAG fact-checking + LLM-as-judge · r = 0.60.',
    summary:
      'Debate practice with hybrid retrieval, RAG-based fact checking and LLM-as-judge feedback — r = 0.60 against human quality labels on 50 Vietnamese texts.',
    exploreLabel: 'View project',
  },
  {
    id: 'skills',
    kind: 'skills',
    zone: 'engineering',
    tileLabel: 'Skills',
    shortLabel: 'Skills',
    title: 'Technical Skills',
    placeName: 'Toolsmith Workshop',
    category: 'Technical Toolbox',
    teaser: 'Languages, frameworks, data and AI tooling.',
    summary:
      'Java, Python and TypeScript; Spring Boot and FastAPI; React and Tailwind; PostgreSQL and Neo4j; RAG, GraphRAG, vector search, Docker and Git.',
    exploreLabel: 'Open the toolbox',
  },
  {
    id: 'experience',
    kind: 'experience',
    zone: 'engineering',
    tileLabel: 'Experience',
    shortLabel: 'Experience',
    title: 'Experience',
    placeName: 'Voyager Harbour',
    category: 'Work · Teaching · Education',
    teaser: 'FPT Software internship, Everest Education, FPT University.',
    summary:
      'Software Engineering Intern at FPT Software Philippines (UiPath RPA), Mathematics Teaching Assistant at Everest Education, and Software Engineering at FPT University.',
    exploreLabel: 'See the voyage log',
  },
  {
    id: 'contact',
    kind: 'contact',
    zone: 'discovery',
    tileLabel: 'Contact',
    shortLabel: 'Contact',
    title: 'Contact',
    placeName: 'Message Pier',
    category: 'Get in touch',
    teaser: 'Send a message in a bottle — or just an email.',
    summary: 'Open to internship opportunities and conversations about building interesting products.',
    exploreLabel: 'Get in touch',
  },
]

export const locationsById = Object.fromEntries(locations.map((l) => [l.id, l])) as Record<LocationId, IslandLocation>

export const projectLocationIds: ProjectId[] = ['phong-312', 'ielts-coach', 'vietnam-history', 'debate-practice']

export const allLocationIds: LocationId[] = locations.map((l) => l.id)

export function isProjectId(id: LocationId): id is ProjectId {
  return (projectLocationIds as LocationId[]).includes(id)
}

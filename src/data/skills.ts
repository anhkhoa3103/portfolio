import type { SkillGroup } from '@/types/content'

export const skillGroups: SkillGroup[] = [
  { id: 'programming', name: 'Programming', caption: 'Languages I write in', skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { id: 'backend', name: 'Backend', caption: 'Services & APIs', skills: ['Spring Boot', 'Spring Cloud', 'FastAPI'] },
  { id: 'frontend', name: 'Frontend', caption: 'Interfaces & experiences', skills: ['React', 'HTML', 'CSS', 'Tailwind CSS'] },
  { id: 'database', name: 'Database', caption: 'Relational & graph data', skills: ['PostgreSQL', 'MSSQL', 'Neo4j'] },
  {
    id: 'ai-engineering',
    name: 'AI & Engineering',
    caption: 'Intelligent systems & tooling',
    skills: ['RAG', 'GraphRAG', 'Vector Search', 'AI API Integration', 'Claude Code', 'Docker', 'Git'],
  },
]

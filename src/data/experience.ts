import type { ExperienceItem } from '@/types/content'

export const experience: ExperienceItem[] = [
  {
    id: 'fpt-software',
    organization: 'FPT Software Philippines',
    role: 'Software Engineering Intern',
    period: 'Sep 2025 – Nov 2025',
    type: 'work',
    points: [
      'Worked primarily on UiPath RPA automation.',
      'Coordinated with Business Analysts and Project Managers.',
      'Took part in English presentations and discussions with international stakeholders.',
    ],
  },
  {
    id: 'everest',
    organization: 'Everest Education',
    role: 'Mathematics Teaching Assistant',
    period: '2025 – Aug 2026',
    type: 'teaching',
    points: [
      'Supported bilingual mathematics classes.',
      'Assisted students with learning activities.',
      'Supported classroom operations and communication.',
    ],
  },
]

export const education: ExperienceItem = {
  id: 'fpt-university',
  organization: 'FPT University',
  role: 'Software Engineering',
  period: '2024 – Expected 2027',
  type: 'education',
  points: ['Java Technology specialization.', 'Received a 30% entrance-exam scholarship.'],
}

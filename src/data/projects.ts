import type { Project, ProjectId } from '@/types/content'

/**
 * Project content. Add `repoUrl` / `demoUrl` ONLY with real links —
 * the buttons appear automatically when a valid URL is present.
 */
export const projects: Project[] = [
  {
    id: 'phong-312',
    name: 'Phòng 312',
    category: 'Interactive Game · Creative Project',
    tagline: 'A philosophical mystery you solve one choice at a time.',
    overview:
      'An interactive philosophical mystery game built with React and Vite. Players step into Room 312, follow a branching story, inspect clue images, answer timed questions and meet the characters involved — and their decisions lead to one of four different endings.',
    problem:
      'Philosophical ideas are usually met as text to read. Phòng 312 frames them as a mystery instead, so players reason through the ideas by investigating, choosing and living with the consequences.',
    contribution: [
      'Built the game as a React + Vite web application.',
      'Implemented the branching narrative and interactive choice flow.',
      'Created the clue-image, character-card and timed-question interactions.',
      'Added audio effects to give feedback and atmosphere to key moments.',
      'Wired four distinct endings to the paths players take through the story.',
    ],
    architecture: {
      caption: 'How a player decision travels through the game',
      flow: [
        { title: 'Story scenes', detail: 'Narrative nodes with the choices available at each step.' },
        { title: 'Player choice', detail: 'Choices, timed questions and clue inspection drive progression.' },
        { title: 'Game state', detail: 'Tracks the chosen path so the story can branch.' },
        { title: 'Ending', detail: 'One of four endings is reached based on that path.' },
      ],
      foundations: [
        { title: 'React UI', detail: 'Character cards, clue viewer, question timer.', tech: ['React'] },
        { title: 'Build tooling', detail: 'Dev server and production bundling.', tech: ['Vite'] },
        { title: 'Media', detail: 'Clue images and audio effects.' },
      ],
    },
    technologies: ['React', 'Vite'],
    implementation: [
      { title: 'Branching narrative', detail: 'Story progression depends on the choices a player makes.' },
      { title: 'Timed questions', detail: 'Some decisions must be made against a countdown, adding pressure.' },
      { title: 'Clue images', detail: 'Visual clues players inspect to piece the mystery together.' },
      { title: 'Character cards', detail: 'Characters are introduced through interactive cards.' },
      { title: 'Audio effects', detail: 'Sound cues reinforce discoveries and tense moments.' },
      { title: 'Four endings', detail: 'Different paths through the story resolve differently.' },
    ],
    results: [{ value: '4', label: 'distinct endings, decided by player choices' }],
  },
  {
    id: 'ielts-coach',
    name: 'My IELTS Coach',
    category: 'AI Product · Education Technology',
    tagline: 'AI coaching for IELTS Writing Task 2 that scores closer to human judgement.',
    overview:
      'An AI-powered coaching platform for IELTS Writing Task 2. Learners submit essays and receive structured feedback and scoring produced by an evaluation pipeline built on Spring Boot and Spring AI.',
    problem:
      'Learners preparing for Writing Task 2 need feedback that is specific and consistent with how essays are actually scored. The initial approach agreed only weakly with human scoring (r = 0.39) — not reliable enough to coach with.',
    contribution: [
      'Designed a two-pass LLM evaluation pipeline instead of a single prompt.',
      'Defined an eight-category error taxonomy so feedback is structured and comparable.',
      'Added confidence gating to keep uncertain model output away from learners.',
      'Iterated on evaluation quality, raising the reported AI–human scoring correlation from r = 0.39 to r = 0.61.',
      'Built across the stack: Spring Boot backend, React + TypeScript frontend, PostgreSQL storage.',
    ],
    architecture: {
      caption: 'Two-pass evaluation pipeline',
      flow: [
        { title: 'Essay submission', detail: 'Learner submits a Task 2 essay.', tech: ['React', 'TypeScript'] },
        { title: 'API layer', detail: 'Receives essays and orchestrates evaluation.', tech: ['Spring Boot'] },
        {
          title: 'Pass 1 → Pass 2',
          detail: 'Two LLM passes evaluate the essay using the eight-category error taxonomy.',
          tech: ['Spring AI', 'OpenAI API'],
        },
        { title: 'Confidence gate', detail: 'Only sufficiently confident results reach the learner.' },
      ],
      foundations: [
        { title: 'Persistence', detail: 'Essays and evaluation results.', tech: ['PostgreSQL'] },
        { title: 'Error taxonomy', detail: 'Eight categories that structure every piece of feedback.' },
      ],
    },
    technologies: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'OpenAI API', 'Spring AI'],
    implementation: [
      { title: 'Two-pass LLM evaluation', detail: 'Evaluation is split into two passes rather than asking one prompt to do everything.' },
      { title: 'Eight-category error taxonomy', detail: 'Errors are classified into a fixed set of categories, making feedback structured and measurable.' },
      { title: 'Confidence gating', detail: 'Low-confidence output is filtered instead of being shown as fact.' },
      { title: 'Evaluation quality loop', detail: 'Scoring was measured against human scores and improved iteratively.' },
    ],
    results: [
      { value: 'r = 0.39 → 0.61', label: 'AI–human scoring correlation', note: 'Reported improvement' },
    ],
  },
  {
    id: 'vietnam-history',
    name: 'Vietnam History Discovery',
    category: 'AI · Knowledge Discovery',
    tagline: 'Explore Vietnamese history through a knowledge graph you can ask questions.',
    overview:
      'An AI-powered platform for discovering Vietnamese history through intelligent knowledge retrieval. It combines a graph of historical knowledge with vector search, using GraphRAG over Đại Việt Sử Ký Toàn Thư to ground answers in the source text.',
    problem:
      'Classical records like Đại Việt Sử Ký Toàn Thư are dense and hard to explore. People, places and events are connected across many entries — connections that plain keyword search does not capture well.',
    contribution: [
      'Built the initial foundation independently — five microservices and a frontend MVP — in under one week using Claude Code.',
      'Modelled historical knowledge as a graph in Neo4j.',
      'Combined graph context with MiniLM vector search for GraphRAG retrieval.',
      'Integrated Gemini 2.5 Flash for answer generation.',
      'Connected Spring Boot, FastAPI and React into one full-stack system.',
    ],
    architecture: {
      caption: 'GraphRAG question answering',
      flow: [
        { title: 'Explorer UI', detail: 'Visitors ask questions and browse results.', tech: ['React'] },
        { title: 'Application services', detail: 'Microservices for the platform’s core features.', tech: ['Spring Boot'] },
        { title: 'AI service', detail: 'Retrieval and generation pipeline.', tech: ['FastAPI', 'Gemini 2.5 Flash'] },
        { title: 'Grounded answer', detail: 'Responses built from retrieved graph and text context.' },
      ],
      foundations: [
        { title: 'Knowledge graph', detail: 'Entities and relationships from the chronicle.', tech: ['Neo4j'] },
        { title: 'Vector search', detail: 'Semantic retrieval over passages.', tech: ['MiniLM'] },
        { title: 'Relational data', detail: 'Application data.', tech: ['PostgreSQL'] },
      ],
    },
    technologies: ['Spring Boot', 'React', 'FastAPI', 'PostgreSQL', 'Neo4j', 'GraphRAG', 'MiniLM', 'Gemini 2.5 Flash'],
    implementation: [
      { title: 'Graph-based knowledge', detail: 'Historical entities and their relationships are represented as a graph.' },
      { title: 'Vector search', detail: 'MiniLM embeddings enable semantic retrieval of relevant passages.' },
      { title: 'GraphRAG over Đại Việt Sử Ký Toàn Thư', detail: 'Graph and vector context are combined to ground generated answers.' },
      { title: 'Full-stack integration', detail: 'Java and Python services work together behind a React frontend.' },
    ],
    results: [
      { value: '5', label: 'microservices in the initial foundation' },
      { value: '< 1 week', label: 'foundation + frontend MVP', note: 'Built independently using Claude Code' },
    ],
  },
  {
    id: 'debate-practice',
    name: 'AI Debate Practice Platform',
    category: 'AI · Intelligent Systems',
    tagline: 'Practise debating with fact-checked, AI-evaluated feedback.',
    overview:
      'An AI-powered debate practice platform with intelligent feedback and evaluation. Arguments are fact-checked with retrieval-augmented generation and assessed by an LLM-as-judge whose quality was measured against human labels.',
    problem:
      'Debaters improve fastest with frequent, honest feedback on both the quality of their arguments and the accuracy of their claims — feedback that is hard to get without a coach in the room.',
    contribution: [
      'Built hybrid retrieval over PostgreSQL + pgvector with BAAI/bge-m3 embeddings.',
      'Implemented RAG-based fact checking of argument claims.',
      'Designed LLM-as-judge debate evaluation with automated feedback.',
      'Evaluated the judge against human quality labels: r = 0.60 on 50 Vietnamese texts.',
    ],
    architecture: {
      caption: 'From argument to feedback',
      flow: [
        { title: 'Argument', detail: 'A debater submits their argument.' },
        { title: 'Hybrid retrieval', detail: 'Relevant evidence is retrieved for each claim.', tech: ['pgvector', 'BAAI/bge-m3'] },
        { title: 'Fact check + judge', detail: 'RAG fact checking and LLM-as-judge evaluation.', tech: ['RAG', 'LLM-as-judge'] },
        { title: 'Feedback', detail: 'Automated, structured feedback for the debater.' },
      ],
      foundations: [
        { title: 'API', detail: 'Serves the evaluation pipeline.', tech: ['FastAPI'] },
        { title: 'Storage', detail: 'Documents, embeddings and results.', tech: ['PostgreSQL', 'pgvector'] },
        { title: 'Cloud', detail: 'Cloud services used by the platform.', tech: ['Azure'] },
      ],
    },
    technologies: ['FastAPI', 'PostgreSQL', 'pgvector', 'BAAI/bge-m3', 'RAG', 'LLM-as-judge', 'Azure'],
    implementation: [
      { title: 'Hybrid retrieval', detail: 'Retrieval combines multiple signals to find relevant evidence.' },
      { title: 'RAG-based fact checking', detail: 'Claims are checked against retrieved sources.' },
      { title: 'AI debate evaluation', detail: 'An LLM acts as judge to assess argument quality.' },
      { title: 'Validated against humans', detail: 'Judge scores were compared with human quality labels.' },
    ],
    results: [{ value: 'r = 0.60', label: 'correlation with human quality labels', note: 'Measured on 50 Vietnamese texts' }],
  },
]

export const projectsById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<ProjectId, Project>

# MASTER SPEC — KHOA'S ISLAND
## Interactive Board Game Inspired Developer Portfolio

Act as a senior frontend engineer, UI/UX designer, game interface designer, and creative developer.

Build a complete interactive developer portfolio website FROM SCRATCH.

There is no existing project. Initialize everything yourself.

IMPORTANT CREATIVE DIRECTION:

The website must be visually inspired by the gameplay interface of Colonist.io.

Reference:
https://colonist.io/

Use the following visual characteristics as inspiration:
- Bright blue ocean background.
- Colorful hexagonal resource tiles.
- Green, orange, yellow, gray, and beige board tiles.
- White resource icons and number badges.
- Colorful roads and settlements.
- Compact player panels.
- Clean, friendly, readable board-game interface.
- Clear interaction feedback.
- Simple but polished game UI.

Do NOT copy Colonist's logo, proprietary artwork, exact assets, or branding. Create an original portfolio design using similar board-game visual principles.

The result should feel like an interactive board game that also functions as a professional developer portfolio.

# 1. PRODUCT IDENTITY

Name: KHOA'S ISLAND

Tagline: Build. Explore. Discover.

Concept:
An interactive island board where each hexagonal tile represents a part of Nguyen Anh Khoa's developer journey.

The visitor explores the island by clicking tiles, discovering projects, experience, skills, and personal information.

The board is the central visual element of the website.

Do not use RPG character screens, cyberpunk terminals, dark futuristic dashboards, or conventional portfolio cards as the primary design.

# 2. PERSONAL INFORMATION

Name: Nguyen Anh Khoa
Role: Software Engineering Student / Aspiring Product Developer
University: FPT University
Specialization: Java Technology
Location: Ho Chi Minh City, Vietnam
Email: nguynanhkhoa.cv@gmail.com

Introduction:

"I'm a software engineering student who enjoys turning creative ideas into useful products. I work across backend systems, frontend experiences, and AI-powered applications, with a strong interest in building things people enjoy using."

# 3. PROJECT CONTENT

Create these project tiles:

A. PHÒNG 312
Category: Interactive Game Development.
Description: An interactive philosophical mystery game featuring branching choices, clues, timed questions, character interactions, and four possible endings.
Technology: React, Vite, JavaScript.

B. MY IELTS COACH
Category: AI Product.
Description: An AI-powered IELTS Writing Task 2 coaching platform with structured evaluation and feedback.
Technology: Spring Boot, React, TypeScript, PostgreSQL, OpenAI API / Spring AI.
Highlight: Two-pass LLM evaluation pipeline; AI-human scoring correlation improved from r=0.39 to r=0.61.

C. VIETNAM HISTORY DISCOVERY
Category: Full-stack / GraphRAG.
Description: A Vietnamese history discovery platform using graph-based retrieval and generative AI.
Technology: Spring Boot, React, FastAPI, PostgreSQL, Neo4j, GraphRAG.
Highlight: Independently built the initial foundation, including five microservices and the first frontend MVP, in under a week using Claude Code.

D. AI DEBATE PRACTICE PLATFORM
Category: AI Engineering.
Description: An AI debate practice platform with retrieval, fact-checking, and LLM-based evaluation.
Technology: FastAPI, PostgreSQL, pgvector, BAAI/bge-m3, RAG.
Highlight: Achieved r=0.60 against human quality labels on 50 Vietnamese texts.

Keep all project information editable in centralized TypeScript data files.

Do not invent additional results, metrics, links, or features.

# 4. BOARD DESIGN

Create a large central island composed of interconnected hexagonal tiles.

Use CSS Grid, SVG, or another appropriate technique to construct a responsive hexagonal board.

The board should look like a colorful physical board game.

Design:
- Blue ocean surrounding the island.
- Hexagonal tiles with clearly visible outlines.
- Subtle depth and shadows.
- Resource-inspired colors.
- Small roads connecting selected tiles.
- Small buildings or settlement markers.
- Distinct visual states for unvisited, hovered, selected, and visited tiles.

Create an original board layout rather than copying the exact Colonist map.

Each hex should be an actual interactive component, not a single static image.

# 5. HEXAGONAL LOCATIONS

Create these locations:

1. PHÒNG 312
2. MY IELTS COACH
3. VIETNAM HISTORY DISCOVERY
4. AI DEBATE PRACTICE
5. ABOUT ME
6. EXPERIENCE
7. SKILLS
8. CONTACT

Each location must have:
- A distinct visual identity.
- An icon or illustration.
- A title.
- A short description.
- A clickable interaction.

Hover:
- Slightly scale the tile.
- Increase its shadow.
- Highlight its border.
- Display a tooltip with the location name.

Click:
- Open a detail panel or modal.
- Animate the transition.
- Display relevant content.
- Provide a clear close/back action.

# 6. PROJECT DETAIL PANELS

When a project tile is selected, display:

- Project title.
- Category.
- Project overview.
- Problem and motivation.
- My contribution.
- Technology stack.
- Implementation details.
- Results.
- GitHub URL if supplied.
- Demo URL if supplied.

Use a visually consistent game-inspired panel.

The project panel must be readable and professional.

Do not force visitors to navigate through several screens to understand a project.

# 7. GAME UI ELEMENTS

Create a Colonist-inspired interface, adapted for a portfolio.

Top bar:
- KHOA'S ISLAND logo.
- About.
- Projects.
- Experience.
- Skills.
- Contact.
- Quick View.
- Resume.

Board:
- Main hexagonal island.
- Interactive project and information tiles.

Bottom player panel:
- Player name: Nguyen Anh Khoa.
- Role: Developer.
- Exploration progress.
- Resource-inspired indicators.

Side panel:
- Selected tile information.
- Short description.
- Explore button.

Use clear visual hierarchy and avoid excessive UI clutter.

# 8. INTERACTIVE GAME MECHANICS

Implement the following interactions:

A. DICE ROLL
- Add a small dice interaction when entering the island.
- Dice roll animation.
- The result can trigger a subtle highlight of an available tile.
- Do not make dice results block access to content.

B. TILE EXPLORATION
- Hover over a tile to highlight it.
- Click to discover the location.
- Mark visited tiles visually.
- Animate the selected tile.

C. RESOURCE COLLECTION
- When discovering a location, display a small resource collection animation.
- Resource collection is purely visual.
- Do not add complicated resource management.

D. ROAD CONNECTIONS
- Draw subtle animated road connections between selected locations.
- Use SVG or CSS.

E. EXPLORATION PROGRESS
- Track visited locations.
- Show progress such as 3/8 locations explored.
- Persist progress in localStorage.

F. ACHIEVEMENTS
- First Discovery.
- Project Explorer.
- Skill Collector.
- Island Explorer.

Unlock achievements based on actual interactions.
Display small, colorful notification popups.

G. COMPLETION SCREEN
- When all main locations have been visited, display a small celebratory animation.
- Include a CTA to contact the developer.
- Visitors can continue exploring afterward.

# 9. ABOUT ME

Display personal introduction, education, interests, and professional direction.

Use a board-game style information panel.

# 10. EXPERIENCE

Display:
FPT Software Philippines:
Software Engineering Intern, September 2025 – November 2025.
UiPath automation, coordination with business analysts and project managers, and English presentations to international stakeholders.

Everest Education:
Mathematics Teaching Assistant, 2025 – August 2026.
Bilingual mathematics class support, student engagement, and classroom activities.

FPT University:
Software Engineering student, 2024 – expected 2027.
30% merit scholarship.
Java Technology specialization.

# 11. SKILLS

Categories:
- Programming Languages.
- Backend.
- Frontend.
- Database.
- AI / LLM.
- Developer Tools.

Skills include:
Java, Python, SQL, JavaScript, TypeScript, Spring Boot, Spring Cloud, FastAPI, React, PostgreSQL, MSSQL, Neo4j, Docker, Git, RAG, GraphRAG, AI API Integration, Claude Code.

Use resource-inspired icons and inventory-like compact panels.

Do not fabricate skill levels or ratings.

# 12. CONTACT

Display:
- Email: nguynanhkhoa.cv@gmail.com
- GitHub: placeholder until actual URL is provided.
- LinkedIn: placeholder until actual URL is provided.
- Resume download.

Use a board-game victory-style panel:
"Thanks for exploring my island!"

CTA:
"Let's build something meaningful together."

# 13. QUICK VIEW MODE

Provide a conventional portfolio view.

Sections:
- Hero.
- About.
- Projects.
- Experience.
- Skills.
- Education.
- Contact.
- Resume.

Users must be able to switch between board exploration and Quick View at any time.

# 14. VISUAL DESIGN SYSTEM

Primary background:
Bright ocean blue.

Tile colors:
- Forest green.
- Brick orange/red.
- Wheat yellow.
- Stone gray.
- Sand beige.

UI:
- White and light cream panels.
- Rounded corners where appropriate.
- Clear borders.
- Soft drop shadows.
- Colorful icons.
- Readable typography.

The website should feel cheerful, playful, polished, and carefully designed.

Avoid:
- Dark cyberpunk styling.
- Neon overload.
- RPG inventory aesthetics.
- Excessive gradients.
- Generic corporate portfolio layouts.
- Flat, lifeless static tiles.

# 15. ANIMATION

Use Framer Motion.

Implement:
- Dice rolling.
- Tile hover and selection.
- Tile discovery.
- Resource collection.
- Road drawing.
- Achievement notifications.
- Modal transitions.
- Progress bar animation.
- Small celebratory animation.

Animations should feel like a real board game.

Use short, responsive interactions.
Avoid unnecessary continuous animations.

Respect prefers-reduced-motion.

# 16. RESPONSIVE DESIGN

Desktop:
- Large central island.
- Side information panel.
- Top navigation.
- Bottom player panel.

Tablet:
- Scaled board.
- Compact side panel.

Mobile:
- Reflow the hex map.
- Use touch-friendly tiles.
- Display detail panels as full-width drawers or modals.
- Provide conventional navigation.
- Do not require hover interactions.

# 17. TECHNICAL STACK

- React.
- Vite.
- TypeScript.
- Tailwind CSS.
- Framer Motion.
- Lucide React.

No backend.
No authentication.
No database.
Use localStorage for exploration progress and settings.

# 18. PROJECT STRUCTURE

Create a modular architecture:

src/
  components/
    board/
    hex-tile/
    game-ui/
    panels/
    navigation/
    animations/
  features/
    projects/
    about/
    experience/
    skills/
    contact/
    quick-view/
  data/
    projects.ts
    experience.ts
    skills.ts
    locations.ts
    achievements.ts
  hooks/
  lib/
  styles/

Keep components reusable and data separate from presentation.

# 19. IMPLEMENTATION PROCESS

PHASE 1:
Initialize the Vite React TypeScript project.
Install dependencies.
Configure Tailwind CSS.
Create design tokens and fonts.
Create the project architecture.

PHASE 2:
Implement the board layout.
Create reusable hexagonal tiles.
Create the ocean background.
Implement tile states and navigation.
Ensure the board looks polished before adding more features.

PHASE 3:
Implement project details.
Implement About.
Implement Experience.
Implement Skills.
Implement Contact.
Implement Quick View.

PHASE 4:
Implement dice animation.
Implement tile discovery.
Implement resource feedback.
Implement road animations.
Implement exploration progress.
Implement achievements.

PHASE 5:
Implement responsive design.
Add accessibility.
Add SEO metadata.
Optimize images and performance.
Add resume file support.

PHASE 6:
Run TypeScript checks.
Run production build.
Fix all errors.
Test all clickable interactions.
Test mobile and desktop.
Prepare Vercel deployment.

# 20. WORKING RULES

- This project must be built completely from scratch.
- Do not stop after writing a plan.
- Implement the full website.
- Do not use a static screenshot as the interactive board.
- Build actual interactive hex components.
- Do not invent personal data or project metrics.
- Do not fabricate social URLs.
- Use placeholders for missing links and assets.
- Do not copy Colonist branding or proprietary game assets.
- Do not leave decorative buttons without functionality.
- Prioritize visual quality, responsive behavior, and smooth interaction.

At completion, provide:
- Implemented features.
- Project structure.
- Dependencies.
- Build and test results.
- Missing assets.
- Local run commands.
- Vercel deployment instructions.

Start by initializing the project in the current directory and build the entire website.
# ORIGINALITY AND DESIGN INDEPENDENCE — CRITICAL

Colonist.io is ONLY a visual inspiration reference.

We are NOT building a Colonist clone, replica, reskin, or alternative implementation of its game.

The objective is to create an original developer portfolio that borrows selected high-level visual principles from modern hex-based board games.

## What may be inspired by Colonist
- Hexagonal geometric layouts.
- Bright, cheerful color palettes.
- Board-game-inspired visual hierarchy.
- Colorful map elements.
- Clear interactive states.
- Friendly visual feedback.
- Compact information panels.
- Tactile and playful interactions.

## What must be original
- Overall page composition.
- Island and map geometry.
- Hexagon placement and arrangement.
- Tile artwork and illustrations.
- Color system and design tokens.
- Typography.
- Icons and visual assets.
- Navigation.
- Information architecture.
- Interaction mechanics.
- Animations.
- Branding and logo.
- All portfolio-specific components.

## Strictly prohibited
- Copying Colonist screenshots or using them as website backgrounds.
- Reproducing its exact game board layout.
- Reusing its maps, tile arrangements, or board configurations.
- Copying its logo, branding, icons, illustrations, or proprietary assets.
- Recreating its exact player panels, resource cards, menus, or HUD.
- Reproducing its game rules or complete gameplay loop.
- Making the portfolio visually indistinguishable from Colonist.

## Original design direction

Create a unique visual identity for KHOA'S ISLAND.

The hexagonal board should be redesigned specifically to represent a developer's portfolio.

For example:
- Different tile shapes, proportions, and placement.
- Original project-themed illustrations.
- A custom island silhouette.
- Custom connection paths representing the developer's journey.
- Original navigation and information panels.
- Portfolio-specific interactions rather than copied board-game mechanics.

The website should be recognizable as an original interactive portfolio, not as a clone of an existing board game.

Before implementation:
1. Establish an original design system.
2. Define the custom board layout.
3. Create original component designs.
4. Document how the design differs from the reference.

If any element feels too similar to Colonist's exact implementation, redesign it.

The final result should communicate:
"Inspired by the playful visual language of hex-based board games, independently designed as a developer portfolio."

Originality and product identity take priority over visual imitation.
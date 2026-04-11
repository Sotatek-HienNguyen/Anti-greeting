# Project Roadmap

This roadmap documents completed milestones and tracks upcoming feature goals for Anti-greeting.

## Phase 1: Foundation (Completed)
- [x] Initial Vite React scaffolding.
- [x] Integrate Oxford 3000 static JSON list.
- [x] Create Flashcard UI component.
- [x] Build `api.js` integration with Free Dictionary API for Audio/Definitions.
- [x] Scaffold Landing Page (`Home.jsx`).

## Phase 2: Interactive Modules (Current)
- [x] Build Speech-to-Text component.
- [x] Create Writing practice logic with Dictation.
- [x] Integrate basic Semantic Scoring evaluation.
- [x] Build contextual video frame embedding using YouGlish iframe API.
- [x] Implement YouTube Shadowing Studio with segmenting and recording.
- [ ] Refactor `Shadowing.jsx` and `Writing.jsx` to meet the < 200 line limit standard.
- [ ] Build global navigation / topbar header for moving seamlessly between Lesson / Writing / Shadowing / Video modules.

## Phase 3: Progress & Persistence (Upcoming)
- [ ] Implement `localStorage` to save user's daily word batch so a page refresh doesn't reset today's lesson.
- [ ] Create a Dashboard to track past Semantic Scores in Writing.
- [ ] UI/UX Polish: Ensure global aesthetic standards (animations, glassmorphism) are applied deeply to all edge cases.

## Phase 4: Backend Integration (Future)
- [ ] Evaluate Supabase or Firebase for User Login.
- [ ] Deploy Application via Vercel or Cloudflare Pages.
- [ ] Advanced server-side semantic scoring logic (via an LLM / sentence-transformers) rather than rudimentary string matching.

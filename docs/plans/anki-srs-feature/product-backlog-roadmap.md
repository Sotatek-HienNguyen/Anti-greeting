# Product Backlog & Roadmap: Anki SRS Module

**Project**: Anti-greeting
**Owner**: Senior PM / Scrum Master
**Status**: Planning (Approved)
**Strategy**: Hybrid Data Model (Static `words.json` + Dynamic `LocalStorage`).

---

## 1. Project Epics

| Epic ID | Title | Description | Priority |
|---------|-------|-------------|----------|
| EPIC-01 | **SRS Core Engine** | Implementation of SM-2 algorithm and persistence bridge. | Critical |
| EPIC-02 | **Lexical Atelier UI** | 3-pane responsive study interface and Flashcard components. | High |
| EPIC-03 | **Content & CRUD** | Quick Edit Modal and data integration for 3,000 words. | High |
| EPIC-04 | **Analytics** | Progress tracking, streaks, and mastery visualization. | Medium |

---

## 2. Prioritized User Stories (Backlog)

### Sprint 1: Foundation (Logic & Data)
- **STORY-001**: As a system, I want to calculate card intervals using the SM-2 algorithm so that users review words at the optimal time.
    - **AC**: `srs-engine.js` correctly updates `interval`, `efactor`, and `repetitions` based on 1-4 grading.
- **STORY-002**: As a user, I want my progress to survive browser refreshes so that I don't lose my learning history.
    - **AC**: Data synced to `localStorage` under `srs_state` key.
- **STORY-003**: As a developer, I want to lazy-load 3,000 words from `words.json` to keep the application lightweight.
    - **AC**: `fetch` implementation with proper error handling for local JSON file.

### Sprint 2: Immersive Study (UI & Sessions)
- **STORY-004**: As a user, I want a distraction-free 3-pane layout so that I can focus entirely on the vocabulary card.
    - **AC**: Responsive CSS implementation (Sidebar-Center-Sidebar) based on Mockup.
- **STORY-005**: As a user, I want to use hotkeys (Space, 1-4, R) to navigate sessions rapidly.
    - **AC**: Global KeyboardListener active during study sessions.
- **STORY-006**: As a user, I want a 3D flip effect on flashcards to mimic a physical card experience.
    - **AC**: Framer Motion or CSS Transform transition on click/Space.

### Sprint 3: Customization & Insights (CRUD & Dashboard)
- **STORY-007**: As a user, I want to edit card examples and images via a Modal so that I can personalize my learning.
    - **AC**: `QuickEditModal` launched via 'E' key; saves to `user_overrides`.
- **STORY-008**: As a user, I want to see my daily streak and mastery count to stay motivated.
    - **AC**: Sidebar widgets update in real-time based on `srs_state`.

---

## 3. Sprint Timeline (Milestones)

- **Milestone 1 (End of Sprint 1)**: "Functional Core" — Algorithm tested with mock data, persistence layer working.
- **Milestone 2 (End of Sprint 2)**: "Visual Alpha" — 3-pane layout interactive with full 3D card experience.
- **Milestone 3 (End of Sprint 3)**: "Feature Complete" — CRUD Edit Mode and Analytics dashboard live.

---

## 4. Risk Management

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| LocalStorage Quota | High | Only store "Delta" (overrides) and minimal SRS metadata. Maximize use of shared `words.json`. |
| Algorithm Complexity | Medium | Unit test SM-2 logic separately before UI integration. |
| UI Performance | Medium | Optimize card rendering; avoid re-mounting sidebars on every card flip. |

---

## 5. Definition of Done (DoD)
- [ ] Code follows project standards (Vanilla CSS, HSL colors).
- [ ] No regression on Shadowing/Writing pages.
- [ ] Mobile navigation is fully functional.
- [ ] SM-2 logic passed 100% of unit test cases.

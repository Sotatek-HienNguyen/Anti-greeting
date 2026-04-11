# Phase 3: Session Workflow & Logic

## Goal
Implement the logic for day-to-day study sessions, including card queuing and interaction handling.

## Tasks
- [ ] **3.1 Queue Management**:
  - Filter logic for `Review` cards (NextReviewDate <= Today).
  - Limit logic for `New` cards (e.g., 20 new cards per day).
  - Shuffle logic for session variety.
- [ ] **3.2 Scoring Interface**: 
  - Buttons: "Again" (1), "Hard" (2), "Good" (3), "Easy" (4).
  - Transition logic: Auto-show next card after scoring.
- [ ] **3.3 Global Hotkeys**:
  - `Space` or `Enter`: Toggle Flashcard Flip.
  - `1`, `2`, `3`, `4`: Apply SRS score.
  - `R`: Replay pronunciation audio.

## Technical Consideration
- **Stale State**: Ensure that scoring a card updates the `localStorage` instantly to prevent duplicate reviews if the tab is closed.
- **Batch Updates**: If performance becomes an issue with 3000 items, implement a batch-saving mechanism for the session results.

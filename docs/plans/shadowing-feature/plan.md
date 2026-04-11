# Implementation Plan: YouTube Shadowing Module (MVP)

Comprehensive implementation plan for building a specialized YouTube shadowing tool with sentence repetition and recording features.

## Tasks

- [ ] Task 1: Initialize environment and YouTube IFrame API integration
- [ ] Task 2: Build Split-view UI (Video Section & Transcript Sidebar)
- [ ] Task 3: Implement Transcript parsing and real-time syncing logic
- [ ] Task 4: Develop Shadowing controls (Auto-pause & Sentence Loop)
- [ ] Task 5: Integrate Web MediaRecorder for local recording & playback
- [ ] Task 6: Build Counter System (100-Rep Goal) with LocalStorage persistence
- [ ] Task 7: Implement Global Hotkeys and UX polish (Auto-scroll, Confetti)

## Phases

### Phase 1: Foundation & YouTube Integration
- **Goal**: Setup the environment and connect to YouTube API with subtitle support.
- **Reference**: [phase-01-foundation.md](./phase-01-foundation.md)

### Phase 2: Split-view UI & Sync Logic
- **Goal**: Create the 60/40 layout and implement bi-directional sync between video and text.
- **Reference**: [phase-02-ui-sync.md](./phase-02-ui-sync.md)

### Phase 3: Shadowing & Recording Core
- **Goal**: Implement the core shadowing mechanics: Auto-pause, Sentence looping, and Local Recording.
- **Reference**: [phase-03-shadowing-logic.md](./phase-03-shadowing-logic.md)

### Phase 4: Gamification & Persistence
- **Goal**: Implement the 100-repetition counter system and save progress to browser storage.
- **Reference**: [phase-04-gamification.md](./phase-04-gamification.md)

### Phase 5: Final Polish & UX
- **Goal**: Add hotkeys, smooth scrolling, and celebration effects for better user experience.
- **Reference**: [phase-05-polish.md](./phase-05-polish.md)

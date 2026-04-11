# Implementation Plan: Advanced English Spaced Repetition System (SRS)

A professional roadmap to build a high-performance, aesthetically pleasing SRS module inspired by Anki and modern "Lexical Atelier" designs.

## Overview
This feature transforms the existing static flashcard system into a dynamic, memory-optimized learning engine. It integrates the SuperMemo-2 (SM-2) algorithm to predict optimal review times for each of the 3,000 core words.

## Tasks Checklist

### Phase 1: Engine & Persistence (The "Brain")
- [ ] Task 1.1: Implement core SM-2 algorithm logic.
- [ ] Task 1.2: Build `localStorage` persistence layer for card scheduling.
- [ ] Task 1.3: Create data migration/seeding script for Oxford 3000 list.
- [ ] Task 1.4: Unit tests for scheduling edge cases.

### Phase 2: Visual Identity & UI (The "Face")
- [ ] Task 2.1: Implement 3-pane layout (Sidebar L/R + Center Study Area).
- [ ] Task 2.2: Build "Pro" Flashcard component with front/back transitions.
- [ ] Task 2.3: Integrate multimedia display (IPA, Audio, Images).
- [ ] Task 2.4: Implement "Nuance Note" and "Collocations" UI sections.

### Phase 3: Session Workflow & Logic (The "Heart")
- [ ] Task 3.1: Implement Daily Queue manager (New Cards vs. Reviews).
- [ ] Task 3.2: Build Grading Buttons (Again, Hard, Good, Easy) + Animation.
- [ ] Task 3.3: Implement Global Keyboard Shortcuts (Space, 1, 2, 3, 4, R).

### Phase 4: CRUD & Real-time Customization (The "Hands")
- [ ] Task 4.1: Implement 'E' hotkey for Instant Edit Mode.
- [ ] Task 4.2: Build Modal Form for updating meanings/images/examples (Image URLs only, no file uploads).
- [ ] Task 4.3: Implement 'S' to Save/Sync with local storage instantly.

### Phase 5: Progress & Analytics (The "Memory")
- [ ] Task 5.1: Build Dashboard stats (Streak, Daily Goal, Mastery count).
- [ ] Task 5.2: Implement visual progress indicators (Session progress bar).
- [ ] Task 5.3: Add celebration effects (Confetti on session completion).

## Technical References
- **Mockup Source**: [Lexical Atelier Mockup Design](../../artifacts/srs_mockup.png)
- **Algorithm**: [SM-2 Documentation](https://en.wikipedia.org/wiki/SuperMemo#Description_of_SM-2_algorithm)
- **Data Schema**: [docs/prds/anki.md#3-data-schema](../../docs/prds/anki.md)

## Success Metrics
1. **Zero Data Loss**: SRS state must survive page refreshes and browser restarts.
2. **Sub-100ms Latency**: Card transitions and grading must feel instantaneous.
3. **Accuracy**: The SM-2 algorithm must correctly calculate intervals based on user feedback.

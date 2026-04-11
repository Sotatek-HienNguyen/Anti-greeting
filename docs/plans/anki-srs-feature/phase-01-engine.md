# Phase 1: SRS Engine & Persistence

## Goal
Implement the core mathematical model for Spaced Repetition and establish a reliable persistence layer for card scheduling data.

## Tasks
- [ ] **1.1 Algorithm Implementation**: Create a utility library `srs-engine.js` with the SM-2 algorithm.
  - Input: `quality` (0-5), `prevInterval`, `prevEF`.
  - Output: `newInterval`, `newEF`, `repetitionCount`.
- [ ] **1.2 Persistence Layer**: Implement `SRSStorageManager`.
  - Handle `localStorage` operations for card states.
  - Implement a conflict resolution strategy (e.g., local state wins over static file state).
- [ ] **1.3 Data Migration Utility**: Create a script to map the existing `words.json` array to the new rich JSON schema.
  - Default initial SRS state: `interval: 0, repetitions: 0, easiness: 2.5`.
- [ ] **1.4 Unit Verification**: Write Vitest test cases for interval calculations (e.g., verifying that "Easy" gives a significantly longer interval than "Hard").

## Technical Consideration
- **Easiness Factor (EF)**: Start at 2.5 as per standard SM-2. Minimum EF should be 1.3 to avoid "stagnant" intervals.
- **Interval calculation**: `I(1) = 1`, `I(2) = 6`, `I(n) = I(n-1) * EF`.

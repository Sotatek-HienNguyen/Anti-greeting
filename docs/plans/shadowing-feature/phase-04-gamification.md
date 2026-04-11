# Phase 4: Gamification & Persistence

## Objectives
- Implement the 100-repetition counter system.
- Persist progress using Local Storage.
- Visualizing mastery states.

## Tasks
- [ ] Setup `LocalStorage` schema to store `{ videoId: { sentenceId: count } }` (FR11, 7.3).
- [ ] Implement `incrementRep` logic: +1 when recording finishes or manual "Mark as Done" (7.1).
- [ ] Build Counter Tags UI on each transcript sentence (e.g. `Reps: 15/100`) (FR12).
- [ ] Implement `Mastery` visual states: Change color to Gold/Green when count >= 100 (FR13).
- [ ] Build Global Progress Bar at the top of the Transcript panel (7.2).

## Technical Notes
- Use a throttled save mechanism to prevent excessive Writes to LocalStorage.
- Ensure unique `sentenceId` based on start time or index within the video.

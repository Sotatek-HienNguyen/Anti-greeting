# Phase 2: Split-view UI & Sync Logic

## Objectives
- Implement the Split-view layout (60/40).
- Sync video playback with transcript highlighting.
- Enable click-to-seek functionality.

## Tasks
- [ ] Implement responsive layout: Left (Player, 60%) and Right (Transcript Sidebar, 40%) (FR4, FR5).
- [ ] Create `TranscriptList` component to render sentences based on timestamps.
- [ ] Implement `useVideoSync` hook to track `player.getCurrentTime()` and highlight active sentence (FR6).
- [ ] Add `onClick` for transcript items to seek video to specific timestamp (FR7).
- [ ] Implement video speed control bridge (0.5x, 0.75x, 1x, 1.25x) (FR4).

## Technical Notes
- Polling `getCurrentTime()` every 200ms for smooth highlighting.
- Use `scrollIntoView({ behavior: 'smooth', block: 'center' })` for active transcript items.

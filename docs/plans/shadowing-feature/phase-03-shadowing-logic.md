# Phase 3: Shadowing & Recording Core

## Objectives
- Implement specialized shadowing modes (Auto-pause, Loop).
- Integrate voice recording and playback comparison.

## Tasks
- [ ] Implement `Auto-pause` logic: Pause video when `currentTime >= activeSentence.end` (FR8).
- [ ] Implement `Sentence Loop` mode: Reset `currentTime` to `activeSentence.start` when it reaches end (FR9).
- [ ] Integrate `MediaRecorder` API for local voice recording (FR10).
- [ ] Build Recording UI overlays: "Record", "Stop", "Play original vs yours".
- [ ] Add playback logic: Play video segment followed by user's recorded audio (Reference playback).

## Technical Notes
- Ensure state consistency when switching between "Auto-pause" and "Loop" modes.
- Use `Blob` and `URL.createObjectURL` for temporary audio storage.

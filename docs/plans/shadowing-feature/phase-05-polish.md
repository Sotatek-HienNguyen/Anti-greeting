# Phase 5: Final Polish & UX

## Objectives
- Add hotkeys for seamless control.
- Implement auto-scroll and font customization.
- Add "Mastery" celebration effects.

## Tasks
- [ ] Implement Global Hotkey listener (Space, R, L, Ctrl+Arrows) as per SRS 3.1 & 6.3.
- [ ] Refine "Auto-scroll" UI: Active sentence always stays centered (3.2).
- [ ] Add Font size and Toggle translation options (6.2).
- [ ] Integrate `canvas-confetti` for "Mastery" celebration effect (FR13, 7.2).
- [ ] Final performance audit for long videos (1000+ transcript items).

## Technical Notes
- Use `useHotkeys` or similar hook for managing keyboard events across components.
- Check `intersection-observer` if smooth scroll needs more optimization.

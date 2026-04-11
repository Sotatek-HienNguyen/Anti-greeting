# Phase 2: User Interface & "Lexical Atelier" Aesthetic

## Goal
Build a high-fidelity, distraction-free learning environment that feels premium and responsive.

## Tasks
- [ ] **2.1 Layout (The Studio)**: Create `SRSPage.jsx` with a 3-pane responsive layout.
  - Left: Progress & Streaks (Hidden on mobile, summarized at top).
  - Center: Learning Card Area (Full width on mobile).
  - Right: Metadata & Tags (Hidden on mobile, toggled via info menu).
- [ ] **2.2 Pro Flashcard Component**: 
  - Implement 3D flip effect using CSS `backface-visibility`.
  - Add front-loading skeleton states for audio/image fetching.
- [ ] **2.3 Multimedia Integration**:
  - Image rendering with fallback (Placeholder if URL fails).
  - Audio playback button with custom styling (no default HTML player).
- [ ] **2.4 Typography & Spacing**:
  - Use `Outfit` or `Inter` font family for high readability.
  - Implement Glassmorphism theme (consistent with current UI).

## Technical Consideration
- **Contrast**: Ensure high contrast for definition text.
- **Micro-animations**: Subtle scale-up on hover for difficulty buttons.
- **Focus Mode**: Hide navigation bar during active review sessions.

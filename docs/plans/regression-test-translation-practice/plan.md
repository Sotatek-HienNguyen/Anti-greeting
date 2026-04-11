# Implementation Plan - Regression Test for Translation Practice

## Problem Statement
Ensure the "Luyện dịch" (Translation Practice) feature remains functional, accurate, and provides a stable user experience across updates. This includes verifying state transitions, input methods (Speech-to-Text & Typing), scoring accuracy, and UI consistency.

## Proposed Changes

### Phase 1: Test Strategy & Scenarios
- Define core test cases based on [UC-WRT-001](../../docs/usecases/writing/uc-writing-001-speech-to-text.md).
- Identify critical paths: Session start -> Input -> Navigation -> Submission -> Results.
- Define edge cases: Empty input, browser incompatibility, permission denials.

### Phase 2: Unit & Integration Testing
- Verify `fetchWritingSession` returns valid data structure (10 questions, unique session ID).
- Verify `submitWritingSession` scoring logic (string similarity thresholds for 0.85, 0.55).
- Test `playHint` with `speechSynthesis` mock.

### Phase 3: E2E Testing (Interactions)
- **Manual Input**: Type translation, move next, verify answer persistence.
- **Speech Input**: Mock `SpeechRecognition` to simulate voice capture and appending to textarea.
- **Navigation**: Test 'Prev' and 'Next' buttons for state preservation.
- **Results View**: Verify display of total score and feedback messages based on result status (correct, partial, incorrect).

### Phase 4: UI/UX & Cross-browser Validation
- Verify glassmorphism styles and animations are intact.
- Check responsive behavior of the translation textarea and cards.
- Test fallback UI when `SpeechRecognition` is unavailable.

## Tasks

- [x] Task 1: Create test data set for regression (sentences and expected results)
- [x] Task 2: Implement Unit tests for `api.js` (fetch and submit logic)
- [x] Task 3: Implement Integration tests for `Writing.jsx` state management
- [x] Task 4: Implement Mock for `SpeechRecognition` and `speechSynthesis`
- [x] Task 5: Run full regression cycle and document findings

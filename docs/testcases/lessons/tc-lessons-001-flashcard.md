# Test Cases: UC-LES-001 — Interact with Daily Flashcard Batch

**Related UC**: [UC-LES-001](../../usecases/lessons/uc-lessons-001-flashcard.md)
**Module**: Lessons (Vocabulary)
**Last Updated**: 2026-04-10

---

## TC-VOC-001-01: Standard Study Flow (Happy Path)

- **Type**: Positive
- **Priority**: Critical
- **Method**: UI
- **Precondition**:
  - User is on the Home page.
- **Steps**:
  1. Click "🚀 Bắt đầu học ngay".
  2. Verify that the system displays 10 words.
  3. Click "Tiếp theo" repeatedly until Question 10.
  4. Verify the button text changes to "Hoàn thành".
- **Expected Result**:
  - Successfully navigates from 1/10 to 10/10.
  - Data for each word is fetched correctly.
- **Status**: Pending

---

## TC-VOC-001-02: Flashcard Flip Interaction

- **Type**: Positive
- **Priority**: High
- **Method**: UI
- **Precondition**:
  - User is at Lesson screen, card is on Front side.
- **Steps**:
  1. Click anywhere on the Flashcard (Front).
  2. Click anywhere on the Flashcard (Back) - avoiding the video button.
- **Expected Result**:
  - Step 1: Card flips to Back showing definition and examples.
  - Step 2: Card flips back to Front showing word and phonetic.
- **Status**: Pending

---

## TC-VOC-001-03: Audio Playback (Keyboard Shortcut)

- **Type**: Positive
- **Priority**: High
- **Method**: UI
- **Precondition**:
  - Word has valid audio URL from API.
- **Steps**:
  1. Press the 'R' key on the keyboard.
- **Expected Result**:
  - System plays the pronunciation audio for the current word.
- **Status**: Pending

---

## TC-VOC-001-04: API Failure Fallback (Dictionary Not Found)

- **Type**: Negative / Exception
- **Priority**: Medium
- **Method**: UI
- **Precondition**:
  - System attempts to fetch a word that does not exist in the Dictionary API (e.g. mock 404).
- **Steps**:
  1. Navigate to a word that yields an API error.
- **Expected Result**:
  - System displays: "No definition found in the dictionary."
  - UI does not crash.
  - Navigation remains functional.
- **Status**: Pending

---

## TC-WRT-001-05: Real-world Context (Video Overlay)

- **Type**: Positive
- **Priority**: Medium
- **Method**: UI
- **Precondition**:
  - Flashcard is on the Back side.
- **Steps**:
  1. Click "🎬 Xem ngữ cảnh thực tế (Video)".
  2. Observe the YouGlish/YouTube overlay.
  3. Click "X" or Close button on overlay.
- **Expected Result**:
  - Video overlay opens with the correct word search.
  - Closing overlay returns user to the Back side of the card.
- **Status**: Pending

---

## TC-WRT-001-06: Navigation Persistence & Bounds

- **Type**: Edge
- **Priority**: Medium
- **Method**: UI
- **Precondition**:
  - User is at Word 2/10.
- **Steps**:
  1. Click "Quay lại".
  2. Observe Word 1/10.
  3. Verify "Quay lại" button is disabled.
- **Expected Result**:
  - Navigates back correctly.
  - Button state (disabled/opacity) reflects bounds.
- **Status**: Pending

# UC-LES-002: Word Pronunciation & Audio

**Module**: Lessons / Flashcards
**Actor**: User
**Priority**: High
**Last Updated**: 2026-04-12

---

## Precondition
- User is on the Lesson page viewing a specific word.
- The `Flashcard` component has successfully loaded data from the dictionary API.

## Main Flow
1. **User** clicks the "Play Audio" button (Speaker icon) on the Flashcard.
2. **System** retrieves the US-accent MP3 URL from the dictionary API state.
3. **System** plays the audio.
4. **User** listens to the native pronunciation.

## Alternative Flows
- **AF-1: Audio Unavailable**:
  - If the API did not return an audio URL:
  - System disables the "Play Audio" button or shows a tooltip "Audio not available".

## Postcondition
- The audio is played clearly to the user.

## Business Rules
- BR-005: Use US accent as the primary default pronunciation if multiple are available.

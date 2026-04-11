# Use Case: SRS Study Session

**ID**: UC-ANKI-001
**Title**: Conduct SRS Study Session
**Module**: Anki SRS
**Actor**: User

---

## 1. Description
The user engages in a study session where they review flashcards scheduled by the SRS algorithm. They view the front side, recall the meaning, flip the card to check, and grade their performance.

## 2. Preconditions
- The user is logged in (if applicable) and has navigated to the "Sessions" tab.
- The `words.json` data is loaded.
- There are cards in the queue (Review or New).

## 3. Basic Flow
1. **System** identifies the next card in the priority queue (Review > New).
2. **System** displays the **Front Side** of the card (Word, IPA, Audio, Word Class, Image).
3. **User** attempts to recall the meaning.
4. **User** presses `Space` or clicks the "Show Answer" button.
5. **System** displays the **Back Side** (Definitions, Examples, Collocations, synonyms, etc.) while keeping the front information visible.
6. **User** reviews the answer and assesses their performance.
7. **User** presses a rating key (`1`, `2`, `3`, or `4`) or clicks a rating button.
8. **System** processes the grade via the SM-2 algorithm:
    - Calculates the new interval and next review date.
    - Saves the state to LocalStorage.
9. **System** updates the session progress bar and displays the next card in the queue.
10. The cycle repeats until the queue is empty.

## 4. Alternative Flows
- **Audio Playback**: The user can press `R` at any time (Front or Back) to hear the US-accent pronunciation.
- **Quick Edit**: The user can press `E` at any time to enter Edit Mode (UC-ANKI-002).

## 5. Postconditions
- The SRS state for graded cards is updated in LocalStorage.
- User streak and daily goals are updated (if applicable).
- The user is presented with a "Session Complete" summary screen once the queue is empty.

## 6. Business Rules
- **BR-SRS-001**: "Review" cards must be completed before "New" cards are introduced.
- **BR-SRS-002**: Grading a card as "Again" (1) moves it to the end of the current session's short-term learning queue.

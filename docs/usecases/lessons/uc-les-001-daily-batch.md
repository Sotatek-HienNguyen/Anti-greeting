# UC-LES-001: Study Daily Word Batch

**Module**: Lessons
**Actor**: User
**Priority**: High
**Last Updated**: 2026-04-12

---

## Precondition
- The `words.json` data file exists in the repository.
- The user has navigated to the `/lesson` page.

## Main Flow
1. **User** enters the Lesson page.
2. **System** selects 10 random words from the Oxford 3000 list.
3. **System** displays the first word in the Flashcard interface (Front side).
4. **User** views the word and attempts to recall context/meaning.
5. **User** clicks the Flashcard to flip (Back side).
6. **System** displays definitions and examples fetched from the dictionary API.
7. **User** clicks "Tiếp theo" to move to the next card.
8. **System** updates the progress indicator (e.g., 2/10).
9. **User** repeats steps 4-8 until the 10th card.
10. **System** displays the "Hoàn thành" button on the final card.

## Alternative Flows
- **AF-1: Return to Previous Card**:
  - At step 7, the user clicks "Quay lại".
  - System displays the previous card.

## Postcondition
- The user has viewed and interacted with 10 words.

## Business Rules
- BR-001: Daily batch must be randomized on every page mount.

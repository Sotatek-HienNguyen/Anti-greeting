# UC-LES-001: Interact with Daily Flashcard Batch

**Module**: lessons
**Actor**: Learner
**Priority**: High
**Last Updated**: 2026-04-09

## Precondition

- The system has loaded the Oxford 3000 vocabulary list.
- User navigated to the Lesson screen.

## Main Flow

1. System randomly selects 10 words to form today's daily batch.
2. System displays the first word in the batch via the Flashcard component.
3. System automatically fetches the word definition and pronunciation audio from the Free Dictionary API.
4. User clicks "Tiếp theo" (Next) after reviewing the flashcard.
5. System displays the subsequent word in the sequence.
6. Steps 3-5 repeat until the batch ends.

## Alternative Flows

### AF-1: Re-listen to Audio
- At step 4, if the user wishes to replay pronunciation:
  1. User clicks the speaker icon or presses a designated keyboard shortcut.
  2. System replays the cached audio file without making a new API request.
  3. Return to step 4.

## Exception Flows

### EF-1: API Failure / Word Not Found
- At step 3, if the Free Dictionary API returns an error or 404:
  1. System catches the exception gracefully.
  2. System displays a fallback placeholder indicating the definition could not be retrieved.
  3. Process continues allowing the user to navigate to the next word.

## Postcondition

- The user has seen and reviewed 10 English vocabulary words.
- User is shown a completion state when the batch reaches the 10th item.

## Business Rules

- BR-001: Daily words batch must contain exactly 10 words selected randomly
- BR-002: Next button should act as "Finish" if on the last word

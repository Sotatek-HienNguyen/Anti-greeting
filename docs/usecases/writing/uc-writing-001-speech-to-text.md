# UC-WRT-001: Speech to Text Translation Practice

**Module**: writing
**Actor**: Learner
**Priority**: High
**Last Updated**: 2026-04-09

## Precondition

- Browser supports the SpeechRecognition standard.
- User has granted microphone permissions.

## Main Flow

1. User lands on the Writing practice screen.
2. System presents a sentence to translate / dictate.
3. User presses the "Start Audio" / Microphone button.
4. System begins listening to the user's voice input.
5. User speaks their sentence into the microphone.
6. User presses "Stop" or stops speaking.
7. System processes the speech and converts it into a text string.
8. System uses a semantic scoring logic to evaluate how well the text matches the intended answer.
9. System displays the text and the final score to the user.

## Alternative Flows

### AF-1: Auto-Stop on Silence
- At step 6, if the user stops speaking:
  1. Speech recognition engine detects silence.
  2. System automatically concludes the recording session.
  3. Return to main flow at step 7.

## Exception Flows

### EF-1: Microphone Permission Denied
- At step 3, if the browser blocks microphone access:
  1. System catches the permission denial.
  2. System shows an error message prompting the user to allow microphone access in browser settings.

### EF-2: Unsupported Browser
- At step 1, if SpeechRecognition is not available on window object:
  1. System reveals an error notification.
  2. System hides microphone input controls, offering a fallback text input alternatively.

## Postcondition

- The system has captured the user's speech, evaluated it, and provided actionable feedback.

## Business Rules

- BR-003: Only allow speech recognition on browsers that support webkitSpeechRecognition/SpeechRecognition

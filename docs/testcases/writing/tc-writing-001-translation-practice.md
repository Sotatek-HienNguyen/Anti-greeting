# Test Cases: UC-WRT-001 — Translation Practice (Text + Speech Input)

**Related UC**: [UC-WRT-001](../../usecases/writing/uc-writing-001-speech-to-text.md)
**Module**: Writing
**Last Updated**: 2026-04-10

---

## TC-WRT-001-01: Translation via Manual Text Input (Happy Path)

- **Type**: Positive
- **Priority**: Critical
- **Method**: UI
- **Precondition**:
  - User is on the Writing practice screen.
  - Question 1/10 is displayed: "Bạn có thích đọc sách không?".
- **Test Data**:
  - `userAnswer`: "Do you like reading books?"
- **Steps**:
  1. Input "Do you like reading books?" into the textarea.
  2. Click "Câu tiếp theo".
- **Expected Result**:
  - System evaluates the answer.
  - System displays feedback (Correct/Score).
  - System transitions to Question 2/10.
- **Actual Result**: __-___
- **Status**: Pending

---

## TC-WRT-001-02: Translation via Speech-to-Text (Happy Path)

- **Type**: Positive
- **Priority**: High
- **Method**: UI
- **Precondition**:
  - User is on the Writing practice screen.
  - Browser supports SpeechRecognition.
  - Microphone permission granted.
- **Test Data**:
  - Voice Input: "I am learning English."
- **Steps**:
  1. Click 🎤 "Nói để nhập".
  2. Speak clearly: "I am learning English."
  3. Wait for auto-stop or click stop.
- **Expected Result**:
  - Voice is converted to text: "I am learning English."
  - Text is auto-filled into the textarea.
  - User can review/edit the text.
- **Actual Result**: __-___
- **Status**: Pending

---

## TC-WRT-001-03: Semantic Matching Evaluation (Partial Match)

- **Type**: Positive
- **Priority**: High
- **Method**: UI
- **Precondition**:
  - Question: "Tôi đang học tiếng Anh."
  - Target: "I am learning English."
- **Test Data**:
  - `userAnswer`: "I'm studying English."
- **Steps**:
  1. Input "I'm studying English." (synonym for learning).
  2. Click "Câu tiếp theo".
- **Expected Result**:
  - System handles synonym and rewards a high score (e.g., >80%).
  - Result status reflects "Acceptable" or "Correct" (depending on BR-004 logic).
- **Actual Result**: __-___
- **Status**: Pending

---

## TC-WRT-001-04: Negative Scenario: Empty Input Validation

- **Type**: Negative
- **Priority**: High
- **Method**: UI
- **Precondition**:
  - User is on any question.
- **Test Data**:
  - `userAnswer`: "" (empty string)
- **Steps**:
  1. Leave textarea empty.
  2. Click "Câu tiếp theo".
- **Expected Result**:
  - System shows error: "Vui lòng nhập câu trả lời".
  - Does not navigate to the next question.
- **Actual Result**: System displays red border and error message: "Vui lòng nhập câu trả lời".
- **Status**: Pass

---

## TC-WRT-001-05: Exception Scenario: Microphone Permission Denied

- **Type**: Exception
- **Priority**: High
- **Method**: UI
- **Precondition**:
  - Browser microphone permission is "Blocked" for the site.
- **Steps**:
  1. Click 🎤 "Nói để nhập".
- **Expected Result**:
  - System catches permission error.
  - System displays message: "Vui lòng cấp quyền microphone để sử dụng chức năng này".
  - Microphone button becomes disabled or reflects error state.
- **Actual Result**: __-___
- **Status**: Pending

---

## TC-WRT-001-06: Edge Case: Auto-Stop on Silence

- **Type**: Edge
- **Priority**: Medium
- **Method**: UI
- **Precondition**:
  - SpeechRecognition is active (System is listening).
- **Steps**:
  1. User starts speaking then stops and remains silent for 3+ seconds.
- **Expected Result**:
  - Speech engine detects silence.
  - System automatically stops recording.
  - System converts captured audio to text and fills textarea.
- **Actual Result**: __-___
- **Status**: Pending

---

## TC-WRT-001-07: Navigation Integrity (Back/Next)

- **Type**: Edge
- **Priority**: Medium
- **Method**: UI
- **Precondition**:
  - User is at Question 2/10.
  - User already answered Question 1.
- **Steps**:
  1. Click "Quay lại".
- **Expected Result**:
  - System returns to Question 1/10.
  - Previous answer remains visible in the textarea (Persistence check).
- **Actual Result**: __-___
- **Status**: Pending

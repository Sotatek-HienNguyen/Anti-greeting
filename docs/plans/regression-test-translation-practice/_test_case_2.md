# Regression Test Cases - Translation Practice

## TC-001: Session Lifecycle [PASS]
- **Goal**: Verify full flow from landing to results.
- **Preconditions**: Microphone permission granted.
- **Steps**:
    1. Click "Bắt đầu Practice".
    2. Answer 10 questions (mix of typing and speech).
    3. Click "Submit All".
- **Expected**: 
    - Questions load correctly.
    - Progress counter (X/10) updates.
    - Results screen displays correct total score and feedback for all 10 items.

## TC-002: Manual Typing Persistence [PASS]
- **Goal**: Ensure typed answers are saved when navigating.
- **Steps**:
    1. Type "Hello world" on Question 1.
    2. Click "Next".
    3. Click "Quay lại".
- **Expected**: "Hello world" is still present in the textarea.

## TC-003: Speech-to-Text Integration [PASS]
- **Goal**: Verify speech input appends to existing text.
- **Steps**:
    1. Type "I am" in the textarea.
    2. Click Microphone button.
    3. Speak "happy".
- **Expected**: Textarea contains "I am happy".

## TC-004: Semantic Scoring Thresholds [PASS]
- **Goal**: Verify scoring logic for different accuracy levels.
- **Scenarios**:
    - **Exact Match** (Score > 0.85): Status "correct", green border, "Tuyệt cú mèo!" feedback.
    - **Close Match** (Score 0.55 - 0.85): Status "partial", yellow border, "Gần đúng!" feedback.
    - **Incorrect** (Score < 0.55): Status "incorrect", red border, "Chưa chính xác" feedback.

## TC-005: Hint Functionality [PASS]
- **Goal**: Verify text-to-speech hint.
- **Steps**:
    1. Click voice icon on a question.
- **Expected**: `window.speechSynthesis` speaks the English hint.

## TC-006: Error Fallback (STT Unavailable) [PASS]
- **Goal**: Ensure the app works without SpeechRecognition.
- **Steps**:
    1. Open in a browser without `webkitSpeechRecognition`.
- **Expected**: 
    - App displays "Trình duyệt không hỗ trợ Speech Recognition".
    - Manual typing still works.
    - No crashes occur.

## TC-007: Microphone Permission Denial [PASS]
- **Goal**: Handle user blocking mic.
- **Steps**:
    1. Block microphone permission.
    2. Click Microphone button.
- **Expected**: System catches error and displays prompt to allow access.

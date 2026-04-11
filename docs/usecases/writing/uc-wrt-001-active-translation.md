# UC-WRT-001: Active Translation with Speech Input

**Module**: Writing Practice
**Actor**: User
**Priority**: High
**Last Updated**: 2026-04-12

---

## Precondition
- User has navigated to the `/writing` page.
- Browser supports `webkitSpeechRecognition` or `SpeechRecognition` for voice input.

## Main Flow
1. **User** clicks "Bắt đầu Practice".
2. **System** displays a Vietnamese sentence to be translated.
3. **User** chooses to input via voice (clicks microphone icon) or text (types in textarea).
4. **If Voice**:
   - **System** activates the microphone.
   - **User** speaks the English translation.
   - **System** converts speech to text and populates the textarea.
5. **System** allows the user to manually refine the text.
6. **User** clicks "Câu tiếp theo".
7. **System** saves the answer in the session state.

## Alternative Flows
- **AF-1: Mic Permission Denied**:
  - System displays an alert "Microphone access denied" and instructs user to use manual typing.

## Exception Flows
- **EF-1: No Answer Provided**:
  - If user clicks "Next" without input, System displays a shake animation and warning "Vui lòng nhập câu trả lời".

## Postcondition
- The user's translation is captured for evaluation.

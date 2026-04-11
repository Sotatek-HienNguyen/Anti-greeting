# UC-WRT-002: Semantic Scoring Evaluation

**Module**: Writing Practice
**Actor**: User
**Priority**: High
**Last Updated**: 2026-04-12

---

## Precondition
- User has completed 10 translation questions.
- User clicks "Submit All".

## Main Flow
1. **User** clicks "🚀 Submit All (Chấm Điểm)".
2. **System** sends the batch of answers to the backend scoring service.
3. **System** displays a loading state "Hệ thống đang chấm điểm...".
4. **System** receives results containing score (0-100), feedback, and reference suggestions.
5. **System** displays the "Results" screen with the total score and a breakdown per question.
6. **User** reviews the semantic comparison for each answer.

## Postcondition
- The user understands their accuracy level via semantic score.

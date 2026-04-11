# Use Case: SRS Session Analytics & Progress

**ID**: UC-ANKI-003
**Title**: View Study Progress and Analytics
**Module**: Anki SRS
**Actor**: User

---

## 1. Description
The user monitors their learning progress, streaks, and mastery statistics to stay motivated and understand their performance over time.

## 2. Preconditions
- The user has completed at least one study session.
- The `srs_state` data contains historically graded cards.

## 3. Basic Flow
1. **User** navigates to the "Sessions" or "Dashboard" view.
2. **System** scans the `srs_state` in LocalStorage.
3. **System** calculates the following metrics:
    - **Current Streak**: Number of consecutive days with at least one card studied.
    - **Daily Goal**: Percentage completion of the daily card limit (e.g., 20/40 words).
    - **Mastered Count**: Number of cards with an interval > 21 days (Mature cards).
    - **Session Progress**: Cards finished vs. total cards in the current queue.
4. **System** displays these metrics in the Sidebar (Desktop) or Header (Mobile).
5. **System** (Optional) displays a поздравления (Confetti) effect upon reaching the Daily Goal.

## 4. Alternative Flows
- **Metadata Inspection**: While studying a specific card, the user views the right sidebar to see the card's specific "Stability" (recall probability) and "Last Review" date.

## 5. Postconditions
- The user has an updated view of their learning progress.

## 6. Business Rules
- **BR-SRS-005**: A "Mastered" card is defined as a card that has reached an interval of at least 21 days without a lapse, indicating durable long-term retention.

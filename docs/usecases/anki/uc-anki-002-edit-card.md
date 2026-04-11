# Use Case: SRS Quick Edit (Modal)

**ID**: UC-ANKI-002
**Title**: Edit Flashcard Content via Modal
**Module**: Anki SRS
**Actor**: User

---

## 1. Description
The user modifies the content of a specific flashcard (meaning, examples, or image) during a study session or from the library to improve their learning material.

## 2. Preconditions
- The user is currently viewing a card (Front or Back side).
- The `user_overrides` data structure is initialized in LocalStorage.

## 3. Basic Flow
1. **User** presses `E` or clicks the "Edit" hint/button.
2. **System** pauses the session timer (if active) and opens the **Quick Edit Modal** overlay.
3. **System** populates the modal fields with the current card data:
    - Current Visual Anchor (URL).
    - Example sentences (bulk text area).
    - English/Vietnamese meanings (optional fields).
4. **User** modifies the desired fields:
    - **Change Image**: Paste a new **Image URL**.
    - **Bulk Edit Examples**: Add or modify sentences (one per line).
5. **User** clicks the "Update Lexicon" button or presses `Cmd/Ctrl + S`.
6. **System** validates the inputs (e.g., checks if the Image URL is a valid format).
7. **System** saves the modified data to the `user_overrides` object in LocalStorage.
8. **System** closes the modal and instantly refreshes the card UI with the new data.

## 4. Alternative Flows
- **Cancel Changes**: The user clicks "Cancel" or presses `Esc`. The modal closes without saving, and the card reverts to its previous state.
- **Remove Media**: The user clicks "Remove" on the image preview. The `Image URL` is cleared in the overrides.

## 5. Postconditions
- The specific card ID in `user_overrides` contains the modified content.
- The UI reflects the changes immediately for the remainder of the session.

## 6. Business Rules
- **BR-SRS-003**: Physical file uploads are prohibited. Only `https://` or `http://` URLs are accepted for images to prevent LocalStorage bloat.
- **BR-SRS-004**: System-wide `words.json` remains unchanged; all edits are stored as "patches" in LocalStorage and merged at runtime.

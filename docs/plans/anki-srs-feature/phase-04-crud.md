# Phase 4: CRUD & Real-time Customization

## Goal
Enable users to personalize their learning materials instantly during study sessions to increase engagement and accuracy.

## Tasks
- [ ] **4.1 Modal Quick-Edit**: 
  - Toggle UI into "Edit Mode" (open a centralized Modal overlay) when pressing `E`.
  - Provide a clean form layout for updating display text (definition, meaning, examples).
- [ ] **4.2 Resource Management**:
  - Add text field for `Image URL` (Strict constraint: URL inputs only to prevent LocalStorage bloat. NO physical file uploads).
  - Add "Collocations" and "Nuance Notes" editing.
- [ ] **4.3 Persistence & Shortcuts**:
  - `Cmd/Ctrl + S`: Batch save current card changes.
  - `Esc`: Cancel editing without saving.

## Technical Consideration
- **Optimistic UI**: Update the local React state immediately and trigger the `SRSStorageManager.save()` in the background.
- **Form Controls**: Use controlled components for the edit fields for validation before saving.

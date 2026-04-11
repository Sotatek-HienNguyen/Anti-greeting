# Functional Specification Document (FSD)

**Project**: Anti-greeting (English Spiced Repetition & Practice)
**Type**: web-frontend
**Version**: 1.1
**Last Updated**: 2026-04-12

---

## 1. Feature Specifications

### Lessons (Daily Vocabulary)
**Description**: Presents 10 random words from the Oxford 3000 list every day. Each word is displayed in a 3D flashcard with audio and community-sourced (API) definitions.

| ID | Requirement | Priority | Status |
|----|------------|----------|--------|
| FR-LES-001 | Fetch 10 random words from `words.json` on daily mount | High | Implemented |
| FR-LES-002 | Integrate Free Dictionary API for phonetic/audio/meaning | High | Implemented |
| FR-LES-003 | Navigation: Prev/Next pagination with "Finish" endpoint | High | Implemented |

**Use Case References**: [docs/usecases/lessons/](../../../docs/usecases/lessons/)

### Writing & Translation Practice
**Description**: Immersive practice evaluating semantic accuracy. Users translate Vietnamese sentences into English using voice or text input.

| ID | Requirement | Priority | Status |
|----|------------|----------|--------|
| FR-WRT-001 | Fetch task batches (10 questions) via REST API | High | Implemented |
| FR-WRT-002 | Integrated Speech-to-Text (STT) via Browser API | High | Implemented |
| FR-WRT-003 | Manual text fallback via Textarea | High | Implemented |
| FR-WRT-004 | Semantic scoring (similarity evaluation) on submission | High | Implemented |

**Use Case References**: [docs/usecases/writing/](../../../docs/usecases/writing/)

### Shadowing Studio
**Description**: Advanced YouTube-based dictation and mimicry studio. Allows sub-second seeking, segment looping, and voice recording.

| ID | Requirement | Priority | Status |
|----|------------|----------|--------|
| FR-SHA-001 | YouTube URL extraction and seamless embed integration | High | Implemented |
| FR-SHA-002 | Dynamic 5s segment creation and time-based tracking | High | Implemented |
| FR-SHA-003 | Hotkey mapping (Space for pause, Cmd+S to skip, Cmd+R to record) | Medium | Implemented |
| FR-SHA-004 | Session-based audio recording with instant playback | High | Implemented |

**Use Case References**: [docs/usecases/shadowing/](../../../docs/usecases/shadowing/)

### Anki SRS (Spaced Repetition System)
**Description**: Master 3,000 words using the SM-2 algorithm. Features a high-performance "Lexical Atelier" UI with persistent learning intervals.

| ID | Requirement | Priority | Status |
|----|------------|----------|--------|
| FR-SRS-001 | SuperMemo-2 (SM-2) engine implementation for scheduling | Critical | Planned |
| FR-SRS-002 | 3-pane responsive layout inspired by Lexical Atelier | High | Mocked |
| FR-SRS-003 | Modal editing for metadata, examples, and image URLs | High | Planning |
| FR-SRS-004 | Persistence using hybrid LocalStorage / words.json strategy | Critical | Planning |

#### 1.1 Spaced Repetition Engine (SM-2)
- **Algorithm**: Implement the SM-2 algorithm to calculate the next review date based on user performance.
- **Difficulty Grading**: Users rate their recall on a 4-level scale:
    - **Again (1)**: Total lapse, reset interval.
    - **Hard (2)**: Difficult recall, small interval increase.
    - **Good (3)**: Correct recall, standard SM-2 interval.
    - **Easy (4)**: Perfect recall, aggressive interval increase.
- **Queue Management**: Prioritize cards scheduled for "Review", followed by "New" cards.

#### 1.2 Card Structure & Displays
- **Front Side**:
    - **Headword**: Large, high-priority typography.
    - **Phonetic (IPA)**: Correct pronunciation string.
    - **Word Class**: Grammatical category tag (e.g., Noun, Verb).
    - **Visual Anchor**: Illustration image (displayed via URL).
    - **Audio**: Play button for US-accent pronunciation.
- **Back Side**:
    - **English Definition**: Primary meaning description.
    - **Vietnamese Meaning**: Localized translation.
    - **Contextual Usage**: 2-3 high-frequency example sentences.
    - **Collocations**: Common word pairings.
    - **Word Family**: Related word forms.
    - **Synonyms**: Alternative words with similar meanings.

#### 1.3 Interaction Design
- **Hotkey Support**:
    - `Space`: Flip card (Show Answer).
    - `1, 2, 3, 4`: Grade card difficulty (Rate).
    - `R`: Replay audio.
    - `E`: Open Quick Edit Modal.
- **Edit Modal**: A centralized overlay for updating card content.
    - **Constraints**: Only `Image URL` inputs allowed (no file uploads).
    - **Persistence**: Updates saved instantly to LocalStorage.

#### 1.4 Persistence Layer
- **Static Store**: Read-only `words.json` containing the base 3,000 words.
- **User Store (LocalStorage)**:
    - `srs_state`: Stores `{ word_id: { interval, easiness, repetitions, next_review_date } }`.
    - `user_overrides`: Stores user-modified content (definitions, custom image URLs).

**Use Case References**: [docs/usecases/anki/](../../../docs/usecases/anki/)

---

## 2. Screen Descriptions

### Home Screen
- **Purpose**: Landing page and feature gateway.
- **Layout**: High-contrast hero section with "Bắt đầu học" call-to-action.
- **Interactive Elements**: Start Learning button, Sidebar Navigation.

### Lesson Screen
- **Purpose**: Daily flashcard study.
- **Layout**: Centered Flashcard with 3D flip effect and navigation controls.
- **States**: Loading, Active Card (1-10), Finished Batch.

### Writing Screen
- **Purpose**: Active production practice.
- **Layout**: Prompt area (Vietnamese), Input area (Textarea/Mic), Results list.
- **Interactive Elements**: Microphone toggle, Play Hint (TTS), Submit Button.

### Shadowing Screen
- **Purpose**: Listening and mimicry studio.
- **Layout**: Split screen: Video Player (Left), Segment Transcript List (Right).
- **Interactive Elements**: Add Segment button, Auto-pause/Loop toggles, Record button.

---

## 5. Data Models

### Word State (SRS)
- `wordId`: UniqueIdentifier (Word string).
- `interval`: Days until next review.
- `easiness`: Sm-2 E-factor.
- `repetitions`: Successive correct reviews.
- `nextReview`: ISO timestamp.

### Shadowing Segment
- `id`: Timestamp based ID.
- `start`: Start seconds.
- `end`: End seconds.
- `text`: User-transcribed text.

---

## 6. Business Rules & Validations
| ID | Rule | Applies To | Enforcement |
|----|------|-----------|-------------|
| BR-001 | Daily lesson batch must contain exactly 10 words randomized | Lessons | Client |
| BR-002 | Shadowing recordings must be session-only (no server upload) | Shadowing | Client |
| BR-003 | Image sources in Edit Mode must be valid URLs (No Large Blobs) | SRS | Client |
| BR-004 | Review cards always take priority over New cards in SRS queue | SRS | Logic |

---

## 7. Non-Functional Requirements
- **Performance**: Instant card flipping (<100ms).
- **Persistence**: LocalStorage must remain under 5MB (User state only).
- **Design**: "Lexical Atelier" aesthetic — 100% compliant with design system tokens.

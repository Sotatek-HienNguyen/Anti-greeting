# Project Overview & PDR (Product Development Requirements)

## 1. Product Vision

**Anti-greeting** is an interactive web application designed to help users master conversational English. Rather than focusing heavily on grammar drills, the platform emphasizes long-term retention of 3,000 core English words through active listening, speaking (speech-to-text dictation), and contextual video examples.

## 2. Target Audience

*   English learners looking to improve their pronunciation and conversational vocabulary.
*   Learners transitioning from reading/writing comprehension to active speaking and listening reflexes.

## 3. Core Features

### 3.1. Flashcards (Lessons)
*   Learn 10 new daily words from a static JSON database of 3,000 common English vocabulary terms.
*   Automated fetching of dictionary definitions and US-accent audio via the Free Dictionary API.
*   Optimized spacing and keyboard navigation functionality.

### 3.2. Writing & Dictation (Speech-to-Text)
*   Provides sentences/words for users to translate or repeat.
*   Integrates the native browser `SpeechRecognition` API.
*   Implements semantic-based textual scoring to validate translations.

### 3.3. Contextual Viewing (YouGlish)
*   Displays real-world YouTube video clips of native speakers utilizing the day's vocabulary.

## 4. Non-Functional Requirements

*   **Responsiveness**: The UI must be fully mobile-responsive.
*   **Browser Support**: Because of the `SpeechRecognition` tools, Chrome, Edge, and Safari are prioritized.
*   **Performance**: Flashcard transitions and API fetches should feel instantaneous (< 500ms delay). No database delays (using static client JSON).

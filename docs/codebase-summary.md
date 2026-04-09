# Codebase Summary

This document summarizes the current state of the application's source code, as scanned from the `src` directory.

## 1. Overall Structure

The project is a React application set up using Vite. Standard configuration and linting rules (ESLint) apply. 

* **Total Codebase Scope**: ~1780 Lines of Code.
* **Component-heavy architecture**: Features are largely contained inside Page components or UI components.

## 2. Directory Breakdown

| Directory / File | Description | Core Files & LOC |
|------------------|-------------|------------------|
| **`src/pages`** | React Route entry points. | `Writing.jsx` (243 LOC), `Lesson.jsx` (62 LOC), `Home.jsx` (36 LOC) |
| **`src/components`** | Reusable UI components. | `Flashcard.jsx` (153 LOC), `SpeechInput.jsx` (70 LOC), `VideoContext.jsx` (109 LOC) |
| **`src/services`** | Logic for external API interaction. | `api.js` (79 LOC) handling FreeDictionary / backend data interactions. |
| **`src/data`** | Static data assets. | `words.json` containing the Oxford 3000 vocabulary. |
| **`src/` (root)** | Global setup. | `App.jsx`, `main.jsx`, `index.css` (281 LOC). |

## 3. Key Observations & Findings

*   `src/pages/Writing.jsx` (243 lines) is the largest file currently in the project. It handles state, speech recognition, and semantic scoring all at once. According to our `Consider Modularization` rule, this file should be considered for aggressive refactoring (breaking out hooks and presentational sub-components).
*   `src/index.css` contains highly customized, possibly glassmorphic styles. There's currently no UI framework (like Tailwind or MUI) driving layout; everything is vanilla CSS.
*   Data fetching relies primarily on REST APIs encapsulated in `api.js` rather than React Query or SWR.

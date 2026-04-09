# Code Standards

This document outlines the coding standards, patterns, and conventions used universally across the Anti-greeting codebase.

## 1. General Principles

*   **Modularization**: Files over 200 lines of code MUST be broken out into smaller components. Separate UI layout from data-fetching and from complex state objects.
*   **Descriptive Naming**: Use long, descriptive names for functions and variables. Kebab-case naming is preferred for file names (`speech-input.jsx` or similarly descriptive strings), but currently camel/pascal casing is in place (`SpeechInput.jsx`, `Lesson.jsx`) and should be maintained given the established React standard.
*   **Comments & Documentation**: Functions with non-obvious logic (e.g. semantic scoring comparisons) must have clear explanations using standard JS block comments.
*   **Framework Rules**: Adhere strictly to the rules laid out in `.agent/rules/development-rules.md`.

## 2. React & UI Conventions

*   **State Management**: Use localized React hooks (`useState`, `useMemo`, `useCallback`) before evaluating the need for global stores.
*   **Styling**: Use vanilla CSS in `index.css`. Adhere strictly to dynamic design, rich aesthetics, and dark modes (glassmorphism/vibrant gradients). Do not rely on placeholder colors.
*   **Component Structure**: 
    1.  Imports (React, specific sub-components, static JSON).
    2.  Helper constants/functions.
    3.  Component Export.
    4.  Hooks (State, Ref, Effects).
    5.  Event Handlers.
    6.  Return (JSX).

## 3. Data Flow & External API Standards

*   Functions fetching external API resources (Free Dictionary) must fail gracefully. Error checks must wrap `async/await` statements, pushing placeholder UI to the components if needed.
*   No strict backend is running, so backend tokens are not passed.

## 4. Git Standards (Conventional Commits)

Use standard commit convention prefixes:
*   `feat:` New feature
*   `fix:` Bug fix
*   `refactor:` Restructuring code
*   `test:` Adding or updating tests
*   `docs:` Documentation updates

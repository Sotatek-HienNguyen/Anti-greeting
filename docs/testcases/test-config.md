# Test Configuration

**Last Updated**: 2026-04-10
**Default Environment**: Local

## Environments

| Environment | Base URL | Purpose |
|------------|----------|---------|
| Local | http://localhost:5173 | Development testing |

## Test Accounts

> **Security**: Never commit real passwords here. Use env var references or vault paths.

| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| Learner | test_learner@example.com | `$TEST_USER_PASSWORD` | Access to lessons and practice modules |
| Unauthenticated | _(none)_ | _(none)_ | Public landing page only |

## Prerequisites Checklist

- [x] Target environment is running (`npm run dev`)
- [ ] Browser: Latest Chrome/Edge (support SpeechRecognition)
- [ ] Microphone: Connected and accessible

## Test Data

### Fixture Data
- Seed 10 random sentences in Vietnamese and English.
- Referenced in test cases as: "Sentence: 'Bạn có thích đọc sách không?'"

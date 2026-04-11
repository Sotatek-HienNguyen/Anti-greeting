# Phase 1: Foundation & YouTube Integration

## Objectives
- Setup the core screen for Shadowing.
- Integrate YouTube IFrame API to load videos.
- Implement subtitle/transcript extraction logic.

## Tasks
- [ ] Create `/shadowing` route and page component.
- [ ] Implement `YoutubePlayer` component using YouTube IFrame API.
- [ ] Add URL Input field to fetch YouTube videos dynamically (FR1).
- [ ] Develop a service to extract subtitles (CC) from YouTube API (FR2).
- [ ] Add basic error handling for non-captioned or restricted videos (FR3).

## Technical Notes
- Use `@types/youtube` for better DX if using TypeScript.
- Research `youtube-captions-scraper` or similar approach for client-side caption extraction if the API doesn't provide easy transcript access.

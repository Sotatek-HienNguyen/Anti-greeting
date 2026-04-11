# UC-SHA-001: Video Segmentation

**Module**: Shadowing Studio
**Actor**: User
**Priority**: High
**Last Updated**: 2026-04-12

---

## Precondition
- User has entered a valid YouTube URL on the `/shadowing` page.
- Video is loaded and playing.

## Main Flow
1. **User** watches the video.
2. **User** identifies a sentence or phrase they want to practice.
3. **User** clicks "➕ Thêm đoạn 5s" OR presses `Cmd+S`.
4. **System** creates a new segment from the current timestamp (e.g., current time to current time + 5s).
5. **System** adds the segment to the "Dynamic Transcript Builder" on the right.
6. **System** persists the segment in LocalStorage under the specific `videoId` key.

## Postcondition
- The video timeline is segmented into practice-able chunks.

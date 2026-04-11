# UC-SHA-002: Shadowing Practice (Mimicry & Recording)

**Module**: Shadowing Studio
**Actor**: User
**Priority**: High
**Last Updated**: 2026-04-12

---

## Precondition
- At least one segment exists for the current video.

## Main Flow
1. **User** clicks "Nghe lại" (or clicks the segment) to seek to the start of the phrase.
2. **User** activates "Auto-pause after each sentence" or "Loop sentence".
3. **User** listens to the native speaker.
4. **User** clicks "⏺ Ghi âm (Record)" OR presses `Cmd+R`.
5. **System** starts recording the user's voice.
6. **User** mimics the native speaker (Shadowing).
7. **User** clicks "⏹ Dừng ghi âm" OR presses `Cmd+R`.
8. **System** (if "Auto-play record" is ON) immediately plays back the user's recording.
9. **User** compares their pronunciation with the native speaker's.
10. **System** increments the "Đã ghi âm" count for that segment.

## Alternative Flows
- **AF-1: Playback from List**:
  - User clicks "▶ Nghe giọng mình" on the segment item to re-listen to the last recording.

## Postcondition
- The user has practiced mimicry and recorded their voice for self-evaluation.

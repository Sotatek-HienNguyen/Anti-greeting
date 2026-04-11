# Project: Advanced English Spaced Repetition System (SRS)
# Inspired by Anki | 3000 Oxford/Cambridge Words

## 1. Core Logic (Spaced Repetition)
- **Algorithm:** SuperMemo-2 (SM-2) or Anki-style intervals.
- **Grading:** 4 levels: Again (1m), Hard (10m), Good (1d), Easy (4d).
- **Session:** Tracks 'New', 'Learning', and 'Review' cards per day.

## 2. Card Content (Flashcard Structure)
- **Front:** Word, IPA, Audio Trigger, Word Class (Noun/Verb/Adj).
- **Back:** 
    - English Definition (Primary).
    - Vietnamese Meaning (Secondary).
    - Examples: High-frequency, friendly sentences.
    - Collocations: Common word pairings.
    - Word Family: Derived forms (e.g., Success -> Succeed, Successful).
    - Synonyms/Alternatives: Common replacements.

## 3. Features & UX
- **Navigation:** Dashboard (Statistics), Study Session, Leaderboard, Settings.
- **Shortcuts:** 
    - Space/Enter: Show Answer.
    - 1, 2, 3, 4: Rate difficulty.
    - R: Play Audio.
- **Visual Style:** Minimalist, clean typography, high contrast for focus, mobile-responsive.

## 1. Visual & Multimedia
- **Image Support:** Mỗi thẻ từ vựng hiển thị 1 hình ảnh minh họa sinh động ở mặt sau (hoặc mặt trước tùy chọn).
- **Audio:** Nút phát âm thanh cho từ vựng và câu ví dụ.

## 2. CRUD & Customization (Edit Mode)
- **Modal Editing:** Mở popup Modal để người dùng chỉnh sửa nội dung từ vựng, định nghĩa, ví dụ, hoặc thay link ảnh minh họa. (Chỉ cho phép paste Image URL, không hỗ trợ upload file gốc để tránh đầy RAM LocalStorage).
- **Form Management:** Giao diện Form để cập nhật: Word, Type, IPA, Definition, Meaning, Example, Collocations, Word Family, Synonyms, và Image URL.

## 3. User Experience
- **Focus Mode:** Khi học, giao diện cực kỳ tối giản để tập trung vào hình ảnh và chữ.
- **Keyboard Shortcuts:** 
    - `E`: Mở nhanh chế độ chỉnh sửa (Edit Mode).
    - `S`: Lưu thay đổi (Save).
    
## 4. Kế hoạch phát triển (Implementation Plan)

Xem chi tiết tại: [anki-srs-feature/plan.md](../plans/anki-srs-feature/plan.md)

### Phase 1: Engine & Persistence (7 ngày)
- Cài đặt thuật toán SM-2.
- Xây dựng hệ thống lưu trữ LocalStorage cho 3000 từ vựng.
- Migration dữ liệu từ `words.json` sang schema mới.

### Phase 2: Core Learning UI (10 ngày)
- Giao diện 3 vùng (Sidebar L/R + Center).
- Flashcard Pro với hiệu ứng flip 3D.
- Tích hợp hình ảnh và âm thanh từ vựng.

### Phase 3: Session & Hotkeys (5 ngày)
- Logic hàng đợi (Review vs New).
- Hệ thống phím tắt (Space, 1-4, R).
- Thanh tiến trình session.

### Phase 4: CRUD & Edit Mode (5 ngày)
- Chế độ chỉnh sửa nhanh (Quick Edit) với phím `E`.
- Form cập nhật định nghĩa, ví dụ, hình ảnh.

### Phase 5: Dashboard & Analytics (3 ngày)
- Thống kê Streak, Mastery, Daily Goal.
- Hiệu ứng chúc mừng (Confetti).

## 5. Câu hỏi mở (Open Questions)
1. **Dữ liệu ban đầu**: Chúng ta nên bắt đầu với 100 từ có sẵn hình ảnh/định nghĩa mẫu hay để người dùng tự build từ đầu?
2. **API ngoài**: Có nên tích hợp tự động tìm ảnh từ Unsplash/Pixabay khi ở chế độ Edit không?
3. **Đồng bộ hóa**: Hiện tại lưu LocalStorage là đủ, nhưng bạn có dự định lên Cloud (Firebase/Supabase) trong tương lai gần không?


# Requirement:Translation Practice (Text + Speech Input)

-   Module: Writing
-   Actor: Learner
-   Priority: High
-   Last Updated: 2026-04-10

## 1. Overview

Màn hình cho phép người dùng luyện dịch câu từ tiếng Việt sang tiếng Anh
thông qua: - Nhập text - Hoặc nhập bằng giọng nói (speech-to-text)

Hệ thống đánh giá mức độ chính xác dựa trên semantic matching (không yêu
cầu exact match).

## 2. UI Components

### 2.1 Header

-   Logo hệ thống (Fluent)
-   Navigation buttons:
    -   "Bài học"
    -   "Luyện dịch"

### 2.2 Practice Info

-   Hiển thị tiến độ: Câu hỏi X/10
-   Hiển thị Session ID: ID: {session_id}

### 2.3 Question Block

-   Label: Dịch câu sau:
-   Nội dung câu tiếng Việt (dynamic)

### 2.4 Answer Input

-   Textarea với placeholder
-   Hỗ trợ text + speech-to-text

### 2.5 Input Actions

-   🎤 Nói để nhập
-   🔊 (optional playback)

### 2.6 Navigation Actions

-   Quay lại
-   Câu tiếp theo

## 3. Preconditions

-   Session 10 câu đã được tạo
-   Browser hỗ trợ SpeechRecognition
-   User cấp quyền microphone

## 4. Main Flow

1.  User mở màn hình
2.  System hiển thị câu hỏi
3.  User nhập text hoặc dùng voice

### Flow A: Text Input

-   Nhập → Submit → Evaluate → Show result → Next

### Flow B: Speech-to-Text

-   Start → Speak → Stop → Convert → Review → Submit

## 5. Alternative Flows

-   Auto stop khi im lặng
-   Validate empty input
-   Skip question confirm

## 6. Exception Flows

-   Mic bị từ chối
-   Browser không hỗ trợ
-   Speech fail

## 7. Postconditions

-   Lưu answer, score, feedback

## 8. Business Rules

-   10 câu / session
-   Semantic matching
-   Speech chỉ khi supported

## 9. Enhancements

-   Highlight lỗi
-   Suggest câu đúng
-   Difficulty levels

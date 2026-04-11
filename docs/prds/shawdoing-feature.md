# Software Requirements Specification (SRS) - YouTube Shadowing Studio

| Thông tin | Chi tiết |
| :--- | :--- |
| **Dự án** | YouTube Shadowing Studio (Hien Nguyen Custom) |
| **Vai trò** | Công cụ luyện nghe chép chính tả và Shadowing chuyên sâu |
| **Trạng thái** | **Version 1.1 - Implemented** |
| **Key Logic** | Manual Segmenting + Smart Hotkeys + Instant Playback |

---

## 1. Mục tiêu sản phẩm (Product Objectives)
Cung cấp một môi trường phòng thu (Studio) mini giúp người dùng:
1.  **Active Listening**: Tự tay cắt các phân đoạn nhỏ (5 giây) để tập trung nghe kỹ.
2.  **Dictation**: Chép chính tả ngay dưới mỗi phân đoạn để kiểm tra độ hiểu.
3.  **Shadowing**: Ghi âm giọng nói, so sánh trực tiếp với giọng bản ngữ và đếm số lần luyện tập để tạo kỷ luật.

## 2. Các tính năng cốt lõi (Core Features) - Đã triển khai

### 2.1. Trình cắt đoạn linh hoạt (Smart Trimmer)
- **Cắt đoạn 5 giây**: Phím tắt hoặc nút bấm cho phép tạo ngay một segment 5 giây tính từ vị trí hiện tại của video.
- **Logic nối tiếp (Sequential Addition)**: Khi dùng phím tắt `Cmd+S` ở cuối danh sách, đoạn mới sẽ tự động bắt đầu từ giây kết thúc của câu trước đó, đảm bảo tính liên tục của bài học.
- **Tùy chỉnh thời gian**: Cho phép người dùng tự sửa giây bắt đầu/kết thúc để khớp hoàn toàn với lời thoại.

### 2.2. Chép chính tả & Xác nhận (Dictation Workflow)
- **Input Area**: Mỗi phân đoạn có một ô `textarea` riêng để người dùng gõ nội dung nghe được.
- **Xác nhận (Submit)**: Nút "Xác nhận & Tập câu này" giúp lưu nội dung vào bộ nhớ và tự động tua video về đầu phân đoạn đó để bắt đầu luyện nói.
- **Performance**: Nhập liệu ở từng phân đoạn không gây re-render toàn bộ trang, đảm bảo Video không bị reset hay giật lag.

### 2.3. Ghi âm âm thanh & Phản hồi tức thì (Audio Feedback)
- **Recording**: Tích hợp MediaRecorder API để ghi âm giọng người dùng cho từng câu.
- **Auto-Play**: Tùy chọn "Tự phát lại bản ghi" cho phép người dùng nghe lại ngay lập tức giọng của mình sau khi dừng ghi âm mà không cần thao tác thêm.
- **Manual Playback**: Nút "Nghe giọng mình" xuất hiện sau khi có bản ghi đầu tiên để so sánh với video gốc.
- **Repetition Counter**: Theo dõi số lần bạn đã luyện nói cho mỗi câu cụ thể.

### 2.4. Hệ thống phím tắt tối ưu (Smart Hotkeys)
Để tối ưu việc luyện tập không gián đoạn, hệ thống sử dụng bộ phím tắt tránh xung đột trình duyệt:
- **`Space`**: Play / Pause video (Vô hiệu hóa khi đang gõ chữ).
- **`Cmd/Ctrl + R`**: Bật/Tắt ghi âm câu hiện tại.
- **`Cmd/Ctrl + S` (Smart Key)**: 
    - Nếu đang ở giữa: Nhảy sang segment tiếp theo.
    - Nếu đang ở cuối: Tự động tạo segment mới 5 giây và nhảy tới đó.

## 3. Kiến trúc kỹ thuật & Dữ liệu

### 3.1. Công nghệ sử dụng
- **YouTube Iframe API**: Điều khiển video sâu (Seeking, State polling).
- **Web MediaRecorder API**: Xử lý ghi âm phía Client.
- **Blob URLs**: Quản lý file âm thanh tạm thời trong phiên làm việc.

### 3.2. Lưu trữ bền vững (Persistence)
- Dữ liệu (Phân đoạn, Nội dung chép, Số lần ghi âm) được lưu vào **LocalStorage**.
- Cấu trúc khóa: `segments_{videoId}`, `records_{videoId}`... giúp dữ liệu không bị trộn lẫn giữa các video khác nhau.

## 4. Hướng dẫn sử dụng (User Flow)
1.  **Nhập URL**: Dán link YouTube vào trang chính.
2.  **Cắt đoạn**: Nghe đến đâu nhấn `Cmd+S` (hoặc nút Thêm đoạn) đến đó.
3.  **Chép chính tả**: Gõ nội dung nghe được vào khung bên phải.
4.  **Xác nhận**: Nhấn "Xác nhận" để video tự động quay lại đầu đoạn đó.
5.  **Shadowing**: Nhấn `Cmd+R` để ghi âm, nghe lại và lặp lại cho đến khi thành thục.

---
*Tài liệu được cập nhật dựa trên thực tế triển khai ngày 11/04/2026.*

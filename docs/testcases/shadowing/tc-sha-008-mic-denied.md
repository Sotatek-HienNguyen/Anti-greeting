# Test Case: TC-SHA-008 - Permission Handling (Microphone Blocked)

**Module**: Shadowing Studio
**Priority**: High
**Type**: Error Handling / UX

## 1. Pre-conditions
- Trên Chrome, người dùng đã nhấn "Block" (Chặn) quyền truy cập Microphone cho site này.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhấn nút "⏺ Ghi âm (Record)". | Hệ thống không được crash (trắng màn hình). |
| 2 | Kiểm tra thông báo hiển thị. | Hiển thị Alert hoặc Toast: "Tính năng ghi âm yêu cầu quyền truy cập Microphone. Vui lòng cấp quyền trong cài đặt trình duyệt và thử lại." |
| 3 | Tắt Alert, thử nhấn lại lần nữa. | Trình trạng cũ lặp lại, không có lỗi runtime phát sinh. |

## 3. Post-conditions
- Trạng thái `isRecording` vẫn là `false`.
- Không có lỗi `Uncaught (in promise)` trong Console.

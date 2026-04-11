# Test Case: TC-SHA-014 - Keyboard Hammering (Concurrency Check)

**Module**: Shadowing Studio
**Priority**: Medium
**Type**: Destructive / Stability

## 1. Pre-conditions
- Một video đã được tải thành công.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhấn giữ phím `Cmd+S` liên tục trong 10 giây. | 1. Hệ thống không tạo ra hàng nghìn phân đoạn rác (Nên có throttle hoặc xử lý debounce).<br>2. ID của các segments không bị trùng lặp. |
| 2 | Nhấn tổ hợp `Cmd+R` (Ghi âm) và `Cmd+S` (Chuyển đoạn) xen kẽ cực nhanh. | MediaRecorder phải dừng/bắt đầu đúng trình tự, không gây treo Microphone. |
| 3 | Nhấn phím `Space` và `Cmd+S` cùng lúc khi đang ở cuối video. | Video không bị nhảy loạn xạ giữa các trạng thái Play/Pause. |

## 3. Post-conditions
- UI không bị đóng băng (Freeze).
- State của `segments` và `isRecording` luôn nhất quán.

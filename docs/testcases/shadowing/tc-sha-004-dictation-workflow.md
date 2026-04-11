# Test Case: TC-SHA-004 - Dictation Workflow & UI Sync

**Module**: Shadowing Studio
**Priority**: Medium
**Type**: Functional / UI

## 1. Pre-conditions
- Có ít nhất 1 phân đoạn đã tạo (VD: 10s - 15s).

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Gõ văn bản vào ô "Hãy nghe và gõ nội dung vào đây...". | Chữ xuất hiện bình thường, Video không được bị khựng hay reset. |
| 2 | Nhấn nút "Xác nhận & Tập câu này". | 1. Nút đổi sang màu xanh với dấu tích (✓).<br>2. Video tự động tua về giây thứ 10.<br>3. Video chuyển sang chế độ Play (nếu đang Pause). |
| 3 | Tải lại trang (F5). | Nội dung đã gõ vẫn phải tồn tại (kiểm tra persistence). |
| 4 | Để trống textarea và nhấn "Xác nhận". | Hệ thống vẫn lưu (chuỗi rỗng) và thực hiện tua video về đầu đoạn. |

## 3. Post-conditions
- Trạng thái chép chính tả được lưu vào `segments` state.
- Không có lỗi lag giao diện khi gõ phím.

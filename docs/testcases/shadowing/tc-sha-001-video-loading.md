# Test Case: TC-SHA-001 - Video Loading & URL Validation

**Module**: Shadowing Studio
**Priority**: High
**Type**: Functional / Error Handling

## 1. Pre-conditions
- Browser: Google Chrome (Desktop).
- User is on the Shadowing Studio page (`/shadowing`).

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Dán một link YouTube hợp lệ vào ô input (VD: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`). | Link được nhập thành công. |
| 2 | Nhấn nút "Bắt đầu". | Video được tải, trình phát YouTube hiện ra, thanh Sidebar điều khiển bên trái xuất hiện. |
| 3 | Nhấn bộ phím "Cmd + P" (cũ) hoặc "Space" (mới). | Video thực hiện Play/Pause mượt mà. |
| 4 | Nhấn nút "← Đổi video". | Hệ thống quay lại màn hình nhập URL, xóa bỏ trạng thái video hiện tại. |
| 5 | Nhập một chuỗi văn bản không phải link YouTube và nhấn "Bắt đầu". | **Hệ thống hiển thị thông báo lỗi**: "Vui lòng nhập URL YouTube hợp lệ!". Video không được tải. |
| 6 | Nhập URL của video bị cấm nhúng (Embedding disabled). | Trình phát YouTube hiển thị lỗi fallback của Google, hệ thống không bị crash. |

## 3. Post-conditions
- Dữ liệu Video ID được lưu vào state.
- Giao diện chuyển đổi sang chế độ Practice nếu URL hợp lệ.

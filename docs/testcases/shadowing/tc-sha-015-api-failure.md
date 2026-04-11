# Test Case: TC-SHA-015 - API Failure & External Blocker

**Module**: Shadowing Studio
**Priority**: Medium
**Type**: Destructive / Error Handling

## 1. Pre-conditions
- Trình duyệt đang bật VPN hoặc Proxy chặn tên miền `youtube.com`.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhập URL hợp lệ và nhấn "Bắt đầu". | 1. Hệ thống không bị treo vô hạn ở trạng thái loading.<br>2. Hiển thị thông báo: "Không thể kết nối tới YouTube Player API. Vui lòng kiểm tra kết nối mạng." |
| 2 | Chặn script của YouTube Iframe API nửa chừng khi đang học. | Các nút điều khiển như Play/Pause/Seek phải hiển thị trạng thái Disabled hoặc có thông báo lỗi nếu tương tác. |

## 3. Post-conditions
- Ứng dụng cung cấp phản hồi rõ ràng cho người dùng thay vì im lặng.

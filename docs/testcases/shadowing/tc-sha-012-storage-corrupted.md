# Test Case: TC-SHA-012 - Storage Corruption & Quota

**Module**: Shadowing Studio
**Priority**: Low
**Type**: Reliability

## 1. Pre-conditions
- Có dữ liệu shadowing cũ trong LocalStorage.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Mở DevTools, sửa tay giá trị JSON trong key `segments_...` (VD: xóa dấu ngoặc để JSON lỗi). | Hệ thống không được crash trắng trang khi load. |
| 2 | Tải lại trang (F5). | Hệ thống phát hiện JSON lỗi, tự động reset về `[]` (trống) hoặc bỏ qua dữ liệu hỏng. |
| 3 | Thử nghiệm tình huống LocalStorage bị đầy (QuotaExceededError). | Hệ thống hiển thị thông báo: "Bộ nhớ trình duyệt đã đầy, vui lòng xóa bớt dữ liệu học tập cũ." |

## 3. Post-conditions
- Cơ chế `JSON.parse` được bao bọc bởi `try-catch`.

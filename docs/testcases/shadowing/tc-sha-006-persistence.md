# Test Case: TC-SHA-006 - Data Persistence & Storage Validation

**Module**: Shadowing Studio
**Priority**: Medium
**Type**: Non-Functional / Data Integrity

## 1. Pre-conditions
- Đã tạo các phân đoạn và bản ghi cho Video A (ID: `vid_A`).

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhấn "← Đổi video" và tải Video B (ID: `vid_B`). | Danh sách phân đoạn của Video A biến mất, danh sách của Video B trống (nếu chưa học). |
| 2 | Nhấn "Đổi video" và quay lại Video A. | Toàn bộ các phân đoạn, nội dung chép và số lần ghi âm của Video A phải được khôi phục nguyên vẹn. |
| 3 | Mở DevTools (F12) -> Application -> Local Storage. | Kiểm tra các key như `segments_vid_A` và `records_vid_A` phải tồn tại với dữ liệu JSON hợp lệ. |
| 4 | Xóa LocalStorage bằng tay và tải lại trang. | Hệ thống phải quay về trạng thái ban đầu (không có phân đoạn nào). |

## 3. Post-conditions
- Dữ liệu được cô lập hoàn toàn giữa các Video ID khác nhau.
- Không có lỗi xung đột dữ liệu (Data Corruption).

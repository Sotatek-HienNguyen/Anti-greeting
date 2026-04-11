# Test Case: TC-SHA-013 - LocalStorage Quota Overflow

**Module**: Shadowing Studio
**Priority**: Low
**Type**: Destructive / Reliability

## 1. Pre-conditions
- Giả lập LocalStorage đã bị chiếm dụng gần hết (VD: nạp 4.9MB dữ liệu rác vào một key khác).

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Thực hiện tạo phân đoạn mới và gõ nội dung cực dài. | Hệ thống vẫn phải cho phép thao tác trên UI. |
| 2 | Nhấn nhấn phím tắt `Cmd+S` liên tục để ép hệ thống ghi đè vào Storage. | **Hệ thống không được crash trắng trang**. |
| 3 | Kiểm tra log Console. | Xuất hiện log cảnh báo: `QuotaExceededError`. |
| 4 | Kiểm tra thông báo UI. | (Nếu có) Hiển thị thông báo: "Bộ nhớ đầy, dữ liệu mới có thể không được lưu". |

## 3. Post-conditions
- Trạng thái ứng dụng vẫn hoạt động bình thường nhờ cơ chế `try-catch` đã cài đặt, dù việc lưu vào ổ đĩa thất bại.

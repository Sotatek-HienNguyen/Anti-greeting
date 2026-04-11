# Test Case: TC-SHA-003 - Smart Navigation & Auto-generation (Cmd + S)

**Module**: Shadowing Studio
**Priority**: High
**Type**: Functional / Smart Logic

## 1. Pre-conditions
- Một video đã được tải.
- Đã có ít nhất 2 phân đoạn (VD: 0-5s và 5-10s).
- Đang chọn phân đoạn 1 (0-5s).

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhấn tổ hợp phím `Cmd + S`. | Hệ thống nhảy từ phân đoạn 1 sang phân đoạn 2. Video nhảy tới giây thứ 5. |
| 2 | Tiếp tục nhấn `Cmd + S` khi đang ở phân đoạn cuối cùng (đoạn 2). | **Hệ thống tự động tạo thêm một phân đoạn mới** bắt đầu từ giây thứ 10 đến 15. |
| 3 | Kiểm tra vị trí của đoạn mới thêm. | Đoạn mới phải nằm ở **cuối danh sách**, không chèn lên trên dù video đang phát ở đâu. |
| 4 | Nhấn `Cmd + S` liên tục 3 lần. | 3 đoạn mới được tạo nối tiếp nhau (15-20, 20-25, 25-30). |
| 5 | Gõ chữ vào textarea và nhấn `Cmd + S`. | Phím tắt vẫn hoạt động bình thường (do có phím modifier Cmd). |

## 3. Post-conditions
- Trình tự thời gian của các phân đoạn phải là chuỗi liên tục.
- `activeIndex` luôn trỏ về đoạn mới nhất được tạo.

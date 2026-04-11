# Test Case: TC-SHA-009 - Large Data Performance (Stress Test)

**Module**: Shadowing Studio
**Priority**: Medium
**Type**: Performance / Stress

## 1. Pre-conditions
- Một video dài ( > 10 phút) đã được tải.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Tạo liên tục 50 phân đoạn bằng cách nhấn nhanh nút "Thêm đoạn". | Hệ thống xử lý mượt mà, không bị treo UI. |
| 2 | Nhập text vào phân đoạn thứ 50. | Phản hồi bàn phím vẫn phải nhạy (không bị delay > 100ms). |
| 3 | Cuộn danh sách phân đoạn (Scroll Sidebar). | Hiệu năng cuộn trơn tru, active highlight cập nhật đúng. |
| 4 | Reload trang (F5). | LocalStorage tải lại 50 phân đoạn. Kiểm tra thời gian hiển thị đầu tiên (Time to Interactive). |

## 3. Post-conditions
- Browser không cảnh báo "Page Unresponsive".
- Dữ liệu LocalStorage không vượt quá quota (Segments thường nhẹ, chiếm < 100KB).

# Test Case: TC-SHA-002 - Manual Segment Creation (Trimmer)

**Module**: Shadowing Studio
**Priority**: High
**Type**: Functional / UX

## 1. Pre-conditions
- Một video hợp lệ đã được tải thành công.
- Video đang ở giây thứ 10.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhấn nút "➕ Thêm đoạn 5s (từ 10s)". | Một thẻ phân đoạn (Segment Card) mới xuất hiện trong danh sách bên phải. |
| 2 | Kiểm tra timestamp của thẻ vừa tạo. | Thẻ phải hiển thị: `10s - 15s`. |
| 3 | Nhấn nút "Thêm đoạn 5s" một lần nữa khi video vẫn ở giây thứ 10. | Một thẻ trùng lặp hoặc tương đương xuất hiện (Hệ thống cho phép để người dùng tự chỉnh sửa). |
| 4 | Thay đổi giá trị thời gian (nếu có UI input cho giây) hoặc kiểm tra tính sắp xếp. | Các thẻ phải luôn được sắp xếp theo thứ tự `start time` tăng dần. |
| 5 | Nhấn nút "Xóa" trên một thẻ. | Thẻ đó biến mất khỏi danh sách ngay lập tức. |

## 3. Post-conditions
- Danh sách `segments` trong state được cập nhật chính xác.
- Danh sách hiển thị đồng bộ với dữ liệu trong LocalStorage.

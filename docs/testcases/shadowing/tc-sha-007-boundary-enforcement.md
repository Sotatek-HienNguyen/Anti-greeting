# Test Case: TC-SHA-007 - Video Boundary Enforcement

**Module**: Shadowing Studio
**Priority**: Medium
**Type**: Boundary / Negative

## 1. Pre-conditions
- Một video ngắn (VD: 30 giây) đã được tải.
- Video đang ở giây thứ 28.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhấn nút "➕ Thêm đoạn 5s". | Hệ thống tạo phân đoạn mới. |
| 2 | Kiểm tra `endTime` của phân đoạn vừa tạo. | `endTime` phải tự động cắt về **30s** (Bằng thời lượng video), thay vì 33s. |
| 3 | Tua video đến giây cuối cùng (30s) và nhấn phím tắt `Cmd+S`. | 1. Không tạo thêm đoạn mới vượt quá thời lượng video.<br>2. Hiển thị thông báo nhẹ: "Đã đạt đến cuối video". |

## 3. Post-conditions
- Dữ liệu `segments` không chứa bất kỳ giá trị `end` nào lớn hơn `player.getDuration()`.

# Test Case: TC-SHA-005 - Voice Recording & Instant Playback

**Module**: Shadowing Studio
**Priority**: High
**Type**: Functional / Multimedia

## 1. Pre-conditions
- Microphone đã được cấp quyền truy cập trên Chrome.
- Tùy chọn "Tự phát lại bản ghi" đang được BẬT.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhấn tổ hợp `Cmd + R` hoặc nút "⏺ Ghi âm". | Nút chuyển sang màu đỏ "⏹ Dừng ghi âm". Đèn chỉ báo ghi âm trên trình duyệt xuất hiện. |
| 2 | Nói một vài từ và nhấn `Cmd + R` lần nữa để dừng. | 1. Hệ thống dừng thu.<br>2. **Âm thanh vừa thu được phát lại ngay lập tức** (do tính năng auto-play).<br>3. Bộ đếm ghi âm tăng lên 1 đơn vị. |
| 3 | Nhấn nút "▶ Nghe giọng mình". | Bản ghi âm cuối cùng được phát lại chính xác. |
| 4 | Tắt tùy chọn "Tự phát lại bản ghi" và thực hiện lại bước 1-2. | Hệ thống dừng thu, tăng bộ đếm nhưng **không tự động phát lại âm thanh**. |
| 5 | Từ chối quyền Microphone (Block permission) và nhấn Ghi âm. | Hệ thống hiển thị thông báo: "Không thể truy cập Microphone!". |

## 3. Post-conditions
- File âm thanh (Blob) được quản lý đúng trong bộ nhớ đệm.
- Bộ đếm ghi âm được lưu vào LocalStorage.

# Test Case: TC-SHA-011 - Recording Interruption & Toggling

**Module**: Shadowing Studio
**Priority**: Medium
**Type**: Robustness

## 1. Pre-conditions
- Một phiên học đang diễn ra.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Nhấn Ghi âm và lập tức nhấn Dừng ( < 100ms). | Hệ thống xử lý được file âm thanh cực ngắn hoặc bỏ qua nếu cần, không văng lỗi. |
| 2 | Nhấn Ghi âm, sau đó bất ngờ nhấn nút "← Đổi video" trong khi đang thu. | 1. MediaRecorder dừng lại an toàn.<br>2. Video cũ được đóng.<br>3. Không gây memory leak bản ghi. |
| 3 | Nhấn Ghi âm, sau đó đổi tab trình duyệt rồi quay lại. | Quá trình ghi âm vẫn tiếp tục bình thường (Chrome background recording support). |

## 3. Post-conditions
- Microphone track được đóng (stop) đúng cách trong mọi tình huống thoát.

# Test Case: TC-SHA-010 - Input Stress & Sanitization

**Module**: Shadowing Studio
**Priority**: Medium
**Type**: Functional / Security

## 1. Pre-conditions
- Có ít nhất 1 phân đoạn đã tạo.

## 2. Test Steps
| # | Step | Expected Result |
|---|------|-----------------|
| 1 | Paste một đoạn văn bản cực dài (VD: 5000 từ) vào textarea. | Hệ thống không bị crash. Khung textarea có thể cuộn hoặc tự mở rộng (theo CSS). |
| 2 | Nhập các ký tự đặc biệt: `!@#$%^&*()_+{}[]:";'<>?,./`. | Hiển thị đúng định dạng, không lỗi render. |
| 3 | Nhập mã HTML/Script: `<script>alert('xss')</script>`. | Hệ thống hiển thị dưới dạng text thuần (escape), không thực thi mã script. |
| 4 | Nhập hàng loạt Emojis (Emoji Stress). | Render đúng emoji màu sắc, không lỗi font. |

## 3. Post-conditions
- Dữ liệu được lưu trữ an toàn dưới dạng string trong JSON.

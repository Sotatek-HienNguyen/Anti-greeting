# QA & Testing Standards

Tài liệu này quy chuẩn các thuật ngữ và cấu trúc kiểm thử được sử dụng trong dự án Anti-greeting.

## 1. Hệ thống phân cấp (Hierarchy)

| Cấp độ | Thuật ngữ | Mô tả |
| :--- | :--- | :--- |
| **L0** | **Test Suite** | Tập hợp các kịch bản cho một module lớn (VD: Shadowing Module Suite). |
| **L1** | **Test Scenario** | Một tình huống nghiệp vụ tổng quát (VD: Kiểm tra tính năng ghi âm). |
| **L2** | **Test Case (TC)** | Một trường hợp cụ thể có đầu vào và kết quả mong đợi (VD: TC-SHA-005). |
| **L3** | **Test Step** | Các bước hành động chi tiết bên trong một Test Case. |
| **L4** | **Checkpoint / Assertion** | Điểm xác nhận Đúng/Sai cuối cùng của một bước hoặc một Case. |

## 2. Phân loại kiểm thử (Testing Types)

- **Happy Path**: Luồng đi chuẩn, dữ liệu đúng.
- **Negative Testing**: Dữ liệu sai, cố tình thực hiện thao tác không hợp lệ.
- **Boundary Testing**: Kiểm tra tại các điểm biên (VD: Giây cuối cùng của video).
- **Destructive Testing**: Các kịch bản cố tình phá vỡ hệ thống (VD: Làm hỏng JSON, làm tràn bộ nhớ).

## 3. SRS Module: Definition of Done (DoD)

Để một tính năng thuộc SRS Module được coi là hoàn thiện (Done), nó phải thỏa mãn các tiêu chí sau:

- **Logic Accuracy**: Thuật toán SM-2 phải trả về giá trị `interval` và `nextReview` chính xác theo bộ test case chuẩn (Unit Tested).
- **Persistence**: Trạng thái phải được lưu ngay lập tức vào LocalStorage mà không gây treo (blocking) UI.
- **Data Integrity**: Việc chỉnh sửa ở Quick Edit Modal không được làm hỏng cấu trúc JSON lưu trữ.
- **UX Benchmarks**: Thời gian lật thẻ (Card Flip) phải dưới 100ms; transition mượt mà trên cả desktop và mobile.
- **Accessibility**: Tất cả phím tắt (Space, 1-4, R, E) phải hoạt động ổn định và có phản hồi thị giác (visual feedback).

## 4. Quy tắc đặt tên file
`docs/testcases/{module}/tc-{module}-{id}-{slug}.md`

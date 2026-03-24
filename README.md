# Todo List Application

Đây là ứng dụng quản lý công việc (Todo List) được xây dựng bằng React, Vite, TypeScript và TailwindCSS.

## 🚀 Hướng dẫn cài đặt và chạy local

### Yêu cầu hệ thống
- Tối thiểu: **Node.js 18.x** (Khuyến nghị sử dụng bản LTS mới nhất)
- Trình quản lý gói: **npm**, **yarn**, hoặc **pnpm**

### Các bước cài đặt

1. **Clone repository (nếu có) hoặc tải mã nguồn về máy**
2. **Mở terminal và di chuyển vào thư mục dự án:**
   ```bash
   cd todoList-app
   ```
3. **Cài đặt các dependencies:**
   ```bash
   npm install
   ```
4. **Khởi chạy ứng dụng ở chế độ phát triển (development):**
   ```bash
   npm run dev
   ```
5. **Truy cập ứng dụng:**
   Mở trình duyệt và truy cập vào đường dẫn hiển thị trên terminal, thường là: `http://localhost:5173`

---

## 🛠️ Giải thích các quyết định kỹ thuật

Trong quá trình phát triển dự án này, một số quyết định kỹ thuật đã được đưa ra để tối ưu hóa hiệu suất, cấu trúc và trải nghiệm người dùng:

1. **Sử dụng React + Vite + TypeScript:**
   - **Vite:** Build tool mang lại tốc độ khởi động nhanh và HMR (Hot Module Replacement) ngay lập tức, giúp tăng trải nghiệm lập trình khi cần thay đổi UI liên tục.
   - **TypeScript:** Giúp bắt lỗi trong quá trình biên dịch thay vì chờ đến lúc chạy. Định nghĩa đầy đủ interface/type giúp giảm thiếu rủi ro về undefined hoặc missing properties.
   - **React Router Dom:** Sử dụng React Router Dom để điều hướng giữa các trang, phù hợp cho SPA và mở rộng ứng dụng
2. **Styling với TailwindCSS v4 & Shadcn UI / Radix UI:**
   - **Shadcn UI (nền tảng Radix UI):** Do có sẵn các component như Datepicker và Calendar phù hợp cho việc tạo task 

3. **Lưu trữ dữ liệu bằng LocalStorage (Không gọi API External):**
   - Ứng dụng này sử dụng Web Storage API (`localStorage`) để lưu trữ dữ liệu các danh sách việc làm giúp đảm bảo ứng dụng có thể sử dụng Offline.
4. **Tìm kiếm và lọc theo tên công việc hiện tại:**
   - Dùng useMemo để tìm kiếm dựa trên task hiện tại và lọc trạng thái dựa trên biến đã tính toán
5. **Thông báo:**
   - Task có field isNotified để đánh dấu đã thông báo hay chưa
   - Sử dụng setInterval để kiểm tra task có deadline trong 24h tới và chưa được thông báo
   - Sử dụng Popover để hiển thị danh sách thông báo

---

## 💡 Những điểm sẽ cải thiện nếu có thêm thời gian

1. **Tích hợp Backend Server & Database Database Thực tế:**

2. **Bổ sung User Authentication (Xác thực người dùng):**

3. **Tính năng Drag & Drop (Kéo Thả thẻ việc làm):**

4. **Áp dụng hiển thị Gantt Chart:**

5. **Tích hợp AI Assistant:**

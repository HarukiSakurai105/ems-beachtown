# ⚕️ EMS Beach Town — Quy Định Khám Bệnh

Website tra cứu nội quy EMS dành cho server GTA RolePlay **Beach Town**.

**Stack:** Next.js 16 • Tailwind CSS • Lucide React • Vercel • Supabase PostgreSQL

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HarukiSakurai105/ems-beachtown)

## Chạy local

```bash
npm install
npm run dev
# Mở http://localhost:3000
```

## Trang quản trị

- `/setup`: tạo Admin đầu tiên khi database chưa có tài khoản; tự khóa sau khi hoàn tất.
- `/login`: đăng nhập bằng tài khoản lưu trong Supabase.
- `/admin` hoặc `/dashboard`: quản lý quy định, bảng giá, trạng thái hiển thị và lịch sử.
- Vai trò: `admin` (toàn quyền), `editor` (thêm/sửa), `viewer` (chỉ xem).

Sao chép `.env.example` thành `.env.local`, sau đó cấu hình:

- `EMS_SESSION_SECRET`: tùy chọn; chuỗi ngẫu nhiên tối thiểu 32 ký tự để ký phiên.
- `SUPABASE_URL` và `SUPABASE_SECRET_KEY`: database PostgreSQL lưu CRUD/audit log. Có thể dùng `SUPABASE_SERVICE_ROLE_KEY` với dự án Supabase legacy.
- `EMS_DISCORD_WEBHOOK_URL`: tùy chọn, dùng cho form hỗ trợ/khiếu nại.

Không commit `.env.local` hoặc token vào GitHub.

## Deploy Vercel

Push lên GitHub → [Vercel Dashboard](https://vercel.com) → Import repo → thêm các biến môi trường trên → Deploy.

Trước khi deploy, mở Supabase SQL Editor và chạy lần lượt `supabase/migrations/001_ems_content.sql` và `supabase/migrations/002_ems_users.sql`. Các file tạo bảng nội dung, lịch sử, tài khoản và bật RLS; trình duyệt không được truy cập database trực tiếp.

Sau khi deploy, mở `/setup` ngay để tạo Admin đầu tiên. Từ đó, Admin tạo tài khoản, đặt lại mật khẩu, khóa/mở khóa và cấp quyền trực tiếp tại tab **Tài khoản & Phân quyền** trong `/admin`.

Nếu chưa cấu hình database và tài khoản, trang công khai vẫn dùng dữ liệu tĩnh bình thường; phần Admin sẽ hiển thị hướng dẫn cấu hình và không cho lưu giả vào trình duyệt.

## Cập nhật nội dung

Sau khi cấu hình Supabase, cập nhật trực tiếp tại `/admin`. Dữ liệu tĩnh trong `data/` là fallback an toàn khi database tạm thời không khả dụng.

## Thêm tính năng

Tạo component mới trong `components/` và import vào `app/page.js`.

---
© 2026 EMS Beach Town

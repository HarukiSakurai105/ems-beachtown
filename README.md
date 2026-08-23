# ⚕️ EMS Beach Town — Quy Định Khám Bệnh

Website tra cứu nội quy EMS dành cho server GTA RolePlay **Beach Town**.

**Stack:** Next.js 16 • Tailwind CSS • Lucide React • Vercel • Upstash Redis REST

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HarukiSakurai105/ems-beachtown)

## Chạy local

```bash
npm install
npm run dev
# Mở http://localhost:3000
```

## Trang quản trị

- `/login`: đăng nhập.
- `/admin` hoặc `/dashboard`: quản lý quy định, bảng giá, trạng thái hiển thị và lịch sử.
- Vai trò: `admin` (toàn quyền), `editor` (thêm/sửa), `viewer` (chỉ xem).

Tạo mật khẩu băm:

```bash
node scripts/hash-password.mjs "mat-khau-rat-manh"
```

Sao chép `.env.example` thành `.env.local`, sau đó cấu hình:

- `EMS_SESSION_SECRET`: chuỗi ngẫu nhiên tối thiểu 32 ký tự.
- `EMS_ADMIN_USERS`: mảng JSON tài khoản với kết quả scrypt ở trên.
- `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN`: database lưu CRUD/audit log.
- `EMS_DISCORD_WEBHOOK_URL`: tùy chọn, dùng cho form hỗ trợ/khiếu nại.

Không commit `.env.local` hoặc token vào GitHub.

## Deploy Vercel

Push lên GitHub → [Vercel Dashboard](https://vercel.com) → Import repo → thêm các biến môi trường trên → Deploy.

Nếu chưa cấu hình database và tài khoản, trang công khai vẫn dùng dữ liệu tĩnh bình thường; phần Admin sẽ hiển thị hướng dẫn cấu hình và không cho lưu giả vào trình duyệt.

## Cập nhật nội dung

Sau khi cấu hình Redis, cập nhật trực tiếp tại `/admin`. Dữ liệu tĩnh trong `data/` là fallback an toàn khi database tạm thời không khả dụng.

## Thêm tính năng

Tạo component mới trong `components/` và import vào `app/page.js`.

---
© 2026 EMS Beach Town

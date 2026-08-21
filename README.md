# ⚕️ EMS Beach Town — Quy Định Khám Bệnh

> Website tra cứu nội quy EMS dành cho server GTA RolePlay **Beach Town**.

[![GitHub Pages](https://img.shields.io/badge/Xem%20Website-GitHub%20Pages-blue?style=flat-square)](https://YOUR_USERNAME.github.io/ems-beachtown)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🌐 Demo

Mở file `index.html` trực tiếp trên trình duyệt, hoặc deploy lên GitHub Pages (xem hướng dẫn bên dưới).

---

## ✨ Tính năng

| Tính năng | Mô tả |
|---|---|
| 📋 Accordion | Bấm vào từng Điều để mở/đóng chi tiết |
| 🔖 Tab switching | Chuyển nhanh giữa nhóm "Cư dân" và "Nội bộ EMS" |
| 🔍 Tìm kiếm | Lọc theo từ khóa, tự động mở accordion khớp |
| 🌙 Dark mode | Chuyển dark/light, lưu vào localStorage |
| 📱 Responsive | Tối ưu cho điện thoại và máy tính |
| 🖨️ In / PDF | Bật tất cả accordion rồi kích hoạt print |
| ⬆️ Scroll-to-top | Nút cuộn lên đầu khi scroll xuống |
| 🗺️ Sidebar nav | Sidebar cố định với mục lục nhảy nhanh |
| ✨ Fade-in | Animation nhẹ khi scroll vào viewport |

---

## 📁 Cấu trúc dự án

```
ems-beachtown/
├── index.html              # Trang chính (toàn bộ HTML)
├── assets/
│   ├── css/
│   │   └── style.css       # CSS chính (tokens, layout, components)
│   └── js/
│       └── app.js          # JS logic (modular, dễ mở rộng)
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages auto-deploy
```

---

## 🚀 Deploy lên GitHub Pages

### Tự động (CI/CD)

1. Push code lên GitHub
2. Vào **Settings → Pages → Source** → chọn branch `main`, folder `/` (root)
3. GitHub sẽ tự deploy — website sẽ có tại `https://YOUR_USERNAME.github.io/ems-beachtown`

Hoặc workflow CI đã có sẵn tại `.github/workflows/deploy.yml`.

### Thủ công

```bash
git clone https://github.com/YOUR_USERNAME/ems-beachtown.git
cd ems-beachtown
# Mở index.html trên trình duyệt
start index.html   # Windows
open index.html    # macOS
```

---

## 🛠️ Cách thêm tính năng mới

### Thêm một Điều mới

Vào `index.html`, tìm phần `<div class="accordion-list" id="accordionResident">` (hoặc `accordionEms`) và thêm:

```html
<div class="accordion-item fade-in-up" id="res-dieuX" data-section="resident"
     data-keywords="từ khóa để tìm kiếm">
  <button class="accordion-header" aria-expanded="false">
    <div class="accordion-meta">
      <span class="accordion-icon">🆕</span>
      <span class="accordion-num">Điều X</span>
    </div>
    <span class="accordion-title">Tiêu đề điều khoản mới</span>
    <span class="accordion-chevron">▾</span>
  </button>
  <div class="accordion-body" hidden>
    <!-- Nội dung -->
  </div>
</div>
```

### Thêm tính năng JavaScript

Vào `assets/js/app.js`, thêm function mới và gọi trong `init()`:

```js
function initMyNewFeature() {
  // ...
}

function init() {
  // ... các feature hiện có ...
  initMyNewFeature(); // <-- thêm dòng này
}
```

---

## 🎨 Thay đổi màu sắc

Mở `assets/css/style.css`, chỉnh biến CSS trong `:root`:

```css
:root {
  --red-primary: #e63946;  /* Màu chủ đạo */
  --blue-dark:   #1d3557;  /* Sidebar, hero gradient */
  /* ... */
}
```

---

## 📝 Changelog

### v1.0.0 — 08/2026
- Khởi tạo dự án
- Toàn bộ nội dung quy định cư dân (Điều 1–6 + Phụ lục)
- Toàn bộ nội dung nội bộ EMS (Điều 1–9 + Phụ lục kỷ luật)
- Dark mode, search, tab, accordion, print, responsive

---

## 📄 License

MIT © 2026 EMS Beach Town

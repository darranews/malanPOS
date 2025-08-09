
# MALAN POS – Kanban Checklist

## 🟢 Giai đoạn 1 – Hoàn thiện POS FnB (Version 1–2)
- [ ] **Bố cục & Giao diện**
  - [ ] Bên trái: Grid sản phẩm (màu category + icon)
  - [ ] Bên phải: Order list + thanh toán
  - [ ] Responsive desktop ↔ tablet ↔ mobile
  - [ ] Tối ưu thao tác bàn phím (barcode, Enter, Space)
- [ ] **Order Panel**
  - [ ] Thêm sản phẩm vào order
  - [ ] Chỉnh số lượng
  - [ ] Xoá sản phẩm
  - [ ] Long-press để edit
- [ ] **Tìm kiếm & Filter**
  - [ ] Search sản phẩm nhanh
  - [ ] Filter nâng cao (category, stock status)
- [ ] **In hóa đơn**
  - [ ] Tích hợp PrintBillModal
  - [ ] Chuẩn hóa khổ 58mm
  - [ ] Tối ưu layout hóa đơn cho mobile print
- [ ] **UI/UX nâng cao**
  - [ ] Dark mode switch (Toast POS pattern)
  - [ ] Quick Add list cho sản phẩm bán chạy
  - [ ] Shortcut bàn phím cho Quick Add
  - [ ] Đồng bộ toàn bộ UI với shadcn/ui

## 🟡 Giai đoạn 2 – Retailer Mode (Version 4–5)
- [ ] **Layout & Tính năng Retail**
  - [ ] Layout barcode scan + nhập số lượng nhanh
  - [ ] Tắt/tối giản FnB features
- [ ] **Cấu hình chế độ**
  - [ ] Settings: Chuyển FnB ↔ Retail
  - [ ] Lưu chế độ đã chọn (localStorage + DB)
- [ ] **Mobile Flow**
  - [ ] Modal thanh toán dạng bottom sheet
  - [ ] Giảm số click thanh toán
- [ ] **Multi-Cart**
  - [ ] Tab/cart switcher
  - [ ] Lưu tạm từng cart (local DB)
  - [ ] Chuyển qua lại không mất dữ liệu

## 🔵 Giai đoạn 3 – License & Thương mại
- [ ] **Cơ chế license key**
  - [ ] Khóa tính năng theo gói
  - [ ] Hạn sử dụng (1 năm)
  - [ ] Check online/offline
- [ ] **Trang kích hoạt**
  - [ ] Form nhập license
  - [ ] Validate từ server
- [ ] **Bảo mật license**
  - [ ] Mã hóa dữ liệu license
  - [ ] Ngăn crack đơn giản

## 🟣 Giai đoạn 4 – Mở rộng & Tối ưu (Version 3, 6, 7, 8, 9)
- [ ] **Backend & API**
  - [ ] Tích hợp DB thật
  - [ ] API bảo mật
  - [ ] Chuyển sang Next.js API Routes hoặc backend riêng
- [ ] **Realtime & Đồng bộ**
  - [ ] WebSocket (Socket.IO/Supabase)
  - [ ] Sync nhiều thiết bị
- [ ] **PWA & Offline**
  - [ ] PWA setup
  - [ ] Dexie/PouchDB lưu local
  - [ ] Tự sync khi online
- [ ] **Dashboard Mini**
  - [ ] Doanh thu hôm nay
  - [ ] Số đơn đã xử lý
  - [ ] Món sắp hết hàng
- [ ] **Thanh toán & In hóa đơn nâng cao**
  - [ ] Linkly EFTPOS
  - [ ] QR/VNPAY/MOMO
- [ ] **Tối ưu UX/UI**
  - [ ] Responsive mobile/tablet
  - [ ] Next/Image priority + sizes
  - [ ] Theme manager
- [ ] **Đa ngôn ngữ & đa tiền tệ**
  - [ ] Hỗ trợ nhiều ngôn ngữ
  - [ ] Chuyển đổi ngôn ngữ
  - [ ] Hỗ trợ nhiều loại tiền tệ
  - [ ] Chuyển đổi & in đúng đơn vị tiền tệ
  - [ ] Format số & ngày theo locale



src/
│
├── app/                         # Route-based pages (Next.js)
│   ├── admin/                   # Admin dashboard
│   ├── order/                   # Order management (view order list, details)
│   └── pos/                     # POS main screen
│
├── components/
│   ├── admin/                   # Component chỉ dùng cho admin
│   ├── pos/                     # Component chỉ dùng cho POS
│   ├── order/                   # Component chỉ dùng cho order
│   ├── product/                 # Component CRUD sản phẩm
│   ├── shared/                  # Component tái sử dụng (Alert, Modal, Button...)
│   └── ui/                      # Component shadcn/ui custom (button.tsx, dialog.tsx...)
│
├── lib/
│   ├── hooks/                   # useOrders, useProducts...
│   ├── services/                # API services (orderService, productService)
│   ├── types/                   # Kiểu dữ liệu (order.ts, product.ts, user.ts)
│   └── utils/                   # formatMoney, constants, helpers
│
├── styles/                      # CSS/Tailwind config (nếu cần)
└── public/
    ├── images/                  # Hình ảnh tĩnh
    └── products/                # Ảnh sản phẩm upload
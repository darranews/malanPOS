@echo off
title malanPOS STEP 2 - Force Overwrite Next.js + Install POS Packages + Show List

cd malanPOS\apps\frontend

:: ========================
:: B1: Force overwrite Next.js
:: ========================
echo 🚀 Initializing Next.js project with FORCE overwrite...
pnpm dlx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --force

:: ========================
:: B2: Cài dependencies chính
:: ========================
echo 📦 Installing main dependencies...
pnpm add @reduxjs/toolkit react-redux @tanstack/react-query axios clsx dayjs shadcn lucide-react react-icons @headlessui/react framer-motion react-hot-toast date-fns uuid next-international

:: ========================
:: B3: Cài dependencies dev
:: ========================
echo 🛠 Installing dev dependencies...
pnpm add -D prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-next eslint-plugin-tailwindcss typescript @types/node @types/react

:: ========================
:: B4: Update package mới nhất
:: ========================
echo 🔄 Updating packages to latest versions...
pnpm update --latest

:: ========================
:: B5: Hiển thị danh sách package đã cài
:: ========================
echo 📜 Installed packages:
pnpm list --depth=0

echo ========================================
echo ✅ Frontend setup completed successfully!
echo ========================================
pause

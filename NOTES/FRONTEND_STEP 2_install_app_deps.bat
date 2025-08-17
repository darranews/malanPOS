@echo off

echo ========================================
echo  Installing Frontend App Dependencies
echo ========================================

cmd /k "pnpm add @reduxjs/toolkit react-redux @tanstack/react-query axios clsx dayjs shadcn lucide-react react-icons @headlessui/react framer-motion react-hot-toast date-fns uuid next-international redux-persist tailwind-merge zod react-hook-form @radix-ui/react-dialog @radix-ui/react-dropdown-menu"

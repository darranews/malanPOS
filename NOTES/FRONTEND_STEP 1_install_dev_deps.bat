@echo off

echo ========================================
echo  Installing Frontend Dev Dependencies
echo ========================================

cmd /k "pnpm add -D prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-next eslint-plugin-tailwindcss eslint-config-prettier typescript @types/node @types/react @types/react-dom postcss autoprefixer lint-staged husky"

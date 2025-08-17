@echo off
cd /d "%~dp0"
echo ========================================
echo  Updating Dev Dependencies to Latest
echo ========================================
echo.
cmd /k "pnpm update prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-next eslint-plugin-tailwindcss eslint-config-prettier typescript @types/node @types/react @types/react-dom postcss autoprefixer lint-staged husky -Dw --latest"

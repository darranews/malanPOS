@echo off
:: Lấy thư mục hiện tại của file bat (bất kể move đi đâu)
cd /d %~dp0

:: Cài dependencies nếu cần
call npm install

:: Chạy dev server
call npm run dev

pause

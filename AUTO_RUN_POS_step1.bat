@echo off
:: Lấy thư mục hiện tại của file bat (bất kể move đi đâu)
cd /d %~dp0

:: Chạy dev server
call json-server --watch db.json --port 3001

pause

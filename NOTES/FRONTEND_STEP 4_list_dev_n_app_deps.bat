@echo off
cd /d "%~dp0"
echo ========================================
echo  Checkg Dev Dependencies versions
echo ========================================
echo.
cmd /k "pnpm list -Dw --depth=0"

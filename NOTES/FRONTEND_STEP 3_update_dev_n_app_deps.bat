@echo off
cd /d "%~dp0"
echo =============================================
echo  Updating Dev and App Dependencies to Latest
echo =============================================
echo.
cmd /k "pnpm update --latest"

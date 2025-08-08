@echo off
setlocal EnableExtensions EnableDelayedExpansion

:: Check Git installed
where git >nul 2>&1
if errorlevel 1 (
  echo Git is not installed or not in PATH.
  echo Download: https://git-scm.com/downloads
  pause
  exit /b 1
)

:: Ask for account/org
set /p account=Enter GitHub account/organization name: 
if "%account%"=="" (
  echo Account cannot be empty.
  pause
  exit /b 1
)

:: Ask for repository
set /p repo=Enter GitHub repository name: 
if "%repo%"=="" (
  echo Repository cannot be empty.
  pause
  exit /b 1
)

:: Choose protocol
set /p ssh=Use SSH clone? (y/N): 
if /I "%ssh%"=="Y" (
  set "URL=git@github.com:%account%/%repo%.git"
) else (
  set "URL=https://github.com/%account%/%repo%.git"
)

echo.
echo Cloning: %URL%
echo Destination: "%cd%\%repo%"
echo.

git clone "%URL%"
if errorlevel 1 (
  echo.
  echo Clone failed. Please check account/repo name and your network.
  pause
  exit /b 1
)

:: Optional: open in VS Code
set /p opencode=Open the project in VS Code now? (y/N): 
if /I "%opencode%"=="Y" (
  :: Try common Code paths, otherwise rely on PATH
  if exist "%ProgramFiles%\Microsoft VS Code\Code.exe" (
    "%ProgramFiles%\Microsoft VS Code\Code.exe" "%cd%\%repo%"
  ) else if exist "%ProgramFiles(x86)%\Microsoft VS Code\Code.exe" (
    "%ProgramFiles(x86)%\Microsoft VS Code\Code.exe" "%cd%\%repo%"
  ) else (
    code "%cd%\%repo%"
  )
)

echo.
echo Done.
pause

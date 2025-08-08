@echo off
setlocal EnableExtensions EnableDelayedExpansion

:: ---------- Pre-flight checks ----------
where git >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Git is not installed or not in PATH.
  echo         Download: https://git-scm.com/downloads
  pause
  exit /b 1
)

:: ---------- Collect inputs ----------
set /p account=Enter GitHub account/organization name: 
if "%account%"=="" (
  echo [ERROR] Account cannot be empty.
  pause
  exit /b 1
)

set /p repo=Enter GitHub repository name: 
if "%repo%"=="" (
  echo [ERROR] Repository cannot be empty.
  pause
  exit /b 1
)

set /p protocol=Use SSH clone? (y/N): 
if /I "%protocol%"=="Y" (
  set "URL=git@github.com:%account%/%repo%.git"
) else (
  set "URL=https://github.com/%account%/%repo%.git"
)

set /p shallow=Shallow clone? (y/N): 
set "DEPTH_ARG="
if /I "%shallow%"=="Y" (
  set /p depth=Depth (press Enter for 1): 
  if "%depth%"=="" set "depth=1"
  set "DEPTH_ARG=--depth %depth% --no-single-branch"
)

set /p branch=Enter branch to checkout (leave empty for default): 
set "BRANCH_ARG="
if not "%branch%"=="" set "BRANCH_ARG=-b %branch%"

set "DEST=%cd%\%repo%"

echo.
echo ===== Summary =====
echo URL:          %URL%
echo Destination:  %DEST%
if defined BRANCH_ARG echo Branch:       %branch%
if defined DEPTH_ARG  echo Shallow:      %DEPTH_ARG%
echo ===================
echo.

:: ---------- Confirm overwrite if folder exists ----------
if exist "%DEST%" (
  echo [WARN] Destination folder already exists: "%DEST%"
  set /p overwrite=Delete this folder and re-clone? (y/N): 
  if /I not "%overwrite%"=="Y" (
    echo Aborted.
    pause
    exit /b 1
  )
  echo Deleting "%DEST%" ...
  rmdir /S /Q "%DEST%"
  if exist "%DEST%" (
    echo [ERROR] Failed to remove existing folder.
    pause
    exit /b 1
  )
)

:: ---------- Clone ----------
echo Cloning...
git clone %DEPTH_ARG% %BRANCH_ARG% "%URL%" "%DEST%"
if errorlevel 1 (
  echo.
  echo [ERROR] Clone failed. Check account/repo/branch and network.
  pause
  exit /b 1
)

:: ---------- Optional: per-repo Git identity ----------
set /p setid=Set Git username/email for this repo? (y/N): 
if /I "%setid%"=="Y" (
  set /p guser=Enter Git username (display name): 
  if "%guser%"=="" (
    echo [ERROR] Username cannot be empty.
    pause
    exit /b 1
  )
  set /p gemail=Enter Git email: 
  if "%gemail%"=="" (
    echo [ERROR] Email cannot be empty.
    pause
    exit /b 1
  )
  echo Setting local git identity...
  git -C "%DEST%" config user.name "%guser%"
  git -C "%DEST%" config user.email "%gemail%"
)

:: ---------- Optional: pull strategy ----------
echo.
set /p pullmode=Set default 'git pull' mode (merge/rebase/skip): 
if /I "%pullmode%"=="MERGE" (
  git -C "%DEST%" config pull.rebase false
) else if /I "%pullmode%"=="REBASE" (
  git -C "%DEST%" config pull.rebase true
) else (
  echo Skipping pull.rebase configuration.
)

:: ---------- Optional: line endings ----------
set /p setcrlf=Set core.autocrlf=true for this repo (Windows line endings)? (y/N): 
if /I "%setcrlf%"=="Y" (
  git -C "%DEST%" config core.autocrlf true
)

:: ---------- Optional: Submodules ----------
set /p usesub=Initialize and update submodules? (y/N): 
if /I "%usesub%"=="Y" (
  pushd "%DEST%"
  echo Initializing submodules recursively...
  git submodule update --init --recursive
  if errorlevel 1 (
    echo [WARN] Submodule init failed.
  )
  popd
)

:: ---------- Optional: Git LFS ----------
set /p use_lfs=Enable Git LFS for this repo? (y/N): 
if /I "%use_lfs%"=="Y" (
  pushd "%DEST%"
  where git-lfs >nul 2>&1
  if errorlevel 1 (
    echo [WARN] git-lfs not found. Install Git LFS from: https://git-lfs.com/
    echo        Skipping LFS setup.
  ) else (
    echo Initializing Git LFS...
    git lfs install
    echo Pulling LFS files (if any)...
    git lfs pull
  )
  popd
)

:: ---------- Optional: Checkout a tag ----------
set /p wanttag=Checkout a specific tag? (y/N): 
if /I "%wanttag%"=="Y" (
  pushd "%DEST%"
  echo Fetching tags...
  git fetch --tags
  echo Available tags (latest first):
  for /f "usebackq delims=" %%T in (`git tag --sort=-creatordate`) do echo   %%T
  echo.
  set /p tagname=Enter tag name to checkout (leave empty to skip): 
  if not "%tagname%"=="" (
    echo Checking out tag "%tagname%" into a new branch "tag-%tagname%" ...
    git checkout -b "tag-%tagname%" "tags/%tagname%"
    if errorlevel 1 (
      echo [WARN] Failed to checkout tag. Make sure the tag exists.
    )
  )
  popd
)

:: ---------- Optional: Auto set upstream ----------
set /p setupstream=Auto set upstream for current branch? (y/N): 
if /I "%setupstream%"=="Y" (
  for /f "usebackq delims=" %%B in (`git -C "%DEST%" rev-parse --abbrev-ref HEAD`) do set "CURBR=%%B"
  git -C "%DEST%" rev-parse --abbrev-ref --symbolic-full-name @{u} >nul 2>&1
  if errorlevel 1 (
    echo Setting upstream: origin/!CURBR!
    git -C "%DEST%" push --set-upstream origin "!CURBR!"
    if errorlevel 1 (
      echo [WARN] Failed to set upstream. Maybe the remote branch does not exist.
    )
  ) else (
    echo Upstream already set for branch !CURBR!.
  )
)

:: ---------- Optional: Create .gitattributes (LFS/CRLF template) ----------
set /p makeattr=Create or update .gitattributes with LFS/CRLF rules? (y/N): 
if /I "%makeattr%"=="Y" (
  set "ATTR=%DEST%\.gitattributes"
  if exist "!ATTR!" (
    set /p append=File .gitattributes exists. Append template to it? (y/N): 
    if /I "%append%"=="Y" (
      echo.>> "!ATTR!"
      echo # ---- Added by clone script (LFS/CRLF template) ---->> "!ATTR!"
    ) else (
      echo Skipping .gitattributes changes.
      goto :after_attrs
    )
  ) else (
    echo Creating .gitattributes...
  )
  (
    echo * text=auto eol=crlf
    echo *.sh text eol=lf
    echo
    echo # Treat common binary/media as LFS
    echo *.png filter=lfs diff=lfs merge=lfs -text
    echo *.jpg filter=lfs diff=lfs merge=lfs -text
    echo *.jpeg filter=lfs diff=lfs merge=lfs -text
    echo *.gif filter=lfs diff=lfs merge=lfs -text
    echo *.webp filter=lfs diff=lfs merge=lfs -text
    echo *.psd filter=lfs diff=lfs merge=lfs -text
    echo *.ai filter=lfs diff=lfs merge=lfs -text
    echo *.mp4 filter=lfs diff=lfs merge=lfs -text
    echo *.mov filter=lfs diff=lfs merge=lfs -text
    echo *.mkv filter=lfs diff=lfs merge=lfs -text
    echo *.wav filter=lfs diff=lfs merge=lfs -text
    echo *.mp3 filter=lfs diff=lfs merge=lfs -text
    echo *.zip filter=lfs diff=lfs merge=lfs -text
    echo *.7z  filter=lfs diff=lfs merge=lfs -text
    echo *.exe filter=lfs diff=lfs merge=lfs -text
    echo *.iso filter=lfs diff=lfs merge=lfs -text
  )>> "!ATTR!"
  echo Wrote LFS/CRLF rules to "!ATTR!"
  set /p commitattr=Commit .gitattributes now? (y/N): 
  if /I "%commitattr%"=="Y" (
    pushd "%DEST%"
    where git-lfs >nul 2>&1
    if not errorlevel 1 git lfs install
    git add .gitattributes
    git commit -m "chore: add .gitattributes for LFS and CRLF rules"
    popd
  )
)
:after_attrs

:: ---------- Post actions ----------
set /p opencode=Open the project in VS Code now? (y/N): 
if /I "%opencode%"=="Y" (
  if exist "%ProgramFiles%\Microsoft VS Code\Code.exe" (
    "%ProgramFiles%\Microsoft VS Code\Code.exe" "%DEST%"
  ) else if exist "%ProgramFiles(x86)%\Microsoft VS Code\Code.exe" (
    "%ProgramFiles(x86)%\Microsoft VS Code\Code.exe" "%DEST%"
  ) else (
    code "%DEST%"
  )
)

echo.
echo Done.
pause

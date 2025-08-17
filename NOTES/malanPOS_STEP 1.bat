@echo off
title Setup malanPOS Monorepo
echo ========================================
echo   Creating malanPOS Monorepo Structure
echo ========================================

REM 1️⃣ Create root folder
mkdir malanPOS
cd malanPOS

REM 2️⃣ Main directories
mkdir apps
mkdir packages

REM 3️⃣ Frontend & Backend
mkdir apps\frontend
mkdir apps\backend

REM 4️⃣ Shared packages
mkdir packages\shared-types
mkdir packages\shared-utils

REM 5️⃣ Root files
echo packages: > pnpm-workspace.yaml
echo   - 'apps/*' >> pnpm-workspace.yaml
echo   - 'packages/*' >> pnpm-workspace.yaml

echo { } > package.json
echo malanPOS Monorepo > README.md

REM 6️⃣ Frontend structure
mkdir apps\frontend\src
mkdir apps\frontend\src\app
mkdir apps\frontend\src\components
mkdir apps\frontend\src\components\pos
mkdir apps\frontend\src\components\shared
mkdir apps\frontend\src\store
mkdir apps\frontend\src\lib
mkdir apps\frontend\src\styles
mkdir apps\frontend\src\types
mkdir apps\frontend\public

type nul > apps\frontend\tailwind.config.ts
type nul > apps\frontend\postcss.config.js
type nul > apps\frontend\package.json
type nul > apps\frontend\tsconfig.json

REM 7️⃣ Backend structure
mkdir apps\backend\src
mkdir apps\backend\src\modules
mkdir apps\backend\src\modules\products
mkdir apps\backend\src\modules\orders
mkdir apps\backend\src\modules\users
mkdir apps\backend\src\modules\categories
mkdir apps\backend\src\common
mkdir apps\backend\src\database
mkdir apps\backend\src\database\prisma
mkdir apps\backend\src\types

type nul > apps\backend\package.json
type nul > apps\backend\tsconfig.json
type nul > apps\backend\src\main.ts
type nul > apps\backend\src\app.module.ts
type nul > apps\backend\prisma\schema.prisma
type nul > apps\backend\prisma\seed.ts

REM 8️⃣ Shared packages
type nul > packages\shared-types\package.json
type nul > packages\shared-types\index.ts
type nul > packages\shared-types\product.ts
type nul > packages\shared-types\order.ts

type nul > packages\shared-utils\package.json
type nul > packages\shared-utils\index.ts
type nul > packages\shared-utils\currency.ts
type nul > packages\shared-utils\date.ts

echo ========================================
echo Step 5: Checking & Installing pnpm globally
echo ========================================
	where pnpm >nul 2>&1
	if %errorLevel% neq 0 (
		echo Installing pnpm...
		npm install -g pnpm
	) else (
		echo pnpm already installed.
	)

echo ========================================
echo Step 7: Fixing empty package.json file
echo ========================================
	for /r %%F in (package.json) do (
		for %%A in ("%%F") do (
			set "filePath=%%~fA"
			setlocal enabledelayedexpansion
			set "size=%%~zA"
			if !size! lss 5 (
				echo 🛠 Fixing %%F ...
				>"%%F" echo {^
	  "name": "%%~nA",^
	  "version": "1.0.0"^
	}
			)
			endlocal
		)
	)


echo.
echo ========================================
echo 🗂 Creating extra frontend POS structure...
echo ========================================

mkdir apps\frontend\src
mkdir apps\frontend\src\app
mkdir apps\frontend\src\components
mkdir apps\frontend\src\features
mkdir apps\frontend\src\features\cart
mkdir apps\frontend\src\features\products
mkdir apps\frontend\src\features\orders
mkdir apps\frontend\src\features\dashboard
mkdir apps\frontend\src\hooks
mkdir apps\frontend\src\lib
mkdir apps\frontend\src\store
mkdir apps\frontend\src\types

:: Blank files để mày bỏ code vào
type nul > apps\frontend\src\store\index.ts
type nul > apps\frontend\src\features\cart\cartSlice.ts
type nul > apps\frontend\src\features\products\ProductGrid.tsx
type nul > apps\frontend\src\features\cart\CartPanel.tsx
type nul > apps\frontend\src\app\layout.tsx
type nul > apps\frontend\src\app\page.tsx
type nul > apps\frontend\src\app\providers.tsx


echo ========================================
echo   malanPOS folder structure created!
echo ========================================
pause

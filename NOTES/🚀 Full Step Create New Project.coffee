-------------------------------------------------------
🚀 Full danh sách các bước cài đặt cho máy mới:
-------------------------------------------------------

✅✅ Cài Nodejs, Chọn phiên bản LTS (LongTermService)
		https://nodejs.org/en/download

		✔ Kiểm tra phiên bản:
				node -v	# Nếu trên 18 là ok

✅✅ Cài Git
		https://git-scm.com/downloads/win

✅✅ Cài Visual Studio code
		https://code.visualstudio.com/download

✅✅ Cài Python
		https://www.python.org/downloads

✅✅👉  tạo 1 file.bat để mở CMD ở chế độ Admin tại bất kỳ thư mục nào: # Dùng file này để chạy các lệnh
		
				Copy các dòng sau vào Notepad và save thành 1 file.bat để trong thư mục project:

						@echo off
						cd /d "%~dp0"
						powershell -Command "Start-Process cmd -ArgumentList '/k cd /d ""%CD%""' -Verb RunAs"
						exit
				# Ví dụ save thành file tên là CMD.bat

✅ 1. Cài pnpm thay thế npm/yarn – nhẹ, nhanh hơn (nếu chưa có):
		npm install -g pnpm
				# Kiểm tra:
						pnpm -v

		📌Các lệnh cơ bản khác với pnpm:
    			pnpm add tên-gói-thư-viện
	            pnpm add -D tên-gói-ứng-dụng    #-D là dev only
				pnpm remove tên-gói		#Gỡ package
				pnpm dev, pnpm build, ...	#Chạy script, Thay vì npm run
				pnpm update		#Cập nhật gói, Update tất cả

       	📌Lưu ý đặc biệt:
				pnpm dùng node_modules ảo → KHÔNG sửa trực tiếp trong đó, vì nó hardlink từ cache.
						Nếu bị lỗi lạ lạ, có thể thử:
								rm -rf node_modules pnpm-lock.yaml
								pnpm install

✅ 2. Cài đặt Next.js để tạo thư mục, cấu trúc project.
		✔ Có 2 cách làm, chú ý đặt tên project nên để chữ thường và không được có khoảng cách:

				👉 Cách 1. Chạy lệnh sau để cài đặt và tạo folder tên-project:
						pnpm create next-app . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
								# Lệnh "create next-app" là tự tải bản Next.js mới nhất về cài đặt
								# "tên-project" là tên thư mục của project muốn cài đặt
								# "ts" là viết tắt của "typescript" dùng cái này thì khỏi dùng "javascript"

						📌 Khi cài đặt sẽ tự setup sẵn cho các ứng dụng hỗ trợ. Nếu có câu hỏi thì trả lời "Yes", phần "@/*" thì trả lời "No" và Enter:
								Turbopack --> Yes, Enter
								typescript \
								tailwind \
								app \
								eslint \
								src-dir \
								import-alias "@/*"

				👉 Cách 2. Chạy lệnh sau để cài đặt Next.js project:
						npx create-next-app@latest tên-project \
								# Lệnh "create-next-app" CŨNG là tự tải bản Next.js mới nhất về cài đặt
								# Nếu có câu hỏi thì trả lời "Yes" và Enter như của Cách 1

✅ 3. Di chuyển vào thư mục project:
		cd thư-mục-project

✅ 4. Cài Cài đặt tất cả thư viện cần thiết cho project:
		pnpm add @reduxjs/toolkit react-redux redux @tanstack/react-query axios clsx dayjs shadcn lucide-react react-icons @headlessui/react framer-motion react-hot-toast date-fns uuid next-international redux-persist tailwind-merge zod react-hook-form @radix-ui/react-dialog @radix-ui/react-dropdown-menu

                @reduxjs/toolkit	# State management chuẩn nhất hiện nay cho React/Next
                react-redux	# Connect React với Redux
                @tanstack/react-query	# Quản lý data fetching, cache siêu mạnh
                axios	# Gọi API REST, dễ customize
                clsx	# Hỗ trợ nối className đẹp, gọn
                dayjs, date-fns	# Xử lý ngày giờ, nhẹ hơn momentjs (cài 1 trong 2 hoặc cả 2 đều ok tuỳ sở thích)
                react-hot-toast	# Hiện toast message đẹp, mượt
                shadcn, lucide-react	# UI Component + Icon hiện đại, chuẩn Figma
                react-icons	# Bộ icon tổng hợp
                @headlessui/react	# Component UI không style sẵn (Dialog, Menu,...)
                framer-motion	# Animation mượt, đơn giản, hay xài cho chuyển tab, modal, ...
                uuid	# Sinh mã ID ngẫu nhiên cho sản phẩm, đơn hàng,...

✅ 5. Cài Cài đặt tất cả ứng dụng cần thiết cho việc viết code:
        pnpm add -D prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-next eslint-plugin-tailwindcss eslint-config-prettier typescript @types/node @types/react @types/react-dom postcss autoprefixer lint-staged husky

✅ 6. Cập nhật phiên bản ổn định mới nhất cho các thư viện, plugin:
		pnpm update --latest
				# Kiểm tra version:
						pnpm list --depth=0

		------------------------------------------------------------------------------------------------------
				NẾU ĐÃ CÓ PROJECT TRÊN GITHUB THÌ CLONE VỀ:

						👉 Clone source code từ Github nếu có
								git clone <https://github.com/account-name/repo-name> thư-mục-project 
										# Clone project từ Github về thư-mục-project trên PC
										# Tên thư mục viết liền
						👉 Cần kiểm tra và cài đặt lại tất cả thư viện/phụ trợ hiện có trong bản clone của project:
								pnpm install
										# Lệnh này chỉ xài khi mới clone từ Github về,
										# Hoặc copy từ máy khác qua, tránh trường hợp bị thiếu thư viện.
		-------------------------------------------------------------------------------------------------------				

✅ 7. Chạy project
		pnpm dev         # Khởi động project ở chế độ development (localhost:3000)



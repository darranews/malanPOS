-------------------------------------------------------
🚀 TỰ SYNC - ĐỒNG BỘ THƯ MỤC PROJECT LÊN CLOUD NHƯ ONEDRIVE, GOOGLEDRIVE...:
-------------------------------------------------------

✅✅ Tóm tắt các cách từ dễ tới khó:
		✔️ Chạy lệnh robocopy thủ công trên CMD/PowerShell
				# Robocopy ổn định và mạnh hơn các cách khác như Xcopy có sẵn của windows
		✔️ Tạo file batch .bat và chạy tay
		✔️ Thêm script vào package.json, gọi qua lệnh pnpm sync-onedrive
		✔️ Kết hợp script với dev/build (pnpm dev-and-sync)
		✔️ Đặt Task Scheduler tự động sync theo lịch
		✔️ Tích hợp vào git hook (auto sau commit/push)
		✔️ Dùng phần mềm sync chuyên dụng (ít dùng với robocopy)

🙌 I. Manual (Thủ công)

		👉 1. Chạy lệnh robocopy trực tiếp trong CMD/PowerShell:
						robocopy "ĐƯỜNG_DẪN_NGUỒN" "ĐƯỜNG_DẪN_ĐÍCH" /E /MIR /Z /XA:H /XD node_modules /W:3 /R:2
								# /E: copy all subfolders
								# /MIR: mirror toàn bộ folder (xóa file bên OneDrive nếu đã xóa ở local)
								# /Z: copy kiểu restartable (chống đứt mạng)
								# /XA:H: bỏ qua file ẩn/hệ thống
								# /W:3 /R:2: retry tối đa 2 lần, chờ 3s/lần
				📌 Ví dụ:
						robocopy "C:\CODE GPT\malan-pos" "C:\Users\Darra\OneDrive\CODE GPT\malan-pos" /E /MIR /Z /XA:H /XD node_modules /W:3 /R:2
				

				
				📌 Chạy mỗi khi muốn sync.

		👉 2. Tạo file batch (.bat) rồi double-click khi cần
				Tạo file tên sync2onedrive.bat với nội dung:

						@echo off
						robocopy "ĐƯỜNG_DẪN_NGUỒN" "ĐƯỜNG_DẪN_ĐÍCH" /E /MIR /Z /XA:H /XD node_modules /W:3 /R:2
						echo Đã đồng bộ xong!
						pause

				📌 Chỉ cần double-click file này là sync tự động.

🖥️ II. Semi-Auto (Bán tự động)

		👉 3. Thêm script vào package.json, chạy bằng lệnh npm/pnpm

				Trong "scripts" của package.json:

				"scripts": {
				"sync-onedrive": "robocopy \"C:\\CODE GPT\\malan-pos\" \"C:\\Users\\Darra\\OneDrive\\CODE GPT\\malan-pos\" /E /MIR /Z /XA:H /XD node_modules /W:3 /R:2"
				}


				Chạy bằng:

				pnpm sync-onedrive


				Dùng khi muốn sync nhanh bằng terminal, không phải gõ lệnh dài.

		4. Kết hợp với các lệnh khác (dev/build rồi sync)

		Thêm script:

		"dev-and-sync": "pnpm dev && pnpm sync-onedrive",
		"build-and-sync": "pnpm build && pnpm sync-onedrive"


		Chạy:

		pnpm dev-and-sync
		# hoặc
		pnpm build-and-sync


		Tức là sau khi dev/build xong, nó tự sync project lên cloud luôn.

		III. Auto (Tự động hoàn toàn)
5. Đặt lịch sync tự động bằng Task Scheduler (Windows)

Mở Task Scheduler, tạo task mới để chạy file batch hoặc lệnh robocopy theo lịch (hàng ngày/giờ/lúc khởi động máy, v.v...).

Chọn “Action” là Start a program, trỏ tới file batch, hoặc chạy thẳng lệnh robocopy.

Phù hợp nếu muốn auto backup project 1 lần/ngày, hoặc sau mỗi buổi làm việc.

6. Tích hợp vào git hook (auto sync sau mỗi lần commit/push)

Dùng Husky hoặc simple git hook để chạy file sync sau mỗi lần commit.

Ví dụ: Thêm vào .git/hooks/post-commit:

robocopy "C:\CODE GPT\malan-pos" "C:\Users\Darra\OneDrive\CODE GPT\malan-pos" /E /MIR /Z /XA:H /XD node_modules /W:3 /R:2


Cứ commit xong là tự sync lên cloud, không lo quên backup.

7. Sync real-time (ít dùng với robocopy)

Có thể dùng phần mềm thứ 3 (như FreeFileSync, SyncToy…) để watch folder, nhưng với robocopy chỉ nên dùng các cách periodic/manual như trên (không phù hợp sync liên tục từng file nhỏ).


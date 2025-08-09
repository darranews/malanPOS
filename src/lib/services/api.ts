// src/lib/services/api.ts
import axios from "axios";

// 📌 Địa chỉ API khi chạy json-server
// Chạy lệnh: npx json-server --watch db.json --port 3001
export const API_BASE_URL = "http://localhost:3001";

// Khởi tạo axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

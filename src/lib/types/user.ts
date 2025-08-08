// src/lib/types/user.ts
export interface User {
  id: number | string;
  name: string;
  role: "admin" | "staff" | "customer";
  email: string;
}

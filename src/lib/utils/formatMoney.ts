// src/lib/utils/formatMoney.ts

export function formatMoney(amount: number, currency = "₫"): string {
  return (
    amount.toLocaleString("vi-VN", { minimumFractionDigits: 0 }) + " " + currency
  );
}

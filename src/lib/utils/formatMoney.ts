// src/lib/utils/formatMoney.ts
export function formatMoney(amount: number, currency: string = "AUD"): string {
  return amount.toLocaleString("en-AU", { style: "currency", currency });
}

'use client';

type AlertProps = {
  type?: "info" | "error" | "success";
  message: string;
};

export default function Alert({ type = "info", message }: AlertProps) {
  let color =
    type === "error"
      ? "bg-red-100 text-red-700"
      : type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";
  return (
    <div className={`rounded px-4 py-2 mb-3 font-semibold ${color}`}>
      {message}
    </div>
  );
}
export default function Alert({ type = "info", message }) {
  let color =
    type === "error"
      ? "bg-red-100 text-red-700"
      : type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";
  return (
    <div className={`rounded px-4 py-2 mb-3 font-semibold ${color}`}>
      {message}
    </div>
  );
}

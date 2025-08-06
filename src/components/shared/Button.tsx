export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded font-semibold transition focus:outline-none 
        ${disabled
          ? "bg-gray-300 text-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white"} 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

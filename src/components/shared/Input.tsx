export default function Input({
  value,
  onChange,
  placeholder = "",
  className = "",
  ...rest
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-3 py-2 rounded ${className}`}
      {...rest}
    />
  );
}

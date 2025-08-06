export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <button
            className="text-gray-400 hover:text-black text-xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

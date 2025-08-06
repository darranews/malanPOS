import React from "react";

export default function ConfirmModal({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[340px] max-w-full p-6">
        <h3 className="text-lg font-bold mb-3">{title || "Confirm"}</h3>
        <p className="text-gray-700 mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

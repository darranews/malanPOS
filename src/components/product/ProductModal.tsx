import React, { useState, useRef, useEffect } from "react";

export default function ProductModal({
  open,
  onClose,
  onSubmit,
  product,
  categories,
  defaultCategory,
  onDelete
}) {
  const isEdit = !!product;
  const [form, setForm] = useState(
    isEdit
      ? { ...product }
      : { name: "", price: "", stock: 0, category: defaultCategory || categories[0], image: "" }
  );
  const [fileName, setFileName] = useState("");
  const fileRef = useRef();
  const [adjustMode, setAdjustMode] = useState(false);
  const [newStock, setNewStock] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        isEdit
          ? { ...product }
          : { name: "", price: "", stock: 0, category: defaultCategory || categories[0], image: "" }
      );
      setFileName("");
      setAdjustMode(false);
      setNewStock("");
      setNote("");
    }
  }, [open, product, categories, defaultCategory]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => setForm((f) => ({ ...f, image: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    if (!form.name) return false;
    if (!form.price || isNaN(form.price) || form.price <= 0) return false;
    if (!isEdit && (form.stock === "" || isNaN(form.stock) || form.stock < 0)) return false;
    if (isEdit && adjustMode) {
      if (newStock === "" || isNaN(newStock) || newStock < 0) return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (isEdit) {
      if (adjustMode) {
        onSubmit({
          ...form,
          stock: Number(newStock),
          adjustLog: {
            oldStock: product.stock,
            newStock: Number(newStock),
            note: note,
            time: new Date().toISOString(),
          }
        });
      } else {
        onSubmit({ ...form, stock: product.stock });
      }
    } else {
      onSubmit({ ...form, stock: Number(form.stock) });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg flex items-stretch w-[340px] md:w-[440px] overflow-hidden">
        {/* Cột hình */}
        <div className="w-1/3 flex flex-col justify-center bg-gray-50 py-4">
          <div className="flex flex-col items-center w-full px-4">
            <img
              src={form.image || "/images/no-image.png"}
              alt="preview"
              className="object-contain h-32 w-full rounded mb-3"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer text-sm text-blue-600 underline text-center w-full"
            >
              Choose file
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              ref={fileRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-xs text-gray-500 mt-1 text-center w-full">
              {fileName || "(No file chosen)"}
            </span>
          </div>
        </div>
        {/* Cột form */}
        <div className="flex-1 p-4">
          {/* Tiêu đề + nút delete (nếu là edit) */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{isEdit ? "Edit Product" : "Add Product"}</h3>
            {isEdit && (
              <button
                className="text-red-600 border border-red-300 hover:bg-red-50 rounded px-3 py-1 ml-2"
                onClick={() => onDelete && onDelete(product)}
                type="button"
                title="Delete this product"
              >
                Delete
              </button>
            )}
          </div>
          <input
            className="w-full border rounded mb-2 px-3 py-2"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="w-full border rounded mb-2 px-3 py-2"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />
          <select
            className="w-full border rounded mb-2 px-3 py-2"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {!isEdit ? (
            <input
              className="w-full border rounded mb-4 px-3 py-2"
              placeholder="Stock Add"
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
            />
          ) : (
            <div className="flex items-center gap-2 mb-2">
              <input
                className="w-full border rounded px-3 py-2 bg-gray-100"
                placeholder="Stock Total"
                type="number"
                min={0}
                value={adjustMode ? newStock : product.stock}
                readOnly={!adjustMode}
                disabled={!adjustMode}
                onChange={(e) => setNewStock(e.target.value)}
              />
              {!adjustMode ? (
                <button
                  className="border px-3 py-1 rounded text-blue-600 hover:bg-blue-50"
                  onClick={() => { setAdjustMode(true); setNewStock(product.stock); }}
                  type="button"
                >
                  Adjust
                </button>
              ) : (
                <button
                  className="border px-3 py-1 rounded text-gray-500 hover:bg-gray-100"
                  onClick={() => { setAdjustMode(false); setNote(""); setNewStock(""); }}
                  type="button"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
          {isEdit && adjustMode && (
            <textarea
              className="w-full border rounded mb-2 px-3 py-2"
              placeholder="Adjustment Note (reason)..."
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          )}
          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 border text-red-600 py-2 rounded hover:bg-gray-100"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={!validate()}
              type="button"
            >
              {isEdit ? "Save" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

type ProductSearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function ProductSearch({ search, setSearch }: ProductSearchProps) {
  return (
    <input
      className="mb-4 w-full border rounded px-3 py-2"
      placeholder="Search products..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}

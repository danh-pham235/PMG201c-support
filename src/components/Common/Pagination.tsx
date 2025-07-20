import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => (
  <div className="flex justify-center mt-8 space-x-2">
    <button
      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition shadow ${
        page === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-blue-100 hover:bg-blue-400 hover:text-white text-blue-900"
      }`}
      onClick={() => setPage(Math.max(1, page - 1))}
      disabled={page === 1}
    >
      &lt;
    </button>
    {[...Array(totalPages)].map((_, idx) => (
      <button
        key={idx}
        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition shadow ${
          page === idx + 1
            ? "bg-blue-500 text-white"
            : "bg-blue-100 hover:bg-blue-400 hover:text-white text-blue-900"
        }`}
        onClick={() => setPage(idx + 1)}
      >
        {idx + 1}
      </button>
    ))}
    <button
      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition shadow ${
        page === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-blue-100 hover:bg-blue-400 hover:text-white text-blue-900"
      }`}
      onClick={() => setPage(Math.min(totalPages, page + 1))}
      disabled={page === totalPages}
    >
      &gt;
    </button>
  </div>
);

export default Pagination;  
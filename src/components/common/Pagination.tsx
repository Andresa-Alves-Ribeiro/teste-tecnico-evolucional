import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return pages.slice(startPage - 1, endPage).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-3 py-1 rounded transition-colors ${
          currentPage === page
            ? 'bg-primary-light dark:bg-primary-dark text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
        aria-current={currentPage === page ? 'page' : undefined}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Página anterior"
      >
        Anterior
      </button>

      {currentPage > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            1
          </button>
          {currentPage > 4 && <span className="px-2 text-gray-500 dark:text-gray-400">...</span>}
        </>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="px-2 text-gray-500 dark:text-gray-400">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination; 
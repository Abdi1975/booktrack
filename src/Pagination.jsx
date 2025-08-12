import React from 'react';

const Pagination = ({
  darkMode,
  currentPage,
  totalPages,
  loading,
  searchQuery,
  handleFetchBooks
}) => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <button
        onClick={() => handleFetchBooks(searchQuery || 'popular books', Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1 || loading}
        className={`
          px-3 py-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80
          ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'}
        `}
      >
        Prev
      </button>
      
      {[...Array(Math.min(5, totalPages))].map((_, i) => {
        const pageNum = Math.max(1, currentPage - 2) + i;
        if (pageNum > totalPages) return null;
        
        return (
          <button
            key={pageNum}
            onClick={() => handleFetchBooks(searchQuery || 'popular books', pageNum)}
            disabled={loading}
            className={`px-3 py-2 rounded-md border ${
              currentPage === pageNum
                ? darkMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500'
                : darkMode ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
      <button
        onClick={() => handleFetchBooks(searchQuery || 'popular books', Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages || loading}
        className={`
          px-3 py-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80
          ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'}
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
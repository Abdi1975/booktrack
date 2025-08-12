import React from 'react';
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const HomeView = ({
  darkMode,
  searchQuery,
  searchSuggestions,
  showSuggestions,
  books,
  loading,
  currentPage,
  totalPages,
  handleSearchInput,
  handleSearch,
  selectSuggestion,
  setShowSuggestions,
  debounceTimeoutRef,
  navigateToDetail,
  toggleFavorite,
  isFavorite,
  handleFetchBooks
}) => {
  return (
    <div>
      {/* Search Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            darkMode={darkMode}
            searchQuery={searchQuery}
            searchSuggestions={searchSuggestions}
            showSuggestions={showSuggestions}
            handleSearchInput={handleSearchInput}
            handleSearch={handleSearch}
            selectSuggestion={selectSuggestion}
            setShowSuggestions={setShowSuggestions}
            debounceTimeoutRef={debounceTimeoutRef}
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200 sm:shrink-0"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {/* Search Info */}
        <div className="mt-2">
          {searchQuery.trim() ? (
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {loading ? 'Searching for' : 'Results for'} "{searchQuery}"
              {!loading && books.length > 0 && ` (${books.length} found)`}
            </p>
          ) : (
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing popular books • Enter a search term and click Search
            </p>
          )}
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {books.map((book) => (
            <div key={book.key} className="aspect-square">
            <BookCard 
                book={book}
                darkMode={darkMode}
                navigateToDetail={navigateToDetail}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
            />
            </div>
        ))}
        </div>

          {books.length === 0 && !loading && (
            <EmptyState 
              darkMode={darkMode}
              message="No books found. Try a different search term." 
            />
          )}
          
          {books.length > 0 && (
            <Pagination
              darkMode={darkMode}
              currentPage={currentPage}
              totalPages={totalPages}
              loading={loading}
              searchQuery={searchQuery}
              handleFetchBooks={handleFetchBooks}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomeView;
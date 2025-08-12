import React from 'react';
import { Heart } from 'lucide-react';
import BookCard from './BookCard';
import EmptyState from './EmptyState';

const FavoritesView = ({
  darkMode,
  favorites,
  navigateToDetail,
  toggleFavorite,
  isFavorite
}) => {
  return (
    <div
      className={`min-h-screen pb-20 sm:pb-0 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          My Favorites ({favorites.length})
        </h2>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center flex-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
          style={{ minHeight: 'calc(100vh - 8rem)' }} // menghindari scroll extra
        >
          <Heart
            className={`w-16 h-16 mb-4 ${
              darkMode ? 'text-gray-600' : 'text-gray-400'
            }`}
          />
          <EmptyState
            darkMode={darkMode}
            message="No favorite books yet. Start exploring and add some books to your favorites!"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {favorites.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              darkMode={darkMode}
              navigateToDetail={navigateToDetail}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;

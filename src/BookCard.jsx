import React from 'react';
import { Book, Heart, User, Star } from 'lucide-react';
import { getCoverUrl, formatAuthors } from './helpers';

const BookCard = ({ 
  book, 
  darkMode, 
  navigateToDetail, 
  toggleFavorite, 
  isFavorite 
}) => {
  return (
    <div 
      className={`
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
        border rounded-lg shadow-md overflow-hidden transition-all duration-300 
        hover:shadow-lg transform hover:-translate-y-1 cursor-pointer
      `}
      onClick={() => navigateToDetail(book)}
    >
{/* Book Cover */}
<div className="relative">
  {getCoverUrl(book) ? (
    <img
      src={getCoverUrl(book)}
      alt={book.title}
      className="w-full aspect-square object-cover"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
      }}
    />
  ) : null}
  
  {/* Cover Fallback */}
  <div className={`
    ${getCoverUrl(book) ? 'hidden' : 'flex'} 
    w-full aspect-square
    ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} 
    items-center justify-center
  `}>
    <Book className={`w-12 h-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
  </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(book);
          }}
          className={`
            absolute top-2 right-2 p-2 rounded-full transition-all duration-200
            ${darkMode ? 'bg-gray-800 bg-opacity-90 hover:bg-opacity-100' : 'bg-white bg-opacity-90 hover:bg-opacity-100'}
          `}
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite(book.key) 
                ? 'text-red-500 fill-current' 
                : darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      
      {/* Book Info */}
      <div className="p-4">
        <h3 className={`
          font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 
          ${darkMode ? 'text-white' : 'text-gray-900'}
        `}>
          {book.title}
        </h3>
        
        <div className="space-y-2">
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} flex items-center gap-2`}>
            <User className="w-4 h-4" />
            {formatAuthors(book.author_name)}
          </p>
          
          {book.ratings_average && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {book.ratings_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
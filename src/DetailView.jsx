import React from 'react';
import { ArrowLeft, Book, User, Globe, Star, Search, ExternalLink, Heart } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const DetailView = ({
  darkMode,
  selectedBook,
  loading,
  navigateToHome,
  toggleFavorite,
  isFavorite
}) => {
  return (
    <div className={`
      min-h-screen min-h-dvh w-full
      ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}
    `}>
      <div className="p-4">
        {/* Back Button */}
        <button
          onClick={navigateToHome}
          className={`
            flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors duration-200
            ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Books
        </button>

        {loading ? (
          <LoadingSpinner />
        ) : selectedBook ? (
          <div className={`
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
            border rounded-lg shadow-lg overflow-hidden
          `}>
            <div className="flex flex-col md:flex-row md:items-start">
              {/* Book Cover */}
              <div className="w-full md:w-1/3 p-4 flex justify-center">
                {selectedBook.covers ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${selectedBook.covers[0]}-L.jpg`}
                    alt={selectedBook.title}
                    className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                  />
                ) : (
                  <div className={`
                    w-full max-w-sm mx-auto h-80 rounded-lg flex items-center justify-center
                    ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}
                  `}>
                    <Book className={`w-16 h-16 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                )}
              </div>
              
              {/* Book Details */}
              <div className="w-full md:w-2/3 p-4">
                {/* Title & Favorite */}
                <div className="flex justify-between items-start mb-4">
                  <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedBook.title}
                  </h1>
                  <button
                    onClick={() => toggleFavorite(selectedBook)}
                    className={`
                      p-2 rounded-full transition-all duration-200
                      ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                    `}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isFavorite(selectedBook.key) 
                          ? 'text-red-500 fill-current' 
                          : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Book Information */}
                <div className="space-y-4">
                  {/* Authors */}
                  {selectedBook.authorsWithDetails && selectedBook.authorsWithDetails.length > 0 && (
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Authors:
                      </h3>
                      <div className="space-y-2">
                        {selectedBook.authorsWithDetails.map((author, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {author.details?.name || 'Unknown Author'}
                            </p>
                            {author.author?.key && (
                              <a
                                href={`https://openlibrary.org${author.author.key}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Publishers */}
                  {selectedBook.publishers && (
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Publishers:
                      </h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedBook.publishers.join(', ')}
                      </p>
                    </div>
                  )}
                  
                  {/* ISBN */}
                  {selectedBook.isbn_13 && selectedBook.isbn_13.length > 0 && (
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ISBN-13:
                      </h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedBook.isbn_13[0]}
                      </p>
                    </div>
                  )}
                  
                  {/* Pages */}
                  {selectedBook.number_of_pages && (
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Pages:
                      </h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedBook.number_of_pages}
                      </p>
                    </div>
                  )}
                  
                  {/* Subjects */}
                  {selectedBook.subjects && selectedBook.subjects.length > 0 && (
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subjects:
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedBook.subjects.slice(0, 6).map((subject, index) => (
                          <span
                            key={index}
                            className={`
                              px-2 py-1 rounded-full text-sm
                              ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}
                            `}
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* External Links */}
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Links:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`https://openlibrary.org${selectedBook.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        <Globe className="w-4 h-4" />
                        Open Library
                      </a>
                      
                      {selectedBook.isbn_13 && selectedBook.isbn_13[0] && (
                        <a
                          href={`https://www.goodreads.com/search?q=${selectedBook.isbn_13[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                          <Star className="w-4 h-4" />
                          Goodreads
                        </a>
                      )}
                      
                      {selectedBook.title && (
                        <a
                          href={`https://www.google.com/search?q="${encodeURIComponent(selectedBook.title)}" book`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                        >
                          <Search className="w-4 h-4" />
                          Google
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  {selectedBook.description && (
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Description:
                      </h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mt-2`}>
                        {typeof selectedBook.description === 'string' 
                          ? selectedBook.description 
                          : selectedBook.description.value || 'No description available.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState 
            darkMode={darkMode}
            message="Book details not available." 
          />
        )}
      </div>
    </div>
  );
};

export default DetailView;
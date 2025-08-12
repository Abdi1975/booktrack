import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({
  darkMode,
  searchQuery,
  searchSuggestions,
  showSuggestions,
  handleSearchInput,
  handleSearch,
  selectSuggestion,
  setShowSuggestions
}) => {
  const searchContainerRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  return (
    <div className="relative flex-1" ref={searchContainerRef}>
      <Search className={`absolute left-3 top-3 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <input
        type="text"
        autoFocus
        placeholder="Search for books..."
        value={searchQuery}
        onChange={(e) => handleSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        className={`
          w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          ${darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}
        `}
      />
      
      {/* Search Suggestions */}
      {showSuggestions && searchSuggestions.length > 0 && (
        <div className={`
          absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-50
          ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
        `}>
          {searchSuggestions.map((suggestion, index) => (
            <button
              key={suggestion.key}
              onClick={() => selectSuggestion(suggestion)}
              className={`
                w-full px-4 py-3 text-left hover:bg-opacity-50 transition-colors duration-200
                ${index !== searchSuggestions.length - 1 ? 'border-b' : ''}
                ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}
              `}
            >
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {suggestion.title}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                by {suggestion.author}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
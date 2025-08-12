import React from 'react';
import { Book, Heart, Moon, Sun } from 'lucide-react';

const Header = ({ 
  darkMode, 
  view, 
  favorites, 
  navigateToHome, 
  navigateToFavorites, 
  toggleDarkMode 
}) => {
  const DesktopNavigation = () => (
    <nav className="hidden sm:flex space-x-4">
      <button
        onClick={navigateToHome}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          view === 'home'
            ? 'bg-blue-500 text-white'
            : darkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
      >
        Home
      </button>
      <button
        onClick={navigateToFavorites}
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors duration-200 ${
          view === 'favorites'
            ? 'bg-blue-500 text-white'
            : darkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Heart className="w-4 h-4" />
        <span>Favorites</span>
        {favorites.length > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {favorites.length}
          </span>
        )}
      </button>
    </nav>
  );

  const MobileNavigation = () => (
    <div className="sm:hidden pb-3">
      <div className="flex space-x-2">
        <button
          onClick={navigateToHome}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            view === 'home'
              ? 'bg-blue-500 text-white'
              : darkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          Home
        </button>
        <button
          onClick={navigateToFavorites}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-1 transition-colors duration-200 ${
            view === 'favorites'
              ? 'bg-blue-500 text-white'
              : darkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favorites ({favorites.length})</span>
        </button>
      </div>
    </div>
  );

  const DarkModeToggle = () => (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-lg transition-colors duration-200 ${
        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
      }`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );

  return (
    <header className={`
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
      border-b sticky top-0 z-50
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Book className="w-8 h-8 text-blue-500" />
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                BookTrack
              </h1>
            </div>
          </div>
          
          {/* Navigation & Controls */}
          <div className="flex items-center space-x-4">
            <DesktopNavigation />
            <DarkModeToggle />
          </div>
        </div>
        
        <MobileNavigation />
      </div>
    </header>
  );
};

export default Header;
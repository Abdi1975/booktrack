import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import HomeView from './HomeView';
import DetailView from './detailview';
import FavoritesView from './favoritesView';
import { fetchBooks, fetchBookDetails, fetchSearchSuggestions } from './api';
import { loadFavoritesFromMemory, saveFavoritesToMemory, loadDarkModeFromMemory, saveDarkModeToMemory } from './storage';
import './index.css';

const Main = () => {
  // ==================== STATE MANAGEMENT ====================
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('home'); // 'home', 'detail', 'favorites'

  // ==================== REFS ====================
  const debounceTimeoutRef = useRef(null);

  // ==================== EFFECTS ====================
  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    saveFavoritesToMemory(favorites);
  }, [favorites]);

  useEffect(() => {
    saveDarkModeToMemory(darkMode);
  }, [darkMode]);

  // ==================== INITIALIZATION ====================
  const initializeApp = () => {
    const savedFavorites = loadFavoritesFromMemory();
    const savedDarkMode = loadDarkModeFromMemory();
    
    setFavorites(savedFavorites);
    setDarkMode(savedDarkMode);
    handleFetchBooks('popular books', 1);
  };

  // ==================== API HANDLERS ====================
  const handleFetchBooks = async (query = 'popular books', page = 1) => {
    setLoading(true);
    try {
      const result = await fetchBooks(query, page);
      setBooks(result.books);
      setTotalPages(result.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
    setLoading(false);
  };

  const handleFetchBookDetails = async (key) => {
    setLoading(true);
    try {
      const book = await fetchBookDetails(key);
      setSelectedBook(book);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
    setLoading(false);
  };

  const handleFetchSuggestions = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const suggestions = await fetchSearchSuggestions(query);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSearchSuggestions([]);
    }
  };

  // ==================== SEARCH HANDLERS ====================
  const handleSearchInput = (value) => {
    setSearchQuery(value);
    setShowSuggestions(true);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        handleFetchSuggestions(value);
      } else {
        setSearchSuggestions([]);
      }
    }, 300);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      handleFetchBooks(searchQuery, 1);
    } else {
      handleFetchBooks("popular books", 1);
    }
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion) => {
    const title = suggestion.title || suggestion.name || "";
    setSearchQuery(title);
    setShowSuggestions(false);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    handleFetchBooks(title, 1);
  };

  // ==================== FAVORITES HANDLERS ====================
  const createFavoriteBook = (book) => {
    return {
      key: book.key,
      title: book.title,
      author_name: book.author_name || (book.authorsWithDetails ? 
        book.authorsWithDetails.map(a => a.details?.name || 'Unknown Author') : 
        ['Unknown Author']
      ),
      publish_year: book.publish_year || (book.publish_date ? 
        [book.publish_date] : 
        ['Unknown']
      ),
      publish_date: book.publish_date,
      cover_i: book.cover_i || (book.covers ? book.covers[0] : null),
      ratings_average: book.ratings_average
    };
  };

  const toggleFavorite = (book) => {
    const bookId = book.key;
    const isAlreadyFavorite = favorites.some(fav => fav.key === bookId);
    
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.key !== bookId));
    } else {
      const favoriteBook = createFavoriteBook(book);
      setFavorites([...favorites, favoriteBook]);
    }
  };

  const isFavorite = (bookKey) => {
    return favorites.some(fav => fav.key === bookKey);
  };

  // ==================== NAVIGATION HANDLERS ====================
  const navigateToDetail = (book) => {
    handleFetchBookDetails(book.key);
    setView('detail');
  };

  const navigateToHome = () => {
    setView('home');
  };

  const navigateToFavorites = () => {
    setView('favorites');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // ==================== MAIN RENDER ====================
  return (
    <div className={`
      min-h-screen transition-colors duration-300 
      ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}
    `}>
      <Header 
        darkMode={darkMode}
        view={view}
        favorites={favorites}
        navigateToHome={navigateToHome}
        navigateToFavorites={navigateToFavorites}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'home' && (
          <HomeView 
            darkMode={darkMode}
            searchQuery={searchQuery}
            searchSuggestions={searchSuggestions}
            showSuggestions={showSuggestions}
            books={books}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            favorites={favorites}
            handleSearchInput={handleSearchInput}
            handleSearch={handleSearch}
            selectSuggestion={selectSuggestion}
            setShowSuggestions={setShowSuggestions}
            debounceTimeoutRef={debounceTimeoutRef}
            navigateToDetail={navigateToDetail}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            handleFetchBooks={handleFetchBooks}
          />
        )}
        {view === 'detail' && (
          <DetailView 
            darkMode={darkMode}
            selectedBook={selectedBook}
            loading={loading}
            navigateToHome={navigateToHome}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}
        {view === 'favorites' && (
          <FavoritesView 
            darkMode={darkMode}
            favorites={favorites}
            navigateToDetail={navigateToDetail}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

export default Main;
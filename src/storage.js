export const loadFavoritesFromMemory = () => {
  return window.booktrackFavorites || [];
};

export const saveFavoritesToMemory = (favorites) => {
  window.booktrackFavorites = favorites;
};

export const loadDarkModeFromMemory = () => {
  return window.booktrackDarkMode || false;
};

export const saveDarkModeToMemory = (darkMode) => {
  window.booktrackDarkMode = darkMode;
};
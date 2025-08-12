export const getCoverUrl = (book, size = 'M') => {
  if (book.cover_i) {
    return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`;
  }
  return null;
};

export const formatAuthors = (authors) => {
  if (!authors || authors.length === 0) return 'Unknown Author';
  return authors.slice(0, 3).join(', ');
};
import { formatAuthors } from './helpers';

export const fetchBooks = async (query = 'popular books', page = 1) => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`
  );
  const data = await response.json();
  
  return {
    books: data.docs || [],
    totalPages: Math.ceil(data.numFound / 20)
  };
};

export const fetchBookDetails = async (key) => {
  const response = await fetch(`https://openlibrary.org${key}.json`);
  const data = await response.json();
  
  // Fetch author details if available
  if (data.authors && data.authors.length > 0) {
    const authorPromises = data.authors.slice(0, 3).map(async (author) => {
      try {
        const authorResponse = await fetch(`https://openlibrary.org${author.author.key}.json`);
        const authorData = await authorResponse.json();
        return { ...author, details: authorData };
      } catch {
        return author;
      }
    });
    const authorsWithDetails = await Promise.all(authorPromises);
    data.authorsWithDetails = authorsWithDetails;
  }
  
  return data;
};

export const fetchSearchSuggestions = async (query) => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`
  );
  const data = await response.json();
  
  return (data.docs || []).map(book => ({
    key: book.key,
    title: book.title,
    author: formatAuthors(book.author_name)
  }));
};
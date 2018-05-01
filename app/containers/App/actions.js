import {
  GET_BOOKS,
  SET_BOOKS,
  SET_PRAISE,
  SET_DESCRIPTION,
  GET_AUTHOR,
  SET_AUTHOR,
  GET_ARTICLES,
  SET_ARTICLES,
} from './constants';

export const getBooks = () => ({
  type: GET_BOOKS,
});


export const setBooks = (books) => ({
  type: SET_BOOKS,
  books,
});

export const setPraise = (isbn, praise) => ({
  type: SET_PRAISE,
  isbn,
  praise,
});

export const setDescription = (isbn, description) => ({
  type: SET_DESCRIPTION,
  isbn,
  description,
});

export const getAuthor = () => ({
  type: GET_AUTHOR,
});

export const setAuthor = (author) => ({
  type: SET_AUTHOR,
  author,
});

export const getArticles = () => ({
  type: GET_ARTICLES,
});

export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  articles,
});

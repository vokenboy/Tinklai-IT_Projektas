import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/getBooks`);
    return response.data;
  } catch (error) {
    console.error('Klaida gaunant knygas:', error);
    throw error;
  }
};

export const decrementBookCopies = async (bookId) => {
  try {
    await axios.post(`${API_BASE_URL}/books/decrementCopies`, { bookId });
  } catch (error) {
    console.error('Klaida sumazinant kopiju kieki:', error);
    throw error;
  }
};

export const addBook = async (newBook) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books/addBook`, newBook);
    return response.data;
  } catch (error) {
    console.error('Klaida pridedant knyga:', error);
    throw error;
  }
};

export const editBook = async (book) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/editBook`, book);
    return response.data;
  } catch (error) {
    console.error('Klaida koreguojant knyga:', error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/books/deleteBook/${id}`);
    return response.data;
  } catch (error) {
    console.error('Klaida trinant knyga:', error);
    throw error;
  }
};

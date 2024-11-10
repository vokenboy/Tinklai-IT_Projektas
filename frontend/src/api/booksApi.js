import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/getBooks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const decrementBookCopies = async (bookId) => {
  try {
    await axios.post(`${API_BASE_URL}/books/decrementCopies`, { bookId });
  } catch (error) {
    console.error('Error decrementing book copies:', error);
    throw error;
  }
};

export const addBook = async (newBook) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books/addBook`, newBook);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const editBook = async (book) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/editBook`, book);
    return response.data;
  } catch (error) {
    console.error('Error editing book:', error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/books/deleteBook/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

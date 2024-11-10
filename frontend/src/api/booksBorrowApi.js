import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const borrowBook = async (borrowRequests) => {
  try {
    const responses = await Promise.all(
      borrowRequests.map(request =>
        axios.post(`${API_BASE_URL}/borrowedBooks/borrow`, request)
      )
    );
    return responses;
  } catch (error) {
    console.error('Error borrowing books:', error);
    throw error;
  }
};

export const getBooksBorrowed = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/borrowedBooks/getBorrowedBooks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

export const deleteBorrowedBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/borrowedBooks/deleteBorrowedBook/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting borrowed book:', error);
    throw error;
  }
};
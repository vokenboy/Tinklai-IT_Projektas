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

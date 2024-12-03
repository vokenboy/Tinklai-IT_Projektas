import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/users';

export const getLibrarians = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getLibrarians`);
    return response.data;
  } catch (error) {
    console.error('Error fetching librarians:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getUser/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

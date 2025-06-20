import axios from 'axios';

const API_URL = '/api/auth';

const authAPI = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  verifyToken: async (token) => {
    const response = await axios.get(`${API_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default authAPI;
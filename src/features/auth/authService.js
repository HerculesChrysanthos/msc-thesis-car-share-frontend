import axios from 'axios';

const API_URL = '/api/users/';
// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
};

const authService = {
  login,
};

export default authService;

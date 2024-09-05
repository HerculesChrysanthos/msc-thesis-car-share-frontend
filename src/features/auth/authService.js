import axios from 'axios';

const API_URL = '/api/users/';

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }

  return response.data;
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }

  return response.data;
};

// get Me
const getMe = async (token) => {
  const headers = `Bearer ${token}`;
  const response = await axios.get(API_URL + 'me', {
    headers: {
      Authorization: headers,
    },
  });

  return response.data;
};

// re send verification token
const resendVerificationToken = async (token) => {
  const headers = `Bearer ${token}`;
  const response = await axios.post(
    API_URL + 're-send-verify-token',
    {},
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

// re send verification token
const verifyUser = async (verificationToken) => {
  const response = await axios.post(
    API_URL + `verify?token=${verificationToken}`,
    {}
  );

  if (response.data) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
      userInfo.user.verified = true;

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }

  return response.data;
};

// google Login
const googleLogin = async (token) => {
  const headers = `Bearer ${token}`;
  const response = await axios.get(API_URL + 'me', {
    headers: {
      Authorization: headers,
    },
  });

  if (response.data) {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        token,
        user: response.data,
      })
    );
  }

  return { token, user: response.data };
};

const authService = {
  login,
  register,
  getMe,
  resendVerificationToken,
  verifyUser,
  googleLogin,
};

export default authService;

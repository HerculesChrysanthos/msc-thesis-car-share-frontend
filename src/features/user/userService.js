import axios from 'axios';

const API_URL = '/api/';

const updateProfileImage = async (userId, formData, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.post(
    API_URL + `users/${userId}/profile-image`,
    formData,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  if (response.data) {
    const userInfoString = localStorage.getItem('userInfo');

    const userInfo = JSON.parse(userInfoString);

    userInfo.user = response.data.user;

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  return response.data;
};

const updateProfileInfo = async (userId, formData, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.patch(API_URL + `users/${userId}/`, formData, {
    headers: {
      Authorization: headers,
    },
  });

  if (response.data) {
    const userInfoString = localStorage.getItem('userInfo');

    const userInfo = JSON.parse(userInfoString);

    userInfo.user = response.data.user;

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  return response.data;
};

const userService = {
  updateProfileImage,
  updateProfileInfo,
};

export default userService;

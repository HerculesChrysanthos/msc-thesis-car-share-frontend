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

// get my accepted bookings
const getMyBookingAccepted = async (userId, pageNum, limit, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(
    API_URL +
      'users/' +
      userId +
      `/bookings?status=ACCEPTED&page=${pageNum}&limit=${limit}`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

// get get my previous bookings
const getMyBookingPrevious = async (userId, pageNum, limit, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(
    API_URL +
      'users/' +
      userId +
      `/bookings?status=PREVIOUS&page=${pageNum}&limit=${limit}`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

// get user by id
const getUserById = async (userId, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(API_URL + 'users/' + userId, {
    headers: {
      Authorization: headers,
    },
  });

  return response.data;
};

const getUserReviewsAsOwner = async (userId, page, limit, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(
    API_URL +
      'users/' +
      userId +
      `/reviews?page=${page}&limit=${limit}&role=OWNER`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

const getUserReviewsAsRenter = async (userId, page, limit, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(
    API_URL +
      'users/' +
      userId +
      `/reviews?page=${page}&limit=${limit}&role=RENTER`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

// get cars by user id
const getCarsByUserId = async (userId, pageNum, limit, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(
    API_URL + 'users/' + userId + `/cars?page=${pageNum}&limit=${limit}`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

// post booking review
const postBookingReview = async (bookingId, body, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.post(
    API_URL + 'bookings/' + bookingId + '/reviews',
    body,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

const userService = {
  updateProfileImage,
  updateProfileInfo,
  getMyBookingAccepted,
  getMyBookingPrevious,
  postBookingReview,
  getUserById,
  getUserReviewsAsOwner,
  getUserReviewsAsRenter,
  getCarsByUserId,
};

export default userService;

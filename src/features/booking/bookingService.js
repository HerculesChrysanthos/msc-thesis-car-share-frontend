import axios from 'axios';

const API_URL = '/api/';

const getBookingPending = async (carId, pageNum, limit, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(
    API_URL +
      'cars/' +
      carId +
      `/bookings?status=PENDING&page=${pageNum}&limit=${limit}`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

const getBookingAccepted = async (carId, pageNum, limit, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(
    API_URL +
      'cars/' +
      carId +
      `/bookings?status=ACCEPTED&page=${pageNum}&limit=${limit}`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

const getBookingPrevious = async (carId, pageNum, limit, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.get(
    API_URL +
      'cars/' +
      carId +
      `/bookings?status=PREVIOUS&page=${pageNum}&limit=${limit}`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

const changeBookingState = async (id, state, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.put(
    API_URL + 'bookings/' + id + `/${state}`,
    {},
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

const createBooking = async (body, token) => {
  const headers = `Bearer ${token}`;

  const response = await axios.post(API_URL + 'bookings', body, {
    headers: {
      Authorization: headers,
    },
  });

  return response.data;
};

const carService = {
  getBookingPending,
  getBookingAccepted,
  getBookingPrevious,
  changeBookingState,
  createBooking,
};

export default carService;

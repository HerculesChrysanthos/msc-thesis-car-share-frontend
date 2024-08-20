import axios from 'axios';

const API_URL = '/api/';

// get car brands
const getCarBrands = async () => {
  const response = await axios.get(API_URL + 'makes/');

  return response.data;
};

const getBrandModels = async (brand) => {
  const response = await axios.get(API_URL + '/models?make=' + `${brand}`);

  return response.data;
};

const carRegistration = async (car, token) => {
  console.log(car);
  const headers = `Bearer ${token}`;
  const response = await axios.post(API_URL + '/cars', car, {
    headers: {
      Authorization: headers,
    },
  });

  if (response.data) {
    localStorage.setItem('car', JSON.stringify(response.data));
  }

  return response.data;
};

const carUpdate = async (carId, body, token) => {
  console.log(carId);
  const headers = `Bearer ${token}`;
  const response = await axios.patch(API_URL + `/cars/${carId}`, body, {
    headers: {
      Authorization: headers,
    },
  });

  if (response.data) {
    localStorage.setItem('car', JSON.stringify(response.data));
  }

  return response.data;
};

const carUploadImage = async (carId, body, token) => {
  const headers = `Bearer ${token}`;
  const response = await axios.post(API_URL + `cars/${carId}/images`, body, {
    headers: {
      Authorization: headers,
    },
  });

  if (response.data) {
    localStorage.setItem('car', JSON.stringify(response.data));
  }

  return response.data;
};

const carUpdateImage = async (carId, body, token) => {
  const headers = `Bearer ${token}`;
  const response = await axios.patch(API_URL + `cars/${carId}`, body, {
    headers: {
      Authorization: headers,
    },
  });

  if (response.data) {
    localStorage.setItem('car', JSON.stringify(response.data));
  }

  return response.data;
};

const carDeleteImage = async (carId, imageId, token) => {
  const headers = `Bearer ${token}`;
  const response = await axios.delete(
    API_URL + `cars/${carId}/images/${imageId}`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  if (response.data) {
    localStorage.setItem('car', JSON.stringify(response.data));
  }

  return response.data;
};

const getMycars = async (token) => {
  const headers = `Bearer ${token}`;
  const response = await axios.get(API_URL + `cars/my-cars`, {
    headers: {
      Authorization: headers,
    },
  });

  return response.data;
};

const carService = {
  getCarBrands,
  getBrandModels,
  carRegistration,
  carUpdate,
  carUploadImage,
  carUpdateImage,
  carDeleteImage,
  getMycars,
};

export default carService;

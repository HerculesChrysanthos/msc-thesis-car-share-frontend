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

const getCarsBySearch = async (
  lat,
  long,
  startDate,
  endDate,
  maxPrice,
  minPrice,
  make,
  model,
  gearboxType,
  page,
  limit,
  token
) => {
  const headers = `Bearer ${token}`;
  const queryParams = new URLSearchParams({
    lat,
    long,
    startDate,
    endDate,
    page,
    limit,
  });

  // Conditionally append optional parameters
  if (make) {
    queryParams.append('make', make);
  }
  if (model) {
    queryParams.append('model', model);
  }
  if (gearboxType) {
    queryParams.append('gearboxType', gearboxType);
  }
  if (minPrice) {
    queryParams.append('minPrice', minPrice);
  }
  if (maxPrice) {
    queryParams.append('maxPrice', maxPrice);
  }

  const response = await axios.get(
    `${API_URL}cars/?${queryParams.toString()}`,
    {
      headers: {
        Authorization: headers,
      },
    }
  );

  return response.data;
};

const reverseGeocoding = async (lat, long) => {
  const apiKey =
    'AIzaSyCYAZZw3e-pUDPSHWluC2sbEjRO5FBo-CU&libraries=places&language=el';
  const google_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${+lat},${+long}&key=${apiKey}`;
  const response = await axios.get(google_url);

  const returnedAddresses = response.data.results;

  let fullAddress = '';

  for (let i = 0; i < returnedAddresses.length; i++) {
    const address = returnedAddresses[i];
    const location = address.geometry.location;

    if (location.lat === +lat && location.lng === +long) {
      fullAddress = address.formatted_address;
      break; // Exit the loop once the matching address is found
    }
  }
  return fullAddress;
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
  getCarsBySearch,
  reverseGeocoding,
};

export default carService;

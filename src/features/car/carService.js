import axios from 'axios';

const API_URL = '/api/';

// get car brands
const getCarBrands = async () => {
  const response = await axios.get(API_URL + 'makes/');

  return response.data;
};

// get car makes
const getBrandModels = async (brand) => {
  const response = await axios.get(API_URL + '/models?make=' + `${brand}`);

  return response.data;
};

const carService = {
  getCarBrands,
  getBrandModels,
};

export default carService;

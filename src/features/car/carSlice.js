import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import carService from './carService';

const car = JSON.parse(localStorage.getItem('car'));

const initialState = {
  brands: [],
  models: [],
  singleCar: {},
  carIsLoading: false,
  carImgUploadLoading: false,
  car: car ? car : null,
  myCars: [],
  searchCars: {},
  searchAddress: '',
  singleCarLoading: false,
};

// get car brands
export const getCarBrands = createAsyncThunk(
  'car/brands',
  async (_, thunkAPI) => {
    try {
      return await carService.getCarBrands();
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get the models of specific brand
export const getBrandModels = createAsyncThunk(
  'car/models',
  async (brand, thunkAPI) => {
    try {
      return await carService.getBrandModels(brand);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// register new car
export const carRegistration = createAsyncThunk(
  'car/',
  async (car, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await carService.carRegistration(car, token);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update care info --takes body with new car info and updates the car with new info
export const carUpdate = createAsyncThunk(
  'car/update',
  async ({ carId, body }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.carUpdate(carId, body, token);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// upload car image
export const carUploadImage = createAsyncThunk(
  'car/upload/image',
  async ({ carId, body }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.carUploadImage(carId, body, token);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update car image
export const carUpdateImage = createAsyncThunk(
  'car/update/image',
  async ({ carId, body }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.carUpdateImage(carId, body, token);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete car image
export const carDeleteImage = createAsyncThunk(
  'car/delete/image',
  async ({ carId, imageId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.carDeleteImage(carId, imageId, token);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get car by id
export const getCar = createAsyncThunk(
  'cars/car',
  async ({ carId }, thunkAPI) => {
    try {
      return await carService.getCar(carId);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get my cars
export const getMycars = createAsyncThunk(
  'cars/getMyCars',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.getMycars(token);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get the cars that match search options and filters
export const getCarsBySearch = createAsyncThunk(
  'cars/getCarsBySearch',
  async (
    {
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
    },
    thunkAPI
  ) => {
    try {
      return await carService.getCarsBySearch(
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
        limit
      );
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// take the address name and info from lat and lng
export const reverseGeocoding = createAsyncThunk(
  'cars/reverseGeocoding',
  async ({ lat, long }, thunkAPI) => {
    try {
      return await carService.reverseGeocoding(lat, long);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    reset: (state) => {
      state.carIsLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(carRegistration.pending, (state) => {
        state.carIsLoading = true;
      })
      .addCase(carRegistration.fulfilled, (state, action) => {
        state.carIsLoading = false;
        state.car = action.payload;
      })
      .addCase(carRegistration.rejected, (state) => {
        state.carIsLoading = false;
      })
      .addCase(carUpdate.pending, (state) => {
        state.carIsLoading = true;
      })
      .addCase(carUpdate.fulfilled, (state, action) => {
        state.carIsLoading = false;
        state.car = action.payload;
      })
      .addCase(carUpdate.rejected, (state) => {
        state.carIsLoading = false;
      })
      .addCase(carUploadImage.pending, (state) => {
        state.carImgUploadLoading = true;
      })
      .addCase(carUploadImage.fulfilled, (state, action) => {
        state.carImgUploadLoading = false;
        state.car = action.payload;
      })
      .addCase(carUploadImage.rejected, (state) => {
        state.carImgUploadLoading = false;
      })
      .addCase(carDeleteImage.pending, (state) => {
        state.carImgUploadLoading = true;
      })
      .addCase(carDeleteImage.fulfilled, (state, action) => {
        state.carImgUploadLoading = false;
        state.car = action.payload;
      })
      .addCase(carDeleteImage.rejected, (state) => {
        state.carImgUploadLoading = false;
      })
      .addCase(carUpdateImage.pending, (state) => {
        state.carImgUploadLoading = true;
      })
      .addCase(carUpdateImage.fulfilled, (state, action) => {
        state.carImgUploadLoading = false;
        state.car = action.payload;
      })
      .addCase(carUpdateImage.rejected, (state) => {
        state.carImgUploadLoading = false;
      })
      .addCase(getMycars.pending, (state) => {
        state.carIsLoading = true;
      })
      .addCase(getMycars.fulfilled, (state, action) => {
        state.carIsLoading = false;
        state.myCars = action.payload;
      })
      .addCase(getMycars.rejected, (state) => {
        state.carIsLoading = false;
      })
      .addCase(getCarsBySearch.pending, (state) => {
        state.carIsLoading = true;
      })
      .addCase(getCarsBySearch.fulfilled, (state, action) => {
        state.carIsLoading = false;
        state.searchCars = action.payload;
      })
      .addCase(getCarsBySearch.rejected, (state) => {
        state.carIsLoading = false;
      })
      .addCase(reverseGeocoding.pending, (state) => {
        state.carIsLoading = true;
      })
      .addCase(reverseGeocoding.fulfilled, (state, action) => {
        state.carIsLoading = false;
        state.searchAddress = action.payload;
      })
      .addCase(reverseGeocoding.rejected, (state) => {
        state.carIsLoading = false;
      })
      .addCase(getCar.pending, (state) => {
        state.singleCarLoading = true;
      })
      .addCase(getCar.fulfilled, (state, action) => {
        state.singleCarLoading = false;
        state.singleCar = action.payload;
      })
      .addCase(getCar.rejected, (state) => {
        state.singleCarLoading = false;
      });
  },
});

export const { reset } = carSlice.actions;
export default carSlice.reducer;

import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import carService from './carService';

const car = JSON.parse(localStorage.getItem('car'));

const initialState = {
  brands: [],
  models: [],
  carIsLoading: false,
  car: car ? car : null,
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

// get car brands
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
      // .addCase(getCarBrands.pending, (state) => {
      //   state.carIsLoading = true;
      // })
      // .addCase(getCarBrands.fulfilled, (state, action) => {
      //   state.carIsLoading = false;
      //   state.brands = action.payload;
      // })
      // .addCase(getCarBrands.rejected, (state) => {
      //   state.carIsLoading = false;
      // })
      // .addCase(getBrandModels.pending, (state) => {
      //   state.carIsLoading = true;
      // })
      // .addCase(getBrandModels.fulfilled, (state, action) => {
      //   state.carIsLoading = false;
      //   state.models = action.payload;
      // })
      // .addCase(getBrandModels.rejected, (state) => {
      //   state.carIsLoading = false;
      // })
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
      });
  },
});

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

export const carUpdate = createAsyncThunk(
  'car/update',
  async ({ carId, car }, thunkAPI) => {
    try {
      console.log(carId);
      const token = thunkAPI.getState().auth.user.token;
      return await carService.carUpdate(carId, car, token);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = carSlice.actions;
export default carSlice.reducer;

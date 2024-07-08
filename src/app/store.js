import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import carReducer from '../features/car/carSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
  },
});

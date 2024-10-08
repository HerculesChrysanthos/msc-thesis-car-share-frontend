import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import carReducer from '../features/car/carSlice';
import bookingReducer from '../features/booking/bookingSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    booking: bookingReducer,
    user: userReducer,
  },
});

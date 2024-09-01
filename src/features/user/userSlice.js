import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  userLoading: false,
  myAcceptedBooking: [],
  myPreviousBooking: [],
  acceptedLoading: false,
  previousLoading: false,
};

// get car brands
export const updateProfileImage = createAsyncThunk(
  'user/profileImage',
  async ({ userId, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.updateProfileImage(userId, formData, token);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get car brands
export const updateProfileInfo = createAsyncThunk(
  'user/updateProfileInfo',
  async ({ userId, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.updateProfileInfo(userId, formData, token);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get my accepted booking
export const getMyBookingAccepted = createAsyncThunk(
  'myBooking/accepted',
  async ({ userId, pageNum, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getMyBookingPrevious(
        userId,
        pageNum,
        limit,
        token
      );
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get my previous booking
export const getMyBookingPrevious = createAsyncThunk(
  'myBooking/previous',
  async ({ userId, pageNum, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getMyBookingPrevious(
        userId,
        pageNum,
        limit,
        token
      );
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.bookingIsLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileImage.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.userLoading = false;
      })
      .addCase(updateProfileImage.rejected, (state) => {
        state.userLoading = false;
      })
      .addCase(updateProfileInfo.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(updateProfileInfo.fulfilled, (state, action) => {
        state.userLoading = false;
      })
      .addCase(updateProfileInfo.rejected, (state) => {
        state.userLoading = false;
      })
      .addCase(getMyBookingAccepted.pending, (state) => {
        state.acceptedLoading = true;
      })
      .addCase(getMyBookingAccepted.fulfilled, (state, action) => {
        state.acceptedLoading = false;
        state.myAcceptedBooking = action.payload;
      })
      .addCase(getMyBookingAccepted.rejected, (state) => {
        state.acceptedLoading = false;
      })
      .addCase(getMyBookingPrevious.pending, (state) => {
        state.previousLoading = true;
      })
      .addCase(getMyBookingPrevious.fulfilled, (state, action) => {
        state.previousLoading = false;
        state.myPreviousBooking = action.payload;
      })
      .addCase(getMyBookingPrevious.rejected, (state) => {
        state.previousLoading = false;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

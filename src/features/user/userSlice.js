import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  userLoading: false,
};

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
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

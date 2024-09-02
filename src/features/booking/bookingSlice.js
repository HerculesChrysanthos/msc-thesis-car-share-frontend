import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import bookingService from './bookingService';

const initialState = {
  bookingPending: [],
  bookingAccepted: [],
  bookingPrevious: [],
  bookingPendingLoading: false,
  bookingAcceptedLoading: false,
  bookingPreviousLoading: false,
  bookingLoading: false,
};

export const getBookingPending = createAsyncThunk(
  'booking/pending',
  async ({ carId, pageNum, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getBookingPending(
        carId,
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

export const getBookingAccepted = createAsyncThunk(
  'booking/accepted',
  async ({ carId, pageNum, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getBookingAccepted(
        carId,
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

export const getBookingPrevious = createAsyncThunk(
  'booking/previous',
  async ({ carId, pageNum, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getBookingPrevious(
        carId,
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

export const changeBookingState = createAsyncThunk(
  'booking/changeBookingState',
  async ({ id, state }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.changeBookingState(id, state, token);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    reset: (state) => {
      state.bookingLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingPending.pending, (state) => {
        state.bookingPendingLoading = true;
      })
      .addCase(getBookingPending.fulfilled, (state, action) => {
        state.bookingPendingLoading = false;
        state.bookingPending = action.payload;
      })
      .addCase(getBookingPending.rejected, (state) => {
        state.bookingPendingLoading = false;
      })
      .addCase(getBookingAccepted.pending, (state) => {
        state.bookingAcceptedLoading = true;
      })
      .addCase(getBookingAccepted.fulfilled, (state, action) => {
        state.bookingAcceptedLoading = false;
        state.bookingAccepted = action.payload;
      })
      .addCase(getBookingAccepted.rejected, (state) => {
        state.bookingAcceptedLoading = false;
      })
      .addCase(getBookingPrevious.pending, (state) => {
        state.bookingPreviousLoading = true;
      })
      .addCase(getBookingPrevious.fulfilled, (state, action) => {
        state.bookingPreviousLoading = false;
        state.bookingPrevious = action.payload;
      })
      .addCase(getBookingPrevious.rejected, (state) => {
        state.bookingPreviousLoading = false;
      })
      .addCase(changeBookingState.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(changeBookingState.fulfilled, (state, action) => {
        state.bookingLoading = false;
      })
      .addCase(changeBookingState.rejected, (state) => {
        state.bookingLoading = false;
      });
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;

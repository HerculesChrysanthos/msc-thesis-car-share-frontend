import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  singleUser: {},
  userCars: [],
  reviewsAsOwner: {},
  reviewsAsRenter: {},
  userLoading: false,
  myAcceptedBooking: {},
  myPreviousBooking: {},
  acceptedLoading: false,
  previousLoading: false,
  reviewLoading: false,
  userLoading: false,
  userCarsLoading: false,
  reviewsAsOwnerLoading: false,
  reviewsAsRenterLoading: false,
};

// update user profile image
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

// update users info
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

// get the my bookings with state ACCEPTED
export const getMyBookingAccepted = createAsyncThunk(
  'myBooking/accepted',
  async ({ userId, pageNum, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getMyBookingAccepted(
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

// get the my bookings with state PREVIOUS
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

// get user by id
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async ({ userId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getUserById(userId, token);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user reviews as owner
export const getUserReviewsAsOwner = createAsyncThunk(
  'user/getUserReviewsAsOwner',
  async ({ userId, page, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getUserReviewsAsOwner(
        userId,
        page,
        limit,
        token
      );
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user reviews as renter
export const getUserReviewsAsRenter = createAsyncThunk(
  'user/getUserReviewsAsRenter',
  async ({ userId, page, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getUserReviewsAsRenter(
        userId,
        page,
        limit,
        token
      );
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get the cars of specific user by user id
export const getCarsByUserId = createAsyncThunk(
  'user/getCarsByUserId',
  async ({ userId, pageNum, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getCarsByUserId(userId, pageNum, limit, token);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// post booking review
export const postBookingReview = createAsyncThunk(
  'myBooking/review',
  async ({ bookingId, body }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.postBookingReview(bookingId, body, token);
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
      })
      .addCase(postBookingReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(postBookingReview.fulfilled, (state, action) => {
        state.reviewLoading = false;

        // Find the correct booking and update it
        state.myPreviousBooking = state.myPreviousBooking.map(
          (previousBookings) => {
            return {
              ...previousBookings,
              paginatedResults: previousBookings.paginatedResults.map(
                (booking) => {
                  if (booking._id === action.payload.booking) {
                    return {
                      ...booking,
                      renterReview: action.payload,
                    };
                  }
                  return booking;
                }
              ),
            };
          }
        );
      })
      .addCase(postBookingReview.rejected, (state) => {
        state.reviewLoading = false;
      })
      .addCase(getUserById.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userLoading = false;
        state.singleUser = action.payload;
      })
      .addCase(getUserById.rejected, (state) => {
        state.userLoading = false;
      })
      .addCase(getCarsByUserId.pending, (state) => {
        state.userCarsLoading = true;
      })
      .addCase(getCarsByUserId.fulfilled, (state, action) => {
        state.userCarsLoading = false;
        state.userCars = action.payload;
      })
      .addCase(getCarsByUserId.rejected, (state) => {
        state.userCarsLoading = false;
      })
      .addCase(getUserReviewsAsOwner.pending, (state) => {
        state.reviewsAsOwnerLoading = true;
      })
      .addCase(getUserReviewsAsOwner.fulfilled, (state, action) => {
        state.reviewsAsOwnerLoading = false;
        state.reviewsAsOwner = action.payload;
      })
      .addCase(getUserReviewsAsOwner.rejected, (state) => {
        state.reviewsAsOwnerLoading = false;
      })
      .addCase(getUserReviewsAsRenter.pending, (state) => {
        state.reviewsAsRenterLoading = true;
      })
      .addCase(getUserReviewsAsRenter.fulfilled, (state, action) => {
        state.reviewsAsRenterLoading = false;
        state.reviewsAsRenter = action.payload;
      })
      .addCase(getUserReviewsAsRenter.rejected, (state) => {
        state.reviewsAsRenterLoading = false;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

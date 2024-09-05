import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  checkAuthLoading: false,
  userVerificationLoading: false,
};

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.error;

    return thunkAPI.rejectWithValue(message);
  }
});

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get Me
export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getMe(token);
  } catch (error) {
    const message = error.response.data.error;

    return thunkAPI.rejectWithValue(message);
  }
});

// re send verification token
export const resendVerificationToken = createAsyncThunk(
  'auth/resendVerificationToken',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.resendVerificationToken(token);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// verify user
export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async ({ verificationToken }, thunkAPI) => {
    try {
      return await authService.verifyUser(verificationToken);
    } catch (error) {
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// google login
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ token }, thunkAPI) => {
    try {
      return await authService.googleLogin(token);
    } catch (error) {
      console.log(error);
      const message = error.response.data.error;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.user = user ? user : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.checkAuthLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.checkAuthLoading = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.checkAuthLoading = false;
      })
      .addCase(verifyUser.pending, (state) => {
        state.userVerificationLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.userVerificationLoading = false;
        state.user.user.verified = true;
      })
      .addCase(verifyUser.rejected, (state) => {
        state.userVerificationLoading = false;
      })
      .addCase(googleLogin.pending, (state) => {})
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state) => {});
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

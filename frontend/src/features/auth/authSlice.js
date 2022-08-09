import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

/**
 * @desc Handle login request from frontend
 * @route POST /api/users/login
 * @access public
 */
export const login = createAsyncThunk(
  "auth/login",
  async (userDetails, thunkAPI) => {
    // async(userDetails, thunkAPI) is a payload creator
    try {
      return await authService.login(userDetails);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**
 * @desc Handle logout request from frontend
 * @route No HTTP request needed
 * @access public
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

/**
 * @desc Handle register request from the frontend
 * @route POST /api/users/register
 * @access public
 */
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * @desc change user password
 * @route PUT /api/users/changePassword/:userId
 * @access public
 */

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.changePassword(userData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * @desc get user using their email
 * @route GET /api/users/getUser
 * @access public
 */
export const getUserByEmail = createAsyncThunk(
  "users/getUser",
  async (email, thunkAPI) => {
    try {
      const res = await authService.getUserByEmail(email);
      return res;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getUserByEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

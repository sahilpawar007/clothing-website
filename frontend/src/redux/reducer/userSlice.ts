import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User State Type
interface UserState {
  user: object | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: any;
}

// Initial State
const initialState: UserState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

const request = (state: UserState) => {
  state.loading = true;
  state.isAuthenticated = false;
};

const success = (state: UserState, action: PayloadAction<any>) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.user = action.payload;
};

const fail = (state: UserState, action: PayloadAction<any>) => {
  state.loading = false;
  state.isAuthenticated = false;
  state.user = {};
  state.error = action.payload;
};

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserRequest: request,
    registerUserSuccess: success,
    registerUserFail: fail,
    loginUserRequest: request,
    loginUserSuccess: success,
    loginUserFail: fail,
    loadUserRequest: request,
    loadUserSuccess: success,
    loadUserFail: fail,
    logoutSuccess: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    logoutFail: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  clearErrors,
  logoutSuccess,
  logoutFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
} = userSlice.actions;

// Export Reducer as Default
export default userSlice.reducer;

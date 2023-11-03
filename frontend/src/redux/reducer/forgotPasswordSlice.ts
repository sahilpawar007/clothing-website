import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User State Type
interface ForgotPasswordState {
  loading: boolean;
  message: any;
  success: any;
  error: any;
}

// Initial State
const initialState: ForgotPasswordState = {
  loading: false,
  message: null,
  success: null,
  error: {},
};

const request = (state: ForgotPasswordState) => {
  state.loading = true;
};

const fail = (state: ForgotPasswordState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const forgotPassword = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordRequest: request,
    resetPasswordRequest: request,
    forgotPasswordSuccess: (
      state: ForgotPasswordState,
      action: PayloadAction<any>
    ) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordSuccess: (
      state: ForgotPasswordState,
      action: PayloadAction<any>
    ) => {
      state.loading = false;
      state.success = action.payload;
    },
    forgotPasswordFail: fail,
    resetPasswordFail: fail,
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = forgotPassword.actions;

// Export Reducer as Default
export default forgotPassword.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User State Type
interface ProfileState {
  loading: boolean;
  isUpdated: boolean;
  error: any;
}

// Initial State
const initialState: ProfileState = {
  loading: false,
  isUpdated: false,
  error: {},
};

const request = (state: ProfileState) => {
  state.loading = true;
};

const success = (state: ProfileState, action: PayloadAction<any>) => {
  state.loading = false;
  state.isUpdated = action.payload;
};

const fail = (state: ProfileState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileRequest: request,
    updatePasswordRequest: request,
    updatePhoneRequest: request,
    updateAddressRequest: request,
    updateProfileSuccess: success,
    updatePasswordSuccess: success,
    updatePhoneSuccess: success,
    updateAddressSuccess: success,
    updateProfileFail: fail,
    updatePasswordFail: fail,
    updatePhoneFail: fail,
    updateAddressFail: fail,
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updatePhoneRequest,
  updatePhoneSuccess,
  updatePhoneFail,
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFail,
} = profileSlice.actions;

// Export Reducer as Default
export default profileSlice.reducer;

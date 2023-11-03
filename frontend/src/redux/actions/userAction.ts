import axios from "axios";

import {
  clearErrors,
  registerUserFail,
  registerUserRequest,
  registerUserSuccess,
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  logoutSuccess,
  logoutFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
} from "../reducer/userSlice";
import {
  updateAddressFail,
  updateAddressRequest,
  updateAddressSuccess,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePhoneFail,
  updatePhoneRequest,
  updatePhoneSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../reducer/profileSlice";
import {
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
} from "../reducer/forgotPasswordSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const registerUser = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(registerUserRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/register`,
      userData,
      config
    );

    dispatch(registerUserSuccess(data.user));
  } catch (error: any) {
    dispatch(registerUserFail(error.response.data.message));
  }
};

export const loginUser =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch(loginUserRequest());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/login`,
        { email, password },
        config
      );

      dispatch(loginUserSuccess(data.user));
    } catch (error: any) {
      dispatch(loginUserFail(error.response.data.message));
    }
  };

export const logoutUser = () => async (dispatch: any) => {
  try {
    await axios.get(`${BACKEND_URL}/api/v1/logout`);

    dispatch(logoutSuccess());
  } catch (error: any) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch: any) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/profile`);

    dispatch(loadUserSuccess(data.user));
  } catch (error: any) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// UPDATE

export const updateProfile = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(updateProfileRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/profile/update`,
      userData,
      config
    );

    dispatch(updateProfileSuccess(data.success));
  } catch (error: any) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

export const updatePassword = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(updatePasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/password/update`,
      userData,
      config
    );

    dispatch(updatePasswordSuccess(data.success));
  } catch (error: any) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

export const updateAddress = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(updateAddressRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/address/update`,
      userData,
      config
    );

    dispatch(updateAddressSuccess(data.success));
  } catch (error: any) {
    dispatch(updateAddressFail(error.response.data.message));
  }
};

export const updatePhone = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(updatePhoneRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/phone/update`,
      userData,
      config
    );

    dispatch(updatePhoneSuccess(data.success));
  } catch (error: any) {
    dispatch(updatePhoneFail(error.response.data.message));
  }
};

// FORGOT PASSWORD

export const forgotPassword = (email: string) => async (dispatch: any) => {
  try {
    dispatch(forgotPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/password/forgot`,
      email,
      config
    );

    dispatch(forgotPasswordSuccess(data.message));
  } catch (error: any) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

export const resetPassword =
  (token: any, password: string) => async (dispatch: any) => {
    try {
      dispatch(resetPasswordRequest());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/password/reset/${token}`,
        password,
        config
      );

      dispatch(resetPasswordSuccess(data.success));
    } catch (error: any) {
      dispatch(resetPasswordFail(error.response.data.message));
    }
  };

// Clearing Errors
export const clearError = () => async (dispatch: any) => {
  dispatch(clearErrors());
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Order State Type
interface NewOrderState {
  order: object | null;
  loading: boolean;
  error: any;
}

// Initial State
const initialState: NewOrderState = {
  order: null,
  loading: false,
  error: null,
};

const request = (state: NewOrderState) => {
  state.loading = true;
};

const success = (state: NewOrderState, action: PayloadAction<any>) => {
  state.loading = false;
  state.order = action.payload;
  state.error = null;
};

const fail = (state: NewOrderState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    newOrderRequest: request,
    newOrderFail: fail,
    newOrderSuccess: success,

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const { newOrderRequest, newOrderSuccess, newOrderFail, clearErrors } =
  newOrderSlice.actions;

// Export Reducer as Default
export default newOrderSlice.reducer;

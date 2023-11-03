import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Order State Type
interface OrderDetailsState {
  order: object | null;
  loading: boolean;
  error: any;
}

// Initial State
const initialState: OrderDetailsState = {
  order: null,
  loading: false,
  error: null,
};

const request = (state: OrderDetailsState) => {
  state.loading = true;
};

const success = (state: OrderDetailsState, action: PayloadAction<any>) => {
  state.loading = false;
  state.order = action.payload;
  state.error = null;
};

const fail = (state: OrderDetailsState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    orderDetailsRequest: request,
    orderDetailsFail: fail,
    orderDetailsSuccess: success,

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  clearErrors,
} = orderDetailsSlice.actions;

// Export Reducer as Default
export default orderDetailsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Orders State Type
interface MyOrdersState {
  orders: [] | null;
  loading: boolean;
  error: any;
}

// Initial State
const initialState: MyOrdersState = {
  orders: null,
  loading: false,
  error: null,
};

const request = (state: MyOrdersState) => {
  state.loading = true;
};

const success = (state: MyOrdersState, action: PayloadAction<any>) => {
  state.loading = false;
  state.orders = action.payload;
  state.error = null;
};

const fail = (state: MyOrdersState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    myOrdersRequest: request,
    myOrdersFail: fail,
    myOrdersSuccess: success,

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const { myOrdersRequest, myOrdersSuccess, myOrdersFail, clearErrors } =
  myOrdersSlice.actions;

// Export Reducer as Default
export default myOrdersSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product State Type
interface ProductDetailState {
  product: object | null;
  loading: boolean;
  error: any;
}

// Initial State
const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

const request = (state: ProductDetailState) => {
  state.loading = true;
};

const success = (state: ProductDetailState, action: PayloadAction<any>) => {
  state.loading = false;
  state.product = action.payload;
  state.error = null;
};

const fail = (state: ProductDetailState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const productDetailSlice = createSlice({
  name: "productdetails",
  initialState,
  reducers: {
    productDetailsRequest: request,
    productDetailsFail: fail,
    productDetailsSuccess: success,
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  clearErrors,
} = productDetailSlice.actions;

// Export Reducer as Default
export default productDetailSlice.reducer;

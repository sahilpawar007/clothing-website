import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product State Type
interface NewProductState {
  products: object | null;
  loading: boolean;
  sucess: boolean | null;
  error: any;
}

// Initial State
const initialState: NewProductState = {
  products: null,
  loading: false,
  sucess: null,
  error: null,
};

const request = (state: NewProductState) => {
  state.loading = true;
};

const success = (state: NewProductState, action: PayloadAction<any>) => {
  state.loading = false;
  state.products = action.payload.products;
  state.sucess = action.payload.success;
  state.error = null;
};

const reset = (state: NewProductState) => {
  state.sucess = false;
};

const fail = (state: NewProductState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const newProductSlice = createSlice({
  name: "newproduct",
  initialState,
  reducers: {
    newProductRequest: request,
    newProductFail: fail,
    newProductSuccess: success,
    newProductReset: reset,

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  newProductRequest,
  newProductSuccess,
  newProductReset,
  newProductFail,
  clearErrors,
} = newProductSlice.actions;

// Export Reducer as Default
export default newProductSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product State Type
interface UpdateProductState {
  loading: boolean;
  isUpdated: boolean | null;
  error: any;
}

// Initial State
const initialState: UpdateProductState = {
  loading: false,
  isUpdated: null,
  error: null,
};

const request = (state: UpdateProductState) => {
  state.loading = true;
};

const success = (state: UpdateProductState, action: PayloadAction<any>) => {
  state.loading = false;
  state.isUpdated = action.payload;
  state.error = null;
};

const reset = (state: UpdateProductState) => {
  state.isUpdated = false;
};

const fail = (state: UpdateProductState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const updateProductSlice = createSlice({
  name: "updateproduct",
  initialState,
  reducers: {
    updateProductRequest: request,
    updateProductFail: fail,
    updateProductSuccess: success,
    updateProductReset: reset,

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  updateProductRequest,
  updateProductSuccess,
  updateProductReset,
  updateProductFail,
  clearErrors,
} = updateProductSlice.actions;

// Export Reducer as Default
export default updateProductSlice.reducer;

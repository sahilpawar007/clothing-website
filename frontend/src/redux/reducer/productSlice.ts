import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product State Type
interface ProductState {
  products: [] | null;
  loading: boolean;
  productsCount: any;
  resultPerPage: any;
  filteredProductsCount: any;
  error: any;
}

// Initial State
const initialState: ProductState = {
  products: null,
  loading: false,
  productsCount: null,
  resultPerPage: null,
  filteredProductsCount: null,
  error: null,
};

const request = (state: ProductState) => {
  state.loading = true;
  state.products = [];
};

const fail = (state: ProductState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    allProductRequest: request,
    allProductFail: fail,
    AdminProductRequest: request,
    AdminProductFail: fail,
    allProductSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
      state.error = null;
    },
    AdminProductSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.products = action.payload.products;
      state.error = null;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  allProductRequest,
  allProductSuccess,
  allProductFail,
  AdminProductRequest,
  AdminProductSuccess,
  AdminProductFail,
  clearErrors,
} = productSlice.actions;

// Export Reducer as Default
export default productSlice.reducer;

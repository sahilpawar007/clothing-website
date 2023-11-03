import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product State Type
interface ReviewState {
  loading: boolean;
  success: boolean | null;
  reviews: [] | null;
  isDeleted: boolean | null;
  error: any;
}

// Initial State
const initialState: ReviewState = {
  loading: false,
  reviews: null,
  success: null,
  isDeleted: null,
  error: null,
};

const request = (state: ReviewState) => {
  state.loading = true;
};

const success = (state: ReviewState, action: PayloadAction<any>) => {
  state.loading = false;
  state.success = action.payload;
  state.error = null;
};

const reset = (state: ReviewState) => {
  state.success = false;
};

const fail = (state: ReviewState, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    newReviewRequest: request,
    allReviewRequest: request,
    deleteReviewRequest: request,
    newReviewSuccess: success,
    allReviewSuccess: (state: ReviewState, action: PayloadAction<any>) => {
      state.loading = false;
      state.reviews = action.payload;
      state.error = null;
    },
    deleteReviewSuccess: (state: ReviewState, action: PayloadAction<any>) => {
      state.loading = false;
      state.isDeleted = action.payload;
      state.error = null;
    },
    newReviewFail: fail,
    allReviewFail: fail,
    deleteReviewFail: fail,
    newReviewReset: reset,
    deleteReviewReset: (state: ReviewState) => {
      state.isDeleted = false;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export Actions
export const {
  newReviewRequest,
  newReviewSuccess,
  newReviewFail,
  newReviewReset,
  allReviewRequest,
  allReviewSuccess,
  allReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewReset,
  deleteReviewFail,
  clearErrors,
} = reviewSlice.actions;

// Export Reducer as Default
export default reviewSlice.reducer;

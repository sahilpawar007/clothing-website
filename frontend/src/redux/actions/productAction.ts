import axios from "axios";
import {
  newProductFail,
  newProductRequest,
  newProductSuccess,
} from "../reducer/newProductSlice";
import {
  AdminProductFail,
  AdminProductRequest,
  AdminProductSuccess,
  allProductRequest,
  allProductSuccess,
} from "../reducer/productSlice";
import {
  productDetailsFail,
  productDetailsRequest,
  productDetailsSuccess,
} from "../reducer/productDetails";
import {
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
} from "../reducer/updateProductSlice";
import {
  allReviewFail,
  allReviewRequest,
  allReviewSuccess,
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  newReviewFail,
  newReviewRequest,
  newReviewSuccess,
} from "../reducer/reviewSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// User
export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category: any,
    ratings = 0
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(allProductRequest());

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch(allProductSuccess(data));
    } catch (error: any) {
      dispatch(newProductFail(error.response.data.message));
    }
  };

export const getProductDetails = () => async (dispatch: any) => {
  try {
    dispatch(productDetailsRequest());
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/products`);
    dispatch(productDetailsSuccess(data.product));
  } catch (error: any) {
    dispatch(productDetailsFail(error.response.data.message));
  }
};

// REVIEWS

export const createReview = (reviewData: any) => async (dispatch: any) => {
  try {
    dispatch(newReviewRequest());
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/review`,
      reviewData,
      config
    );
    dispatch(newReviewSuccess(data.success));
  } catch (error: any) {
    dispatch(newReviewFail(error.response.data.message));
  }
};

export const allReviews = () => async (dispatch: any) => {
  try {
    dispatch(allReviewRequest());

    const { data } = await axios.get(`${BACKEND_URL}/api/v1/reviews`);
    dispatch(allReviewSuccess(data.reviews));
  } catch (error: any) {
    dispatch(allReviewFail(error.response.data.message));
  }
};

export const deleteReview =
  (reveiwId: number, productId: number) => async (dispatch: any) => {
    try {
      dispatch(deleteReviewRequest());

      const { data } = await axios.delete(
        `${BACKEND_URL}/api/v1/reviews?id=${reveiwId}&productId=${productId}`
      );
      dispatch(deleteReviewSuccess(data.success));
    } catch (error: any) {
      dispatch(deleteReviewFail(error.response.data.message));
    }
  };

// ADMIN

export const createProduct = (productData: any) => async (dispatch: any) => {
  try {
    dispatch(newProductRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/v1/admin/createProduct`,
      productData,
      config
    );
    dispatch(newProductSuccess(data));
  } catch (error: any) {
    dispatch(newProductFail(error.response.data.message));
  }
};

export const adminProducts = () => async (dispatch: any) => {
  try {
    dispatch(AdminProductRequest());

    const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/products`);
    dispatch(AdminProductSuccess(data.products));
  } catch (error: any) {
    dispatch(AdminProductFail(error.response.data.message));
  }
};

export const updateProducts =
  (id: number, productData: any) => async (dispatch: any) => {
    try {
      dispatch(updateProductRequest());
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/admin/update/products${id}`,
        productData,
        config
      );
      dispatch(updateProductSuccess(data.success));
    } catch (error: any) {
      dispatch(updateProductFail(error.response.data.message));
    }
  };

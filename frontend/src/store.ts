import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/reducer/userSlice";
import profileSlice from "./redux/reducer/profileSlice";
import forgotPasswordSlice from "./redux/reducer/forgotPasswordSlice";
import newProductSlice from "./redux/reducer/newProductSlice";
import productSlice from "./redux/reducer/productSlice";
import getProductDetails from "./redux/reducer/productDetails";
import updateProductSlice from "./redux/reducer/updateProductSlice";
import reviewSlice from "./redux/reducer/reviewSlice";
import newOrderSlice from "./redux/reducer/orderSlice";
import myOrdersSlice from "./redux/reducer/myOrdersSlice";
import orderDetailsSlice from "./redux/reducer/orderDetailsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    forgotPassword: forgotPasswordSlice,
    newProduct: newProductSlice,
    products: productSlice,
    updateProduct: updateProductSlice,
    reviews: reviewSlice,
    productDetails: getProductDetails,
    neworder: newOrderSlice,
    myorders: myOrdersSlice,
    orderdetails: orderDetailsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

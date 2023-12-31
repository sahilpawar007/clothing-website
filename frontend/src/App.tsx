import {
  lazy, Suspense, useEffect
} from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
const Home = lazy(() => import("./components/Home/Home"))
const Login = lazy(() => import("./components/User/Signup/Login"))
const Register = lazy(() => import("./components/User/Signup/Register"))
const ProductDetails = lazy(() => import("./components/Product/ProductDetails"))
import Header from "./components/Layout/Header/Header";
const Footer = lazy(() => import("./components/Layout/Footer/Footer"))
import Loader from './components/Layout/Loader/Loader';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import store from './store';
const NotFound = lazy(() => import("./components/Layout/Not Found/NotFound"))
const Products = lazy(() => import("./components/Product/Products"))
const Checkout = lazy(() => import("./components/Order/Checkout"))
const Contact = lazy(() => import("./components/Layout/Contact/Contact"))
const OrderDetails = lazy(() => import("./components/Order/OrderDetails"))
const MyOrders = lazy(() => import("./components/Order/MyOrders"))
const Profile = lazy(() => import("./components/User/Signup/Profile"))
const UpdateAddress = lazy(() => import("./components/User/Update/UpdateAddress"))
const UpdateEmail = lazy(() => import("./components/User/Update/UpdateEmail"))
const UpdatePassword = lazy(() => import("./components/User/Update/UpdatePassword"))
const UpdatePhone = lazy(() => import("./components/User/Update/UpdatePhone"))
const UpdateProfile = lazy(() => import("./components/User/Update/UpdateProfile"))
const ForgotPassword = lazy(() => import("./components/User/Password/ForgotPassword"))
const ResetPassword = lazy(() => import("./components/User/Password/ResetPassword"))
// import {useAppDispatch} from './redux/hooks'

import { loadUser } from './redux/actions/userAction';
// import { useAppDispatch } from './redux/hooks';

function App() {


  useEffect(() => {
    store.dispatch(loadUser())
  }, [])


  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/product" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/address/update" element={<UpdateAddress />} />
            <Route path="/email/update" element={<UpdateEmail />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/phone/update" element={<UpdatePhone />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset:token" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />

      </Suspense>
    </BrowserRouter >
  );
}

export default App;

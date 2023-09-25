// import React, { useState } from "react";
import "../Layout/Header/Header.css";
import Button from "../User/UI/Button";
import CartBody from "./CartBody";
import CartItem from "./CartItem";
import CloseCart from "./CloseCart";
import Subtotal from "./Subtotal";
import { useNavigate } from "react-router-dom";

interface CloseCartProps {
  isVisible: boolean;
  hideCart: () => void;
}

const Cart: React.FC<CloseCartProps> = ({ isVisible, hideCart }) => {


  const navigate = useNavigate()

  const checkout = () => {
    navigate("/checkout")
    hideCart()
  }

  const continueShoping = () => {
    navigate("/products")
    hideCart()
  }

  const closeCart = () => {
    hideCart()
  };

  return (
    <>
      <CartBody isVisible={isVisible}>
        {<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">

            <CloseCart closeCart={closeCart} />

            <div className="mt-8">
              <div className="flow-root">
                <ul
                  role="list"
                  className="-my-6 divide-y divide-gray-200"
                >
                  <CartItem />
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <Subtotal />
            <div className="mt-6">
              <Button buttonName="Checkout" onClick={checkout} />
            </div>
            <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
              <p>
                <p>or </p>
                <button
                  type="button"
                  onClick={continueShoping}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>}
      </CartBody>
    </>
  );
};

export default Cart;

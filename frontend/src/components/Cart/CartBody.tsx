import React from "react";
import "../Layout/Header/Header.css";

interface CartProps {
    closeCart?: () => void;
    isVisible: boolean;
    children?: React.ReactNode
}

const CartBody: React.FC<CartProps> = ({ isVisible, children }) => {
    return (
        <>
            <div>
                <div
                    className={`relative z-50 cart-transition ${isVisible
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                        }`}
                    aria-labelledby="slide-over-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-hidden"></div>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <div className="pointer-events-auto w-screen max-w-md">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartBody;

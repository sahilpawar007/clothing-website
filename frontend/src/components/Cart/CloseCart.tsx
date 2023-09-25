import React from 'react'

interface CloseCartProps {
    closeCart: () => void;
}

const CloseCart: React.FC<CloseCartProps> = ({ closeCart }) => {
    return (
        <div className="flex items-start justify-between">
            <h2
                className="text-lg font-medium text-gray-900"
                id="slide-over-title"
            >
                Shopping cart
            </h2>
            <div className="ml-3 flex h-7 items-center">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        closeCart();
                    }}
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default CloseCart
import React from 'react'

interface buttonType {
    buttonName: string;
    onClick?: () => void
}
const Button: React.FC<buttonType> = ({ buttonName, onClick }) => {
    return (
        <div>
            <button
                type="submit"
                onClick={onClick}
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {buttonName}
            </button>
        </div>
    )
}

export default Button
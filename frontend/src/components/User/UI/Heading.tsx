// import React from 'react'

import Logo from "../../Layout/Header/Logo"
interface titleType {
    title: string
}
const Heading: React.FC<titleType> = ({ title }) => {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="text-center items-center mx-auto w-auto">
                <Logo />
            </div>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {title}
            </h2>
        </div>
    )
}

export default Heading
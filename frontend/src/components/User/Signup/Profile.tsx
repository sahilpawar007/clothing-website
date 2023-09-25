// import React from 'react'

import { useNavigate } from "react-router-dom";
import Icons from "../../Layout/Header/Icons";

const Profile = () => {
    const navigate = useNavigate();

    const updateEmail = () => {
        navigate("/update-email");
    };

    const viewMyOrders = () => {
        navigate("/myorders");
    };

    const updateAddress = () => {
        navigate("/update-address");
    };
    const updateProfile = () => {
        navigate("/update-profile");
    };

    const updatePassword = () => {
        navigate("/update-password");
    };

    const updatePhone = () => {
        navigate("/update-phone");
    };

    const commonButtonStyles =
        "text-gray-100 bg-black text-center border-transparent border-2 hover:border-2 hover:border-gray-500 hover:bg-gray-800 hover:text-white rounded-md mx-14 w-3/4 py-2 text-xl font-medium  ";

    return (
        <div className=" bg-white my-10">
            <h1 className="mx-auto py-2 px-2 rounded-lg bg-white shadow-xl w-fit text-3xl items-center text-center font-bold tracking-tight text-gray-900">
                YOUR ACCOUNT
            </h1>

            <div className=" flex mx-10 mb-10">
                <div className="rounded-lg bg-white drop-shadow mx-5 py-10 px-5 my-10 h-1/3 w-1/3 space-y-4">
                    <div className="item-center py-10 px-2 flex rounded-lg bg-white drop-shadow-lg ">
                        <div
                            className="absolute inset-x-0 top-[-10rem] -z-50 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                            aria-hidden="true"
                        >
                            <div className="relative left-1/2 -z-50 aspect-[1155/678] w-10 max-w-none -translate-x-1/3 rotate-[50deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem] contact" />
                        </div>
                        <div className="border-r-2 flex justify-center items-center border-blue-900  rounded-full  w-20 h-20 bg-black ">
                            <p className="text-3xl text-center font-medium text-gray-100">
                                SP
                            </p>
                        </div>
                        <div className=" flex-wrap ml-5 border-l-2 border-gray-400 pl-6 w-3/4 space-y-4 ">
                            <p className="mt-1 text-xl font-medium text-gray-900">
                                Sahil Pawar
                            </p>
                            <div className="flex space-x-3 items-center">
                                <p className="mt-1 text-lg font-normal text-gray-900">
                                    sahilpawar0325@gmail.com
                                </p>{" "}
                                <Icons title="edit-email" onClick={updateEmail} span={false} strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </div>

                            <div className="flex space-x-4">
                                <button className="text-gray-100 bg-black text-center border-transparent border-2 hover:border-2 hover:border-gray-500 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-xl font-medium flex">
                                    Logout
                                </button>
                                <button
                                    onClick={updateProfile}
                                    className="text-gray-100 bg-black text-center border-transparent border-2 hover:border-2 hover:border-gray-500 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-xl font-medium flex"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="item-center py-10 flex-wrap justify-center rounded-lg bg-white drop-shadow-lg space-y-6  ">
                        <button className={`${commonButtonStyles} `} onClick={viewMyOrders}>
                            View Orders
                        </button>

                        <button
                            className={`${commonButtonStyles} `}
                            onClick={updatePassword}
                        >
                            Update Password
                        </button>
                    </div>
                </div>

                <div className="rounded-lg bg-white drop-shadow w-3/5 mx-10 my-10 p-10 space-y-4">
                    <div className="rounded-lg bg-white drop-shadow-md p-5 ">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Your Address
                        </h2>
                        <div className=" flex-wrap ml-5 border-l-2 border-gray-400 pl-4 w-3/4 space-y-2 ">
                            <p className="text-sm font-medium text-gray-600">Floyd Miles</p>
                            <p className="text-sm font-medium text-gray-600">
                                7363 Cynthia Pass Toronto,
                            </p>
                            <p className="text-sm font-medium text-gray-600">ON N3Y 4H8</p>
                            <button
                                onClick={updateAddress}
                                className="text-gray-100 bg-black text-center border-transparent border-2 hover:border-2 hover:border-gray-500 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-xl font-medium flex"
                            >
                                Update Address
                            </button>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white drop-shadow-md p-5 ">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Your Phone Number
                        </h2>
                        <div className=" flex-wrap ml-5 border-l-2 border-gray-400 pl-4 w-3/4 space-y-2 ">
                            <p className="text-lg font-medium text-gray-600">
                                +91 9999999999
                            </p>
                            <button
                                onClick={updatePhone}
                                className="text-gray-100 bg-black text-center border-transparent border-2 hover:border-2 hover:border-gray-500 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-xl font-medium flex"
                            >
                                Update Phone Number
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;


// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
// </svg>

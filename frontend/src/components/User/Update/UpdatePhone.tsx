// import React from 'react'

import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

const UpdatePhone = () => {
    return (
        <div className="w-1/2 mx-auto shadow-lg rounded-lg my-10">
            <Form title="Update Phone Number">
                {
                    <>
                        <Input label="Phone Number" htmlFor="phone" id="phone" name="phone" type="phone" />
                        <Input label="OTP" htmlFor="otp" id="otp" name="otp" type="phone" />
                        <div className="flex space-x-4 ">
                            <Button buttonName="Update Number" />
                            <Link to={"/profile"} className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancel</Link>
                        </div>

                    </>
                }
            </Form>
        </div>
    );
};

export default UpdatePhone;



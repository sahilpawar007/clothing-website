// import React from 'react'

import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

const UpdatePassword = () => {
    return (
        <div className="w-1/2 mx-auto shadow-lg rounded-lg my-10">
            <Form title="Update Password">
                {
                    <>
                        <Input label="Old Password" htmlFor="old-password" id="old-password" name="old-password" type="password" />
                        <Input label="New Password" htmlFor="new-password" id="new-password" name="new-password" type="password" />
                        <Input label="Confirm Password" htmlFor="confirm-password" id="confirm-password" name="confirm-password" type="password" />
                        <div className="flex space-x-4 ">
                            <Button buttonName="Update Password" />
                            <Link to={"/profile"} className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancel</Link>
                        </div>

                    </>
                }
            </Form>
        </div>
    );
};

export default UpdatePassword;



// import React from 'react'

import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

const ForgotPassword = () => {
    return (
        <div className="w-1/2 mx-auto shadow-lg rounded-lg my-10">
            <Form title="Forgot Password">
                {
                    <>
                        <Input label="Enter Email" htmlFor="email" id="email" name="email" type="email" />
                        <div className="flex space-x-4 ">
                            <Button buttonName="Forgot Password" />
                            <Button buttonName="Cancel" />
                        </div>

                    </>
                }
            </Form>
        </div>
    );
};

export default ForgotPassword;



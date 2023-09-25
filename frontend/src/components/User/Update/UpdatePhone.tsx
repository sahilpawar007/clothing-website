// import React from 'react'

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
                            <Button buttonName="Update Phone Number" />
                            <Button buttonName="Cancel" />
                        </div>

                    </>
                }
            </Form>
        </div>
    );
};

export default UpdatePhone;



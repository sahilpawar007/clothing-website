// import React from 'react'

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
                            <Button buttonName="Cancel" />
                        </div>

                    </>
                }
            </Form>
        </div>
    );
};

export default UpdatePassword;



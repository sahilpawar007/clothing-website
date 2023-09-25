// import React from 'react'

import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

const UpdateEmail = () => {
    return (
        <div className="w-1/2 mx-auto shadow-lg rounded-lg my-10">
            <Form title="Update Email">
                {
                    <>
                        <Input label="Enter Email" htmlFor="email" id="email" name="email" type="email" />
                        <Input label="Enter Code" htmlFor="code" id="code" name="code" type="number" />
                        <div className="flex space-x-4 ">
                            <Button buttonName="Update Email" />
                            <Button buttonName="Cancel" />
                        </div>

                    </>
                }
            </Form>
        </div>
    );
};

export default UpdateEmail;



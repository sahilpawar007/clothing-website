// import React from 'react'

import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

const UpdateProfile = () => {
    return (
        <div className="w-1/2 mx-auto shadow-lg rounded-lg my-10">
            <Form title="Update Profile">
                {
                    <>
                        <Input
                            label="First Name"
                            htmlFor="first-name"
                            id="first-name"
                            name="first-name"
                            type="text"
                        />
                        <Input
                            label="Last Name"
                            htmlFor="last-name"
                            id="last-Name"
                            name="last-name"
                            type="text"
                        />
                        <div className="flex space-x-4 ">
                            <Button buttonName="Update Profile" />
                            <Button buttonName="Cancel" />
                        </div>
                    </>
                }
            </Form>
        </div>
    );
};

export default UpdateProfile;

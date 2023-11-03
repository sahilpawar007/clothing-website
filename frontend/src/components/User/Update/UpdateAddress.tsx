// import React from 'react'

import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";

const UpdateAddress = () => {
    return (
        <div className="w-1/2 mx-auto shadow-lg rounded-lg my-10">
            <Form title="Update Address">
                {
                    <>
                        <Input label="Country" htmlFor="address" id="address" name="address" type="text" />
                        <Input label="First Name" htmlFor="address" id="First-Name" name="addressTwo" type="text" />
                        <Input label="Last Name" htmlFor="address" id="last-Name" name="addressThree" type="text" />
                        <Input label="Flat, House no., Building, Company, Apartment" htmlFor="address" id="addressone" name="address" type="text" />
                        <Input label="Area, Street, Sector, Village" htmlFor="address" id="addressTwo" name="address" type="text" />
                        <Input label="Landmark" htmlFor="address" id="addressThree" name="address" type="text" />
                        <Input label="Town/City" htmlFor="address" id="addressFour" name="address" type="text" />
                        <Input label="State" htmlFor="address" id="addressState" name="address" type="text" />
                        <Input label="Phone" htmlFor="address" id="phone" name="address" type="text" />
                        <div className="flex space-x-4 ">

                            <Button buttonName="Update Address" />
                            <Link to={"/profile"} className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancel</Link>
                        </div>

                    </>
                }
            </Form>
        </div>
    );
};

export default UpdateAddress;



import { useState } from "react";
import { Switch } from "@headlessui/react";
import "./Contact.css";
import Input from "../../User/UI/Input";
import Button from "../../User/UI/Button";
import { Link } from "react-router-dom";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Contact = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-white mt-10 mx-40">
      <div className="isolate bg-white drop-shadow-xl rounded-2xl my-7 px-6 py-24 sm:py-32 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-10 max-w-none -translate-x-1/3 rotate-[50deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem] contact" />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact sales
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            You are contacting RZLN
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <Input label="First Name" htmlFor="firstname" id="firstname" name="firstname" type="text" />
            <Input label="Last Name" htmlFor="firstname" id="firstname" name="firstname" type="text" />

            <div className="sm:col-span-2">
              <Input label="Company" htmlFor="company" id="company" name="company" type="text" />
            </div>
            <div className="sm:col-span-2">
              <Input label="Email" htmlFor="email" id="email" name="email" type="email" />
            </div>


            <div className="sm:col-span-2">

            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? "bg-indigo-500" : "bg-gray-200",
                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <Link to={"/"} className="font-semibold text-black">
                  privacy&nbsp;policy
                </Link>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <Button buttonName="Let's Talk" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

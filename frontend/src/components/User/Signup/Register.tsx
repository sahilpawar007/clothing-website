import Form from "../UI/Form";
import Input from "../UI/Input";
import { useEffect, useState } from "react";
import { clearError, registerUser } from "../../../redux/actions/userAction";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Register = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")

  const dispatch = useAppDispatch()
  const alert = toast;
  const navigate = useNavigate()
  const location = useLocation()

  const { error, isAuthenticated } = useAppSelector((state) => state.user)

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone
    }

    dispatch(registerUser(userData));
  }

  const redirect = location.search ? location.search.split("=")[1] : "/profile";

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError())
    }
    if (isAuthenticated) {
      navigate(redirect)
    }
  }, [error, isAuthenticated, alert, navigate, redirect, dispatch,])

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer />
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form title="Register User" onSubmit={handleRegisterUser}>
          {
            <>
              <div className="flex justify-between space-x-2">
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" htmlFor="first-name" id="first-name" name="first-name" type="text" />
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" htmlFor="last-name" id="last-name" name="last-name" type="text" />
              </div>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email" htmlFor="email" id="email" name="email" type="email" />
              <Input value={password} pattern={".{8,}"} title="Password must exceed 8 characters" onChange={(e) => setPassword(e.target.value)} label="Enter Password" htmlFor="new-password" id="new-password" name="new-password" type="password" />
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} label="Phone Number" htmlFor="phone" id="phone" name="phone" type="phone" />
              <div className="flex space-x-4 ">

                <input value="Register" id="register" type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm cursor-pointer hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />

              </div>
            </>
          }
        </Form>

        <p className=" text-center text-sm text-gray-500">
          Already Signed-Up?
          <Link className="font-semibold leading-6 text-black hover:text-indigo-500" to={"/login"}>{" "}Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

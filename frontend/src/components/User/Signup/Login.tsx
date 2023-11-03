import Button from "../UI/Button";
import Form from "../UI/Form";
import Input from "../UI/Input";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearError, loginUser } from "../../../redux/actions/userAction";
import { Link } from "react-router-dom";

const Login = () => {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const dispatch = useAppDispatch()
  const alert = toast;
  const navigate = useNavigate()
  const location = useLocation()

  const { error, isAuthenticated } = useAppSelector((state) => state.user)

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser(loginEmail, loginPassword))
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
        <Form title="Login to your account" onSubmit={handleLoginUser}>
          {
            <>
              <Input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} label="Email" htmlFor="email" id="email" name="email" type="email" />
              <Input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} label="Password" htmlFor="password" id="password" name="password" type="password" />
              <Link className="font-semibold leading-6 mr-auto text-black hover:text-indigo-500" to={"/password/forgot"}>Forgot Password?</Link>

              <div className="flex space-x-4 justify-center ">
                <Button buttonName="Login" />
              </div>

            </>
          }
        </Form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?

          <Link className="font-semibold leading-6 text-black hover:text-indigo-500" to={"/register"}>{" "}Create a new account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

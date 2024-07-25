import React, { useState } from "react";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../Lib/Routes/Routes";
import { useViewportSize } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import { PasswordInput, TextInput } from "@mantine/core";
import { LOGIN_MUTATION } from "query/loginMutation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "Lib/Store/User/User";

export default function LoginPage() {
  const { height } = useViewportSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUserInput, setLoginUserInput] = useState({
    email: "",
    password: "",
  });

  const [login, { loading: loginLoader }] = useMutation(LOGIN_MUTATION);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginUserInput({
        ...loginUserInput,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { loginUserInput },
      });

      dispatch(setUser(data.login.user));
      localStorage.setItem("userData", JSON.stringify(data.login));

      if (data?.login.access_token) {
        navigate(`${routes.dashboard.profile.path}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="mx-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
        <h1 className="self-center font-light text-black m-0">Welcome</h1>
        <h3 className="self-center font-light text-black m-0">
          Login to your account
        </h3>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextInput
                label="Email"
                placeholder="Email"
                value={loginUserInput.email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="mb-4">
              <PasswordInput
                label="Password"
                placeholder="Password"
                value={loginUserInput.password}
                onChange={handleChange("password")}
                required
              />
            </div>

            <div className="flex items-center mb-6 mt-4">
              <div className="flex ml-auto">
                <Link
                  to={routes.forgetPassword.path}
                  className="inline-flex text-xs  text-gray-500 sm:text-sm  hover:text-gray-700"
                >
                  Forgot Your Password?
                </Link>
              </div>
            </div>

            <div className="text-right w-full">
              <ButtonComponent
                type="submit"
                loading={loginLoader}
                fullWidth={true}
              >
                Login
              </ButtonComponent>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6">
          <span className="inline-flex items-center text-xs text-center text-gray-500">
            You don&#x27;t have an account yet?&nbsp;
            <Link
              to={routes.register.path}
              className="text-blue-900 hover:text-blue-600 transition-colors"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

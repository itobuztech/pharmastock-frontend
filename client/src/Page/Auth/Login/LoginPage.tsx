import React, { ChangeEvent, FormEvent, useState } from "react";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import TextFieldComponent from "../../../Components/TextField/TextFieldComponent";
import EmailIcon from "../../../Icons/Email-Icon";
import LockIcon from "../../../Icons/Lock-Icon";
import { useForm } from "react-hook-form";
import { LoginPayload } from "../../../Lib/Api/Fake/Users/users.interface";
import { useAppDispatch, useAppSelector } from "../../../Lib/Store/hooks";
import { userSliceActions } from "../../../Lib/Store/User/User.Slice";
import { Link } from "react-router-dom";
import routes from "../../../Lib/Routes/Routes";
import { useViewportSize } from "@mantine/hooks";
import { gql, useMutation } from "@apollo/client";

interface LoginUserInput {
  email: string;
  password: string;
}

interface LoginResponse {
  login: {
    access_token: string;
    user: {
      createdAt: string;
      email: string;
      id: string;
      name: string;
      updatedAt: string;
      username: string;
    };
  };
}

const LOGIN_MUTATION = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
      user {
        createdAt
        email
        id
        name
        updatedAt
        username
      }
    }
  }
`;

export default function LoginPage() {
  // const loginState = useAppSelector((state) => state.user.login);
  // const dispatch = useAppDispatch();
  const { height } = useViewportSize();

  const [formData, setFormData] = useState<LoginUserInput>({
    email: "",
    password: "",
  });

  const [login, { loading: loginLoader, error: loginError }] = useMutation<
    LoginResponse,
    { loginUserInput: LoginUserInput }
  >(LOGIN_MUTATION);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: {
          loginUserInput: formData,
        },
      });
      console.log("Login successful:", data);
      if (data?.login.access_token) {
        localStorage.setItem("token", data.login.access_token);
      }
      // Redirect or update UI accordingly
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="mx-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
          Login To Your Account
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <TextFieldComponent
              icon={<EmailIcon />}
              placeholder="Your email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextFieldComponent
              icon={<LockIcon />}
              placeholder="Your password"
              type="password"
              register={register("password")}
            />

            <p>{loginError && "Form error"}</p>

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
            <div className="flex w-full">
              <ButtonComponent type="submit" loading={loginLoader}>
                Login
              </ButtonComponent>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6">
          <Link
            to={routes.register.path}
            className="inline-flex items-center text-xs  text-center text-gray-500 hover:text-gray-700"
          >
            <span className="ml-2">You don&#x27;t have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

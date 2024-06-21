/* eslint-disable max-len */
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../Lib/Routes/Routes";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import { gql, useMutation } from "@apollo/client";

interface SignupUserInput {
  username: string;
  name: string;
  email: string;
  roleId: string;
  password: string;
}

interface SignupResponse {
  signup: {
    access_token: string;
  };
}

const SIGNUP_MUTATION = gql`
  mutation Signup($signupUserInput: CreateUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      access_token
    }
  }
`;

export default function RegisterPage() {
  const [formData, setFormData] = useState<SignupUserInput>({
    email: "",
    name: "",
    password: "",
    roleId: "d8eb8fe1-60da-4eee-bb4a-b5176f58df09",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [signup, { loading: signupLoading, error: signupEror }] = useMutation<
    SignupResponse,
    { signupUserInput: SignupUserInput }
  >(SIGNUP_MUTATION);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signup({
        variables: {
          signupUserInput: formData,
        },
      });

      console.log("Signup successful:", data);

      if (data?.signup.access_token) {
        localStorage.setItem("token", data.signup.access_token);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="mx-auto flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl">
        Create a new account
      </div>
      <span className="justify-center text-sm text-center text-gray-500 flex-items-center">
        Already have an account ?
        <Link
          to={routes.login.path}
          className="ml-2 text-sm text-blue-500 underline hover:text-blue-700"
        >
          Sign in
        </Link>
      </span>
      <div className="p-6 mt-8">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-2">
            <div className="relative">
              <input
                type="text"
                id="username"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <input
                type="text"
                id="name"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <div className="relative">
              <input
                type="email"
                id="email"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <div className="relative flex">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                see
              </button>
            </div>
          </div>

          <p>{signupEror && "form error"}</p>

          <div className="flex w-full my-4">
            <ButtonComponent type="submit" loading={signupLoading}>
              Register
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
}

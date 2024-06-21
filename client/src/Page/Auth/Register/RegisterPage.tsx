/* eslint-disable max-len */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../Lib/Routes/Routes";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import { useMutation } from "@apollo/client";
import { TextInput, PasswordInput, Select } from "@mantine/core";
import { USER_ROLE } from "enums/enums";
import { SignupResponse, SignupUserInput } from "interfaces/interfaces";
import { SIGNUP_MUTATION } from "./RegisterMutation";

export default function RegisterPage() {
  const [signupUserInput, setSignupUserInput] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    roleId: "",
  });

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSignupUserInput({
        ...signupUserInput,
        [field]: event.target.value,
      });
    };

  const handleRoleChange = (value: string | null) => {
    setSignupUserInput({
      ...signupUserInput,
      roleId: value || "",
    });
  };

  const [signup, { loading: signupLoading, error: signupEror }] = useMutation<
    SignupResponse,
    { signupUserInput: SignupUserInput }
  >(SIGNUP_MUTATION);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: { signupUserInput },
      });
      console.log("Signup successful", data);
    } catch (error) {
      console.error("Signup error", error);
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
              <TextInput
                label="Username"
                placeholder="Username"
                value={signupUserInput.username}
                onChange={handleChange("username")}
                required
              />
            </div>

            <div className="relative">
              <TextInput
                label="Name"
                placeholder="Name"
                value={signupUserInput.name}
                onChange={handleChange("name")}
                required
              />
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <Select
              label="Role"
              placeholder="Select a role"
              data={[
                { value: USER_ROLE.SUPER_ADMIN, label: "Super Admin" },
                { value: USER_ROLE.ADMIN, label: "Admin" },
                { value: USER_ROLE.STAFF, label: "Staff" },
              ]}
              value={signupUserInput.roleId}
              onChange={handleRoleChange}
              searchable
              required
            />

            <div className="relative">
              <TextInput
                label="Email"
                placeholder="Email"
                value={signupUserInput.email}
                onChange={handleChange("email")}
                required
              />
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <div className="relative flex">
              <PasswordInput
                label="Password"
                className="w-full"
                placeholder="Password"
                value={signupUserInput.password}
                onChange={handleChange("password")}
                required
              />
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

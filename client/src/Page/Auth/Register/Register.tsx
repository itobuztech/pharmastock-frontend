import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../Lib/Routes/Routes";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import { useMutation } from "@apollo/client";
import { TextInput, Select, Text } from "@mantine/core";
import { SIGNUP_MUTATION } from "../../../query/RegisterMutation";
import { CreateUserInput } from "gql/graphql";
import { toast } from "react-toastify";
import { useViewportSize } from "@mantine/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import PasswordStrength from "./components/PasswordStrength";
import { UserRole } from "interfaces/interfaces";
import messagesData from "Lib/messages";
import useOrganizationList from "Lib/customHooks/useOrganizationList";

export default function Register() {
  const { height } = useViewportSize();
  const selectOrgItem = useOrganizationList();
  // const [value, setValue] = useState<string | null>("");

  const schema = yup
    .object({
      username: yup
        .string()
        .required(messagesData.register.userName.required)
        .min(3, messagesData.register.userName.min)
        .max(100, messagesData.register.userName.max)
        .trim(messagesData.register.userName.trim)
        .matches(/^[a-zA-Z0-9]*$/, messagesData.register.userName.matches),
      name: yup
        .string()
        .required(messagesData.register.name.required)
        .min(3, messagesData.register.name.min)
        .max(100, messagesData.register.name.max)
        .trim(messagesData.register.name.trim)
        .matches(/^[a-zA-Z0-9]*$/, messagesData.register.name.matches),
      role: yup.string().required(messagesData.register.role.required),
      email: yup
        .string()
        .required(messagesData.register.email.required)
        .email(messagesData.register.email.email)
        .trim(messagesData.register.email.required)
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          messagesData.register.email.matches
        ),
      password: yup.string().required(messagesData.register.password.required),
      orgId: yup
        .string()
        .required(messagesData.register.organizationId.required),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      name: "",
      orgId: "",
      role: "",
      email: "",
      password: "",
    },
  });

  const roleArray = Object.values(UserRole).map((role) => ({
    value: role,
    label: role,
  }));

  const [signUp, { loading: signUpLoading }] = useMutation(SIGNUP_MUTATION, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: CreateUserInput) => {
    console.log({ data });
    // const response = await signUp({
    //   variables: { signupUserInput: data },
    // });
    // toast.success(response.data.signup.success);
    reset();
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="m-auto flex flex-col w-full mx-4 md:w-[500px] md:mx-0 px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-6 lg:px-8">
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
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <TextInput
                label="Username"
                placeholder="Username"
                {...register("username")}
                withAsterisk
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.username?.message}
              </Text>
            </div>

            <div className="mb-4">
              <TextInput
                label="Name"
                placeholder="Name"
                {...register("name")}
                withAsterisk
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.name?.message}
              </Text>
            </div>

            <div className="mb-4">
              <Select
                label="Select Organization"
                {...register("orgId")}
                placeholder="Select Organization"
                data={selectOrgItem}
                maxDropdownHeight={250}
                withAsterisk
                onChange={(value) => {
                  if (value) {
                    setValue("orgId", value);
                  }
                }}
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.orgId?.message}
              </Text>
            </div>

            <div className="mb-4">
              <Select
                label="Select Role"
                placeholder="Select Role"
                data={roleArray}
                {...register("role")}
                onChange={(value) => {
                  if (value) {
                    setValue("role", value);
                  }
                }}
                withAsterisk
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.role?.message}
              </Text>
            </div>

            <div className="mb-4">
              <TextInput
                label="Email"
                placeholder="Email"
                {...register("email")}
                withAsterisk
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.email?.message}
              </Text>
            </div>

            <div className="mb-8">
              <div className="relative flex-1">
                <PasswordStrength control={control} name="password" />
              </div>
              <Text size="sm" mt={5} c="red.6">
                {errors.password?.message}
              </Text>
            </div>

            <div className="flex w-full my-4">
              <ButtonComponent
                type="submit"
                loading={signUpLoading}
                fullWidth={true}
              >
                Register
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

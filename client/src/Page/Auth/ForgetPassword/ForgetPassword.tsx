import React from "react";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import routes from "../../../Lib/Routes/Routes";
import { TextInput, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { BiSolidEnvelope } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ForgotPasswordInput } from "gql/graphql";
import { useMutation } from "@apollo/client";
import { ForgotPassword } from "query/forgotPassword/forgotPassword";
import { toast } from "react-toastify";
import messagesData from "Lib/messages";

export default function ForgetPassWord() {
  const { height } = useViewportSize();

  const schema = yup
    .object({
      email: yup
        .string()
        .required(messagesData.forgotPassword.email.required)
        .email(messagesData.forgotPassword.email.email)
        .trim(messagesData.forgotPassword.email.required)
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          messagesData.forgotPassword.email.matches
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [forgotPassword, { loading }] = useMutation(ForgotPassword, {
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success("We've sent an email with a link to change your password.");
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword({
      variables: { forgotPasswordInput: data },
    });
    reset();
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="mx-auto flex flex-col w-full max-w-md px-4 py-8 rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-black sm:text-2xl ">
          Forgot your password?
        </div>
        <Text size="sm" className="text-center text-gray-600">
          Enter the email you used to create your account so we can send you a
          link for resetting your password.
        </Text>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email"
              placeholder="Email"
              rightSection={<BiSolidEnvelope />}
              {...register("email")}
              withAsterisk
            />
            <Text size="sm" mt={5} c="red.6">
              {errors.email?.message}
            </Text>

            <div className="flex items-center mb-6 mt-4">
              <div className="flex ml-auto">
                <div className="inline-flex text-sm text-gray-500">
                  Already have password?&nbsp;
                  <Link
                    to={routes.login.path}
                    className="text-blue-900 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <ButtonComponent
                testId="login"
                type="submit"
                fullWidth
                loading={loading}
              >
                Request Password Change
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

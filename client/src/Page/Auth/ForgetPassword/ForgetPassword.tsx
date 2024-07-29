import React from "react";
import ButtonComponent from "../../../Components/Button/ButtonComponent";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Lib/Store/hooks";
import { Link } from "react-router-dom";
import routes from "../../../Lib/Routes/Routes";
import { TextInput } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { BiSolidEnvelope } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ForgotPasswordInput } from "gql/graphql";
import { useMutation } from "@apollo/client";
import { ForgotPassword } from "query/forgotPassword/forgotPassword";
import { toast } from "react-toastify";
import { forgetPassword } from "Lib/Store/User/User.Slice";

export default function ForgetPassWord() {
  const { height } = useViewportSize();

  const schema = yup
    .object({
      email: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [forgotPassword, { loading }] = useMutation(ForgotPassword, {
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success("An email has been sent. Please Check your email");
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword({
      variables: { forgotPasswordInput: data },
    });
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="mx-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
          Forgot your password?
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Your email"
              placeholder="Your email"
              rightSection={<BiSolidEnvelope />}
              {...register("email")}
              error={errors.email && "This field is required"}
            />

            <div className="flex items-center mb-6 mt-4">
              <div className="flex ml-auto">
                <div className="inline-flex text-sm text-gray-500">
                  Already have password&nbsp;
                  <Link
                    to={routes.login.path}
                    className="text-blue-900 hover:text-blue-600 transition-colors"
                  >
                    login
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

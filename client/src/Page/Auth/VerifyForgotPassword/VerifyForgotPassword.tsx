import React, { useEffect, useState } from "react";
import { PasswordInput } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { ForgotPasswordConfirmationInput } from "gql/graphql";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from "Components/Button/ButtonComponent";
import { ForgotPasswordVerify } from "query/forgotPassword/forgotPasswordVerify";
import routes from "Lib/Routes/Routes";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function VerifyForgotPassword() {
  const { height } = useViewportSize();
  const [token, setToken] = useState<string>();
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = query.get("confirmation_token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [query]);

  const schema = yup
    .object({
      newPassword: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [forgotPasswordVerify, { loading }] = useMutation(
    ForgotPasswordVerify,
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: () => {
        toast.success("Password Changed Successfully");
      },
    }
  );

  const onSubmit = (data: ForgotPasswordConfirmationInput) => {
    forgotPasswordVerify({
      variables: { forgotPasswordInput: { ...data, confirmationToken: token } },
    });
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="mx-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
          Create New Password
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <PasswordInput
                label="New Password"
                placeholder="New Password"
                size="md"
                {...register("newPassword")}
                error={errors.newPassword && "This field is required"}
              />
            </div>
            <div className="flex w-full">
              <ButtonComponent
                testId="submit"
                type="submit"
                fullWidth
                size="md"
                loading={loading}
              >
                Submit
              </ButtonComponent>
            </div>
          </form>
          <div className="flex items-center mb-6 mt-4">
            <ButtonComponent
              variant="transparent"
              type="button"
              size="md"
              fullWidth
              onClick={() => navigate(`${routes.login.path}`)}
            >
              Login
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

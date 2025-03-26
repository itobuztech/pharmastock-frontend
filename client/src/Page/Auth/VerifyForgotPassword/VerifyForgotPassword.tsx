import { useEffect, useState } from "react";
import { Container, Title, Paper, PasswordInput } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import ButtonComponent from "Components/Button/ButtonComponent";
import { ForgotPasswordVerify } from "query/forgotPassword/forgotPasswordVerify";
import routes from "Lib/Routes/Routes";
interface ForgetPasswordPayload {
  newPassword: string;
}

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

  const schema = yup.object({
    newPassword: yup.string().required("New Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .test(
        "passwords-match",
        "New and Confirm password does not match",
        function (value) {
          return value === this.parent.newPassword;
        }
      )
      .trim(),
  });

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
        navigate(routes.login.path);
      },
    }
  );

  const onSubmit = (data: ForgetPasswordPayload) => {
    forgotPasswordVerify({
      variables: {
        forgotPasswordInput: {
          confirmationToken: String(token),
          newPassword: data.newPassword,
        },
      },
    });
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center bg-gray-50"
    >
      <Container size={460} my={30} className="max-w-lg w-full">
        <Title ta="center">Create New Password</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <PasswordInput
              label="New Password"
              placeholder="New Password"
              {...register("newPassword")}
              error={errors.newPassword?.message}
              size="md"
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm Password"
              mt="md"
              {...register("confirmPassword")}
              size="md"
              error={errors.confirmPassword?.message}
            />

            <ButtonComponent
              type="submit"
              fullWidth
              size="md"
              loading={loading}
              mt="lg"
            >
              Submit
            </ButtonComponent>
          </Paper>
        </form>
      </Container>
    </div>
  );
}

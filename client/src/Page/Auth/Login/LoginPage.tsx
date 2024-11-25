import { Link, useNavigate } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import { PasswordInput, TextInput, Text } from "@mantine/core";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import ButtonComponent from "../../../Components/Button/ButtonComponent";
import routes from "../../../Lib/Routes/Routes";
import { LOGIN_MUTATION } from "query/loginMutation";
import { setUser } from "Lib/Store/User/User.Slice";
import messagesData from "Lib/messages";
import { LoginUserInput } from "gql/graphql";
import appConfig from "Lib/appConfig";

export default function LoginPage() {
  const { height } = useViewportSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup
    .object({
      email: yup
        .string()
        .required(messagesData.login.email.required)
        .email(messagesData.login.email.email)
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          messagesData.login.email.matches
        ),
      password: yup.string().required(messagesData.login.password.required),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [login, { loading: loginLoader }] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: LoginUserInput) => {
    login({
      variables: { loginUserInput: data },
      onCompleted: (d) => {
        if (d) {
          dispatch(setUser(d.login.user));
          localStorage.setItem(appConfig.storage.userData, JSON.stringify(d.login));
          navigate(`${routes.dashboard.profile.path}`);
          toast.success(messagesData.login.successMessage);
        }
      },
    });
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex flex-col justify-center items-center gap-7"
    >
      <div className="flex items-center justify-start mx-6 mt-10 no-underline">
        <span className="text-black  ml-4 text-2xl font-bold">
          Pharma Stock
        </span>
      </div>
      <div className="mx-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
        <h1 className="self-center font-light text-black m-0">Welcome</h1>
        <h3 className="self-center font-light text-black m-0">
          Login to your account
        </h3>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="mb-4">
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...register("password")}
                withAsterisk
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.password?.message}
              </Text>
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
        {/* <div className="flex items-center justify-center mt-6">
          <span className="inline-flex items-center text-xs text-center text-gray-500">
            You don&#x27;t have an account yet?&nbsp;
            <Link
              to={routes.register.path}
              className="text-blue-900 hover:text-blue-600 transition-colors"
            >
              Sign Up
            </Link>
          </span>
        </div> */}
      </div>
    </div>
  );
}

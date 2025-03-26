import { useNavigate } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import {
  PasswordInput,
  TextInput,
  Text,
  Container,
  Title,
  Anchor,
  Paper,
  Group,
  Checkbox,
} from "@mantine/core";
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
          localStorage.setItem(
            appConfig.storage.userData,
            JSON.stringify(d.login)
          );
          localStorage.setItem(appConfig.storage.apiURL, appConfig.api.graphql);
          navigate(`${routes.dashboard.profile.path}`);
          toast.success(messagesData.login.successMessage);
        }
      },
    });
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex flex-col justify-center items-center gap-7 bg-gray-50"
    >
      <Container size={420} my={40} className="max-w-lg w-full">
        <div style={{ width: "100%" }}>
          <Title ta="center">Welcome back!</Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput
                label="Email"
                placeholder="Email"
                {...register("email")}
                withAsterisk
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.email?.message}
              </Text>
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...register("password")}
                withAsterisk
                mt="md"
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.password?.message}
              </Text>
              <Group justify="space-between" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor size="sm">Forgot password?</Anchor>
              </Group>

              <ButtonComponent
                type="submit"
                mt="xl"
                loading={loginLoader}
                fullWidth={true}
              >
                Sign in
              </ButtonComponent>
            </Paper>
          </form>
        </div>
      </Container>
    </div>
  );
}

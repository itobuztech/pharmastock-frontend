import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  TextInput,
  Text,
  Container,
  Title,
  Paper,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";

import ButtonComponent from "../../../Components/Button/ButtonComponent";
import routes from "../../../Lib/Routes/Routes";
import { ForgotPasswordInput } from "gql/graphql";
import { ForgotPassword } from "query/forgotPassword/forgotPassword";
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
      className="flex justify-center items-center bg-gray-50"
    >
      <Container size={460} my={30} className="max-w-lg w-full">
        <Title ta="center" className="title">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center" mt="xs">
          Enter your email to get a reset link
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <TextInput
              label="Email"
              placeholder="Email"
              {...register("email")}
              withAsterisk
              size="md"
            />
            <Text size="sm" mt={5} c="red.6">
              {errors.email?.message}
            </Text>
            <Group justify="space-between" mt="lg" className="controls">
              <Anchor c="dimmed" size="sm" className="control">
                <Link to={routes.login.path} className="text-gray-500">
                  <Center inline>
                    <BsArrowLeftShort size={20} />
                    <Box ml={5}>Back to the login page</Box>
                  </Center>
                </Link>
              </Anchor>

              <ButtonComponent
                className="control"
                testId="login"
                type="submit"
                loading={loading}
              >
                Reset password
              </ButtonComponent>
            </Group>
          </Paper>
        </form>
      </Container>
    </div>
  );
}

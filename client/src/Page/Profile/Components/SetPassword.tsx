import { useViewportSize } from "@mantine/hooks";

import useTokenConfirmation from "Page/Auth/VerifyUser/Hooks/useTokenConfirmation";
import { Container, Paper, PasswordInput, Title, Text } from "@mantine/core";
import PasswordStrength from "Page/Auth/Register/components/PasswordStrength";
import ButtonComponent from "Components/Button/ButtonComponent";
import useChangePassword from "../Hooks/useChangePassword";
import '../Styles/SetPassword.scoped.scss';

export default function SetPassword() {
  const { height } = useViewportSize();

  useTokenConfirmation();

  const {
    errors,
    handleChangePassword,
    handleSubmit,
    register,
    control,
    handlePasswordValidityChange,
    resetPassLoader,
  } = useChangePassword();

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex flex-col justify-center items-center gap-7"
    >
      <Container size={460} my={30} className="max-w-lg w-full">
        <Title ta="center" className="title">
          Set Password
        </Title>

        <form onSubmit={handleSubmit(handleChangePassword)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <div className="mb-4">
              <PasswordInput
                label="Old Password"
                {...register("oldPassword")}
                placeholder="Old Password"
                withAsterisk
                size="md"
              />
              <Text size="sm" mt={5} c="red.6">
                {errors.oldPassword?.message}
              </Text>
            </div>
            <div className="mb-4">
              <div className="relative">
                <PasswordStrength
                  control={control}
                  name="newPassword"
                  label="New Password"
                  onValidPassword={handlePasswordValidityChange}
                  size="md"
                />
              </div>
              <Text size="sm" mt={5} c="red.6">
                {errors.newPassword?.message}
              </Text>
            </div>
            <div className="mb-4">
              <div className="relative">
                <PasswordStrength
                  control={control}
                  name="confirmPassword"
                  label="Confirm Password"
                  size="md"
                />
              </div>
              <Text size="sm" mt={5} c="red.6">
                {errors.confirmPassword?.message}
              </Text>
            </div>

            <ButtonComponent
              mt="xl"
              type="submit"
              fullWidth
              loading={resetPassLoader}
            >
              Save
            </ButtonComponent>
          </Paper>
        </form>
      </Container>
    </div>
  );
}

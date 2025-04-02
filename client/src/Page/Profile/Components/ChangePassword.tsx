import { Button, PasswordInput, Space, Text } from "@mantine/core";

import ButtonComponent from "Components/Button/ButtonComponent";
import PasswordStrength from "Page/Auth/Register/components/PasswordStrength";
import useChangePassword from "../Hooks/useChangePassword";

export default function ChangePassword() {
  const {
    errors,
    handleChangePassword,
    handleSubmit,
    register,
    control,
    handlePasswordValidityChange,
    resetPassLoader,
    editPassForm,
    setEditPassForm,
    reset,
    isPasswordValid,
  } = useChangePassword();

  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <Space h="md" />
      <h2 className="m-0 mb-4">Change password</h2>
      <div className="mb-4">
        <PasswordInput
          label="Old Password"
          {...register("oldPassword")}
          placeholder="Old Password"
          disabled={!editPassForm}
          withAsterisk
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
            disabled={!editPassForm}
            label="New Password"
            onValidPassword={handlePasswordValidityChange}
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
            disabled={!editPassForm}
            label="Confirm Password"
          />
        </div>
        <Text size="sm" mt={5} c="red.6">
          {errors.confirmPassword?.message}
        </Text>
      </div>
      <div className="text-right">
        {editPassForm ? (
          <div className="flex flex-wrap gap-4 justify-end">
            <Button
              type="button"
              onClick={() => {
                setEditPassForm(false);
                reset();
              }}
              variant="outline"
            >
              Cancel
            </Button>

            <ButtonComponent
              type="submit"
              loading={resetPassLoader}
              disabled={!isPasswordValid}
            >
              Update
            </ButtonComponent>
          </div>
        ) : (
          <Button type="button" onClick={() => setEditPassForm(true)}>
            Edit
          </Button>
        )}
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { GetResetPassword } from "query/profile/resetPassword";
import { toast } from "react-toastify";
import { ResetPasswordInput } from "gql/graphql";
import { Button, PasswordInput, Space, Text } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import messagesData from "Lib/messages";
import PasswordStrength from "Page/Auth/Register/components/PasswordStrength";

export default function ChangePassword() {
  const [editPassForm, setEditPassForm] = useState(false);

  const passwordSchema = yup
    .object({
      oldPassword: yup
        .string()
        .required(messagesData.profile.password.required)
        .trim(messagesData.profile.password.required),
      newPassword: yup
        .string()
        .required(messagesData.profile.password.newPassword)
        .trim(messagesData.profile.password.newPassword),
      confirmPassword: yup
        .string()
        .required(messagesData.profile.password.confirmPassword)
        .trim(messagesData.profile.password.confirmPassword),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [resetPassword, { loading: resetPassLoader }] = useMutation(
    GetResetPassword,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Password Changed Successfully");
        setEditPassForm(false);
        reset();
      },
    }
  );

  const handleChangePassword = (data: ResetPasswordInput) => {
    resetPassword({
      variables: {
        resetPasswordInput: data,
      },
    });
  };

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
            <ButtonComponent type="submit" loading={resetPassLoader}>
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

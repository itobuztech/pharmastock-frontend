import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { GetResetPassword } from "query/profile/resetPassword";
import { toast } from "react-toastify";
import { ResetPasswordInput } from "gql/graphql";
import { Button, PasswordInput, Space } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";

export default function ChangePassword() {
  const [editPassForm, setEditPassForm] = useState(false);

  const passwordSchema = yup
    .object({
      oldPassword: yup.string().required(),
      newPassword: yup.string().required(),
    })
    .required();

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(passwordSchema),
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
          placeholder="********"
          disabled={!editPassForm}
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          label="New Password"
          {...register("newPassword")}
          placeholder="********"
          disabled={!editPassForm}
        />
      </div>
      <div className="text-right">
        {editPassForm ? (
          <ButtonComponent type="submit" loading={resetPassLoader}>
            Update
          </ButtonComponent>
        ) : (
          <Button type="button" onClick={() => setEditPassForm(true)}>
            Edit
          </Button>
        )}
      </div>
    </form>
  );
}

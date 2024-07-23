import React, { useEffect, useState } from "react";
import { Button, Space, TextInput } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { GetProfileUpdate } from "query/profile/profileUpdate";
import { toast } from "react-toastify";
import { UpdateProfileInput } from "gql/graphql";
import { AdminProfile } from "interfaces/interfaces";

export default function ProfileForm({ admin }: { admin?: AdminProfile }) {
  const [editForm, setEditForm] = useState(false);

  const schema = yup
    .object({
      name: yup.string().required(),
      username: yup.string().required(),
    })
    .required();

  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [updateProfile, { loading: updateProfileLoader }] = useMutation(
    GetProfileUpdate,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Profile Updated Successfully");
        setEditForm(false);
      },
    }
  );

  const onSubmit = (data: UpdateProfileInput) => {
    updateProfile({
      variables: { updateProfileInput: data },
    });
  };

  useEffect(() => {
    if (admin) {
      setValue("name", admin.account.user.name);
      setValue("username", admin.account.user.username);
    }
  }, [admin, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Space h="md" />
      <h2 className="m-0 mb-4">Personal info</h2>
      <div className="mb-4">
        <TextInput label="Name" {...register("name")} disabled={!editForm} />
      </div>
      <div className="mb-4">
        <TextInput
          label="Username"
          {...register("username")}
          disabled={!editForm}
        />
      </div>

      <div className="text-right">
        {editForm ? (
          <ButtonComponent type="submit" loading={updateProfileLoader}>
            Update
          </ButtonComponent>
        ) : (
          <Button type="button" onClick={() => setEditForm(true)}>
            Edit
          </Button>
        )}
      </div>
    </form>
  );
}

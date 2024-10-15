import React, { useEffect, useState } from "react";
import { Button, Space, TextInput, Text, Select } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { GetProfileUpdate } from "query/profile/profileUpdate";
import { toast } from "react-toastify";
import { UpdateProfileInput, UserRole } from "gql/graphql";
import { AdminProfile } from "interfaces/interfaces";
import messagesData from "Lib/messages";
import { useAppSelector } from "Lib/Store/hooks";
import usePharmacyList from "Lib/customHooks/usePharmacyLists";

export default function ProfileForm({ admin }: { admin?: AdminProfile }) {
  const [editForm, setEditForm] = useState(false);
  const isStaff = useAppSelector((state) => state.user.role === UserRole.Staff);
  const selectPharmaList = usePharmacyList();

  const schema = yup
    .object({
      name: yup
        .string()
        .required(messagesData.profile.name.required)
        .min(3, messagesData.profile.name.min)
        .max(100, messagesData.profile.name.max)
        .trim(messagesData.profile.name.trim)
        .matches(/^[a-zA-Z0-9 ]*$/, messagesData.profile.name.matches),
      username: yup
        .string()
        .required(messagesData.profile.userName.required)
        .min(3, messagesData.profile.userName.min)
        .max(100, messagesData.profile.userName.max)
        .trim(messagesData.profile.userName.trim),

        pharmacy: yup.string().when('$isStaff', {
        is: (isStaff: string | undefined) => isStaff,
        then: (schema) =>
          schema
            .required()
            .trim(),
        otherwise: (schema) => schema.notRequired(),
      }),
    })

    .required();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    context: { isStaff }
  });

  const [updateProfile, { loading: updateProfileLoader }] = useMutation(
    GetProfileUpdate,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success(messagesData.profile.success);
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
      setValue("pharmacy", admin.account.user.pharmacy?.id)
    }
  }, [admin, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Space h="md" />
      <h2 className="m-0 mb-4">Personal info</h2>
      <div className="mb-4">
        <TextInput
          label="Name"
          {...register("name")}
          disabled={!editForm}
          withAsterisk
        />
        <Text size="sm" mt={5} c="red.6">
          {errors.name?.message}
        </Text>
      </div>
      <div className="mb-4">
        <TextInput
          label="Username"
          {...register("username")}
          disabled={!editForm}
          withAsterisk
        />
        <Text size="sm" mt={5} c="red.6">
          {errors.username?.message}
        </Text>
      </div>
      {isStaff && (
        <div className="mb-4">
          <Controller
            name="pharmacy"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                withAsterisk
                data={selectPharmaList}
                label="Select Pharmacy"
                placeholder="Select Pharmacy"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                error={errors.pharmacy && "This field is required"}
              />
            )}
          />
        </div>
      )}

      <div className="text-right">
        {editForm ? (
          <div className="flex flex-wrap gap-4 justify-end">
            <Button
              type="button"
              onClick={() => {
                setEditForm(false);
                reset({
                  name: admin?.account.user.name,
                  username: admin?.account.user.username,
                });
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <ButtonComponent type="submit" loading={updateProfileLoader}>
              Update
            </ButtonComponent>
          </div>
        ) : (
          <Button type="button" onClick={() => setEditForm(true)}>
            Edit
          </Button>
        )}
      </div>
    </form>
  );
}

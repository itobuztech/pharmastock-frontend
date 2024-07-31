import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { PasswordInput, Select, TextInput } from "@mantine/core";
import { SelectOrgItem, UserRole } from "interfaces/interfaces";
import ButtonComponent from "Components/Button/ButtonComponent";
import { useMutation } from "@apollo/client";
import { CreateUser } from "query/user/userCreate";
import { toast } from "react-toastify";
import { CreateUserInput } from "gql/graphql";

export default function UserCreateForm({
  close,
  selectItem,
}: {
  close: () => void;
  selectItem?: SelectOrgItem;
}) {
  const schema = yup
    .object({
      name: yup.string().required(),
      username: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
      role: yup.string().required(),
      orgId: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const roleArray = Object.values(UserRole).map((role) => ({
    value: role,
    label: role,
  }));

  const [addUsers, { loading: addLoading }] = useMutation(CreateUser, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      toast.success("User Added Successfully");
      reset();
      close();
      reset();
    },
  });

  const onSubmit = (data: CreateUserInput) => {
    addUsers({
      variables: {
        createUserInput: { ...data, orgId: selectItem?.value },
      },
    });
  };

  useEffect(() => {
    if (selectItem) {
      selectItem.label && setValue("orgId", selectItem.label);
    }
  }, [setValue, selectItem]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1">
          <div className="flex-1">
            <TextInput
              label="Organization"
              placeholder="Organization"
              {...register("orgId")}
              disabled
              error={errors.orgId && "This field is required"}
              value={selectItem?.label}
            />
          </div>
        </div>
        <div className="flex-1">
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                label="Select Role"
                placeholder="Select Role"
                data={roleArray}
                onChange={(value) => field.onChange(value)}
                value={field.value}
                error={errors.role && "This field is required"}
                comboboxProps={{ zIndex: 700 }}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1">
          <TextInput
            label="User Name"
            placeholder="User Name"
            {...register("username")}
            error={errors.username && "This field is required"}
          />
        </div>
        <div className="flex-1">
          <TextInput
            label="Name"
            placeholder="Name"
            {...register("name")}
            error={errors.name && "This field is required"}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1">
          <TextInput
            label="Email"
            placeholder="Email"
            {...register("email")}
            error={errors.email && "This field is required"}
          />
        </div>
        <div className="flex-1">
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...register("password")}
            error={errors.password && "This field is required"}
          />
        </div>
      </div>

      <div className="text-right">
        <ButtonComponent type="submit" loading={addLoading}>
          Create
        </ButtonComponent>
      </div>
    </form>
  );
}

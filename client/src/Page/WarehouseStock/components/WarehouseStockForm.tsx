import React from "react";
import { TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function WarehouseStockForm() {
  const schema = yup
    .object({
      name: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log({ data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <TextInput
          label="Name"
          placeholder="Name"
          {...register("name")}
          // disabled={!editForm}
          error={errors.name && "This field is required"}
        />
      </div>
    </form>
  );
}

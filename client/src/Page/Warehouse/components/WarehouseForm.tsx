import React, { useEffect } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  CreateWarehouseInput,
  UpdateWarehouseInput,
  Warehouse,
} from "gql/graphql";
import { useMutation } from "@apollo/client";
import { CreateWarehouse } from "query/warehouse/warehouseCreate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GetWarehouseUpdate } from "query/warehouse/warehouseUpdate";

export default function WarehouseForm({
  close,
  editForm,
  setEditForm,
  id,
  warehouseDetails,
  refetchWarehouse,
  setNewWarehouseList,
  selectOrgItem,
}: {
  close?: () => void;
  editForm?: boolean;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  warehouseDetails?: { warehouse: Warehouse };
  refetchWarehouse: () => void;
  setNewWarehouseList?: React.Dispatch<React.SetStateAction<undefined>>;
  selectOrgItem:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
}) {
  const navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string().required(),
      location: yup.string().required(),
      area: yup.string().required(),
      organizationId: yup.string().required(),
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

  const [createWarehouse, { loading: addLoading }] = useMutation(
    CreateWarehouse,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Warehouse Created Successfully");
        if (close) {
          close();
        }
        reset();
        refetchWarehouse();
      },
    }
  );

  const [updateWarehouse, { loading: updateLoading }] = useMutation(
    GetWarehouseUpdate,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Warehouse Updated Successfully");
        setEditForm(false);
        refetchWarehouse();
      },
    }
  );

  const onSubmit = async (
    data: CreateWarehouseInput | UpdateWarehouseInput
  ) => {
    if (id) {
      // ON update
      await updateWarehouse({
        variables: { updateWarehouseInput: { ...data, id: id } },
      });
    } else {
      // ON create
      const response = await createWarehouse({
        variables: { createWarehouseInput: data },
      });
      setNewWarehouseList(response.data);
    }
  };

  useEffect(() => {
    if (warehouseDetails?.warehouse) {
      setValue("name", warehouseDetails.warehouse.name);
      setValue("area", warehouseDetails.warehouse.area);
      setValue("location", warehouseDetails.warehouse.location);
      warehouseDetails.warehouse.organization?.id &&
        setValue("organizationId", warehouseDetails.warehouse.organization?.id);
    }
  }, [setValue, warehouseDetails?.warehouse]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex-1">
          <TextInput
            label="Name"
            placeholder="Name"
            {...register("name")}
            disabled={!editForm}
            error={errors.name && "This field is required"}
          />
        </div>
        <div className="flex-1">
          <TextInput
            label="Location"
            placeholder="Location"
            {...register("location")}
            disabled={!editForm}
            error={errors.location && "This field is required"}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex-1">
          <TextInput
            label="Area"
            placeholder="Area"
            {...register("area")}
            disabled={!editForm}
            error={errors.area && "This field is required"}
          />
        </div>
        <div className="flex-1">
          <Controller
            name="organizationId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Select Organization"
                placeholder="Select Organization"
                onChange={(value) => field.onChange(value)}
                value={field.value}
                data={selectOrgItem}
                maxDropdownHeight={300}
                error={errors.organizationId && "This field is required"}
                disabled={!editForm}
              />
            )}
          />
        </div>
      </div>

      <div className="text-right">
        {id ? (
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Cancel
            </Button>

            {editForm ? (
              <ButtonComponent type="submit" loading={updateLoading}>
                Update
              </ButtonComponent>
            ) : (
              <Button type="button" onClick={() => setEditForm(true)}>
                Edit
              </Button>
            )}
          </div>
        ) : (
          <ButtonComponent type="submit" loading={addLoading}>
            Create
          </ButtonComponent>
        )}
      </div>
    </form>
  );
}

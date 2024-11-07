import React, { useEffect } from "react";
import { Button, TextInput, Text } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
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
import { Permissions } from "interfaces/interfaces";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import messagesData from "Lib/messages";

export default function WarehouseForm({
  close,
  editForm,
  setEditForm,
  id,
  warehouseDetails,
  refetchWarehouse,
  setNewWarehouseList,
  handleUserPermissions,
}: Readonly<{
  close?: () => void;
  editForm?: boolean;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  warehouseDetails?: { warehouse: Warehouse };
  refetchWarehouse: () => void;
  setNewWarehouseList?: React.Dispatch<React.SetStateAction<undefined>>;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}>) {
  const navigate = useNavigate();
  const permission = useAppSelector((state) => state.user.permission);
  const schema = yup
    .object({
      name: yup
        .string()
        .required(messagesData.warehouse.name.required)
        .max(100, messagesData.warehouse.name.max)
        .trim(messagesData.warehouse.name.trim)
        .matches(/^[a-zA-Z0-9 ]*$/, messagesData.warehouse.name.matches),
      location: yup
        .string()
        .required(messagesData.warehouse.location.required)
        .trim(messagesData.warehouse.location.required)
        .matches(/^[a-zA-Z0-9 ]*$/, messagesData.warehouse.location.matches),
      area: yup
        .string()
        .required(messagesData.warehouse.area.required)
        .trim(messagesData.warehouse.area.required)
        .matches(/^[a-zA-Z0-9 ]*$/, messagesData.warehouse.area.matches),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
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
      if (setNewWarehouseList) {
        setNewWarehouseList(response.data);
      }
    }
  };

  useEffect(() => {
    if (warehouseDetails?.warehouse) {
      setValue("name", warehouseDetails.warehouse?.name);
      setValue("area", warehouseDetails.warehouse.area);
      setValue("location", warehouseDetails.warehouse.location);
    }
  }, [setValue, warehouseDetails?.warehouse]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:flex flex-wrap gap-4 justify-between mb-4">
        {id && (
          <div className="flex-1">
            <div className="mb-4">
              <TextInput
                label="Organization"
                placeholder="Name"
                defaultValue={warehouseDetails?.warehouse.organization?.name}
                disabled
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          <TextInput
            label="Name"
            placeholder="Name"
            {...register("name")}
            disabled={!editForm}
            withAsterisk
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.name?.message}
          </Text>
        </div>
      </div>
      <div className="sm:flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex-1 mb-4 sm:mb-0">
          <TextInput
            label="Location"
            placeholder="Location"
            {...register("location")}
            disabled={!editForm}
            withAsterisk
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.location?.message}
          </Text>
        </div>
        <div className="flex-1">
          <TextInput
            label="Area"
            placeholder="Area"
            {...register("area")}
            disabled={!editForm}
            withAsterisk
          />
          <Text size="sm" mt={5} c="red.6">
            {errors.area?.message}
          </Text>
        </div>
      </div>

      <div className="text-right">
        {id ? (
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">

            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.WAREHOUSE_MANAGEMENT,
              USER_PERMISSION_CAPABILITIES.EDIT
            ) && (
              <>
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
              </>
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

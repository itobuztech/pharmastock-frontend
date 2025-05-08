import { useMutation } from "@apollo/client";
import {
  Button,
  MultiSelect,
  Select,
  Textarea,
  TextInput
} from "@mantine/core";
import { Item, Permissions } from "interfaces/interfaces";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonComponent from "Components/Button/ButtonComponent";
import { BaseUnit } from "gql/graphql";
import { toast } from "react-toastify";
import { GetItemUpdate } from "query/item/itemUpdate";
import { useNavigate } from "react-router-dom";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import messagesData from "Lib/messages";
import { ItemCreate } from "query/item/itemCreate";
import { useAppSelector } from "Lib/Store/hooks";
import ErrorMessage from "Components/Messeges/ErrorMessage";
import useItemCatList from "Lib/Hooks/useItemCategoryList";

export default function ProductForm({
  close,
  editForm,
  setEditForm,
  itemId,
  itemDetail,
  setNewItemList,
  refetchItem,
}: Readonly<{
  close?: () => void;
  editForm?: boolean;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  itemId?: string;
  itemDetail?: { item: Item };
  setNewItemList?: React.Dispatch<React.SetStateAction<undefined>>;
  refetchItem: () => void;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}>) {
  const navigate = useNavigate();
  const selectItemCatList = useItemCatList();
  const permission = useAppSelector((state) => state.user.permission);

  const schema = yup
    .object({
      name: yup
        .string()
        .required(messagesData.item.name.required)
        .max(100, messagesData.item.name.max)
        .trim(messagesData.item.name.trim)
        .matches(/^[a-zA-Z0-9 ]*$/, messagesData.item.name.matches),
      baseUnit: yup.string().required(messagesData.item.baseUnit.required),
      hsnCode: yup.string().required(messagesData.item.hsnCode.required).trim(messagesData.item.hsnCode.required),
      instructions: yup
        .string()
        .required(messagesData.item.instructions.required).trim(messagesData.item.instructions.required),
      wholesalePrice: yup.number(),
      mrpBaseUnit: yup.number(),
      category: yup
        .array()
        .of(yup.string())
        .min(1, messagesData.item.category.required) 
        .required(messagesData.item.category.required),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [itemCreate, { loading: addLoading }] = useMutation(ItemCreate, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      toast.success("Product Created Successfully");
      if (close) {
        close();
      }
      reset();
      refetchItem();
    },
  });

  const [updateItem, { loading: updateLoading }] = useMutation(GetItemUpdate, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      toast.success("Product Updated Successfully");
      setEditForm(false);
      refetchItem();
    },
  });

  const onSubmit = async (data: any) => {
    if (itemId) {
      updateItem({
        variables: { updateItemInput: { ...data, id: itemId } },
      });
    } else {
      const response = await itemCreate({
        variables: { createItemInput: data },
      });
      if (setNewItemList) {
        setNewItemList(response.data);
      }
    }
  };

  const baseUnitArray = Object.values(BaseUnit);

  useEffect(() => {
    if (itemDetail?.item) {
      setValue("name", itemDetail?.item.name);
      setValue("baseUnit", itemDetail?.item.baseUnit);
      setValue("hsnCode", itemDetail?.item.hsnCode);
      setValue("instructions", itemDetail?.item.instructions);
      itemDetail?.item.wholesalePrice &&
        setValue("wholesalePrice", itemDetail?.item.wholesalePrice);
      itemDetail?.item.mrpBaseUnit &&
        setValue("mrpBaseUnit", itemDetail?.item.mrpBaseUnit);
      itemDetail?.item.Category &&
        setValue(
          "category",
          itemDetail?.item.Category.map((cat) => cat.id) || []
        );
    }
  }, [itemDetail?.item, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:flex flex-wrap gap-4 justify-between mb-4">
        <div className="flex-1 mb-4 sm:mb-0">
          <TextInput
            label="Name"
            placeholder="Name"
            {...register("name")}
            disabled={!editForm}
            withAsterisk
          />
          {errors.name && <ErrorMessage message={errors.name?.message} />}
        </div>
        <div className="flex-1">
          <Controller
            name="baseUnit"
            control={control}
            render={({ field }) => (
              <Select
                label="Unit"
                placeholder="Unit"
                data={baseUnitArray}
                onChange={(value) => field.onChange(value)}
                value={field.value}
                disabled={!editForm}
                withAsterisk
              />
            )}
          />
          {errors.baseUnit && (
            <ErrorMessage message={errors.baseUnit?.message} />
          )}
        </div>
      </div>
      <div className="sm:flex flex-wrap gap-4 justify-between mb-4">
        <div className="flex-1 mb-4 sm:mb-0">
          <TextInput
            label="HSN Code"
            placeholder="HSN Code"
            {...register("hsnCode")}
            disabled={!editForm}
            withAsterisk
          />
          {errors.hsnCode && <ErrorMessage message={errors.hsnCode?.message} />}
        </div>
        <div className="flex-1">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <MultiSelect
                {...field}
                label="Select category"
                placeholder="Select category"
                data={selectItemCatList}
                maxDropdownHeight={300}
                onChange={(value) => field.onChange(value)}
                value={field.value as string[] || []}
                disabled={!editForm}
                withAsterisk
              />
            )}
          />
          {errors.category && (
            <ErrorMessage message={errors.category?.message} />
          )}
        </div>
      </div>

      <div className="sm:flex flex-wrap gap-4 justify-between mb-4">
        <div className="flex-1 mb-4">
          <TextInput
            label="Wholesale Price"
            placeholder="Wholesale Price"
            {...register("wholesalePrice")}
            disabled={!editForm}
            withAsterisk
          />
          {errors.wholesalePrice && (
            <ErrorMessage message={messagesData.item.wholesalePrice.required} />
          )}
        </div>
        <div className="flex-1">
          <TextInput
            label="MRP Base unit"
            placeholder="MRP Base unit"
            {...register("mrpBaseUnit")}
            disabled={!editForm}
            withAsterisk
          />
          {errors.mrpBaseUnit && (
            <ErrorMessage message={messagesData.item.mrpBaseUnit.required} />
          )}
        </div>
      </div>
      <div className="mb-8">
        <Textarea
          label="Instructions"
          placeholder="Instructions"
          {...register("instructions")}
          disabled={!editForm}
          withAsterisk
        />
        {errors.instructions && (
          <ErrorMessage message={errors.instructions?.message} />
        )}
      </div>

      <div
        className={`text-right ${
          permission.ITEM_MANAGEMENT?.CAPABILITIES.EDIT ? "" : "hidden"
        }`}
      >
        {itemId ? (
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

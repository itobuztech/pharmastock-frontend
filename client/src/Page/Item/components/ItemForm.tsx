import { useMutation } from "@apollo/client";
import {
  Button,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Item, Permissions } from "interfaces/interfaces";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonComponent from "Components/Button/ButtonComponent";
import { BaseUnit, CreateItemInput, UpdateItemInput } from "gql/graphql";
import { ItemCreate } from "query/item/itemCreate";
import { toast } from "react-toastify";
import { GetItemUpdate } from "query/item/itemUpdate";
import { useNavigate } from "react-router-dom";
import useItemCatList from "Lib/customHooks/useItemCategoryList";
import { USER_PERMISSION_CAPABILITIES, USER_PERMISSION_FIELDS } from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";

export default function ItemForm({
  close,
  editForm,
  setEditForm,
  itemId,
  itemDetail,
  setNewItemList,
  refetchItem,
  handleUserPermissions
}: Readonly<{
  close?: () => void;
  editForm?: boolean;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  itemId?: string;
  itemDetail?: { item: Item };
  setNewItemList?: React.Dispatch<React.SetStateAction<undefined>>;
  refetchItem: () => void;
  handleUserPermissions: (
    permission :Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}>) {
  const navigate = useNavigate();
  const selectItemCatList = useItemCatList();
  const permission = useAppSelector(state => state.user.permission)
  const schema = yup
    .object({
      name: yup.string().required(),
      baseUnit: yup.string().required(),
      hsnCode: yup.string().required(),
      instructions: yup.string().required(),
      wholesalePrice: yup.number(),
      mrpBaseUnit: yup.number(),
      category: yup.array().of(yup.string()).required(),
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
      toast.success("Item Created Successfully");
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
      toast.success("Item Updated Successfully");
      setEditForm(false);
      refetchItem();
    },
  });

  const onSubmit = async (data: CreateItemInput | UpdateItemInput) => {
    if (itemId) {
      updateItem({
        variables: { updateItemInput: { ...data, id: itemId } },
      });
    } else {
      const response = await itemCreate({
        variables: { createItemInput: data },
      });
      setNewItemList(response.data);
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
          itemDetail?.item.Category.map((cat) => cat.name)
        );
    }
  }, [itemDetail?.item, setValue]);

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
          {/* <TextInput
            label="Unit"
            placeholder="Unit"
            {...register("baseUnit")}
            disabled={!editForm}
            error={errors.baseUnit && "This field is required"}
          /> */}
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
                error={errors.baseUnit && "This field is required"}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex-1">
          <TextInput
            label="HSN Code"
            placeholder="HSN Code"
            {...register("hsnCode")}
            disabled={!editForm}
            error={errors.hsnCode && "This field is required"}
          />
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
                value={field.value || []}
                disabled={!editForm}
                error={errors.category && "This field is required"}
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex-1">
          <TextInput
            label="Wholesale Price"
            placeholder="Wholesale Price"
            {...register("wholesalePrice")}
            disabled={!editForm}
          />
        </div>
        <div className="flex-1">
          <TextInput
            label="MRP Base unit"
            placeholder="MRP Base unit"
            {...register("mrpBaseUnit")}
            disabled={!editForm}
          />
        </div>
      </div>
      <div className="mb-4">
        <Textarea
          label="Instructions"
          placeholder="Instructions"
          {...register("instructions")}
          disabled={!editForm}
          error={errors.instructions && "This field is required"}
        />
      </div>

      <div className="text-right">
        {itemId ? (
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Cancel
            </Button>
            {editForm && handleUserPermissions(permission,USER_PERMISSION_FIELDS.ITEM_MANAGEMENT,USER_PERMISSION_CAPABILITIES.EDIT)? (
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

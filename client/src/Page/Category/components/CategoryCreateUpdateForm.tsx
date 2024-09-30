import React, { useEffect } from "react";
import { Button, TextInput } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CreateCategory } from "query/category/categoryCreate";
import {
  CreateItemCategoryInput,
  ItemCategory,
  UpdateItemCategoryInput,
} from "gql/graphql";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ItemCategoryUpdate } from "query/category/categoryUpdate";
import { Permissions } from "interfaces/interfaces";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";

export default function CategoryCreateUpdateForm({
  editForm,
  setEditForm,
  catId,
  close,
  refetchItemCategory,
  categoryItem,
  setNewCategoryList,
  handleUserPermissions,
}: Readonly<{
  editForm?: boolean;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  catId?: string;
  close?: () => void;
  refetchItemCategory: () => void;
  categoryItem?: { itemCategory: ItemCategory };
  setNewCategoryList?: React.Dispatch<
    React.SetStateAction<CreateItemCategoryInput | undefined>
  >;
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
      name: yup.string().required(),
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

  // Item Category create query
  const [createCategory, { loading: addLoading }] = useMutation(
    CreateCategory,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        toast.success("Category Created Successfully");
        if (close) {
          close();
        }
        refetchItemCategory();
        reset();
      },
    }
  );

  // Item Update create query
  const [updateItemCategory, { loading: updateLoading }] = useMutation(
    ItemCategoryUpdate,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Category Updated Successfully");
        setEditForm(false);
        refetchItemCategory();
      },
    }
  );

  const onSubmit = async (
    data: CreateItemCategoryInput | UpdateItemCategoryInput
  ) => {
    console.log({ data });
    if (catId) {
      // ON update
      await updateItemCategory({
        variables: { updateItemCategoryInput: { ...data, id: catId } },
      });
    } else {
      // ON create
      const response = await createCategory({
        variables: { createItemCategoryInput: data },
      });
      if (setNewCategoryList) {
        setNewCategoryList(response.data);
      }
    }
  };

  // Item set value
  useEffect(() => {
    if (categoryItem) {
      setValue("name", categoryItem.itemCategory.name);
    }
  }, [categoryItem, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <TextInput
          label="Name"
          placeholder="Name"
          {...register("name")}
          disabled={!editForm}
          error={errors.name && "This field is required"}
        />
      </div>
      <div className="text-right">
        {catId ? (
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Cancel
            </Button>
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.ITEM_CATEGORIES_MANAGEMENT,
              USER_PERMISSION_CAPABILITIES.EDIT
            ) && (
              <>
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

import { Button, TextInput } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ButtonComponent from "Components/Button/ButtonComponent";
import { useMutation, useQuery } from "@apollo/client";
import { GetCategoryItem } from "query/category/categoryItem";
import { ItemCategory, UpdateItemCategoryInput } from "gql/graphql";
import { ItemCategoryUpdate } from "query/category/categoryUpdate";
import { toast } from "react-toastify";

export default function ItemCategoryDetails() {
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup
    .object({
      name: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: categoryItem } = useQuery<{ itemCategory: ItemCategory }>(
    GetCategoryItem,
    {
      variables: {
        itemCategoryId: id,
      },
    }
  );
  const [updateItemCategory, { loading }] = useMutation(ItemCategoryUpdate);

  const onSubmit = async (data: UpdateItemCategoryInput) => {
    try {
      await updateItemCategory({
        variables: { updateItemCategoryInput: { ...data, id: id } },
      });
      toast.success("Category Updated Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (categoryItem) {
      setValue("name", categoryItem.itemCategory.name);
    }
  }, [categoryItem, setValue]);

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <PageHeader
        title="Category Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-1/2 bg-white rounded-md py-6 px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput
              label="Name"
              placeholder="Name"
              {...register("name")}
              readOnly={editForm ? false : true}
            />
            {errors.name && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Cancel
            </Button>

            {editForm ? (
              <ButtonComponent type="submit" loading={loading}>
                Update
              </ButtonComponent>
            ) : (
              <Button type="button" onClick={() => setEditForm(true)}>
                Edit
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

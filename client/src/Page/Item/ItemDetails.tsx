import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import { useMutation, useQuery } from "@apollo/client";
import { GetItemDetails } from "query/item/itemDetails";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Button, MultiSelect, Textarea, TextInput } from "@mantine/core";
import { Item } from "interfaces/interfaces";
import ButtonComponent from "Components/Button/ButtonComponent";
import { GetItemUpdate } from "query/item/itemUpdate";
import { UpdateItemInput } from "gql/graphql";
import { toast } from "react-toastify";

export default function ItemDetails() {
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup
    .object({
      // name: yup.string().required(),
      baseUnit: yup.string().required(),
      hsnCode: yup.string().required(),
      instructions: yup.string().required(),
      wholesalePrice: yup.number(),
      mrpBaseUnit: yup.number(),
      // category: yup.array().of(yup.string()).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: itemDetails } = useQuery<{ item: Item }>(GetItemDetails, {
    variables: {
      itemId: id,
    },
  });

  console.log({ itemDetails });

  const [updateItem, { loading }] = useMutation(GetItemUpdate);

  const onSubmit = async (data: UpdateItemInput) => {
    try {
      await updateItem({
        variables: { updateItemInput: { ...data, id: id } },
      });
      toast.success("Category Updated Successfully");
      setEditForm(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (itemDetails?.item) {
      setValue("baseUnit", itemDetails?.item.baseUnit);
      setValue("hsnCode", itemDetails?.item.hsnCode);
      setValue("instructions", itemDetails?.item.instructions);
      setValue("wholesalePrice", itemDetails?.item.wholesalePrice);
      setValue("mrpBaseUnit", itemDetails?.item.mrpBaseUnit);
      // setValue("category", itemDetails?.item.Category);
    }
  }, [itemDetails?.item, setValue]);

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <PageHeader
        title="Item Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-1/2 bg-white rounded-md py-6 px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4 justify-between mb-6">
            <div className="flex-1">
              <TextInput
                label="Unit"
                placeholder="Unit"
                {...register("baseUnit")}
                readOnly={editForm ? false : true}
              />
              {errors.baseUnit && (
                <span className="text-red-500 mt-2 block text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex-1">
              <TextInput
                label="HSN Code"
                placeholder="HSN Code"
                {...register("hsnCode")}
                readOnly={editForm ? false : true}
              />
              {errors.hsnCode && (
                <span className="text-red-500 mt-2 block text-xs">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <Textarea
              label="Instructions"
              placeholder="Instructions"
              {...register("instructions")}
              readOnly={editForm ? false : true}
            />
            {errors.instructions && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-4 justify-between mb-6">
            <div className="flex-1">
              <TextInput
                label="Wholesale Price"
                placeholder="Wholesale Price"
                {...register("wholesalePrice")}
                readOnly={editForm ? false : true}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="MRP Base unit"
                placeholder="MRP Base unit"
                {...register("mrpBaseUnit")}
                readOnly={editForm ? false : true}
              />
            </div>
          </div>

          {/* <div className="mb-4">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <MultiSelect
                {...field}
                placeholder="Select category"
                data={selectCatItem}
                maxDropdownHeight={300}
                onChange={(value) => field.onChange(value)}
                value={field.value || []}
              />
            )}
          />
        </div> */}

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

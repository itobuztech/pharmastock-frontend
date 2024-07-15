import { useLazyQuery } from "@apollo/client";
import { MultiSelect, Textarea, TextInput } from "@mantine/core";
import { CreateItemCategories, ItemCategories } from "interfaces/interfaces";
import { GetItemCategoryList } from "query/category/categoryList";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonComponent from "Components/Button/ButtonComponent";
import { CreateItemInput } from "gql/graphql";

export default function ItemForm({
  onSubmit,
}: {
  onSubmit: (data: CreateItemInput) => Promise<void>;
}) {
  const [categoryList, setCategoryList] = useState<ItemCategories>();

  const schema = yup
    .object({
      // name: yup.string().required(),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [fetchItemCategoryList] = useLazyQuery<CreateItemCategories>(
    GetItemCategoryList,
    {
      onCompleted: (d) => {
        if (d) {
          const itemCate = d.itemCategories;
          setCategoryList(itemCate);
        }
      },
    }
  );

  useEffect(() => {
    fetchItemCategoryList();
  }, [fetchItemCategoryList]);

  const selectCatItem = categoryList?.itemCategories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="mb-4">
            <TextInput placeholder="Name" {...register("name")} />
            {errors.name && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div> */}
      <div className="mb-4">
        <TextInput placeholder="Unit" {...register("baseUnit")} />
        {errors.baseUnit && (
          <span className="text-red-500 mt-2 block text-xs">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-4">
        <TextInput placeholder="HSN Code" {...register("hsnCode")} />
        {errors.hsnCode && (
          <span className="text-red-500 mt-2 block text-xs">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-4">
        <Textarea placeholder="Instructions" {...register("instructions")} />
        {errors.instructions && (
          <span className="text-red-500 mt-2 block text-xs">
            This field is required
          </span>
        )}
      </div>
      <div className="mb-4">
        <TextInput
          placeholder="Wholesale Price"
          {...register("wholesalePrice")}
        />
      </div>
      <div className="mb-4">
        <TextInput placeholder="MRP Base unit" {...register("mrpBaseUnit")} />
      </div>
      <div className="mb-4">
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
      </div>

      <div className="text-right">
        <ButtonComponent type="submit">Create</ButtonComponent>
      </div>
    </form>
  );
}

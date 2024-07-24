import React, { useEffect, useState } from "react";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateWarehouseStockInput, Warehouse } from "gql/graphql";
import { useMutation } from "@apollo/client";
import { GenerateSku } from "interfaces/interfaces";
import ButtonComponent from "Components/Button/ButtonComponent";
import { GetGenerateSKU } from "query/warehouse/warehouseGenerateSku";
import { toast } from "react-toastify";
import { WarehouseStockCreate } from "query/warehouse/warehouseStockCreate";
import DatePicker from "react-datepicker";
import useItemList from "Lib/customHooks/useItemList";

export default function WarehouseStockForm({
  close,
  warehouseDetails,
  selectOrgItem,
  id,
  selectWarehouseItem,
}: {
  close?: () => void;
  warehouseDetails?: { warehouse: Warehouse };
  selectOrgItem:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
  id?: string;
  selectWarehouseItem?:
    | {
        value: string;
        label: string;
      }[]
    | undefined;
}) {
  const [qtyValue, setQtyValue] = useState<string | number>("");
  const [sku, setSku] = useState<GenerateSku>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const selectItem = useItemList();

  const schema = yup
    .object({
      warehouseId: yup.string().required(),
      organizationId: yup.string().required(),
      itemId: yup.string().required(),
      batchName: yup.string().required(),
      qty: yup.number().required(),
      sku: yup.string().required(),
      expiry: yup.date().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createWarehouseStock] = useMutation(WarehouseStockCreate, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      toast.success("Warehouse Stock Created Successfully");
      if (close) {
        close();
      }
      reset();
    },
  });

  const onSubmit = async (data: CreateWarehouseStockInput) => {
    console.log(data);
    const isoString = startDate.toISOString();

    const response = await createWarehouseStock({
      variables: {
        createWarehouseStockInput: {
          ...data,
          warehouseId: id ? id : getValues("warehouseId"),
          expiry: isoString,
        },
      },
    });
  };

  const [fetchSku] = useMutation(GetGenerateSKU, {
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (sku) {
      setValue("sku", sku);
    }
  }, [sku, setValue]);

  useEffect(() => {
    if (warehouseDetails?.warehouse) {
      setValue("warehouseId", warehouseDetails.warehouse.name);
      warehouseDetails.warehouse.organization?.id &&
        setValue("organizationId", warehouseDetails.warehouse.organization?.id);
    }
  }, [setValue, warehouseDetails?.warehouse]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        {id ? (
          <TextInput
            label="Warehouse"
            placeholder="Warehouse"
            {...register("warehouseId")}
            disabled={id ? true : false}
            error={errors.warehouseId && "This field is required"}
          />
        ) : (
          <Controller
            name="warehouseId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Select Warehouse"
                placeholder="Select Warehouse"
                onChange={(value) => field.onChange(value)}
                value={field.value}
                data={selectWarehouseItem}
                maxDropdownHeight={300}
                error={errors.warehouseId && "This field is required"}
              />
            )}
          />
        )}
      </div>
      <div className="mb-4">
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
              disabled={id ? true : false}
            />
          )}
        />
      </div>
      <div className="mb-4">
        <Controller
          name="itemId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Select Item"
              placeholder="Select Item"
              onChange={async (value) => {
                console.log(value);
                const { warehouseId, organizationId } = getValues();
                const res = await fetchSku({
                  variables: {
                    generateSkuNameInput: {
                      organizationId: organizationId,
                      warehouseId: id ? id : warehouseId,
                      itemId: value,
                    },
                  },
                });
                setSku(res.data?.generateSKU.sku);
                field.onChange(value);
              }}
              value={field.value}
              data={selectItem}
              maxDropdownHeight={300}
              error={errors.itemId && "This field is required"}
              searchable
              nothingFoundMessage="Nothing found..."
            />
          )}
        />
      </div>
      <div className="mb-4">
        <TextInput
          label="Batch Name"
          placeholder="Batch Name"
          {...register("batchName")}
          error={errors.batchName && "This field is required"}
        />
      </div>
      <div className="mb-4">
        <NumberInput
          label="Quantity"
          placeholder="Qty"
          {...register("qty")}
          value={qtyValue}
          onChange={setQtyValue}
          min={0}
          max={10000}
          error={errors.qty && "This field is required"}
        />
      </div>
      <div className="mb-4">
        <TextInput
          label="SKU"
          placeholder="SKU"
          {...register("sku")}
          error={errors.sku && "This field is required"}
        />
      </div>
      <div className="mb-4 datePicker">
        <span className="block text-sm font-medium leading-[21px]">
          Expiry Date
        </span>
        <Controller
          name="expiry"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                field.onChange(date);
              }}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select expiry date"
              className="form-control text-sm text-black w-full h-9 rounded border border-x-gray-300 border-y-gray-300 px-3"
            />
          )}
        />
        {errors.expiry && "This field is required"}
      </div>
      <div className="text-right mt-6">
        <ButtonComponent type="submit">Create</ButtonComponent>
      </div>
    </form>
  );
}

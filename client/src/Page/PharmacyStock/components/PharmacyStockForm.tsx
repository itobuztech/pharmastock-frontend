import React, { useEffect, useState } from "react";
import { NumberInput, Select, TextInput } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  CreateWarehouseStocksByWarehouse,
  WarehouseStocksByWarehouse,
} from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import useWarehouseItems from "Lib/customHooks/useWarehouseItems";
import { GetWarehouseStocksByWarehouse } from "query/warehouse/warehouseStocksByWarehouse";
import { CreatePharmacyStockInput, PharmacyStock } from "gql/graphql";
import { PharmacyStockCreate } from "query/pharmacyStock/pharmacyStockCreate";
import usePharmacyList from "Lib/customHooks/usePharmacyLists";

export default function PharmacyStockForm({
  pharmacyName,
  pharmacyId,
  close,
  pharmacyStockDetails,
  id,
  setNewPharmacyStockList,
}: {
  pharmacyName?: string;
  pharmacyId?: string;
  close: () => void;
  pharmacyStockDetails?: PharmacyStock;
  id?: string;
  setNewPharmacyStockList?: React.Dispatch<
    React.SetStateAction<CreatePharmacyStockInput | undefined>
  >;
}) {
  const [qtyValue, setQtyValue] = useState<string | number>("");
  const [qtyAddValue, setQtyAddValue] = useState<string | number>("");
  const [warehouseStocksList, setWarehouseStocksList] =
    useState<WarehouseStocksByWarehouse>();

  const selectWarehouseItems = useWarehouseItems();
  const selectPharmaList = usePharmacyList();

  const schema = yup
    .object({
      pharmacyId: yup.string().required(),
      warehouseId: yup.string().required(),
      qty: yup.number().required(),
      itemId: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Pharmacy Stock create query
  const [pharmacyStockCreate, { loading }] = useMutation(PharmacyStockCreate, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: (d) => {
      toast.success("Pharmacy Stock Created Successfully");
      close();
      reset();
    },
  });

  const onSubmit = async (data: CreatePharmacyStockInput) => {
    const response = await pharmacyStockCreate({
      variables: { createPharmacyStockInput: { ...data, pharmacyId } },
    });
    setNewPharmacyStockList(response.data);
  };

  const [fetchWarehouseStocksByWarehouse] =
    useLazyQuery<CreateWarehouseStocksByWarehouse>(
      GetWarehouseStocksByWarehouse,
      {
        onError: (err) => {
          toast.error(err.message);
        },
        onCompleted: (d) => {
          if (d) {
            const item = d.warehouseStocksByWarehouse;
            setWarehouseStocksList(item);
          }
        },
      }
    );

  const selectItems = warehouseStocksList?.warehouseStocks?.map((item) => ({
    value: item.item.id,
    label: item.item.name,
  }));

  const handleParentChange = (value: string) => {
    fetchWarehouseStocksByWarehouse({
      variables: {
        warehouseId: value,
      },
    });
  };

  useEffect(() => {
    pharmacyName && setValue("pharmacyId", pharmacyName);
  }, [pharmacyName, setValue]);

  useEffect(() => {
    console.log("update", pharmacyStockDetails?.finalQty);
    if (pharmacyStockDetails) {
      pharmacyStockDetails.pharmacy?.name &&
        setValue("pharmacyId", pharmacyStockDetails.pharmacy?.name);
      pharmacyStockDetails.warehouse?.id &&
        setValue("warehouseId", pharmacyStockDetails.warehouse?.id);
      setQtyValue(pharmacyStockDetails.finalQty);
    }
  }, [pharmacyStockDetails, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        {id || pharmacyId ? (
          <TextInput
            label="Pharmacy"
            placeholder="Pharmacy"
            {...register("pharmacyId")}
            error={errors.pharmacyId && "This field is required"}
            disabled={id || pharmacyId ? true : false}
          />
        ) : (
          <Controller
            name="pharmacyId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                data={selectPharmaList}
                label="Select Pharmacy"
                placeholder="Select Pharmacy"
                value={field.value}
                onChange={(value) => {
                  handleParentChange(value!);
                  field.onChange(value);
                }}
                error={errors.pharmacyId && "This field is required"}
                disabled={id ? true : false}
              />
            )}
          />
        )}
      </div>

      <div className="mb-4">
        <Controller
          name="warehouseId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              data={selectWarehouseItems}
              label="Select Warehouse"
              placeholder="Select Warehouse"
              value={field.value}
              onChange={(value) => {
                handleParentChange(value!);
                field.onChange(value);
              }}
              error={errors.warehouseId && "This field is required"}
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
              data={selectItems}
              label="Select Item"
              placeholder="Select Item"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
              }}
              error={errors.itemId && "This field is required"}
            />
          )}
        />
      </div>

      {id && (
        <div className="mb-4">
          <NumberInput
            label="Total Quantity"
            placeholder="Qty"
            value={qtyValue}
            onChange={setQtyValue}
            min={0}
            max={1000000}
            disabled
            error={errors.qty && "This field is required"}
          />
        </div>
      )}

      <div className="mb-4">
        <NumberInput
          label="Add Quantity"
          placeholder="Qty"
          {...register("qty")}
          value={qtyAddValue}
          onChange={setQtyAddValue}
          min={0}
          max={1000000}
          error={errors.qty && "This field is required"}
        />
      </div>

      <div className="text-right mt-8">
        <ButtonComponent type="submit" loading={loading}>
          {id ? "Update" : "Create"}
        </ButtonComponent>
      </div>
    </form>
  );
}

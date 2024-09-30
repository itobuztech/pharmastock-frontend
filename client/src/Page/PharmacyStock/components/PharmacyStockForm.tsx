import React, { useEffect, useState } from "react";
import { Button, Divider, NumberInput, Select } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { CiCircleMinus } from "react-icons/ci";

import {
  CreateWarehouseStocksByWarehouse,
  Permissions,
  WarehouseStocksByWarehouse,
} from "interfaces/interfaces";
import useWarehouseItems from "Lib/customHooks/useWarehouseItems";
import { GetWarehouseStocksByWarehouse } from "query/warehouse/warehouseStocksByWarehouse";
import { CreatePharmacyStockInput, PharmacyStock } from "gql/graphql";
import { PharmacyStockCreate } from "query/pharmacyStock/pharmacyStockCreate";
import usePharmacyList from "Lib/customHooks/usePharmacyLists";
import useItemList from "Lib/customHooks/useItemList";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import ButtonComponent from "Components/Button/ButtonComponent";
import { PharmacyStockFormValues } from "../pharmacy.interface";

const pharmacyStockCreateSchema = yup.object().shape({
  itemArr: yup.array().of(
    yup.object().shape({
      itemId: yup.string().required(),
      qty: yup.number().required().min(1),
    })
  ),
  pharmacyId: yup.string().required(),
  warehouseId: yup.string().required(),
});

export default function PharmacyStockForm({
  pharmacyId,
  close,
  pharmacyStockDetails,
  id,
  setNewPharmacyStockList,
  refetchItem,
  handleUserPermissions,
}: Readonly<{
  pharmacyId?: string;
  close?: () => void;
  pharmacyStockDetails?: PharmacyStock;
  id?: string;
  setNewPharmacyStockList?: React.Dispatch<
    React.SetStateAction<CreatePharmacyStockInput | undefined>
  >;
  refetchItem: () => void;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}>) {
  const [qtyValue, setQtyValue] = useState<string | number>("");
  const [warehouseStocksList, setWarehouseStocksList] =
    useState<WarehouseStocksByWarehouse>();
  const permission = useAppSelector((state) => state.user.permission);
  const selectWarehouseItems = useWarehouseItems();
  const selectPharmaList = usePharmacyList();
  const selectItem = useItemList();
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pharmacyStockCreateSchema),
    defaultValues: {
      itemArr: [{ itemId: "", qty: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemArr",
  });

  // Pharmacy Stock create query
  const [pharmacyStockCreate, { loading }] = useMutation(PharmacyStockCreate, {
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: PharmacyStockFormValues) => {
    pharmacyStockCreate({
      variables: {
        createPharmacyStockInput: data,
      },
      onCompleted: (d) => {
        if (id) {
          toast.success("Pharmacy Stock updated successfully!");
        } else {
          toast.success(d.createPharmacyStock);
        }

        setNewPharmacyStockList && setNewPharmacyStockList(d);
        reset();
        refetchItem();
        close && close();
      },
    });
  };

  const [fetchWarehouseStocksByWarehouse] =
    useLazyQuery<CreateWarehouseStocksByWarehouse>(
      GetWarehouseStocksByWarehouse,
      {
        onCompleted: (d) => {
          if (d) {
            const item = d.warehouseStocksByWarehouse;
            setWarehouseStocksList(item);
          }
        },
        onError: (err) => {
          toast.error(err.message);
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
    pharmacyId && setValue("pharmacyId", pharmacyId);
  }, [pharmacyId, setValue]);

  useEffect(() => {
    if (pharmacyStockDetails) {
      pharmacyStockDetails.pharmacy?.id &&
        setValue("pharmacyId", pharmacyStockDetails.pharmacy.id);

      pharmacyStockDetails.warehouse?.id &&
        setValue("warehouseId", pharmacyStockDetails.warehouse.id);

      if (pharmacyStockDetails.item && pharmacyStockDetails.finalQty) {
        const itemArray = [
          {
            itemId: pharmacyStockDetails.item.id,
            qty: pharmacyStockDetails.finalQty,
          },
        ];

        setValue("itemArr", itemArray);
      }
    }
  }, [pharmacyStockDetails, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
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
                console.log(value);
                field.onChange(value);
              }}
              error={errors.pharmacyId && "This field is required"}
              disabled={id || pharmacyId ? true : false}
            />
          )}
        />
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
          />
        </div>
      )}

      {!id && fields.length > 0 && <Divider my="lg" />}

      {fields.map((field, index) => (
        <div key={field.id} className="mb-5 relative">
          {!id && (
            <Button
              onClick={() => remove(index)}
              variant="transparent"
              color="red"
              className="absolute -top-2 -right-4 z-10"
            >
              <CiCircleMinus className="w-6 h-6" />
            </Button>
          )}
          <div className="pt-2">
            <Controller
              name={`itemArr.${index}.itemId`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  data={id ? selectItem : selectItems}
                  label="Select Item"
                  placeholder="Select Item"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  error={
                    errors?.itemArr?.[index]?.itemId && "This field is required"
                  }
                  disabled={id ? true : false}
                />
              )}
            />
          </div>

          {handleUserPermissions(
            permission,
            USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
            USER_PERMISSION_CAPABILITIES.EDIT
          ) && (
            <div className="mt-4">
              <Controller
                name={`itemArr.${index}.qty`}
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Add Quantity"
                    placeholder="Qty"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    min={0}
                    max={1000000}
                    error={
                      errors?.itemArr?.[index]?.qty && "This field is required"
                    }
                  />
                )}
              />
            </div>
          )}
        </div>
      ))}

      {!id && (
        <Button
          onClick={() => append({ itemId: "", qty: 0 })}
          variant="outline"
        >
          Add Item
        </Button>
      )}

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
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
              USER_PERMISSION_CAPABILITIES.EDIT
            ) && (
              <ButtonComponent type="submit" loading={loading}>
                Update
              </ButtonComponent>
            )}
          </div>
        ) : (
          <ButtonComponent type="submit" loading={loading}>
            Create
          </ButtonComponent>
        )}
      </div>
    </form>
  );
}

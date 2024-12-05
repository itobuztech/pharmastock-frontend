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
import { GetWarehouseStocksByWarehouse } from "query/warehouse/warehouseStocksByWarehouse";
import { CreatePharmacyStockInput, PharmacyStock, UserRole } from "gql/graphql";
import { PharmacyStockCreate } from "query/pharmacyStock/pharmacyStockCreate";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import ButtonComponent from "Components/Button/ButtonComponent";
import { PharmacyStockFormValues } from "../pharmacy.interface";
import ErrorMessage from "Components/Messeges/ErrorMessage";
import messagesData from "Lib/messages";
import useWarehouseItems from "Lib/customHooks/useWarehouseItems";
import usePharmacyList from "Lib/customHooks/usePharmacyLists";
import useItemList from "Lib/customHooks/useItemList";

const pharmacyStockCreateSchema = yup.object().shape({
  itemArr: yup.array().of(
    yup.object().shape({
      itemId: yup.string().required(messagesData.pharmacyStock.product),
      qty: yup.number().required().min(1),
    })
  ),
  pharmacyId: yup.string().required(messagesData.pharmacyStock.pharmacy),
  warehouseId: yup.string().required(messagesData.pharmacyStock.warehouse),
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
  const user = useAppSelector((state) => state.user);

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
      const errorMessages = err.message.split(". ").filter((line) => line);
      toast.error(
        <div>
          {errorMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      );
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
      setQtyValue(pharmacyStockDetails.finalQty);
      pharmacyStockDetails.pharmacy?.id &&
        setValue("pharmacyId", pharmacyStockDetails.pharmacy.id);

      if (pharmacyStockDetails.item) {
        const itemArray = [
          {
            itemId: pharmacyStockDetails.item.id,
            qty: 0,
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
              withAsterisk
              data={selectPharmaList}
              label="Select Pharmacy"
              placeholder="Select Pharmacy"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
              }}
              disabled={id || pharmacyId ? true : false}
            />
          )}
        />

        <ErrorMessage message={errors.pharmacyId?.message} />
      </div>
      {user.role !== UserRole.Superadmin && (
        <div className="mb-4">
          <Controller
            name="warehouseId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                withAsterisk
                data={selectWarehouseItems}
                label="Select Warehouse"
                placeholder="Select Warehouse"
                value={field.value}
                onChange={(value) => {
                  handleParentChange(value!);
                  field.onChange(value);
                }}
              />
            )}
          />
          <ErrorMessage message={errors.warehouseId?.message} />
        </div>
      )}

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
        <div key={field.id}>
          <div className={`${!id ? "mt-5" : ""} mb-5 relative`}>
            {!id && fields.length > 1 && (
              <Button
                onClick={() => remove(index)}
                variant="transparent"
                color="red"
                className="absolute -top-4 -right-4 z-10"
              >
                <CiCircleMinus className="w-6 h-6" />
              </Button>
            )}
            <div className="sm:flex gap-3">
              <div
                className={`${
                  user.role !== UserRole.Superadmin && "flex-1"
                } w-full`}
              >
                <Controller
                  name={`itemArr.${index}.itemId`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      withAsterisk
                      data={id ? selectItem : selectItems}
                      label="Select Product"
                      placeholder="Select Product"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      searchable
                      nothingFoundMessage="Nothing found"
                      disabled={id ? true : false}
                    />
                  )}
                />
                <ErrorMessage
                  message={errors?.itemArr?.[index]?.itemId?.message}
                />
              </div>

              {handleUserPermissions(
                permission,
                USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT,
                USER_PERMISSION_CAPABILITIES.CREATE
              ) && (
                <div className="mt-4 sm:mt-0 sm:w-1/2">
                  <Controller
                    name={`itemArr.${index}.qty`}
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        withAsterisk
                        label="Add Quantity"
                        placeholder="Qty"
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        min={0}
                        max={1000000}
                      />
                    )}
                  />
                  {errors?.itemArr?.[index]?.qty && (
                    <ErrorMessage message={messagesData.pharmacyStock.qty} />
                  )}
                </div>
              )}
            </div>
          </div>
          {index < fields.length - 1 && <Divider />}
        </div>
      ))}

      {!id && (
        <Button
          onClick={() => append({ itemId: "", qty: 0 })}
          variant="outline"
        >
          Add Product
        </Button>
      )}

      <div className="text-right">
        {id ? (
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT,
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
                <ButtonComponent type="submit" loading={loading}>
                  Update
                </ButtonComponent>
              </>
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

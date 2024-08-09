import React, { useEffect, useState } from "react";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateWarehouseStockInput, Warehouse } from "gql/graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CreateWarehouses,
  Permissions,
  Warehouses,
  WarehouseStock,
} from "interfaces/interfaces";
import ButtonComponent from "Components/Button/ButtonComponent";
import { GetGenerateSKU } from "query/warehouse/warehouseGenerateSku";
import { toast } from "react-toastify";
import { WarehouseStockCreate } from "query/warehouse/warehouseStockCreate";
import DatePicker from "react-datepicker";
import { GetWarehouseList } from "query/warehouse/warehouseList";
// import useOrganizationList from "Lib/customHooks/useOrganizationList";
import useItemList from "Lib/customHooks/useItemList";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import { useNavigate } from "react-router-dom";

interface WarehouseStockFormProps {
  close?: () => void;
  warehouseDetails?: { warehouse: Warehouse };
  selectOrgItem?:
    | {
        value: string;
        label: string;
      }[];
  id?: string;
  selectWarehouseItem?:
    | {
        value: string;
        label: string;
      }[];
  warehouseStockDetails?: {
    warehouseStock: WarehouseStock;
  };
  refetchItem: () => void;
  setNewWarehouseStockList?: React.Dispatch<
    React.SetStateAction<CreateWarehouseStockInput | undefined>
  >;
  warehouseStockId?: string;
  list?: boolean;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function WarehouseStockForm({
  close,
  warehouseDetails,
  selectOrgItem,
  id,
  selectWarehouseItem,
  warehouseStockDetails,
  refetchItem,
  setNewWarehouseStockList,
  warehouseStockId,
  list,
  handleUserPermissions,
}: Readonly<WarehouseStockFormProps>) {
  const [qtyValue, setQtyValue] = useState<string | number>("");
  const [qtyAddValue, setQtyAddValue] = useState<string | number>("");
  const [sku, setSku] = useState<string>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [warehouseList, setWarehouseList] = useState<Warehouses>();
  // const selectOrgItems = useOrganizationList();
  const selectItem = useItemList();
  const permission = useAppSelector((state) => state.user.permission);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.currentUser);

  const schema = yup
    .object({
      warehouseId: yup.string().required(),
      // organizationId: yup.string().required(),
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

  const [createWarehouseStock, { loading }] = useMutation(
    WarehouseStockCreate,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Warehouse Stock Created Successfully");
        if (close) {
          close();
        }
        reset();
        setQtyAddValue("");
        refetchItem();
      },
    }
  );

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
    if (setNewWarehouseStockList) {
      setNewWarehouseStockList(response.data);
    }
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

  const [fetchWarehouseList] = useLazyQuery<CreateWarehouses>(
    GetWarehouseList,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const item = d.warehouses;
          setWarehouseList(item);
        }
      },
    }
  );

  useEffect(() => {
    fetchWarehouseList();
  }, [fetchWarehouseList]);

  const selectWarehouseItems = warehouseList?.warehouses?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    if (warehouseDetails?.warehouse) {
      setValue("warehouseId", warehouseDetails.warehouse.name);
    }
  }, [setValue, warehouseDetails?.warehouse]);

  useEffect(() => {
    if (warehouseStockDetails?.warehouseStock) {
      setValue(
        "warehouseId",
        warehouseStockDetails?.warehouseStock.warehouse.id
      );
      setValue("itemId", warehouseStockDetails.warehouseStock.item.id);
      setValue("sku", warehouseStockDetails.warehouseStock.SKU.sku);
      setQtyValue(warehouseStockDetails.warehouseStock.finalQty);
    }
  }, [setValue, warehouseStockDetails?.warehouseStock]);

  console.log(user);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex-1">
          <TextInput
            label="Organization"
            placeholder="Name"
            defaultValue={user?.organization.name}
            disabled
          />
        </div>
        <div className="flex-1">
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
                  data={selectWarehouseItem || selectWarehouseItems}
                  maxDropdownHeight={300}
                  error={errors.warehouseId && "This field is required"}
                  disabled={id || warehouseStockId ? true : false}
                />
              )}
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex-1">
          <Controller
            name="itemId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Select Item"
                placeholder="Select Item"
                onChange={async (value) => {
                  const { warehouseId } = getValues();
                  const res = await fetchSku({
                    variables: {
                      generateSkuNameInput: {
                        organizationId:
                          warehouseDetails?.warehouse.organization?.id ||
                          user?.organization.id,
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
                disabled={warehouseStockId ? true : false}
                nothingFoundMessage="Nothing found..."
              />
            )}
          />
        </div>
        <div className="flex-1">
          <TextInput
            label="SKU"
            placeholder="SKU"
            {...register("sku")}
            error={errors.sku && "This field is required"}
            disabled={warehouseStockId ? true : false}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        {!id && !list && (
          <div className="flex-1">
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

        {id || warehouseStockId || list ? (
          <>
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
              USER_PERMISSION_CAPABILITIES.EDIT
            ) && (
              <div className="flex-1">
                <NumberInput
                  label="Add Quantity"
                  placeholder="Qty"
                  {...register("qty")}
                  value={qtyAddValue}
                  onChange={setQtyAddValue}
                  min={0}
                  max={10000}
                  error={errors.qty && "This field is required"}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex-1">
            <TextInput
              label="Batch Name"
              placeholder="Batch Name"
              {...register("batchName")}
              error={errors.batchName && "This field is required"}
            />
          </div>
        )}
        {list && (
          <div className="flex-1">
            <TextInput
              label="Batch Name"
              placeholder="Batch Name"
              {...register("batchName")}
              error={errors.batchName && "This field is required"}
            />
          </div>
        )}
      </div>

      {handleUserPermissions(
        permission,
        USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
        USER_PERMISSION_CAPABILITIES.EDIT
      ) && (
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          {!list && (
            <div className="flex-1">
              <TextInput
                label="Batch Name"
                placeholder="Batch Name"
                {...register("batchName")}
                error={errors.batchName && "This field is required"}
              />
            </div>
          )}

          <div className="flex-1 datePicker">
            <span className="block text-sm font-medium leading-[23px]">
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
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select expiry date"
                  className="form-control text-sm text-black w-full h-9 rounded border border-x-gray-300 border-y-gray-300 px-3"
                />
              )}
            />
            {errors.expiry && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
        </div>
      )}

      <div className="text-right">
        {warehouseStockId ? (
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

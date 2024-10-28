import { useEffect, useState } from "react";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RxCross2 } from "react-icons/rx";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";

import { CreateWarehouses, Warehouses } from "interfaces/interfaces";
import ButtonComponent from "Components/Button/ButtonComponent";
import { GetGenerateSKU } from "query/warehouse/warehouseGenerateSku";
import { WarehouseStockCreate } from "query/warehouse/warehouseStockCreate";
import { GetWarehouseList } from "query/warehouse/warehouseList";
import useItemList from "Lib/customHooks/useItemList";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import {
  WarehouseStockFormProps,
  WarehouseStockFormSchema,
} from "../warehouse.interface";

const schema = yup
  .object({
    warehouseStock: yup.array().of(
      yup.object({
        warehouseId: yup.string().required("Warehouse is required"),
        itemId: yup.string().required("Item is required"),
        batchName: yup.string().required("Batch name is required"),
        qty: yup.number().min(1, "Quantity must be at least 1").required(),
        sku: yup.string().required("SKU is required"),
        expiry: yup.date().required("Expiry date is required"),
      })
    ),
  })
  .required();

export default function WarehouseStockForm({
  close,
  warehouseDetails,
  id,
  selectWarehouseItem,
  warehouseStockDetails,
  refetchItem,
  setNewWarehouseStockList,
  warehouseStockId,
  list,
  handleUserPermissions,
}: Readonly<WarehouseStockFormProps>) {
  const params = useParams();
  const [qtyValue, setQtyValue] = useState<string | number>("");
  const [qtyAddValue, setQtyAddValue] = useState<string | number>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [warehouseList, setWarehouseList] = useState<Warehouses>();
  const selectItem = useItemList();
  const permission = useAppSelector((state) => state.user.permission);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.currentUser);
  const [warehouseId, setWarehouseId] = useState("");

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
    defaultValues: {
      warehouseStock: [
        {
          warehouseId: "",
          itemId: "",
          batchName: "",
          qty: 0,
          sku: "",
          expiry: new Date(),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "warehouseStock",
  });

  const [createWarehouseStock, { loading }] = useMutation(
    WarehouseStockCreate,
    {
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  const onSubmit: SubmitHandler<WarehouseStockFormSchema> = (
    data: WarehouseStockFormSchema
  ) => {
    createWarehouseStock({
      variables: {
        createWarehouseStockInput: data.warehouseStock,
      },
      onCompleted: (d) => {
        if (params.id) {
          toast.success("Warehouse Stock updated Successfully");
        } else {
          toast.success("Warehouse Stock Created Successfully");
        }

        if (close) {
          close();
        }
        reset();
        setQtyAddValue("");
        refetchItem();
        if (setNewWarehouseStockList) {
          setNewWarehouseStockList(d);
        }
      },
    });
  };

  const [fetchSku] = useMutation(GetGenerateSKU, {
    onError: (err) => {
      toast.error(err.message);
    },
  });

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
    if (warehouseStockDetails?.warehouseStock) {
      setQtyValue(warehouseStockDetails.warehouseStock.finalQty);
      const itemArray = [
        {
          warehouseId: warehouseStockDetails?.warehouseStock.warehouse.id,
          itemId: warehouseStockDetails.warehouseStock.item.id,
          sku: warehouseStockDetails.warehouseStock.SKU.sku,
          batchName: "",
          qty: 0,
          expiry: new Date(),
        },
      ];
      setValue("warehouseStock", itemArray);
    }
  }, [setValue, warehouseStockDetails?.warehouseStock]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <TextInput
          label="Organization"
          placeholder="Name"
          defaultValue={user?.organization?.name}
          disabled
        />
      </div>

      {fields.map((item, index) => (
        <div key={item.id} className="mt-5 relative">
          {!params.id && (
            <Button
              onClick={() => remove(index)}
              variant="transparent"
              color="red"
              className="absolute -top-2 -right-4 z-10"
            >
              <RxCross2 className="w-6 h-6" />
            </Button>
          )}

          <div
            className={`${
              params.id ? "pt-0 mb-6" : "pt-4 mb-4"
            } flex flex-wrap gap-4 justify-between`}
          >
            <div className="flex-1">
              {id ? (
                <TextInput
                  label="Warehouse"
                  placeholder="Warehouse"
                  name={`warehouseStock.${index}.warehouseId`}
                  disabled={id ? true : false}
                  error={errors?.warehouseStock?.[index]?.warehouseId?.message}
                />
              ) : (
                <Controller
                  name={`warehouseStock.${index}.warehouseId`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Select Warehouse"
                      placeholder="Select Warehouse"
                      onChange={(value) => {
                        field.onChange(value);
                        setWarehouseId(String(value));
                        setValue(`warehouseStock.${index}.itemId`, "");
                        setValue(`warehouseStock.${index}.sku`, "");
                      }}
                      value={field.value}
                      withAsterisk
                      data={selectWarehouseItem || selectWarehouseItems}
                      maxDropdownHeight={300}
                      error={
                        errors?.warehouseStock?.[index]?.warehouseId?.message
                      }
                      disabled={id || warehouseStockId ? true : false}
                    />
                  )}
                />
              )}
            </div>
            <div className="flex-1">
              <Controller
                name={`warehouseStock.${index}.itemId`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Select Product"
                    placeholder="Select Product"
                    withAsterisk
                    onChange={async (value) => {
                      const res = await fetchSku({
                        variables: {
                          generateSkuNameInput: {
                            organizationId:
                              warehouseDetails?.warehouse.organization?.id ||
                              user?.organization.id,
                            warehouseId: id
                              ? id
                              : getValues(
                                  `warehouseStock.${index}.warehouseId`
                                ),
                            itemId: value,
                          },
                        },
                      });
                      setValue(
                        `warehouseStock.${index}.sku`,
                        res.data?.generateSKU.sku as string
                      );
                      field.onChange(value);
                    }}
                    value={
                      getValues(`warehouseStock.${index}.warehouseId`)
                        ? field.value
                        : null
                    }
                    
                    data={selectItem}
                    maxDropdownHeight={300}
                    error={errors?.warehouseStock?.[index]?.itemId?.message}
                    searchable
                    disabled={warehouseId ? false : true}
                    nothingFoundMessage="Nothing found..."
                  />
                )}
              />
            </div>
          </div>
          <div
            className={`${
              params.id ? "mb-6" : "mb-4"
            } flex flex-wrap gap-4 justify-between`}
          >
            <div className="flex-1">
              <TextInput
                label="SKU"
                withAsterisk
                placeholder="SKU"
                {...register(`warehouseStock.${index}.sku`)}
                error={errors?.warehouseStock?.[index]?.sku?.message}
                disabled={warehouseStockId ? true : false}
              />
            </div>
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
                      {...register(`warehouseStock.${index}.qty`)}
                      value={qtyAddValue}
                      onChange={setQtyAddValue}
                      min={0}
                      max={10000}
                      withAsterisk
                      error={errors?.warehouseStock?.[index]?.qty?.message}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1">
                <TextInput
                  label="Batch Name"
                  placeholder="Batch Name"
                  {...register(`warehouseStock.${index}.batchName`)}
                  error={errors?.warehouseStock?.[index]?.batchName?.message}
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
              <div className="flex-1">
                <TextInput
                  label="Batch Name"
                  placeholder="Batch Name"
                  {...register(`warehouseStock.${index}.batchName`)}
                  error={errors?.warehouseStock?.[index]?.batchName?.message}
                />
              </div>

              <div className="flex-1 datePicker">
                <span className="block text-sm font-medium leading-[23px]">
                  Expiry Date
                </span>
                <Controller
                  name={`warehouseStock.${index}.expiry`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date as Date);
                        const dateV = date?.toISOString();
                        setValue(
                          `warehouseStock.${index}.expiry`,
                          dateV as any
                        );
                        field.onChange(date);
                      }}
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select expiry date"
                      className="form-control text-sm text-black w-full h-9 rounded border border-x-gray-300 border-y-gray-300 px-3"
                    />
                  )}
                />
                {errors?.warehouseStock?.[index]?.expiry && (
                  <span className="text-xs text-red-500">
                    {errors?.warehouseStock?.[index]?.expiry?.message}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      {!params.id && (
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              warehouseId: "",
              itemId: "",
              batchName: "",
              qty: 0,
              sku: "",
              expiry: new Date(),
            })
          }
        >
          Add Stock
        </Button>
      )}

      <div className="text-right">
        {warehouseStockId ? (
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
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

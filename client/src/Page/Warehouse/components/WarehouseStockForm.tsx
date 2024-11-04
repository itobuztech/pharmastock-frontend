import { useEffect, useState } from "react";
import { Button, Divider, NumberInput, Select, TextInput } from "@mantine/core";
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
import routes from "Lib/Routes/Routes";

const schema = yup
  .object({
    warehouseId: yup.string().required("Warehouse is required"),
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
  handleUserPermissions,
}: Readonly<WarehouseStockFormProps>) {
  const params = useParams();
  const [qtyValue, setQtyValue] = useState<string | number>("");
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

  const [qtyValues, setQtyValues] = useState(fields.map(() => 0));

  const handleQtyChange = (index: number, value: number) => {
    setQtyValues((prevQty) => {
      const updatedQty = [...prevQty];
      updatedQty[index] = value;
      return updatedQty;
    });
    setValue(`warehouseStock.${index}.qty`, value);
    setValue(`warehouseStock.${index}.warehouseId`, getValues("warehouseId"));
  };

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
          navigate(routes.dashboard.warehouseStock.path);
        }

        if (close) {
          close();
        }
        reset();
        setQtyValues([]);
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
      setValue(
        "warehouseId",
        warehouseStockDetails?.warehouseStock.warehouse.id
      );
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
      <div className="flex flex-wrap gap-4 justify-between">
        <div className="flex-1">
          <TextInput
            label="Organization"
            placeholder="Name"
            defaultValue={user?.organization?.name}
            disabled
          />
        </div>
        <div className="flex-1">
          {id ? (
            <TextInput
              label="Warehouse"
              placeholder="Warehouse"
              name="warehouseId"
              disabled={id ? true : false}
              error={errors?.warehouseId?.message}
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
                  onChange={(value) => {
                    field.onChange(value);
                    setWarehouseId(String(value));

                  }}
                  value={field.value}
                  withAsterisk
                  data={selectWarehouseItem || selectWarehouseItems}
                  maxDropdownHeight={300}
                  error={errors?.warehouseId?.message}
                  disabled={id || warehouseStockId ? true : false}
                />
              )}
            />
          )}
        </div>
      </div>

      {!params.id && fields.length > 0 && <Divider my="lg" />}

      {fields.map((item, index) => (
        <>
          <div key={item.id} className=" relative">
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
                params.id ? "pt-6 mb-6" : "pt-3 mb-4"
              } flex flex-wrap gap-4 justify-between`}
            >
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
                      onChange={(value) => {
                        fetchSku({
                          variables: {
                            generateSkuNameInput: {
                              organizationId:
                                warehouseDetails?.warehouse.organization?.id ||
                                user?.organization.id,
                              warehouseId: id ? id : getValues(`warehouseId`),
                              itemId: value,
                            },
                          },
                          onCompleted: (data) => {
                            setValue(
                              `warehouseStock.${index}.sku`,
                              data?.generateSKU.sku as string
                            );
                          },
                        });
                        setValue(
                          `warehouseStock.${index}.itemId`,
                          String(value)
                        );

                        field.onChange(value);
                      }}
                      value={field.value}
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
            </div>

            <div
              className={`${
                params.id ? "mb-6" : "mb-4"
              } flex flex-wrap gap-4 justify-between`}
            >
              {params.id && (
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
                    value={qtyValues[index]}
                    onChange={(value) => handleQtyChange(index, Number(value))}
                    min={0}
                    max={10000}
                    withAsterisk
                    error={errors?.warehouseStock?.[index]?.qty?.message}
                  />
                </div>
              )}

              {handleUserPermissions(
                permission,
                USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
                USER_PERMISSION_CAPABILITIES.EDIT
              ) &&
                !params.id && (
                  <div className="flex-1">
                    <TextInput
                      label="Batch Name"
                      placeholder="Batch Name"
                      {...register(`warehouseStock.${index}.batchName`)}
                      error={
                        errors?.warehouseStock?.[index]?.batchName?.message
                      }
                    />
                  </div>
                )}
            </div>
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
              USER_PERMISSION_CAPABILITIES.EDIT
            ) && (
              <div className="flex flex-wrap gap-4 justify-between">
                {params.id && (
                  <div className="flex-1">
                    <TextInput
                      label="Batch Name"
                      placeholder="Batch Name"
                      {...register(`warehouseStock.${index}.batchName`)}
                      error={
                        errors?.warehouseStock?.[index]?.batchName?.message
                      }
                    />
                  </div>
                )}
                <div className="flex-1 datePicker mb-6">
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

          {index < fields.length - 1 && <Divider />}
        </>
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

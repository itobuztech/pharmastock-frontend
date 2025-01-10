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
import messagesData from "Lib/messages";
import useItemList from "Lib/customHooks/useItemList";
import ErrorMessage from "Components/Messeges/ErrorMessage";

const schema = yup
  .object({
    warehouseId: yup.string().required(messagesData.warehouseStock.warehouse),
    warehouseStock: yup.array().of(
      yup.object({
        warehouseId: yup
          .string()
          .required(messagesData.warehouseStock.warehouse),
        itemId: yup.string().required(messagesData.warehouseStock.product),
        batchName: yup
          .string()
          .required(messagesData.warehouseStock.batchName)
          .trim(messagesData.warehouseStock.batchName),
        qty: yup.number().min(1, messagesData.warehouseStock.qty).required(),
        sku: yup
          .string()
          .required(messagesData.warehouseStock.sku)
          .trim(messagesData.warehouseStock.sku),
        expiry: yup.date().required(messagesData.warehouseStock.expiry),
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

  const [qtyValues, setQtyValues] = useState<Number[]>([]);
  const [dateValues, setDateValues] = useState<Date[]>([]);

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
      <div className="sm:flex flex-wrap gap-4 justify-between">
        <div className="flex-1">
          <TextInput
            label="Organization"
            placeholder="Name"
            defaultValue={warehouseStockDetails?.warehouseStock.warehouse.organization?.name || user?.organization.name}
            disabled
          />
        </div>
        <div className="flex-1 mt-4 sm:mt-0">
          {id ? (
            <>
              <TextInput
                label="Warehouse"
                placeholder="Warehouse"
                name="warehouseId"
                disabled={id ? true : false}
                error={errors?.warehouseId?.message}
              />
              {errors?.warehouseId && (
                <ErrorMessage message={errors?.warehouseId?.message} />
              )}
            </>
          ) : (
            <>
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
                    disabled={id || warehouseStockId ? true : false}
                  />
                )}
              />
              {errors?.warehouseId && (
                <ErrorMessage message={errors?.warehouseId?.message} />
              )}
            </>
          )}
        </div>
      </div>

      {!params.id && fields.length > 0 && <Divider my="lg" />}

      {fields.map((item, index) => (
        <>
          <div key={item.id} className=" relative">
            {!params.id && fields.length > 1 && (
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
                params.id ? "pt-4 " : "pt-3"
              } sm:flex flex-wrap gap-4 mb-4 justify-between`}
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
                        setValue(`warehouseStock.${index}.sku`, "");
                        if (value) {
                          fetchSku({
                            variables: {
                              generateSkuNameInput: {
                                organizationId:
                                  warehouseDetails?.warehouse.organization
                                    ?.id || user?.organization.id,
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
                        }

                        setValue(
                          `warehouseStock.${index}.itemId`,
                          String(value)
                        );

                        field.onChange(value);
                      }}
                      data={selectItem}
                      maxDropdownHeight={300}
                      searchable
                      disabled={warehouseId ? false : true}
                      nothingFoundMessage="Nothing found..."
                    />
                  )}
                />
                {errors?.warehouseStock?.[index]?.itemId && (
                  <ErrorMessage
                    message={errors?.warehouseStock?.[index]?.itemId?.message}
                  />
                )}
              </div>
              <div className="flex-1 mt-4 sm:mt-0">
                <TextInput
                  label="SKU"
                  withAsterisk
                  placeholder="SKU"
                  value={getValues(`warehouseStock.${index}.sku`)}
                  disabled={warehouseStockId ? true : false}
                />
              </div>
            </div>

            <div
              className={`sm:flex flex-wrap gap-4 justify-between mb-4 z-0 ${
                !params.id ? "mb-4" : "sm:mb-0"
              }`}
            >
              {params.id && (
                <div className="flex-1 mb-4">
                  <NumberInput
                    label="Total Quantity"
                    placeholder="Quantity"
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
                  <Controller
                    name={`warehouseStock.${index}.qty`}
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        label="Add Quantity"
                        placeholder="Qty"
                        {...field}
                        value={qtyValues[index] as any}
                        onChange={(value) => {
                          field.onChange(value);
                          handleQtyChange(index, Number(value));
                          setValue(
                            `warehouseStock.${index}.qty`,
                            Number(value)
                          );
                        }}
                        min={0}
                        max={10000}
                        withAsterisk
                      />
                    )}
                  />
                  {errors?.warehouseStock?.[index]?.qty && (
                    <ErrorMessage
                      message={errors?.warehouseStock?.[index]?.qty?.message}
                    />
                  )}
                </div>
              )}

              {handleUserPermissions(
                permission,
                USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
                USER_PERMISSION_CAPABILITIES.EDIT
              ) &&
                !params.id && (
                  <div className="flex-1 mt-4 sm:mt-0">
                    <TextInput
                      withAsterisk
                      label="Batch Name"
                      placeholder="Batch Name"
                      {...register(`warehouseStock.${index}.batchName`)}
                    />
                    {errors?.warehouseStock?.[index]?.batchName && (
                      <ErrorMessage
                        message={
                          errors?.warehouseStock?.[index]?.batchName?.message
                        }
                      />
                    )}
                  </div>
                )}
            </div>
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_ADMIN,
              USER_PERMISSION_CAPABILITIES.EDIT
            ) && (
              <div className="sm:flex flex-wrap gap-4 justify-between">
                {params.id && (
                  <div className="flex-1 mb-4 sm:mb-0">
                    <TextInput
                      withAsterisk
                      label="Batch Name"
                      placeholder="Batch Name"
                      {...register(`warehouseStock.${index}.batchName`)}
                    />
                    {errors?.warehouseStock?.[index]?.batchName && (
                      <ErrorMessage
                        message={
                          errors?.warehouseStock?.[index]?.batchName?.message
                        }
                      />
                    )}
                  </div>
                )}
                <div className="flex-1 datePicker">
                  <span className="block text-sm font-medium leading-[23px]">
                    Expiry Date
                  </span>
                  <Controller
                    name={`warehouseStock.${index}.expiry`}
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={dateValues[index] || new Date()}
                        onChange={(date) => {
                          setDateValues((prevDate) => {
                            const updatedDate = [...prevDate];
                            updatedDate[index] = date as any;
                            return updatedDate;
                          });
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
                        className="form-control text-sm w-full h-9 rounded border border-gray-300 px-3 placeholder:text-gray-400"
                      />
                    )}
                  />
                  {errors?.warehouseStock?.[index]?.expiry && (
                    <ErrorMessage
                      message={errors?.warehouseStock?.[index]?.expiry?.message}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {index < fields.length - 1 && <Divider my="lg" />}
        </>
      ))}

      {!params.id && (
        <Button
          className="mt-4"
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

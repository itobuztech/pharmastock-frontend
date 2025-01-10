import { useEffect, useState } from "react";
import {
  Modal,
  NumberInput,
  TextInput,
  Divider,
  Select,
  Button,
} from "@mantine/core";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import ButtonComponent from "Components/Button/ButtonComponent";
import { GetClearancePharmacyStock } from "query/pharmacyStock/clearancePharmacyStock";
import { CreatePharmacyStockInput, UserRole } from "gql/graphql";
import { ClearancePharmacyStockInput } from "../pharmacyStock.interface";
import { PharmacyStocksProduct } from "query/pharmacyStock/pharmacyStocksProduct";
import { CiCircleMinus } from "react-icons/ci";
import { useAppSelector } from "Lib/Store/hooks";
import messagesData from "Lib/messages";
import ErrorMessage from "Components/Messeges/ErrorMessage";
interface PharmacyStockProduct {
  id: string;
  name: string;
}
interface PaginatedPharmacyStockProducts {
  items: PharmacyStockProduct[];
  total: number;
}

const pharmacyStockClearanceSchema = yup
  .object({
    items: yup.array().of(
      yup.object({
        itemId: yup.string().required(messagesData.pharmacyStock.product),
        qty: yup.number().required(messagesData.pharmacyStock.qty).min(1),
      })
    ),
  })
  .required();

export default function PharmacyStockSoldForm({
  StockSoldModalOpened,
  StockSoldModalClose,
  refetchItem,
  setNewPharmacyStockList,
  pharmacyName,
  pharmacyId,
}: {
  StockSoldModalOpened: boolean;
  StockSoldModalClose: () => void;
  refetchItem: () => void;
  setNewPharmacyStockList?: React.Dispatch<
    React.SetStateAction<CreatePharmacyStockInput | undefined>
  >;
  pharmacyName: string;
  pharmacyId: string;
}) {
  const user = useAppSelector((state) => state.user);
  const isStaff = user.role === UserRole.Staff;
  const [pharmacyProducts, setPharmacyProducts] =
    useState<PaginatedPharmacyStockProducts>();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(pharmacyStockClearanceSchema),
    defaultValues: {
      items: [{ itemId: "", qty: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [fetchPharmacyStocksProduct] = useLazyQuery(PharmacyStocksProduct, {
    onCompleted: (d) => {
      setPharmacyProducts(d.pharmacyStocksItems);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const [clearPharmacyStock, { loading }] = useMutation(
    GetClearancePharmacyStock,
    {
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  useEffect(() => {
    if (isStaff) {
      fetchPharmacyStocksProduct();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStaff]);

  const onSubmit = (data: { items?: ClearancePharmacyStockInput[] }) => {
    clearPharmacyStock({
      variables: {
        clearancePharmacyStockInput: data.items,
        pharmacyId: pharmacyId,
      },
      onCompleted: (d) => {
        setNewPharmacyStockList && setNewPharmacyStockList(d);
        StockSoldModalClose();
        toast.success("Pharmacy Stock Cleared Successfully");
        reset({ items: [{ itemId: "", qty: 0 }] });
        refetchItem();
      },
    });
  };

  const pharmacyProductsList = pharmacyProducts?.items?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const availableProducts = pharmacyProductsList?.filter(
    (product) => !fields.some((field) => field.itemId === product.value)
  );

  return (
    <Modal
      opened={StockSoldModalOpened}
      onClose={() => {
        StockSoldModalClose();
        reset({ items: [{ itemId: "", qty: 0 }] });
      }}
      title="Pharmacy Stock Sold Out"
      centered
      size={"lg"}
      closeOnClickOutside={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextInput
            label="Pharmacy"
            placeholder="Pharmacy"
            value={pharmacyName}
            disabled
          />
        </div>

        {fields.length > 0 && <Divider my="lg" />}
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="mb-5 relative">
              {fields.length > 1 && (
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
                <div className="flex-1 ">
                  <Controller
                    name={`items.${index}.itemId`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        withAsterisk
                        data={availableProducts}
                        label="Select Product"
                        placeholder="Select Product"
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          setValue(`items.${index}.itemId`, value as string);
                        }}
                        searchable
                        nothingFoundMessage="Nothing found"
                      />
                    )}
                  />
                  {errors?.items?.[index]?.itemId && (
                    <ErrorMessage
                      message={errors?.items?.[index]?.itemId?.message}
                    />
                  )}
                </div>

                <div className="flex-1 ">
                  <Controller
                    name={`items.${index}.qty`}
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        withAsterisk
                        label="Add Quantity"
                        placeholder="Quantity"
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        min={0}
                        max={1000000}
                      />
                    )}
                  />
                  {errors?.items?.[index]?.qty && (
                    <ErrorMessage message={messagesData.pharmacyStock.qty} />
                  )}
                </div>
              </div>
            </div>
            {index < fields.length - 1 && <Divider my="lg" />}
          </div>
        ))}
        <Button
          onClick={() => append({ itemId: "", qty: 0 })}
          variant="outline"
          disabled={availableProducts?.length === 0 ? true : false}
        >
          Add Product
        </Button>
        <div className="text-right">
          <ButtonComponent type="submit" loading={loading} className="mt-4">
            Sold
          </ButtonComponent>
        </div>
      </form>
    </Modal>
  );
}

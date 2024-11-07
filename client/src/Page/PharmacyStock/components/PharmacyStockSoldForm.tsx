import { useEffect, useState } from "react";
import {
  Modal,
  NumberInput,
  TextInput,
  Divider,
  Select,
  ActionIcon,
} from "@mantine/core";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useDebouncedState } from "@mantine/hooks";

import ButtonComponent from "Components/Button/ButtonComponent";
import { GetClearancePharmacyStock } from "query/pharmacyStock/clearancePharmacyStock";
import { CreatePharmacyStockInput } from "gql/graphql";
import { ClearancePharmacyStockInput } from "../pharmacyStock.interface";
import { PharmacyStocksProduct } from "query/pharmacyStock/pharmacyStocksProduct";
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
        itemId: yup.string(),
        qty: yup.number().required().min(1),
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
  const [pharmacyProducts, setPharmacyProducts] =
    useState<PaginatedPharmacyStockProducts>();
  const [productSearch, setProductSearch] = useDebouncedState("", 300);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(pharmacyStockClearanceSchema),
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
    fetchPharmacyStocksProduct({
      variables: {
        searchText: productSearch,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearch]);

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
        reset({ items: [] });
        refetchItem();
        setSelectedProduct(null);
      },
    });
  };

  const pharmacyProductsList = pharmacyProducts?.items?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const addSelectedProduct = () => {
    const product = pharmacyProducts?.items.find(
      (item) => item.id === selectedProduct
    );
    if (product) {
      append({
        itemId: product.id,
        qty: 0,
      });
    }
    setSelectedProduct(null);
  };

  return (
    <Modal
      opened={StockSoldModalOpened}
      onClose={() => {
        StockSoldModalClose();
        setSelectedProduct(null); 
        reset({ items: [] });
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

        <div className="mb-4 flex items-center gap-4">
          <div className="flex-1">
            <Select
              data={pharmacyProductsList?.filter(
                (product) =>
                  !fields.some((field) => field.itemId === product.value)
              )}
              label="Select Product"
              placeholder="Select Product"
              value={selectedProduct}
              onChange={setSelectedProduct}
              searchable
              onSearchChange={setProductSearch}
              nothingFoundMessage="Nothing found..."
            />
          </div>
          <div className="flex-2 mt-6">
            <ButtonComponent
              type="button"
              variant="outline"
              onClick={addSelectedProduct}
            >
              Add Product
            </ButtonComponent>
          </div>
        </div>

        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex gap-3 items-center">
              <div className="mb-4 w-1/2">
                <TextInput
                  label="Product"
                  defaultValue={
                    pharmacyProductsList?.find(
                      (item) => item.value === field.itemId
                    )?.label
                  }
                  disabled
                />
              </div>

              <div className="mb-4 w-1/2">
                <Controller
                  name={`items.${index}.qty`}
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Add Qty"
                      placeholder="Qty"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      min={0}
                      max={1000000}
                      error={
                        errors?.items?.[index]?.qty && "This field is required"
                      }
                    />
                  )}
                />
              </div>

              <div className="mt-2.5">
                <ActionIcon
                  color="red"
                  onClick={() => remove(index)}
                  title="Remove item"
                >
                  <RxCross2 />
                </ActionIcon>
              </div>
            </div>

            {index < fields.length - 1 && <Divider my="xs" />}
          </div>
        ))}

        <ButtonComponent type="submit" loading={loading} className="mt-4">
          Sold
        </ButtonComponent>
      </form>
    </Modal>
  );
}

import { useEffect } from "react";
import { Modal, NumberInput, TextInput, Divider } from "@mantine/core";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import ButtonComponent from "Components/Button/ButtonComponent";
import { GetClearancePharmacyStock } from "query/pharmacyStock/clearancePharmacyStock";
import { CreatePharmacyStockInput } from "gql/graphql";
import {
  ClearancePharmacyStockInput,
  SelectedPharmacyStock,
} from "../pharmacyStock.interface";

const pharmacyStockClearanceSchema = yup
  .object({
    items: yup.array().of(
      yup.object({
        pharmacyId: yup.string(),
        itemId: yup.string(),
        qty: yup.number().required().min(1),
      })
    ),
  })
  .required();

export default function PharmacyStockSoldForm({
  StockSoldModalOpened,
  StockSoldModalClose,
  selectedItems,
  refetchItem,
  setNewPharmacyStockList,
  setSelectedPharmacyStock,
}: {
  StockSoldModalOpened: boolean;
  StockSoldModalClose: () => void;
  selectedItems: SelectedPharmacyStock[];
  refetchItem: () => void;
  setNewPharmacyStockList?: React.Dispatch<
    React.SetStateAction<CreatePharmacyStockInput | undefined>
  >;
  setSelectedPharmacyStock?: React.Dispatch<
    React.SetStateAction<SelectedPharmacyStock[]>
  >;
}) {
  const [clearPharmacyStock, { loading }] = useMutation(
    GetClearancePharmacyStock,
    {
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(pharmacyStockClearanceSchema),
    defaultValues: {
      items: selectedItems?.map((item) => ({
        pharmacyId: item.pharmacyId,
        itemId: item.itemId,
        qty: 0,
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: { items?: ClearancePharmacyStockInput[] }) => {
    console.log("data", data.items);
    clearPharmacyStock({
      variables: {
        clearancePharmacyStockInput: data.items,
      },
      onCompleted: (d) => {
        setNewPharmacyStockList && setNewPharmacyStockList(d);
        setSelectedPharmacyStock && setSelectedPharmacyStock([]);
        StockSoldModalClose();
        toast.success("Pharmacy Stock Cleared Successfully");
        reset();
        refetchItem();
      },
    });
  };

  useEffect(() => {
    if (selectedItems) {
      const formattedSelectedItems = selectedItems?.map((item) => ({
        pharmacyId: item.pharmacyId,
        itemId: item.itemId,
        qty: 0,
      }));
      setValue("items", formattedSelectedItems);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems.length]);

  return (
    <Modal
      opened={StockSoldModalOpened}
      onClose={StockSoldModalClose}
      title="Pharmacy Stock Sold Out"
      centered
      zIndex={600}
      overlayProps={{
        zIndex: 500,
      }}
      size={"lg"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex gap-3">
              <div className="mb-4 w-1/2">
                <TextInput
                  label="Item"
                  defaultValue={selectedItems[index]?.itemName}
                  disabled
                />
              </div>

              <div className="mb-4 w-1/2">
                <Controller
                  name={`items.${index}.qty`}
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
                        errors?.items?.[index]?.qty && "This field is required"
                      }
                    />
                  )}
                />
              </div>
            </div>

            {index < fields.length - 1 && <Divider my="xs" />}
          </div>
        ))}

        <ButtonComponent type="submit" loading={loading}>
          Sold
        </ButtonComponent>
      </form>
    </Modal>
  );
}

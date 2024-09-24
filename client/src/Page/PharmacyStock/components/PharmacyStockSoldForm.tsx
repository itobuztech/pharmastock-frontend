import React, { useState } from "react";
import { Modal, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonComponent from "Components/Button/ButtonComponent";
import { useMutation } from "@apollo/client";
import { GetClearancePharmacyStock } from "query/pharmacyStock/clearancePharmacyStock";
import { toast } from "react-toastify";
import {
  ClearancePharmacyStockInput,
  CreatePharmacyStockInput,
} from "gql/graphql";

export default function PharmacyStockSoldForm({
  StockSoldModalOpened,
  StockSoldModalClose,
  pharmacyName,
  pharmacyId,
  itemName,
  itemId,
  refetchItem,
  setNewPharmacyStockList,
}: {
  StockSoldModalOpened: boolean;
  StockSoldModalClose: () => void;
  pharmacyName?: string;
  pharmacyId?: string;
  itemName?: string;
  itemId?: string;
  refetchItem: () => void;
  setNewPharmacyStockList?: React.Dispatch<
    React.SetStateAction<CreatePharmacyStockInput | undefined>
  >;
}) {
  const [qtyAddValue, setQtyAddValue] = useState<string | number>("");

  const schema = yup
    .object({
      pharmacyId: yup.string(),
      qty: yup.number().required(),
      itemId: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [clearPharmacyStock, { loading }] = useMutation(
    GetClearancePharmacyStock,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success("Pharmacy Stock Cleared Successfully");
        StockSoldModalClose();
        reset();
        refetchItem();
      },
    }
  );

  const onSubmit = async (data: ClearancePharmacyStockInput) => {
    const response = await clearPharmacyStock({
      variables: {
        clearancePharmacyStockInput: [{ ...data, itemId, pharmacyId }],
      },
    });
    if (setNewPharmacyStockList) {
      setNewPharmacyStockList(response.data);
    }
  };

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
      size={"sm"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextInput
            label="Pharmacy"
            {...register("pharmacyId")}
            defaultValue={pharmacyName}
            disabled
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Product"
            {...register("itemId")}
            defaultValue={itemName}
            disabled
          />
        </div>

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

        <ButtonComponent type="submit" loading={loading}>
          Sold
        </ButtonComponent>
      </form>
    </Modal>
  );
}

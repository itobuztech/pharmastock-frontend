import { Button, TextInput } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { GetWarehouseDetails } from "query/warehouse/warehouseDetails";
import { UpdateWarehouseInput, Warehouse } from "gql/graphql";
import { GetWarehouseUpdate } from "query/warehouse/warehouseUpdate";
import { toast } from "react-toastify";

export default function WarehouseDetails() {
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup
    .object({
      // name: yup.string().required(),
      location: yup.string().required(),
      area: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: warehouseDetails } = useQuery<{ warehouse: Warehouse }>(
    GetWarehouseDetails,
    {
      variables: {
        warehouseId: id,
      },
    }
  );

  const [updateWarehouse, { loading }] = useMutation(GetWarehouseUpdate);

  const onSubmit = async (data: UpdateWarehouseInput) => {
    try {
      await updateWarehouse({
        variables: { updateWarehouseInput: { ...data, id: id } },
      });
      toast.success("Warehouse Updated Successfully");
      setEditForm(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (warehouseDetails?.warehouse) {
      setValue("area", warehouseDetails.warehouse.area);
      setValue("location", warehouseDetails.warehouse.location);
    }
  }, [setValue, warehouseDetails?.warehouse]);

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <PageHeader
        title="Warehouse Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-1/2 bg-white rounded-md py-6 px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="mb-4">
            <TextInput
              label="Name"
              placeholder="Name"
              {...register("name")}
              readOnly={editForm ? false : true}
            />
            {errors.name && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div> */}

          <div className="mb-4">
            <TextInput
              label="Location"
              placeholder="Location"
              {...register("location")}
              readOnly={editForm ? false : true}
            />
            {errors.location && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <TextInput
              label="Area"
              placeholder="Area"
              {...register("area")}
              readOnly={editForm ? false : true}
            />
            {errors.area && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-4 justify-end mb-6 mt-8">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Cancel
            </Button>

            {editForm ? (
              <ButtonComponent type="submit" loading={loading}>
                Update
              </ButtonComponent>
            ) : (
              <Button type="button" onClick={() => setEditForm(true)}>
                Edit
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

import PageHeader from "Components/PageHeader";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetWarehouseDetails } from "query/warehouse/warehouseDetails";
import { Warehouse } from "gql/graphql";
import WarehouseForm from "./components/WarehouseForm";

export default function WarehouseDetails() {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams();

  const { data: warehouseDetails, refetch } = useQuery<{
    warehouse: Warehouse;
  }>(GetWarehouseDetails, {
    variables: {
      warehouseId: id,
    },
  });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-1/2 bg-white rounded-md py-6 px-6">
        <WarehouseForm
          editForm={editForm}
          setEditForm={setEditForm}
          id={id}
          refetchWarehouse={refetch}
          warehouseDetails={warehouseDetails}
        />
      </div>
    </section>
  );
}

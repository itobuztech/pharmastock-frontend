import React, { useState } from "react";
import PageHeader from "Components/PageHeader";
import { useQuery } from "@apollo/client";
import { GetItemDetails } from "query/item/itemDetails";
import { useParams } from "react-router-dom";
import { ChildComponentProps, Item } from "interfaces/interfaces";
import ProductForm from "./components/ProductForm";

export default function ProductDetails({ handleUserPermissions }:Readonly<ChildComponentProps>) {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams();

  const { data: itemDetails, refetch } = useQuery<{ item: Item }>(
    GetItemDetails,
    {
      variables: {
        itemId: id,
      },
    }
  );

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Product Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2 bg-white rounded-md py-6 px-6">
        <ProductForm
          editForm={editForm}
          setEditForm={setEditForm}
          itemId={id}
          itemDetail={itemDetails}
          refetchItem={refetch}
          handleUserPermissions={handleUserPermissions}
        />
      </div>
    </section>
  );
}

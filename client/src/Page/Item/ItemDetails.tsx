import React, { useState } from "react";
import PageHeader from "Components/PageHeader";
import { useQuery } from "@apollo/client";
import { GetItemDetails } from "query/item/itemDetails";
import { useParams } from "react-router-dom";
import { Item } from "interfaces/interfaces";
import ItemForm from "./components/ItemForm";

export default function ItemDetails() {
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
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <PageHeader
        title="Item Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-1/2 bg-white rounded-md py-6 px-6">
        <ItemForm
          editForm={editForm}
          setEditForm={setEditForm}
          itemId={id}
          itemDetail={itemDetails}
          refetchItem={refetch}
        />
      </div>
    </section>
  );
}

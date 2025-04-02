import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import PageHeader from "Components/PageHeader";
import { GetItemDetails } from "query/item/itemDetails";
import { ChildComponentProps, Item } from "interfaces/interfaces";
import ProductForm from "./components/ProductForm";
import { Paper } from "@mantine/core";

export default function ProductDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
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
    <section className="min-h-screen bg-opacity-50 py-4 md:py-6 px-4 md:px-8">
      <PageHeader
        title="Product Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2 mt-5 lg:mt-10">
        <Paper withBorder shadow="md" px={30} pt={30} mt={20} radius="md">
          <ProductForm
            editForm={editForm}
            setEditForm={setEditForm}
            itemId={id}
            itemDetail={itemDetails}
            refetchItem={refetch}
            handleUserPermissions={handleUserPermissions}
          />
        </Paper>
      </div>
    </section>
  );
}

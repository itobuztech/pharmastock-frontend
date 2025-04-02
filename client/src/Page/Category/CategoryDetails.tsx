import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Paper } from "@mantine/core";

import PageHeader from "Components/PageHeader";
import { GetCategoryItem } from "query/category/categoryItem";
import { ItemCategory } from "gql/graphql";
import CategoryCreateUpdateForm from "./components/CategoryCreateUpdateForm";
import { ChildComponentProps } from "interfaces/interfaces";

export default function CategoryDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams();

  const { data: categoryItem, refetch } = useQuery<{
    itemCategory: ItemCategory;
  }>(GetCategoryItem, {
    variables: {
      itemCategoryId: id,
    },
  });

  return (
    <section className="min-h-screen bg-opacity-50 py-4 md:py-6 px-4 md:px-8">
      <PageHeader
        title="Category Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-1/2 mt-7 lg:mt-10">
        <Paper withBorder shadow="md" px={30} pt={30} pb={30} mt={20} radius="md">
          <CategoryCreateUpdateForm
            editForm={editForm}
            setEditForm={setEditForm}
            catId={id}
            refetchItemCategory={refetch}
            categoryItem={categoryItem}
            handleUserPermissions={handleUserPermissions}
          />
        </Paper>
      </div>
    </section>
  );
}

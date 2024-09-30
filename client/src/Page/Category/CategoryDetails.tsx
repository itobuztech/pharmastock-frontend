import React, { useState } from "react";
import PageHeader from "Components/PageHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetCategoryItem } from "query/category/categoryItem";
import { ItemCategory } from "gql/graphql";
import CategoryCreateUpdateForm from "./components/CategoryCreateUpdateForm";
import { ChildComponentProps } from "interfaces/interfaces";

export default function CategoryDetails({ handleUserPermissions }:Readonly<ChildComponentProps>) {
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
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Category Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-1/2 bg-white rounded-md py-6 px-6">
        <CategoryCreateUpdateForm
          editForm={editForm}
          setEditForm={setEditForm}
          catId={id}
          refetchItemCategory={refetch}
          categoryItem={categoryItem}
          handleUserPermissions={handleUserPermissions}
        />
      </div>
    </section>
  );
}

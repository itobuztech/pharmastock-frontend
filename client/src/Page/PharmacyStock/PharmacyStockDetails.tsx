import PageHeader from "Components/PageHeader";
import React from "react";
import PharmacyStockForm from "./components/PharmacyStockForm";
import { useQuery } from "@apollo/client";
import { GetPharmacyStockDetails } from "query/pharmacyStock/pharmacyStockDetails";
import { useParams } from "react-router-dom";
import { PharmacyStock } from "gql/graphql";

export default function PharmacyStockDetails() {
  const { id } = useParams();

  const { data: pharmacyStockDetails, refetch } = useQuery<{
    PharmacyStock: PharmacyStock;
  }>(GetPharmacyStockDetails, {
    variables: {
      pharmacyStockId: id,
    },
  });

  // console.log({ pharmacyStockDetails, id });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Pharmacy Stock Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-1/2 bg-white rounded-md py-6 px-6">
        <PharmacyStockForm
          close={() => console.log()}
          pharmacyStockDetails={pharmacyStockDetails?.PharmacyStock}
          id={id}
        />
      </div>
    </section>
  );
}

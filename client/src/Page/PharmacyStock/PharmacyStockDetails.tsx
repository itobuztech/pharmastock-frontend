import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PharmacyStock } from "gql/graphql";

import PageHeader from "Components/PageHeader";
import PharmacyStockForm from "./components/PharmacyStockForm";
import { GetPharmacyStockDetails } from "query/pharmacyStock/pharmacyStockDetails";
import { ChildComponentProps } from "interfaces/interfaces";
import { toast } from "react-toastify";
import { Paper } from "@mantine/core";

export default function PharmacyStockDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const { id } = useParams();

  const { data: pharmacyStockDetails, refetch } = useQuery<{
    PharmacyStock: PharmacyStock;
  }>(GetPharmacyStockDetails, {
    variables: {
      pharmacyStockId: id,
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <section className="min-h-screen bg-opacity-50 py-4 md:py-6 px-4 md:px-8">
      <PageHeader
        title="Pharmacy Stock Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2 mt-5 lg:mt-10">
        <Paper withBorder shadow="md" px={30} pt={30} mt={20} radius="md">
          <PharmacyStockForm
            pharmacyStockDetails={pharmacyStockDetails?.PharmacyStock}
            id={id}
            refetchItem={refetch}
            handleUserPermissions={handleUserPermissions}
          />
        </Paper>
      </div>
    </section>
  );
}

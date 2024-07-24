import React, { useState } from "react";
import PageHeader from "Components/PageHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetPharmacyDetails } from "query/pharmacy/pharmacyDetails";
import { Pharmacy } from "gql/graphql";
import PharmacyForm from "./components/PharmacyForm";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PharmacyStockForm from "Page/PharmacyStock/components/PharmacyStockForm";
// import PharmacyStockTable from "Page/PharmacyStock/components/PharmacyStockTable";

export default function PharmacyDetails() {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  // const [activePage, setActivePage] = useState(1);
  // const [totalCount, setTotalCount] = useState(1);

  const { data: pharmacyDetails, refetch } = useQuery<{ pharmacy: Pharmacy }>(
    GetPharmacyDetails,
    {
      variables: {
        pharmacyId: id,
      },
    }
  );

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Pharmacy Details"
        showBackButton={true}
        showCreateButton={true}
        onClick={open}
        buttonText="Add Pharmacy Stock"
      />

      <div className="w-full lg:w-1/2 bg-white rounded-md py-6 px-6">
        <PharmacyForm
          id={id}
          close={() => console.log()}
          pharmacyDetails={pharmacyDetails?.pharmacy}
          refetchPharmacyDetails={refetch}
          editForm={editForm}
          setEditForm={setEditForm}
        />
      </div>

      {/* <div className="mt-8">
        <PharmacyStockTable
          activePage={activePage}
          setActivePage={setActivePage}
          totalCount={totalCount}
        />
      </div> */}

      <Modal
        opened={opened}
        onClose={close}
        title="Create Pharmacy Stock"
        centered
        size={"sm"}
      >
        <PharmacyStockForm
          pharmacyName={pharmacyDetails?.pharmacy.name}
          pharmacyId={pharmacyDetails?.pharmacy.id}
          close={close}
        />
      </Modal>
    </section>
  );
}

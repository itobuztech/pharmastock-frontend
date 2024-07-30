import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import { useParams } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetPharmacyDetails } from "query/pharmacy/pharmacyDetails";
import { CreatePharmacyStockInput, Pharmacy } from "gql/graphql";
import PharmacyForm from "./components/PharmacyForm";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PharmacyStockForm from "Page/PharmacyStock/components/PharmacyStockForm";
import PharmacyStockTable from "Page/PharmacyStock/components/PharmacyStockTable";
import { GetPharmacyStocksByPharmacy } from "query/pharmacyStock/pharmacyStocksByPharmacy";
import { toast } from "react-toastify";
import {
  ChildComponentProps,
  CreatePharmacyStocksByPharmacy,
  PharmacyStocksByPharmacy,
} from "interfaces/interfaces";
import EmptyList from "Components/EmptyList";

export default function PharmacyDetails({ handleUserPermissions }:Readonly<ChildComponentProps>) {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [pharmacyStocksList, setPharmacyStocksList] =
    useState<PharmacyStocksByPharmacy>();
  const [newPharmacyStockList, setNewPharmacyStockList] =
    useState<CreatePharmacyStockInput>();

  const { data: pharmacyDetails, refetch } = useQuery<{ pharmacy: Pharmacy }>(
    GetPharmacyDetails,
    {
      variables: {
        pharmacyId: id,
      },
    }
  );

  const [fetchPharmacyStocksByPharmacy, { refetch: pharmacyRefetch, loading }] =
    useLazyQuery<CreatePharmacyStocksByPharmacy>(GetPharmacyStocksByPharmacy, {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const item = d.pharmacyStocksByPharmacy;
          const total = d.pharmacyStocksByPharmacy.total;
          const paginationCount = Math.ceil(total / 10);
          setPharmacyStocksList(item);
          setTotalCount(paginationCount);
        }
      },
    });

  useEffect(() => {
    fetchPharmacyStocksByPharmacy({
      variables: {
        pharmacyId: id,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchPharmacyStocksByPharmacy, id, pharmacyRefetch]);

  useEffect(() => {
    refetch();
    pharmacyRefetch();
  }, [refetch, pharmacyRefetch]);

  // Update new pharmacy in list
  useEffect(() => {
    if (newPharmacyStockList) {
      pharmacyRefetch().then(({ data }) => {
        if (data) {
          const item = data.pharmacyStocksByPharmacy;
          const total = data.pharmacyStocksByPharmacy.total;
          const paginationCount = Math.ceil(total / 10);
          setPharmacyStocksList(item);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newPharmacyStockList, pharmacyRefetch, refetch]);

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

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      <div className="mt-8">
        {!pharmacyStocksList?.pharmacyStocks.length ? (
          <EmptyList />
        ) : (
          <PharmacyStockTable
            activePage={activePage}
            setActivePage={setActivePage}
            totalCount={totalCount}
            pharmaciesStockList={pharmacyStocksList}
            handleUserPermissions={handleUserPermissions}
          />
        )}
      </div>

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
          refetchItem={pharmacyRefetch}
          setNewPharmacyStockList={setNewPharmacyStockList}
          handleUserPermissions={handleUserPermissions}
        />
      </Modal>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import PharmacyStockTable from "./components/PharmacyStockTable";
import PageHeader from "Components/PageHeader";
import { useLazyQuery } from "@apollo/client";
import { PharmacyStocksList } from "query/pharmacyStock/pharmacyStocksList";
import { toast } from "react-toastify";
import { PharmacyStocks, PharmacyStocksLists } from "interfaces/interfaces";
import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Modal } from "@mantine/core";
import PharmacyStockForm from "./components/PharmacyStockForm";
import EmptyList from "Components/EmptyList";
import { CreatePharmacyStockInput } from "gql/graphql";

export default function PharmacyStock() {
  const [pharmacyStocksList, setPharmacyStocksList] =
    useState<PharmacyStocks>();
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [newPharmacyStockList, setNewPharmacyStockList] =
    useState<CreatePharmacyStockInput>();

  // Pharmacy list query
  const [fetchPharmaciesStockList, { refetch, loading }] =
    useLazyQuery<PharmacyStocksLists>(PharmacyStocksList, {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const pharmaList = d.PharmacyStocks;
          const total = d.PharmacyStocks.total;
          const paginationCount = Math.ceil(total / 10);

          setPharmacyStocksList(pharmaList);
          setTotalCount(paginationCount);
        }
      },
    });

  useEffect(() => {
    fetchPharmaciesStockList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchPharmaciesStockList, refetch]);

  // Update new pharmacy in list
  useEffect(() => {
    if (newPharmacyStockList) {
      refetch().then(({ data }) => {
        if (data) {
          const pharmaList = data.PharmacyStocks;
          const total = data.PharmacyStocks.total;
          const paginationCount = Math.ceil(total / 10);
          setPharmacyStocksList(pharmaList);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newPharmacyStockList, refetch]);

  console.log({ pharmacyStocksList });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Pharmacy Stocks"
        showBackButton={true}
        showCreateButton={true}
        buttonText="Add Pharmacy Stock"
        onClick={open}
      />

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {!pharmacyStocksList?.pharmacyStocks.length ? (
        <EmptyList />
      ) : (
        <PharmacyStockTable
          activePage={activePage}
          setActivePage={setActivePage}
          totalCount={totalCount}
          pharmaciesStockList={pharmacyStocksList}
        />
      )}

      <Modal
        opened={opened}
        onClose={close}
        title="Create Pharmacy Stock"
        centered
        size={"sm"}
      >
        <PharmacyStockForm
          // pharmacyName={pharmacyDetails?.pharmacy.name}
          // pharmacyId={pharmacyDetails?.pharmacy.id}
          setNewPharmacyStockList={setNewPharmacyStockList}
          close={close}
        />
      </Modal>
    </section>
  );
}

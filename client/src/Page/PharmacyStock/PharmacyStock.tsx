import React, { useEffect, useState } from "react";
import PharmacyStockTable from "./components/PharmacyStockTable";
import PageHeader from "Components/PageHeader";
import { useLazyQuery } from "@apollo/client";
import { PharmacyStocksList } from "query/pharmacyStock/pharmacyStocksList";
import { toast } from "react-toastify";
import { ChildComponentProps, PharmacyStocks, PharmacyStocksLists } from "interfaces/interfaces";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Modal } from "@mantine/core";
import PharmacyStockForm from "./components/PharmacyStockForm";
import EmptyList from "Components/EmptyList";
import { CreatePharmacyStockInput } from "gql/graphql";
import Search from "Components/Search";
import { USER_PERMISSION_CAPABILITIES, USER_PERMISSION_FIELDS } from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";

export default function PharmacyStock({ handleUserPermissions }:Readonly<ChildComponentProps>) {
  const [pharmacyStocksList, setPharmacyStocksList] =
    useState<PharmacyStocks>();
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [newPharmacyStockList, setNewPharmacyStockList] =
    useState<CreatePharmacyStockInput>();
  const [searchInput, setSearchInput] = useState("");
  const permission = useAppSelector((state) => state.user.permission);
  /* ====== Pharmacy Stocks List Query ====== */
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

  /* ====== Pharmacy Stocks Pagination Variable ====== */
  useEffect(() => {
    fetchPharmaciesStockList({
      variables: {
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
  }, [activePage, fetchPharmaciesStockList, refetch, searchInput]);

  /* ====== New Pharmacy Stocks Add In The List ====== */
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

  /* ====== Handle Search Function ====== */
  const handleSearch = useDebouncedCallback(async (searchInput: string) => {
    fetchPharmaciesStockList({
      variables: {
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchInput,
      },
    });
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Pharmacy Stocks"
        showBackButton={true}
        showCreateButton={handleUserPermissions(permission,USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,USER_PERMISSION_CAPABILITIES.CREATE)}
        buttonText="Add Pharmacy Stock"
        onClick={open}
      />

      {/* ==== Search ==== */}
      <Search handleChange={handleChange} searchInput={searchInput} />

      {/* ==== Loading State ==== */}
      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {/* ==== PharmacyStocks List Empty List and List ==== */}
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

      {/* ==== Create PharmacyStock Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Create Pharmacy Stock"
        centered
        size={"sm"}
      >
        <PharmacyStockForm
          setNewPharmacyStockList={setNewPharmacyStockList}
          close={close}
          refetchItem={refetch}
          handleUserPermissions={handleUserPermissions}
        />
      </Modal>
    </section>
  );
}

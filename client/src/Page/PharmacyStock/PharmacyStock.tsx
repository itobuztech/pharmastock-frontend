import React, { useEffect, useState } from "react";
import PharmacyStockTable from "./components/PharmacyStockTable";
import PageHeader from "Components/PageHeader";
import { useLazyQuery } from "@apollo/client";
import { PharmacyStocksList } from "query/pharmacyStock/pharmacyStocksList";
import { toast } from "react-toastify";
import {
  ChildComponentProps,
  PharmacyStocks,
  PharmacyStocksLists,
} from "interfaces/interfaces";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import { Flex, LoadingOverlay, Modal, Space } from "@mantine/core";
import PharmacyStockForm from "./components/PharmacyStockForm";
import EmptyList from "Components/EmptyList";
import { CreatePharmacyStockInput } from "gql/graphql";
import Search from "Components/Search";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import StockFilter from "./components/StockFilter";
import PharmacyStockSoldForm from "./components/PharmacyStockSoldForm";

export default function PharmacyStock({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [pharmacyStocksList, setPharmacyStocksList] =
    useState<PharmacyStocks>();
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [newPharmacyStockList, setNewPharmacyStockList] =
    useState<CreatePharmacyStockInput>();
  const [searchInput, setSearchInput] = useState("");
  const permission = useAppSelector((state) => state.user.permission);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [
    StockSoldModalOpened,
    { open: StockSoldModalOpen, close: StockSoldModalClose },
  ] = useDisclosure(false);
  const [pharmacyName, setPharmacyName] = useState<string | undefined>("");
  const [pharmacyId, setPharmacyId] = useState<string | undefined>("");
  const [itemName, setItemName] = useState<string | undefined>("");
  const [itemId, setItemId] = useState<string | undefined>("");

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

  /* ====== Handle Add User Modal Function ====== */
  function handleStockOutModal(pharmacyId: string) {
    const selectItem = pharmacyStocksList?.pharmacyStocks?.find(
      (x) => x.pharmacy.id === pharmacyId
    );
    setPharmacyName(selectItem?.pharmacy.name);
    setPharmacyId(selectItem?.pharmacy.id);
    setItemName(selectItem?.item.name);
    setItemId(selectItem?.item.id);
    StockSoldModalOpen();
  }

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Pharmacy Stocks"
        showBackButton={false}
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.CREATE
        )}
        buttonText="Add Pharmacy Stock"
        onClick={open}
      />

      <Flex wrap="wrap">
        {/* ==== Search ==== */}
        <Search handleChange={handleChange} searchInput={searchInput} />
        <Space w="md" />

        {/* ==== Filter ==== */}
        <StockFilter
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          fetchStockList={fetchPharmaciesStockList}
          activePage={activePage}
        />
      </Flex>

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
          handleStockOutModal={handleStockOutModal}
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

      {/* ==== Create PharmacyStock Sold Out Modal ==== */}
      <PharmacyStockSoldForm
        StockSoldModalOpened={StockSoldModalOpened}
        StockSoldModalClose={StockSoldModalClose}
        pharmacyName={pharmacyName}
        pharmacyId={pharmacyId}
        itemName={itemName}
        itemId={itemId}
        refetchItem={refetch}
        setNewPharmacyStockList={setNewPharmacyStockList}
      />
    </section>
  );
}

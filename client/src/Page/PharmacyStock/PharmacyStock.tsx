import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { Button, Flex, Modal, Space } from "@mantine/core";

import PharmacyStockTable from "./components/PharmacyStockTable";
import PageHeader from "Components/PageHeader";
import { PharmacyStocksList } from "query/pharmacyStock/pharmacyStocksList";
import {
  ChildComponentProps,
  PharmacyStocks,
  PharmacyStocksLists,
} from "interfaces/interfaces";
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
import { SelectedPharmacyStock } from "./pharmacyStock.interface";
import ProductTableSkeleton from "Page/Product/components/ProductTableSkeleton";

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
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);
  const permission = useAppSelector((state) => state.user.permission);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [
    StockSoldModalOpened,
    { open: StockSoldModalOpen, close: StockSoldModalClose },
  ] = useDisclosure(false);

  const [selectedPharmacyStock, setSelectedPharmacyStock] = useState<
    SelectedPharmacyStock[]
  >([]);

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
        searchText: searchKeyword,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, refetch, searchKeyword]);

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

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Pharmacy Stocks"
        showBackButton={false}
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_STAFF,
          USER_PERMISSION_CAPABILITIES.CREATE
        )}
        buttonText="Add Pharmacy Stock"
        onClick={open}
      />

      <Flex wrap="wrap">
        {/* ==== Search ==== */}
        <Search onChange={(e: string) => setSearchKeyword(e)} />
        <Space w="md" />

        {/* ==== Filter ==== */}
        <StockFilter
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          searchInput={searchKeyword}
          setSearchInput={setSearchKeyword}
          fetchStockList={fetchPharmaciesStockList}
          activePage={activePage}
        />

        {handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_STAFF,
          USER_PERMISSION_CAPABILITIES.CREATE
        ) && (
          <Button
            disabled={!selectedPharmacyStock.length}
            ml="auto"
            onClick={() => StockSoldModalOpen()}
          >
            Stock Clearance
          </Button>
        )}
      </Flex>

      {/* ==== Loading State ==== */}
      {loading && <ProductTableSkeleton numOfRows={6} />}

      {/* ==== PharmacyStocks List Empty List and List ==== */}

      {!loading &&
        pharmacyStocksList &&
        pharmacyStocksList?.pharmacyStocks.length > 0 && (
          <PharmacyStockTable
            selectedPharmacyStock={selectedPharmacyStock}
            setSelectedPharmacyStock={setSelectedPharmacyStock}
            activePage={activePage}
            setActivePage={setActivePage}
            totalCount={totalCount}
            pharmaciesStockList={pharmacyStocksList}
            handleUserPermissions={handleUserPermissions}
          />
        )}

      {!loading && pharmacyStocksList?.pharmacyStocks.length === 0 && (
        <EmptyList />
      )}

      {/* ==== Create PharmacyStock Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Create Pharmacy Stock"
        centered
        size="lg"
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
        selectedItems={selectedPharmacyStock}
        StockSoldModalOpened={StockSoldModalOpened}
        StockSoldModalClose={StockSoldModalClose}
        refetchItem={refetch}
        setNewPharmacyStockList={setNewPharmacyStockList}
        setSelectedPharmacyStock={setSelectedPharmacyStock}
      />
    </section>
  );
}

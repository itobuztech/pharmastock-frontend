import { Flex, Modal, Space } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import WarehouseStockForm from "Page/Warehouse/components/WarehouseStockForm";
import {
  ChildComponentProps,
  WarehouseStocks,
  WarehouseStocksData,
} from "interfaces/interfaces";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { GetWarehouseStocks } from "query/warehouse/warehouseStocks";
import WarehouseStockTable from "./components/WarehouseStockTable";
import EmptyList from "Components/EmptyList";
import { CreateWarehouseStockInput } from "gql/graphql";
import useOrganizationList from "Lib/customHooks/useOrganizationList";
import useWarehouseItems from "Lib/customHooks/useWarehouseItems";
import Search from "Components/Search";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import StockFilter from "Page/PharmacyStock/components/StockFilter";
import WarehouseStockSkeleton from "./components/WarehouseStockSkeletopn";

export default function WarehouseStock({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const [warehouseStocksList, setWarehouseStocksList] =
    useState<WarehouseStocks>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const permission = useAppSelector((state) => state.user.permission);
  const selectOrganizationItem = useOrganizationList();
  const selectWarehouseItem = useWarehouseItems();
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);

  const [newWarehouseStockList, setNewWarehouseStockList] =
    useState<CreateWarehouseStockInput>();

  /* ====== Warehouse Stocks List Query ====== */
  const [
    fetchWarehouseStocksList,
    { refetch: refetchWarehouseStockList, loading },
  ] = useLazyQuery<WarehouseStocksData>(GetWarehouseStocks, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: (d) => {
      if (d) {
        const item = d.warehouseStocks;
        const total = d.warehouseStocks.total;
        const paginationCount = Math.ceil(total / 10);
        setWarehouseStocksList(item);
        setTotalCount(paginationCount);
      }
    },
  });

  /* ====== Warehouse Stocks Pagination Variable ====== */
  useEffect(() => {
    fetchWarehouseStocksList({
      variables: {
        filterArgs: {
          endDate: null,
          qty: null,
          startDate: null,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchKeyword,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, searchKeyword]);

  /* ====== New Warehouse Stocks Add In The List ====== */
  useEffect(() => {
    if (newWarehouseStockList) {
      refetchWarehouseStockList().then(({ data }) => {
        if (data) {
          const items = data.warehouseStocks;
          const total = data.warehouseStocks.total;
          const paginationCount = Math.ceil(total / 10);
          setWarehouseStocksList(items);
          setTotalCount(paginationCount);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWarehouseStockList]);

  useEffect(() => {
    refetchWarehouseStockList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Stocks"
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.WAREHOUSE_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.CREATE
        )}
        onClick={open}
        buttonText="Add Warehouse Stock"
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
          fetchStockList={fetchWarehouseStocksList}
          activePage={activePage}
          warehouseList={true}
        />
      </Flex>

      {/* ==== Loading State ==== */}
      {loading && (
        <WarehouseStockSkeleton numOfRows={6} />
      )}

      {/* ==== WarehouseStocks List Empty List and List ==== */}
      

      {!loading &&
        warehouseStocksList &&
        warehouseStocksList.warehouseStocks.length > 0 && (
          <WarehouseStockTable
            activePage={activePage}
            setActivePage={setActivePage}
            totalCount={totalCount}
            warehouseStocksList={warehouseStocksList}
            handleUserPermissions={handleUserPermissions}
          />
        )}

      {!loading && warehouseStocksList?.warehouseStocks.length === 0 && (
        <EmptyList />
      )}

      {/* ==== Create WarehouseStock Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Create Stocks"
        centered
        size={"xl"}
      >
        <WarehouseStockForm
          selectOrgItem={selectOrganizationItem}
          selectWarehouseItem={selectWarehouseItem}
          close={close}
          refetchItem={refetchWarehouseStockList}
          setNewWarehouseStockList={setNewWarehouseStockList}
          list={true}
          handleUserPermissions={handleUserPermissions}
        />
      </Modal>
    </section>
  );
}

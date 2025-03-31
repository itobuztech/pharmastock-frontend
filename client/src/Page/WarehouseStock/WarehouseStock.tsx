import { Flex, Space } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
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
import Search from "Components/Search";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import StockFilter from "Page/PharmacyStock/components/StockFilter";
import WarehouseStockSkeleton from "./components/WarehouseStockSkeleton";
import { useNavigate } from "react-router-dom";
import routes from "Lib/Routes/Routes";

export default function WarehouseStock({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [warehouseStocksList, setWarehouseStocksList] =
    useState<WarehouseStocks>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const permission = useAppSelector((state) => state.user.permission);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);
  const navigate = useNavigate();

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

  useEffect(() => {
    refetchWarehouseStockList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function screenSwitch() {
    navigate(`${routes.dashboard.warehouseStockCreate.path}`);
  }

  return (
    <section className="min-h-screen bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Stocks"
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.WAREHOUSE_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.CREATE
        )}
        onClick={() => screenSwitch()}
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

    </section>
  );
}

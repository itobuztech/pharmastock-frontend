import { useDebouncedState } from "@mantine/hooks";
import { Flex, Space } from "@mantine/core";
import { useState } from "react";

import useGetStocksMovementLot from "./Hooks/useGetStocksMovementLot";
import PageHeader from "Components/PageHeader";
import Search from "Components/Search";
import ProductTableSkeleton from "Page/Product/components/ProductTableSkeleton";
import EmptyList from "Components/EmptyList";
import StocksMovementTable from "./Components/StocksMovementTable";
import StockMovementFilter, { FilterData } from "./Components/StockMovementFilter";
import { ChildComponentProps } from "interfaces/interfaces";

export default function StocksMovementList({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);
  const [filters, setFilters] = useState<FilterData>();

  const {
    loadingStateStockMovement,
    stocksMovementList,
    activePage,
    setActivePage,
    totalCount,
  } = useGetStocksMovementLot({
    searchKeyword: searchKeyword,
    warehouseId: filters?.warehouseId as string,
    transactionType: filters?.transactionType,
    startDate: filters?.startDate,
    endDate: filters?.endDate
  });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Stocks History"
        showBackButton={false}
        showCreateButton={false}
      />

      <Flex wrap="wrap">
        {/* ==== Search ==== */}
        <Search onChange={(e: string) => setSearchKeyword(e)} />
        <Space w="md" />

        {/* ==== Filter ==== */}
        <StockMovementFilter
          setFilterData={setFilters}
          setSearchInput={setSearchKeyword}
        />
      </Flex>

      {/* ==== Loading State ==== */}
      {loadingStateStockMovement && <ProductTableSkeleton numOfRows={6} />}

      {/* ==== PharmacyStocks List Empty List and List ==== */}

      {!loadingStateStockMovement &&
        stocksMovementList &&
        stocksMovementList.stockMovementsLot?.length > 0 && (
          <StocksMovementTable
            activePage={activePage}
            setActivePage={setActivePage}
            totalCount={totalCount}
            stocksMovementList={stocksMovementList}
            handleUserPermissions={handleUserPermissions}
          />
        )}

      {!loadingStateStockMovement &&
        stocksMovementList?.stockMovementsLot.length === 0 && <EmptyList />}
    </section>
  );
}

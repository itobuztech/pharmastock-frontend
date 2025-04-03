import { useDebouncedState } from "@mantine/hooks";
import { Flex, Space } from "@mantine/core";
import { useState } from "react";

import useGetStocksHistorytLot from "./Hooks/useGetStocksHistoryLot";
import PageHeader from "Components/PageHeader";
import Search from "Components/Search";
import EmptyList from "Components/EmptyList";
import StocksHistoryTable from "./Components/StocksHistoryTable";
import StocksHistoryFilter, {
  FilterData,
} from "./Components/StocksHistoryFilter";
import { ChildComponentProps } from "interfaces/interfaces";
import StockHistoryTableSkeleton from "./Components/StockHistoryTableSkeleton";
// StocksHistoryFilter is already imported in the provided context

export default function StocksHistoryList({
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
  } = useGetStocksHistorytLot({
    searchKeyword: searchKeyword,
    warehouseId: filters?.warehouseId as string,
    transactionType: filters?.transactionType,
    startDate: filters?.startDate,
    endDate: filters?.endDate,
  });

  return (
    <section className="min-h-screen bg-opacity-50 py-4 md:py-6 px-4 md:px-8">
      <PageHeader
        title="Stocks History"
        showBackButton={false}
        showCreateButton={false}
      />
      <div className="lg:pt-4">
        <Flex wrap="wrap">
          {/* ==== Search ==== */}
          <Search onChange={(e: string) => setSearchKeyword(e)} />
          <Space w="md" />

          {/* ==== Filter ==== */}
          <StocksHistoryFilter
            setFilterData={setFilters}
            setSearchInput={setSearchKeyword}
          />
        </Flex>
      </div>

      {/* ==== Loading State ==== */}
      {loadingStateStockMovement && <StockHistoryTableSkeleton numOfRows={6} />}

      {/* ==== PharmacyStocks List Empty List and List ==== */}

      {!loadingStateStockMovement &&
        stocksMovementList &&
        stocksMovementList.stockMovementsLot?.length > 0 && (
          <StocksHistoryTable
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

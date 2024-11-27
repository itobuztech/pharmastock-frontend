import { useState } from "react";
import { useDebouncedState } from "@mantine/hooks";

import PageHeader from "Components/PageHeader";
import EmptyList from "Components/EmptyList";
import { ChildComponentProps } from "interfaces/interfaces";
import useGetStocksHistoryDetails from "./Hooks/useGetStocksHistoryDetails";
import StocksMovementDetailsTable from "./Components/StocksHistoryDetailsCard";
import Search from "Components/Search";
import WarehouseStockSkeleton from "Page/WarehouseStock/components/WarehouseStockSkeleton";

export default function StocksHistoryDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);
  const { loadingStateStockMovement, stocksMovementList, setNoOfPage } =
    useGetStocksHistoryDetails({
      currentPage: currentPage,
      searchKeyword: searchKeyword
    });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Stocks History Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <Search onChange={(e: string) => setSearchKeyword(e)} />

      {/* ==== Loading State ==== */}
      {loadingStateStockMovement && (
        <WarehouseStockSkeleton numOfRows={3} />
      )}

      {/* ==== PharmacyStocks List Empty List and List ==== */}

      {!loadingStateStockMovement &&
        stocksMovementList &&
        stocksMovementList.stockMovementsByLotName?.length > 0 && (
          <StocksMovementDetailsTable
            currentPage={currentPage}
            loadingState={loadingStateStockMovement}
            setCurrentPage={setCurrentPage}
            setNoOfPage={setNoOfPage}
            stocksMovementList={stocksMovementList}
            handleUserPermissions={handleUserPermissions}
          />
        )}

      {!loadingStateStockMovement &&
        stocksMovementList?.stockMovementsByLotName?.length === 0 && (
          <EmptyList />
        )}
    </section>
  );
}

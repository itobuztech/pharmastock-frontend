import { useDebouncedState } from "@mantine/hooks";

import PageHeader from "Components/PageHeader";
import Search from "Components/Search";
import ProductTableSkeleton from "Page/Product/components/ProductTableSkeleton";
import EmptyList from "Components/EmptyList";
import { ChildComponentProps } from "interfaces/interfaces";
import useGetStocksMovementDetails from "./Hooks/useGetStocksMovementDetails";
import StocksMovementDetailsTable from "./Components/StockMovementDetailsTable";

export default function StocksMovementDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);

  const {
    loadingStateStockMovement,
    stocksMovementList,
    activePage,
    setActivePage,
    totalCount,
  } = useGetStocksMovementDetails({
    searchKeyword: searchKeyword
  });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Stocks Movement Details"
        showBackButton={true}
        showCreateButton={false}
      />

      <Search onChange={(e: string) => setSearchKeyword(e)} />

      {/* ==== Loading State ==== */}
      {loadingStateStockMovement && <ProductTableSkeleton numOfRows={6} />}

      {/* ==== PharmacyStocks List Empty List and List ==== */}

      {!loadingStateStockMovement &&
        stocksMovementList &&
        stocksMovementList.stockMovementsByLotName?.length > 0 && (
          <StocksMovementDetailsTable
            activePage={activePage}
            setActivePage={setActivePage}
            totalCount={totalCount}
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

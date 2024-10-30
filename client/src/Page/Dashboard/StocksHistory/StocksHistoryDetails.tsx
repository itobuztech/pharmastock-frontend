import PageHeader from "Components/PageHeader";
import EmptyList from "Components/EmptyList";
import { ChildComponentProps } from "interfaces/interfaces";
import useGetStocksHistoryDetails from "./Hooks/useGetStocksHistoryDetails";
import StocksMovementDetailsTable from "./Components/StocksHistoryDetailsCard";
import StockHistoryDetailsCardLoader from "./Components/StocksHistoryDetailsSkeleton";

export default function StocksHistoryDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const {
    loadingStateStockMovement,
    stocksMovementList,
    activePage,
    setActivePage,
    totalCount,
  } = useGetStocksHistoryDetails({});

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Stocks History Details"
        showBackButton={true}
        showCreateButton={false}
      />

      {/* ==== Loading State ==== */}
      {loadingStateStockMovement && <StockHistoryDetailsCardLoader numOfRows={3} />}

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

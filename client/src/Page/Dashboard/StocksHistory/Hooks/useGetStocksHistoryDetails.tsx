import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import appConfig from "Lib/appConfig";
import { stockMovementsByLotName } from "query/stocksMovement/stocksMovementByLotName.query";
import { StockMovement } from "./useGetStocksHistoryLot";

export interface StockMovementsResponse {
  stockMovementsByLotName: StockMovementsByLotName;
}

export interface StockMovementsByLotName {
  stockMovementsByLotName: StockMovement[];
  total: number;
}

export default function useGetStocksHistoryDetails({
  searchKeyword
}: {
  searchKeyword?: string;
}) {
  const params = useParams();
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [stocksMovementList, setStocksMovementList] =
    useState<StockMovementsByLotName>();

  const [getStocksMovementByLotName, { loading: loadingStateStockMovement }] =
    useLazyQuery<StockMovementsResponse>(stockMovementsByLotName, {
      onCompleted: (d) => {
        if (d.stockMovementsByLotName) {
          const paginationCount = Math.ceil(
            d?.stockMovementsByLotName?.total / 10
          );
          setTotalCount(paginationCount);
          setStocksMovementList(d.stockMovementsByLotName);
        }
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  useEffect(() => {
    if (params.lotName) {
      getStocksMovementByLotName({
        variables: {
          paginationArgs: {
            take: appConfig.pagination.defaultPage,
            skip: activePage * 10 - 10,
          },
          searchText: searchKeyword,
          lotStockMovementsInput: {
            lotName: params.lotName,
          },
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, searchKeyword]);

  return {
    loadingStateStockMovement,
    setActivePage,
    totalCount,
    stocksMovementList,
    activePage,
  };
}

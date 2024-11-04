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
  currentPage,
  searchKeyword
}: {
  currentPage: number;
  searchKeyword: string;
}) {
  const params = useParams();
  const [noOfPage, setNoOfPage] = useState(0);
  const [stocksMovementList, setStocksMovementList] =
    useState<StockMovementsByLotName>();

  const skip = (Number(currentPage) - 1) * appConfig.pagination.defaultPage;

  const [getStocksMovementByLotName, { loading: loadingStateStockMovement }] =
    useLazyQuery<StockMovementsResponse>(stockMovementsByLotName, {
      onCompleted: (d) => {
        if (d.stockMovementsByLotName) {
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
            skip: noOfPage | 0,
          },
          lotStockMovementsInput: {
            lotName: params.lotName,
          },
          searchText: searchKeyword
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noOfPage, searchKeyword]);

  useEffect(() => {
    // Adjust skip value if the list length is less than the pageSize
    if (
      stocksMovementList &&
      stocksMovementList?.stockMovementsByLotName.length <
        appConfig.pagination.defaultPage
    ) {
      setNoOfPage(0);
    } else {
      setNoOfPage(skip);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  return {
    loadingStateStockMovement,
    stocksMovementList,
    setNoOfPage,
    noOfPage,
  };
}

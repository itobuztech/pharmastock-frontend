import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";

import { stockMovementsLot } from "query/stocksMovement/stocksMovement.query";
import appConfig from "Lib/appConfig";
import { StockMovementsType } from "gql/graphql";
export interface StockMovement {
  batchName: string;
  createdAt: string;
  expiry: string | null;
  id: string;
  item: string;
  lotName: string;
  organisation: string;
  qty: number;
  totalLotItemsQty: number;
  transactionType: StockMovementsType;
  warehouse: string | null;
  updatedAt: string;
}

export interface PaginatedStockMovementsLot {
  total: number;
  stockMovementsLot: StockMovement[];
}

export interface StockMovementsResponse {
  stockMovementsLot: PaginatedStockMovementsLot;
}

export default function useGetStocksMovementLot({
  searchKeyword,
  warehouseId,
  transactionType,
  startDate,
  endDate,
}: {
  searchKeyword: string;
  warehouseId?: string;
  transactionType?: StockMovementsType | null;
  startDate?: Date | null;
  endDate?: Date | null;
}) {
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [stocksMovementList, setStocksMovementList] =
    useState<PaginatedStockMovementsLot>();

  const [getStocksMovementList, { loading: loadingStateStockMovement }] =
    useLazyQuery<StockMovementsResponse>(stockMovementsLot, {
      onCompleted: (d) => {
        if (d) {
          const paginationCount = Math.ceil(d.stockMovementsLot.total / 10);
          setTotalCount(paginationCount);
          setStocksMovementList(d.stockMovementsLot);
        }
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  useEffect(() => {
    getStocksMovementList({
      variables: {
        paginationArgs: {
          take: appConfig.pagination.defaultPage,
          skip: activePage * 10 - 10,
        },
        filterArgs: {
          endDate: endDate,
          startDate: startDate,
          transactionType: transactionType,
          warehouseId: warehouseId,
        },
        searchText: searchKeyword,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, searchKeyword, endDate, warehouseId, transactionType]);

  return {
    getStocksMovementList,
    loadingStateStockMovement,
    setActivePage,
    totalCount,
    stocksMovementList,
    activePage,
  };
}

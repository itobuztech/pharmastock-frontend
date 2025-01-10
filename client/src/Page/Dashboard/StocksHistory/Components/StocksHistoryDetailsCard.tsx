import React from "react";
import { Space, Table } from "@mantine/core";
import { format, parseISO } from "date-fns";

import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions } from "interfaces/interfaces";
import { StockMovementsByLotName } from "../Hooks/useGetStocksHistoryDetails";
import appConfig from "Lib/appConfig";
import CustomPagination from "Components/CustomPagination/CustomPagination";
import { formatPriceWithComma } from "Page/Product/ProductList";

interface StockMovementDetailsProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setNoOfPage: React.Dispatch<React.SetStateAction<number>>;
  stocksMovementList: StockMovementsByLotName | null | undefined;
  loadingState: boolean;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function StocksHistoryDetailsCards({
  setCurrentPage,
  stocksMovementList,
  loadingState,
  setNoOfPage,
  currentPage,
}: Readonly<StockMovementDetailsProps>) {
  const rows =
    stocksMovementList &&
    stocksMovementList?.stockMovementsByLotName?.map((item, i) => {
      return (
        <Table.Tr key={item.id}>
          <Table.Td className="pl-8">{item.item}</Table.Td>
          <Table.Td>{item.organisation}</Table.Td>

          <Table.Td>{item.warehouse ?? "N/A"}</Table.Td>
          <Table.Td>{item.pharmacy ?? "N/A"}</Table.Td>
          <Table.Td>{item.pharmacyClearance ?? "N/A"}</Table.Td>
          <Table.Td>{item.batchName}</Table.Td>
          <Table.Td>{formatPriceWithComma(item.qty)}</Table.Td>
          <Table.Td>
            {item?.expiry
              ? format(parseISO(item?.expiry as string), appConfig.dateFormat)
              : "N/A"}
          </Table.Td>

          <Table.Td>{item.transactionType}</Table.Td>
          <Table.Td>{item.totalLotItemsQty}</Table.Td>
        </Table.Tr>
      );
    });

  return (
    <div>
      <div className="bg-white overflow-auto">
        <Table
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[800px] md:w-[1000px] lg:w-full"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="pl-8">Product</Table.Th>
              <Table.Th>Organisation</Table.Th>
              <Table.Th>Warehouse</Table.Th>
              <Table.Th>Pharmacy</Table.Th>
              <Table.Th>Pharmacy Clearance</Table.Th>
              <Table.Th>Batch Name</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Expiry Date</Table.Th>

              <Table.Th>Transaction Type</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Space h="md" />
      </div>
      <CustomPagination
        loadingState={loadingState}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setNoOfPage={setNoOfPage}
        listItem={stocksMovementList}
      />

      <Space h="md" />
    </div>
  );
}

import React from "react";
import { Flex, Pagination, Space, Table } from "@mantine/core";
import { format, parseISO } from "date-fns";

import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions } from "interfaces/interfaces";
import { StockMovementsByLotName } from "../Hooks/useGetStocksMovementDetails";

interface StockMovementDetailsProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  stocksMovementList: StockMovementsByLotName | null | undefined;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function StocksMovementDetailsTable({
  activePage,
  setActivePage,
  totalCount,
  stocksMovementList,
}: Readonly<StockMovementDetailsProps>) {
  const rows =
    stocksMovementList &&
    stocksMovementList?.stockMovementsByLotName?.map((item, i) => {
      return (
        <Table.Tr key={item.id}>
          <Table.Td>
            {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
          </Table.Td>
          <Table.Td>{format(parseISO(item.updatedAt), "MM/dd/yyyy")}</Table.Td>
          <Table.Td>{item.batchName}</Table.Td>
          <Table.Td>{item.item}</Table.Td>
          <Table.Td>{item.organisation}</Table.Td>
          <Table.Td>{item.warehouse ?? "N/A"}</Table.Td>
          <Table.Td>{item.organisation}</Table.Td>
          <Table.Td>{item.organisation}</Table.Td>
          <Table.Td className="capitalize">{item.transactionType}</Table.Td>
          <Table.Td>{item.qty}</Table.Td>
        </Table.Tr>
      );
    });

  return (
    <div className="bg-white overflow-auto">
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        className="w-[800px] md:w-[1000px] lg:w-full"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sl No.</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Batch Name</Table.Th>
            <Table.Th>Product</Table.Th>
            <Table.Th>Organisation</Table.Th>
            <Table.Th>Warehouse</Table.Th>
            <Table.Th>Pharmacy</Table.Th>
            <Table.Th>Pharmacy Clearance</Table.Th>
            <Table.Th>Transaction Type</Table.Th>
            <Table.Th>Qty</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Space h="md" />
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Pagination
          total={totalCount}
          value={activePage}
          onChange={setActivePage}
          mt="sm"
        />
      </Flex>
      <Space h="md" />
    </div>
  );
}

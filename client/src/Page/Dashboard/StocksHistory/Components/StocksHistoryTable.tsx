import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Pagination, Space, Table } from "@mantine/core";
import { format, parseISO } from "date-fns";

import routes from "Lib/Routes/Routes";
import { PaginatedStockMovementsLot } from "../Hooks/useGetStocksHistoryLot";
import ActionPopover from "Components/ActionPopover";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions } from "interfaces/interfaces";
import appConfig from "Lib/appConfig";
import { formatPriceWithComma } from "Page/Product/ProductList";

interface StocksMovementTableProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  stocksMovementList: PaginatedStockMovementsLot | null | undefined;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function StocksHistoryTable({
  activePage,
  setActivePage,
  totalCount,
  stocksMovementList,
  handleUserPermissions,
}: Readonly<StocksMovementTableProps>) {
  const navigate = useNavigate();

  function screenSwitch(lotName: string) {
    navigate(`${routes.dashboard.stocksHistory.path}/${lotName}`);
  }

  const rows =
    stocksMovementList &&
    stocksMovementList?.stockMovementsLot?.map((item, i) => {
      return (
        <Table.Tr key={item.id}>
          <Table.Td className="pl-8">
            {format(parseISO(item.updatedAt), appConfig.dateFormat)}
          </Table.Td>
          <Table.Td>{item.lotName}</Table.Td>
          <Table.Td>{item.item}</Table.Td>
          <Table.Td>{item.warehouse ?? "N/A"}</Table.Td>
          <Table.Td>{item.organisation}</Table.Td>
          <Table.Td>{item.transactionType}</Table.Td>
          <Table.Td>{formatPriceWithComma(item.totalLotItemsQty)}</Table.Td>
          <Table.Td className="text-right">
            <ActionPopover
              handleView={() => screenSwitch(item.lotName)}
              showDeleteModal={false}
              handleUserPermissions={handleUserPermissions}
            />
          </Table.Td>
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
              <Table.Th className="pl-8">Date</Table.Th>
              <Table.Th>Lot Name</Table.Th>
              <Table.Th>Product</Table.Th>
              <Table.Th>Warehouse</Table.Th>
              <Table.Th>Organisation</Table.Th>
              <Table.Th>Transaction Type</Table.Th>
              <Table.Th>Total Lot Item Qty</Table.Th>

              <Table.Th className="text-right pr-8">Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Space h="md" />
      </div>
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
          mt="lg"
        />
      </Flex>
      <Space h="md" />
    </div>
  );
}

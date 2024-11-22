import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import { format, parseISO } from "date-fns";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions, WarehouseStocks } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import React from "react";
import { useNavigate } from "react-router-dom";

interface WarehouseStockTableProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  warehouseStocksList?: WarehouseStocks;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function WarehouseStockTable({
  activePage,
  setActivePage,
  warehouseStocksList,
  totalCount,
  handleUserPermissions,
}: Readonly<WarehouseStockTableProps>) {
  const navigate = useNavigate();

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.warehouseStock.path}/${id}`);
  }

  const rows = warehouseStocksList?.warehouseStocks.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{format(parseISO(item.createdAt), "MM/dd/yyyy")}</Table.Td>
      <Table.Td>{item.item.name}</Table.Td>
      <Table.Td>{item.warehouse.name}</Table.Td>
      <Table.Td>{item.finalQty}</Table.Td>
      <Table.Td>{item.currency} {item.totalWholesalePrice}</Table.Td>
      <Table.Td>{item.currency} {item.totalMrpBaseUnit}</Table.Td>
      <Table.Td>{item.SKU.sku}</Table.Td>
      <Table.Td className="text-right">
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          showDeleteModal={false}
          handleUserPermissions={handleUserPermissions}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white overflow-auto">
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        className="w-[700px] md:w-[1000px] lg:w-full"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sl No.</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Product</Table.Th>
            <Table.Th>Warehouse</Table.Th>
            <Table.Th>Qty</Table.Th>
            <Table.Th>Total Wholesale Price</Table.Th>
            <Table.Th>Total MRP BaseUnit</Table.Th>
            <Table.Th>SKU</Table.Th>
            <Table.Th className="text-right pr-8">Action</Table.Th>
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

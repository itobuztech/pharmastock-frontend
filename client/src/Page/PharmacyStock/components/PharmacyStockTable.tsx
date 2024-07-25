import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import { format, parseISO } from "date-fns";
import { PharmacyStocks } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PharmacyStockTable({
  activePage,
  setActivePage,
  pharmaciesStockList,
  totalCount,
}: {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  pharmaciesStockList?: PharmacyStocks;
  totalCount: number;
}) {
  const navigate = useNavigate();

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.pharmaciesStock.path}/${id}`);
  }

  const rows = pharmaciesStockList?.pharmacyStocks.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{format(parseISO(item.updatedAt), "MM/dd/yyyy")}</Table.Td>
      <Table.Td>{item.warehouse.name}</Table.Td>
      <Table.Td>{item.pharmacy.name}</Table.Td>
      <Table.Td>{item.item.name}</Table.Td>
      <Table.Td>{item.finalQty}</Table.Td>
      <Table.Td className="text-right">
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          showDeleteModal={false}
        />
      </Table.Td>
    </Table.Tr>
  ));

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
            <Table.Th>Warehouse</Table.Th>
            <Table.Th>Pharmacy</Table.Th>
            <Table.Th>Item</Table.Th>
            <Table.Th>Qty</Table.Th>
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
        {
          <Pagination
            total={totalCount}
            value={activePage}
            onChange={setActivePage}
            mt="sm"
          />
        }
      </Flex>
      <Space h="md" />
    </div>
  );
}

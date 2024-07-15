import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import { Items } from "interfaces/interfaces";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ItemTable({
  activePage,
  itemList,
  handleDelete,
  totalCount,
  setActivePage,
}: {
  activePage: number;
  itemList: Items | undefined;
  handleDelete: (itemId: string) => void;
  totalCount: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navigate = useNavigate();

  function screenSwitch(itemId: string) {
    navigate(`/dashboard/items/${itemId}`);
  }

  const rows = itemList?.items.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      {/* <Table.Td></Table.Td> */}
      <Table.Td>{item.baseUnit}</Table.Td>
      <Table.Td>{item.hsnCode}</Table.Td>
      <Table.Td>{item.instructions}</Table.Td>
      <Table.Td>{item.wholesalePrice}</Table.Td>
      <Table.Td>{item.mrpBaseUnit}</Table.Td>
      <Table.Td>
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          handleDelete={() => handleDelete(item.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white">
      <Table horizontalSpacing="md" verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sl No.</Table.Th>
            {/* <Table.Th>Name</Table.Th> */}
            <Table.Th>Base Unit</Table.Th>
            <Table.Th>HSN Code</Table.Th>
            <Table.Th>Instructions</Table.Th>
            <Table.Th>Wholesale Price</Table.Th>
            <Table.Th>MRP Base unit</Table.Th>
            <Table.Th>Action</Table.Th>
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

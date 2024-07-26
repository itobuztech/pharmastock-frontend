import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import { ItemCategories } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ItemCategoryTable({
  activePage,
  setActivePage,
  itemCategoryList,
  handleDelete,
  totalCount,
}: {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  itemCategoryList?: ItemCategories;
  handleDelete: (id: string) => void;
  totalCount: number;
}) {
  const navigate = useNavigate();

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.createItemCategory.path}/${id}`);
  }

  const rows = itemCategoryList?.itemCategories.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.Item?.length}</Table.Td>
      <Table.Td>23</Table.Td>
      <Table.Td className="text-right">
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          handleDelete={() => handleDelete(item.id)}
          showDeleteModal={true}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="bg-white overflow-auto">
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        className="w-[700px] md:w-[900px] lg:w-full"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sl No.</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Items</Table.Th>
            <Table.Th>Stock</Table.Th>
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

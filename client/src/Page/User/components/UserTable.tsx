import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import { Users } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserTable({
  activePage,
  setActivePage,
  userList,
  totalCount,
}: {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userList?: Users;
  totalCount: number;
}) {
  const navigate = useNavigate();

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.users.path}/${id}`);
  }

  const rows = userList?.users?.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{item.username}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.email}</Table.Td>
      <Table.Td>{item.organization?.name}</Table.Td>
      <Table.Td className="text-right">
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          handleDelete={() => console.log(item.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className=" bg-white overflow-auto">
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        className="w-[600px] md:w-[800px] lg:w-full"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sl No.</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Organization Name</Table.Th>
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

import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions, Users } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import { useAppSelector } from "Lib/Store/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

interface UserTableProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userList?: Users;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
  handleDelete: (id: string) => void;
  showDeleteButton: boolean;
}

export default function UserTable({
  activePage,
  setActivePage,
  userList,
  totalCount,
  handleUserPermissions,
  handleDelete,
  showDeleteButton,
}: Readonly<UserTableProps>) {
  const navigate = useNavigate();

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.users.path}/${id}`);
  }

  const user = useAppSelector((state) => state.user.currentUser);

  const rows = userList?.users?.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td className="pl-8">{item.username ?? "N/A"}</Table.Td>
      <Table.Td>{item.name ?? "N/A"}</Table.Td>
      <Table.Td>{item.email ?? "N/A"}</Table.Td>
      <Table.Td>{item.organization?.name ?? "N/A"}</Table.Td>
      <Table.Td>{item.role.userType ?? "N/A"}</Table.Td>
      <Table.Td className="text-right">
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          handleDelete={() => handleDelete(item.id)}
          showDeleteModal={true}
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={showDeleteButton && user?.id !== item.id}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <div className="custom-shadow rounded-lg overflow-auto">
        <Table
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[600px] md:w-[800px] lg:w-full"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="pl-8">Username</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Organization Name</Table.Th>
              <Table.Th>Role</Table.Th>
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
          {
            <Pagination
              total={totalCount}
              value={activePage}
              onChange={setActivePage}
              mt="lg"
            />
          }
        </Flex>
        <Space h="md" />
    </div>
  );
}

import React from "react";
import {
  Flex,
  Pagination,
  ScrollArea,
  Space,
  Table,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { OrganizationList, Permissions } from "interfaces/interfaces";
import ActionPopover from "Components/ActionPopover";
import routes from "Lib/Routes/Routes";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
interface OrganizationTableProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  organizationList?: OrganizationList["organizations"];
  handleDelete: (id: string) => void;
  handleUserModal(id: string): void;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
  showDeleteButton?: boolean;
}

export default function OrganizationTable({
  activePage,
  setActivePage,
  organizationList,
  handleDelete,
  handleUserModal,
  totalCount,
  handleUserPermissions,
  showDeleteButton,
}: Readonly<OrganizationTableProps>) {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.organizations.path}/${id}`);
  }

  const rows = organizationList?.organizations?.map((org) => (
    <Table.Tr key={org.id} className=" hover:bg-gray-100">
      <Table.Td className="pl-8 py-4 border-b">{org.name}</Table.Td>
      <Table.Td className="w-auto lg:w-2/5 py-4 border-b">
        {org.description}
      </Table.Td>
      <Table.Td className="py-4 border-b">{org.city}</Table.Td>
      <Table.Td className="py-4 border-b">{org.address}</Table.Td>
      <Table.Td className="text-right py-4 border-b">
        <ActionPopover
          handleView={() => screenSwitch(org.id)}
          handleDelete={() => handleDelete(org.id)}
          handleUserModal={() => handleUserModal(org.id)}
          showUserModal={true}
          showDeleteModal={true}
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={showDeleteButton}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div
      className="rounded-lg overflow-hidden border custom-shadow"
      style={{
        borderColor: theme.colors.gray[4],
        backgroundColor: isDarkMode ? theme.colors.dark[7] : theme.white,
      }}
    >
      <ScrollArea>
        <Table className="min-w-[700px] w-full">
          <Table.Thead
            className="sticky top-0 z-10 shadow-sm"
            style={{
              backgroundColor: isDarkMode
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            }}
          >
            <Table.Tr>
              <Table.Th className="pl-8 py-3 text-left border-b font-semibold uppercase">
                Name
              </Table.Th>
              <Table.Th className="py-3 text-left border-b font-semibold uppercase">
                Description
              </Table.Th>
              <Table.Th className="py-3 text-left border-b font-semibold uppercase">
                City
              </Table.Th>
              <Table.Th
                className="py-3 text-left border-b font-semibold uppercase"
              >
                Address
              </Table.Th>
              <Table.Th className="text-right pr-8 py-3 border-b font-semibold uppercase">
                Action
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <Space h="md" />
      <Flex className="min-h-[50px] gap-4 justify-center items-center flex-wrap mt-4">
        <Pagination
          total={totalCount}
          value={activePage}
          onChange={setActivePage}
          style={{
            color: isDarkMode ? theme.colors.gray[2] : theme.colors.dark[7],
          }}
        />
      </Flex>
      <Space h="md" />
    </div>
  );
}

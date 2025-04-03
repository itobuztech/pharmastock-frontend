import React from "react";
import {
  Box,
  Flex,
  Pagination,
  Paper,
  ScrollArea,
  Space,
  Table,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { OrganizationList, Permissions } from "interfaces/interfaces";
import ActionPopover from "Components/ActionPopover";
import routes from "Lib/Routes/Routes";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { tableStyles } from "Lib/Styles/tableStyles";
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
  const { classes } = tableStyles();

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.organizations.path}/${id}`);
  }

  const rows = organizationList?.organizations?.map((org) => (
    <Table.Tr key={org.id} className={classes.rowHover}>
      <Table.Td className={`pl-8 py-4`}>{org.name}</Table.Td>
      <Table.Td className={`w-auto lg:w-2/5 py-4`}>{org.description}</Table.Td>
      <Table.Td className={`py-4`}>{org.city}</Table.Td>
      <Table.Td className={`py-4`}>{org.address}</Table.Td>
      <Table.Td className="text-right py-4">
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
    <Box>
      <Paper
        withBorder
        radius="md"
        className={`${classes.container} overflow-hidden custom-shadow`}
      >
        <ScrollArea>
          <Table
            stickyHeader
            withRowBorders
            horizontalSpacing="md"
            verticalSpacing="md"
            className="min-w-[700px] w-full"
          >
            <Table.Thead
              className={`sticky top-0 z-10 shadow-sm ${classes.tableHeader}`}
            >
              <Table.Tr>
                <Table.Th className="pl-8 py-3 text-left font-semibold uppercase">
                  Name
                </Table.Th>
                <Table.Th className="py-3 text-left font-semibold uppercase">
                  Description
                </Table.Th>
                <Table.Th className="py-3 text-left font-semibold uppercase">
                  City
                </Table.Th>
                <Table.Th className="py-3 text-left font-semibold uppercase">
                  Address
                </Table.Th>
                <Table.Th className="text-right pr-8 py-3 font-semibold uppercase">
                  Action
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>

      <Space h="md" />
      <Flex className="min-h-[50px] gap-4 justify-center items-center flex-wrap">
        <Pagination
          total={totalCount}
          value={activePage}
          onChange={setActivePage}
          className={classes.pagination}
        />
      </Flex>
      <Space h="md" />
    </Box>
  );
}

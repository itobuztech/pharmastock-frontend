import { Flex, Pagination, Paper, Space, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import React from "react";

import ActionPopover from "Components/ActionPopover";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions, Warehouses } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import { tableStyles } from "Lib/Styles/tableStyles";
interface WarehouseListTableProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  warehouseList?: Warehouses;
  handleDelete: (id: string) => void;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
  showDeleteButton: boolean;
}

export default function WarehouseListTable({
  activePage,
  setActivePage,
  warehouseList,
  handleDelete,
  totalCount,
  handleUserPermissions,
  showDeleteButton,
}: Readonly<WarehouseListTableProps>) {
  const navigate = useNavigate();
  const { classes } = tableStyles();

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.warehouseList.path}/${id}`);
  }

  const rows = warehouseList?.warehouses.map((item) => (
    <Table.Tr key={item.id} className={classes.rowHover}>
      <Table.Td className="pl-8">{item?.name ?? "N/A"}</Table.Td>
      <Table.Td>{item?.location ?? "N/A"}</Table.Td>
      <Table.Td>{item?.area ?? "N/A"}</Table.Td>
      <Table.Td>{item?.organization?.name ?? "N/A"}</Table.Td>
      <Table.Td className="text-right">
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          handleDelete={() => handleDelete(item.id)}
          showDeleteModal={true}
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={showDeleteButton}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Paper
        withBorder
        radius="md"
        className={`${classes.container} overflow-hidden custom-shadow`}
      >
        <Table
          withRowBorders
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[700px] md:w-[1000px] lg:w-full"
        >
          <Table.Thead className={classes.tableHeader}>
            <Table.Tr>
              <Table.Th className="pl-8">Name</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Area</Table.Th>
              <Table.Th>Organization</Table.Th>
              <Table.Th className="text-right pr-8">Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
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
          className={classes.pagination}
        />
      </Flex>
      <Space h="md" />
    </div>
  );
}

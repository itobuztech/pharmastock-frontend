import { Flex, Pagination, Space, Table } from "@mantine/core";
import { OrganizationList, Permissions } from "interfaces/interfaces";
import React from "react";
import ActionPopover from "Components/ActionPopover";
import { useNavigate } from "react-router-dom";
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

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.organizations.path}/${id}`);
  }

  const rows = organizationList?.organizations?.map((org, i) => (
    <Table.Tr key={org.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{org.name}</Table.Td>
      <Table.Td className="w-auto lg:w-2/5">{org.description}</Table.Td>
      <Table.Td>{org.city}</Table.Td>
      <Table.Td>{org.address}</Table.Td>
      <Table.Td className="text-right">
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
    <div>
      <div className=" bg-white overflow-auto">
        <Table
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[600px] md:w-[800px] lg:w-full"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Sl No.</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>City</Table.Th>
              <Table.Th>Address</Table.Th>
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

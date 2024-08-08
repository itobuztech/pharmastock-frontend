import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions, Pharmacies } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import React from "react";
import { useNavigate } from "react-router-dom";

interface PharmacyTableProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  pharmacyList?: Pharmacies["pharmacies"];
  handleDelete: (id: string) => void;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
  showDeleteButton?: boolean;
}

export default function PharmacyTable({
  activePage,
  setActivePage,
  pharmacyList,
  handleDelete,
  totalCount,
  handleUserPermissions,
  showDeleteButton,
}: Readonly<PharmacyTableProps>) {
  const navigate = useNavigate();

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.pharmacies.path}/${id}`);
  }

  const rows = pharmacyList?.pharmacies.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.location}</Table.Td>
      <Table.Td>{item.contactInfo}</Table.Td>
      <Table.Td>{item.organization?.name}</Table.Td>
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
    <div className="bg-white overflow-auto">
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        className="w-[800px] md:w-[1000px] lg:w-full"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sl No.</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Contact</Table.Th>
            <Table.Th>Organization</Table.Th>
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

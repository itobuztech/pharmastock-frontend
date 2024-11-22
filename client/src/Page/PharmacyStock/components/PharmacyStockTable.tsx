import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Pagination, Space, Table } from "@mantine/core";
import { format, parseISO } from "date-fns";

import ActionPopover from "Components/ActionPopover";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions, PharmacyStocks } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import { SelectedPharmacyStock } from "../pharmacyStock.interface";
import { useAppSelector } from "Lib/Store/hooks";
import { UserRole } from "gql/graphql";
interface PharmacyStockTableProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  pharmaciesStockList?: PharmacyStocks;
  totalCount: number;
  selectedPharmacyStock: SelectedPharmacyStock[];
  setSelectedPharmacyStock: React.Dispatch<
    React.SetStateAction<SelectedPharmacyStock[]>
  >;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function PharmacyStockTable({
  activePage,
  setActivePage,
  pharmaciesStockList,
  totalCount,
  handleUserPermissions,
}: Readonly<PharmacyStockTableProps>) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.pharmaciesStock.path}/${id}`);
  }

  const rows = pharmaciesStockList?.pharmacyStocks?.map((item, i) => {
    return (
      <Table.Tr key={item.id}>
        <Table.Td>{i + 1}</Table.Td>
        <Table.Td>{format(parseISO(item.updatedAt), "MM/dd/yyyy")}</Table.Td>
        <Table.Td>{item.item.name}</Table.Td>
        <Table.Td>{item.pharmacy.name}</Table.Td>
        <Table.Td>{item.finalQty}</Table.Td>
        {user.role !== UserRole.Staff && (
          <Table.Td className="text-right">
            <ActionPopover
              handleView={() => screenSwitch(item.id)}
              showDeleteModal={false}
              handleUserPermissions={handleUserPermissions}
            />
          </Table.Td>
        )}
      </Table.Tr>
    );
  });

  return (
    <div>
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
              <Table.Th>Product</Table.Th>
              <Table.Th>Pharmacy</Table.Th>
              <Table.Th>Qty</Table.Th>
              {user.role !== UserRole.Staff && (
                <Table.Th className="text-right pr-8">Action</Table.Th>
              )}
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
        <Pagination
          total={totalCount}
          value={activePage}
          onChange={setActivePage}
          mt="lg"
        />
      </Flex>
      <Space h="md" />
    </div>
  );
}

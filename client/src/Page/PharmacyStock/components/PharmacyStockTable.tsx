import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, Flex, Pagination, Space, Table } from "@mantine/core";
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
  selectedPharmacyStock,
  setSelectedPharmacyStock,
}: Readonly<PharmacyStockTableProps>) {
  const navigate = useNavigate();
  const permission = useAppSelector((state) => state.user.permission);
  const user = useAppSelector((state) => state.user);
  const params = useParams();

  const handlePharmacyStockClearance = (
    pharmacyId: string,
    itemId: string,
    pharmacyName: string,
    itemName: string,
    checked: boolean
  ) => {
    setSelectedPharmacyStock((prevSelectedItems) => {
      if (checked) {
        return [
          ...prevSelectedItems,
          { pharmacyId, itemId, pharmacyName, itemName },
        ];
      } else {
        return prevSelectedItems.filter(
          (item) => !(item.pharmacyId === pharmacyId && item.itemId === itemId)
        );
      }
    });
  };

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.pharmaciesStock.path}/${id}`);
  }

  const rows = pharmaciesStockList?.pharmacyStocks?.map((item, i) => {
    const isChecked = selectedPharmacyStock?.some(
      (selectedItem) =>
        selectedItem.pharmacyId === item.pharmacy.id &&
        selectedItem.itemId === item.item.id
    );
    const isQtyAbsent = !item.finalQty || item.finalQty <= 0;

    return (
      <Table.Tr key={item.id}>
        {(handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_STAFF,
          USER_PERMISSION_CAPABILITIES.CREATE
        ) && !params.id) && (
          <Table.Td>
            <Checkbox
              checked={isChecked}
              disabled={isQtyAbsent}
              onChange={(e) => {
                handlePharmacyStockClearance(
                  item.pharmacy.id,
                  item.item.id,
                  item?.pharmacy?.name,
                  item?.item?.name,
                  e.target.checked
                );
              }}
            />
          </Table.Td>
        )}
        <Table.Td>
          {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
        </Table.Td>
        <Table.Td>{format(parseISO(item.updatedAt), "MM/dd/yyyy")}</Table.Td>
        <Table.Td>{item.item.name}</Table.Td>
        <Table.Td>{item.pharmacy.name}</Table.Td>
        <Table.Td>{item.finalQty}</Table.Td>
       
          <Table.Td className="text-right">
            <ActionPopover
              handleView={() => screenSwitch(item.id)}
              showDeleteModal={false}
              handleUserPermissions={handleUserPermissions}
            />
          </Table.Td>
      
      </Table.Tr>
    );
  });

  return (
    <div className="bg-white overflow-auto">
      <Table
        horizontalSpacing="md"
        verticalSpacing="md"
        className="w-[800px] md:w-[1000px] lg:w-full"
      >
        <Table.Thead>
          <Table.Tr>
            {handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_STAFF,
              USER_PERMISSION_CAPABILITIES.CREATE
            ) && <Table.Th></Table.Th>}
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

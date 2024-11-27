import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { UserRole } from "gql/graphql";
import { Items, Permissions } from "interfaces/interfaces";
import { CurrencyType, getCurrencySymbol } from "Lib/getCurrencySymbol";
import routes from "Lib/Routes/Routes";
import { useAppSelector } from "Lib/Store/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPriceWithComma } from "../ProductList";

interface ItemTableProps {
  activePage: number;
  itemList: Items | undefined;
  handleDelete: (itemId: string) => void;
  totalCount: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
  showDeleteButton?: boolean;
}

export default function ProductTable({
  activePage,
  itemList,
  handleDelete,
  totalCount,
  setActivePage,
  handleUserPermissions,
  showDeleteButton,
}: Readonly<ItemTableProps>) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.role);

  function screenSwitch(itemId: string) {
    navigate(`${routes.dashboard.productList.path}/${itemId}`);
  }

  const rows = itemList?.items.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.baseUnit}</Table.Td>
      <Table.Td>{item.hsnCode}</Table.Td>
      <Table.Td>
        {item.instructions === "null" ? "N/A" : item.instructions || "N/A"}
      </Table.Td>
      <Table.Td>
        {getCurrencySymbol(item.currency as CurrencyType)}
        {formatPriceWithComma(item.wholesalePrice)}
      </Table.Td>
      <Table.Td>
        {getCurrencySymbol(item.currency as CurrencyType)}
        {formatPriceWithComma(item.mrpBaseUnit)}
      </Table.Td>
      <Table.Td className="text-right">
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          handleDelete={() => handleDelete(item.id)}
          showDeleteModal={user === UserRole.Superadmin ? true : false}
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={showDeleteButton}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <div className="bg-white overflow-auto">
        <Table
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[900px] md:w-[1000px] lg:w-full"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Sl No.</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Base Unit</Table.Th>
              <Table.Th>HSN Code</Table.Th>
              <Table.Th>Instructions</Table.Th>
              <Table.Th>Wholesale Price</Table.Th>
              <Table.Th>MRP Base unit</Table.Th>
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

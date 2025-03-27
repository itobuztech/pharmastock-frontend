import { Flex, Pagination, Space, Table } from "@mantine/core";
import ActionPopover from "Components/ActionPopover";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { UserRole } from "gql/graphql";
import { ItemCategories, Permissions } from "interfaces/interfaces";
import routes from "Lib/Routes/Routes";
import { useAppSelector } from "Lib/Store/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ItemCategoryTableProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  itemCategoryList?: ItemCategories;
  handleDelete: (id: string) => void;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
  showDeleteButton?: boolean;
}

export default function CategoryTable({
  activePage,
  setActivePage,
  itemCategoryList,
  handleDelete,
  totalCount,
  handleUserPermissions,
  showDeleteButton,
}: Readonly<ItemCategoryTableProps>) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.role);

  function screenSwitch(id: string) {
    navigate(`${routes.dashboard.createCategory.path}/${id}`);
  }

  const rows = itemCategoryList?.itemCategories.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td className="pl-8">{item.name}</Table.Td>
      <Table.Td>{item.Item?.length}</Table.Td>
      <Table.Td className="text-right">
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          handleDelete={() => handleDelete(item.id)}
          showDeleteModal={user === UserRole.Superadmin ? true : false}
          handleUserPermissions={(
            permission,
            requiredPermission,
            requiredCapability
          ) =>
            handleUserPermissions(
              permission,
              requiredPermission,
              requiredCapability
            )
          }
          requiredPermission={USER_PERMISSION_FIELDS.ITEM_CATEGORIES_MANAGEMENT}
          requiredCapability={USER_PERMISSION_CAPABILITIES.VIEW}
          showDeleteButton={showDeleteButton}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <div className="overflow-auto custom-shadow rounded-lg">
        <Table
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[700px] md:w-[900px] lg:w-full"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="pl-8">Name</Table.Th>
              <Table.Th>Products</Table.Th>
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

import React from "react";
import { Button, Popover } from "@mantine/core";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import { Permissions } from "interfaces/interfaces";

interface ActionPopoverProps {
  handleView: () => void;
  handleDelete?: () => void;
  handleUserModal?: () => void;
  handleStockOutModal?: () => void;
  showUserModal?: boolean;
  showDeleteModal?: boolean;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function ActionPopover({
  handleView,
  handleDelete,
  handleUserModal,
  handleStockOutModal,
  showUserModal,
  showDeleteModal,
  handleUserPermissions,
}: Readonly<ActionPopoverProps>) {
  const permission = useAppSelector((state) => state.user.permission);

  return (
    <Popover width={200} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Button variant="transparent">
          <BiDotsHorizontalRounded size={24} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        {handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.VIEW
        ) && (
          <Button
            variant="transparent"
            fullWidth
            onClick={handleView}
            className="hover:bg-blue-100 transition-colors text-black"
          >
            View
          </Button>
        )}

        {showUserModal &&
          handleUserPermissions(
            permission,
            USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
            USER_PERMISSION_CAPABILITIES.CREATE
          ) && (
            <Button
              variant="transparent"
              fullWidth
              onClick={handleUserModal}
              className="hover:bg-blue-100 transition-colors text-black"
            >
              Add User
            </Button>
          )}

        {showDeleteModal &&
          handleUserPermissions(
            permission,
            USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
            USER_PERMISSION_CAPABILITIES.DELETE
          ) && (
            <Button
              variant="transparent"
              fullWidth
              onClick={handleDelete}
              className="hover:bg-red-100 transition-colors text-black hover:text-red-700"
            >
              Delete
            </Button>
          )}

        {handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.STOCK_MANAGEMENT_STAFF,
          USER_PERMISSION_CAPABILITIES.CREATE
        ) && (
          <Button
            variant="transparent"
            fullWidth
            onClick={handleStockOutModal}
            className="hover:bg-blue-100 transition-colors text-black"
          >
            Stock Sold Out
          </Button>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}

import { Button, Popover } from "@mantine/core";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import { Permissions } from "interfaces/interfaces";
import { UserRole } from "gql/graphql";
interface ActionPopoverProps {
  handleView: () => void;
  handleDelete?: () => void;
  handleUserModal?: () => void;
  handleStockOutModal?: () => void;
  showUserModal?: boolean;
  showDeleteModal?: boolean;
  showDeleteButton?: boolean;
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
  showDeleteButton,
  handleUserPermissions,
}: Readonly<ActionPopoverProps>) {
  const permission = useAppSelector((state) => state.user.permission);
  const user = useAppSelector((state) => state.user);

  return (
    <Popover width={200} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Button variant="transparent">
          <BiDotsHorizontalRounded size={24} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        {(handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.VIEW
        ) ||
          user.role === UserRole.Staff) && (
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

        {showDeleteModal && showDeleteButton && (
          <Button
            variant="transparent"
            fullWidth
            onClick={handleDelete}
            className="hover:bg-red-100 transition-colors text-black hover:text-red-700"
          >
            Delete
          </Button>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}

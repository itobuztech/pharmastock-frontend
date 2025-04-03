import { Button, Popover } from "@mantine/core";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import { Permissions } from "interfaces/interfaces";
import { UserRole } from "gql/graphql";
import { createStyles } from "@mantine/emotion";
interface ActionPopoverProps {
  handleView: () => void;
  handleDelete?: () => void;
  handleUserModal?: () => void;
  handleStockOutModal?: () => void;
  showUserModal?: boolean;
  showDeleteModal?: boolean;
  showDeleteButton?: boolean;
  handleUserPermissions?: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

const popoverStyles = createStyles((theme, _, u) => ({
  button: {
    "&:hover": {
      backgroundColor: theme.colors.blue[1],
      [u.dark]: {
        backgroundColor: theme.colors.blue[5],
        color: theme.white,
      },
    },
  },
  deleteButton: {
    "&:hover": {
      backgroundColor: theme.colors.red[1],
      color: theme.colors.red[7],
      [u.dark]: {
        backgroundColor: theme.colors.red[9],
        color: theme.colors.gray[0],
      },
    },
  },
}));

export default function ActionPopover({
  handleView,
  handleDelete,
  handleUserModal,
  showUserModal,
  showDeleteModal,
  showDeleteButton,
  handleUserPermissions,
}: Readonly<ActionPopoverProps>) {
  const permission = useAppSelector((state) => state.user.permission);
  const user = useAppSelector((state) => state.user);
  const { classes } = popoverStyles();

  return (
    <Popover width={200} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Button variant="transparent">
          <BiDotsHorizontalRounded size={24} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        {handleUserPermissions &&
          (handleUserPermissions(
            permission,
            USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
            USER_PERMISSION_CAPABILITIES.VIEW
          ) ||
            user.role === UserRole.Admin ||
            user.role === UserRole.Staff) && (
            <Button
              variant="transparent"
              fullWidth
              onClick={handleView}
              className={classes.button}
            >
              View
            </Button>
          )}
        <div className="hidden">
          {showUserModal &&
            handleUserPermissions &&
            handleUserPermissions(
              permission,
              USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
              USER_PERMISSION_CAPABILITIES.CREATE
            ) && (
              <Button
                variant="transparent"
                fullWidth
                onClick={handleUserModal}
                className={classes.button}
              >
                Add User
              </Button>
            )}
        </div>

        {showDeleteModal && showDeleteButton && (
          <Button
            variant="transparent"
            fullWidth
            onClick={handleDelete}
            className={classes.deleteButton}
          >
            Delete
          </Button>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}

import React from "react";
import { Button, Popover } from "@mantine/core";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function ActionPopover({
  handleView,
  handleDelete,
}: {
  handleView: () => void;
  handleDelete: () => void;
}) {
  return (
    <Popover width={200} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Button variant="transparent">
          <BiDotsHorizontalRounded size={24} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Button
          variant="transparent"
          fullWidth
          onClick={handleView}
          className="hover:bg-blue-100 transition-colors text-black"
        >
          View
        </Button>
        <Button
          variant="transparent"
          fullWidth
          onClick={handleDelete}
          className="hover:bg-red-100 transition-colors text-black hover:text-red-700"
        >
          Delete
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}

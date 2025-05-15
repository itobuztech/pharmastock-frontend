import { ActionIcon, Button, Popover } from "@mantine/core";
import { ReactNode } from "react";
import { BiFilter } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

interface CustomPopoverProps {
  children: ReactNode;
  popoverOpened: boolean;
  setPopoverOpened: (opened: boolean) => void;
  handleApplyFilter: () => void;
  handleClearFilters: () => void;
}

export default function CustomPopover({
  children,
  popoverOpened,
  setPopoverOpened,
  handleApplyFilter,
  handleClearFilters,
}: CustomPopoverProps) {
  return (
    <div>
      <Popover
        width={300}
        position="bottom-start"
        withArrow
        shadow="md"
        opened={popoverOpened}
      >
        <Popover.Target>
          <Button
            leftSection={<BiFilter size={24} />}
            onClick={() => setPopoverOpened(!popoverOpened)}
          >
            Filter
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <div className="flex justify-end">
            <ActionIcon
              variant="transparent"
              onClick={() => setPopoverOpened(false)}
              aria-label="Close popover"
            >
              <IoClose size={23} />
            </ActionIcon>
          </div>

          <div>{children}</div>
          <div>
            <Button
              type="submit"
              fullWidth
              className="mt-8"
              onClick={handleApplyFilter}
            >
              Apply filter
            </Button>
            <Button
              type="button"
              className="mt-3"
              fullWidth
              variant="outline"
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

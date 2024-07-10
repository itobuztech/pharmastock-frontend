import { Button, Modal, Text } from "@mantine/core";
import React from "react";

export default function ConfirmationModal({
  title,
  modalOpen,
  modalClose,
  deleteItem,
}: {
  title: string;
  modalOpen: boolean;
  modalClose: () => void;
  deleteItem: () => void;
}) {
  return (
    <Modal
      opened={modalOpen}
      onClose={modalClose}
      title={`Delete ${title}`}
      centered
      size={"sm"}
    >
      <Text size="sm" className="mb-7">
        Are you sure you want to delete?
      </Text>
      <div className="flex flex-wrap justify-end gap-4">
        <Button variant="outline" onClick={modalClose}>
          No don't delete
        </Button>
        <Button variant="filled" color="red" onClick={deleteItem}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

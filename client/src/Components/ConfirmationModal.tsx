import React from "react";
import { Button, Modal, Text } from "@mantine/core";

export default function ConfirmationModal({
  title,
  modalOpen,
  modalClose,
  deleteItem,
  loading
}: {
  title: string;
  modalOpen: boolean;
  modalClose: () => void;
  deleteItem: () => void;
  loading?: boolean;
}) {
  return (
    <Modal
      opened={modalOpen}
      onClose={modalClose}
      title={`Delete ${title}`}
      centered
      size={"sm"}
      zIndex={600}
      overlayProps={{
        blur: 3,
        zIndex: 500,
      }}
    >
      <Text size="sm" className="mb-7">
        Are you sure you want to delete?
      </Text>
      <div className="flex flex-wrap justify-end gap-4">
        <Button variant="outline" onClick={modalClose}>
          Cancel
        </Button>
        <Button loading={loading} variant="filled" color="red" onClick={deleteItem}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

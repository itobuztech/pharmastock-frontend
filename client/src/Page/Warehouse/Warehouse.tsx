import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { GetWarehouseList } from "query/warehouse/warehouseList";
import { CreateWarehouses, Warehouses } from "interfaces/interfaces";
import { DeleteWarehouse } from "query/warehouse/warehouseDelete";
import ConfirmationModal from "Components/ConfirmationModal";
import WarehouseListTable from "./components/WarehouseListTable";
import WarehouseForm from "./components/WarehouseForm";
import EmptyList from "Components/EmptyList";

export default function Warehouse() {
  const [opened, { open, close }] = useDisclosure(false);
  const [warehouseList, setWarehouseList] = useState<Warehouses>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [newWarehouseList, setNewWarehouseList] = useState();
  const [deletedId, setDeletedId] = useState<string>();
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);

  const [editForm, setEditForm] = useState(true);

  const [fetchWarehouseList, { refetch, loading }] =
    useLazyQuery<CreateWarehouses>(GetWarehouseList, {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const item = d.warehouses;
          const total = d.warehouses.total;
          const paginationCount = Math.ceil(total / 10);
          setWarehouseList(item);
          setTotalCount(paginationCount);
        }
      },
    });

  useEffect(() => {
    fetchWarehouseList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchWarehouseList, refetch]);

  useEffect(() => {
    if (newWarehouseList) {
      refetch().then(({ data }) => {
        if (data) {
          const items = data.warehouses;
          const total = data.warehouses.total;
          const paginationCount = Math.ceil(total / 10);

          setWarehouseList(items);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newWarehouseList, refetch]);

  const [deleteWarehouse] = useMutation(DeleteWarehouse, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      refetch().then(({ data }) => {
        if (data) {
          const items = data.warehouses;
          const total = data.warehouses.total;
          const paginationCount = Math.ceil(total / 10);

          setWarehouseList(items);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Warehouse Deleted Successfully");
    },
  });

  function handleDelete(itemId: string) {
    const deleteItem = warehouseList?.warehouses.find((x) => x.id === itemId);
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  function getDeleteWarehouse() {
    deleteWarehouse({
      variables: { deleteWarehouseInput: { id: deletedId } },
    });
  }

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader title="Warehouse" showCreateButton={true} onClick={open} />

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {warehouseList?.warehouses.length === 0 ? (
        <EmptyList />
      ) : (
        <WarehouseListTable
          activePage={activePage}
          setActivePage={setActivePage}
          warehouseList={warehouseList}
          handleDelete={handleDelete}
          totalCount={totalCount}
        />
      )}

      <ConfirmationModal
        title="Warehouse"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteWarehouse()}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Warehouse"
        centered
        size={"sm"}
      >
        <WarehouseForm
          editForm={editForm}
          setEditForm={setEditForm}
          refetchWarehouse={refetch}
          close={close}
          setNewWarehouseList={setNewWarehouseList}
        />
      </Modal>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { ItemLists, Items } from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GetItemLists } from "query/item/itemList";
import ConfirmationModal from "Components/ConfirmationModal";
import { ItemDelete } from "query/item/itemDelete";
import { toast } from "react-toastify";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";
import EmptyList from "Components/EmptyList";

export default function ItemList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [itemList, setItemList] = useState<Items>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [deletedId, setDeletedId] = useState<string>();
  const [newItemList, setNewItemList] = useState();
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const [editForm, setEditForm] = useState(true);

  const [fetchItemList, { refetch, loading }] = useLazyQuery<ItemLists>(
    GetItemLists,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const items = d.items;
          const total = d.items.total;
          const paginationCount = Math.ceil(total / 10);
          setItemList(items);
          setTotalCount(paginationCount);
        }
      },
    }
  );

  useEffect(() => {
    fetchItemList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchItemList, refetch]);

  useEffect(() => {
    if (newItemList) {
      refetch().then(({ data }) => {
        if (data) {
          const itemCate = data.items;
          const total = data.items.total;
          const paginationCount = Math.ceil(total / 10);
          setItemList(itemCate);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newItemList, refetch]);

  const [deleteCategory] = useMutation(ItemDelete, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      refetch().then(({ data }) => {
        if (data) {
          const item = data.items;
          const total = data.items.total;
          const paginationCount = Math.ceil(total / 10);

          setItemList(item);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Item Deleted Successfully");
    },
  });

  function handleDelete(catId: string) {
    const deleteItem = itemList?.items.find((x) => x.id === catId);
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  function getDeleteItem() {
    deleteCategory({
      variables: { deleteItemInput: { id: deletedId } },
    });
  }

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader title="Items" showCreateButton={true} onClick={open} />

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {itemList?.items.length === 0 ? (
        <EmptyList />
      ) : (
        <ItemTable
          itemList={itemList}
          activePage={activePage}
          handleDelete={handleDelete}
          totalCount={totalCount}
          setActivePage={setActivePage}
        />
      )}

      <ConfirmationModal
        title="Item"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteItem()}
      />

      <Modal opened={opened} onClose={close} title="Item" centered size={"lg"}>
        <ItemForm
          close={close}
          editForm={editForm}
          setEditForm={setEditForm}
          setNewItemList={setNewItemList}
          refetchItem={refetch}
        />
      </Modal>
    </section>
  );
}

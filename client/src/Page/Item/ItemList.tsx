import React, { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { ItemLists, Items } from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ItemCreate } from "query/item/itemCreate";
import { CreateItemInput } from "gql/graphql";
import { GetItemLists } from "query/item/itemList";
import ConfirmationModal from "Components/ConfirmationModal";
import { ItemDelete } from "query/item/itemDelete";
import { toast } from "react-toastify";
import { FaRegSadTear } from "react-icons/fa";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";

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

  const [itemCreate] = useMutation(ItemCreate);

  const onSubmit = async (data: CreateItemInput) => {
    try {
      const response = await itemCreate({
        variables: { createItemInput: data },
      });
      toast.success("Item Created Successfully");
      close();
      setNewItemList(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [fetchItemList, { refetch }] = useLazyQuery<ItemLists>(GetItemLists, {
    onCompleted: (d) => {
      if (d) {
        const items = d.items;
        const total = d.items.total;
        const paginationCount = Math.ceil(total / 10);
        setItemList(items);
        setTotalCount(paginationCount);
      }
    },
  });
  const [deleteCategory] = useMutation(ItemDelete);

  useEffect(() => {
    fetchItemList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchItemList]);

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

  function handleDelete(catId: string) {
    const deleteItem = itemList?.items.find((x) => x.id === catId);
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  async function getDeleteItem() {
    try {
      await deleteCategory({
        variables: { deleteItemInput: { id: deletedId } },
      });
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
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <PageHeader title="Items" showCreateButton={true} onClick={open} />

      {!itemList?.items.length ? (
        <div className="text-center h-96 items-center justify-center flex">
          <div>
            <FaRegSadTear size={60} className="text-teal-400" />
            <h3 className="mt-0">No Records</h3>
          </div>
        </div>
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

      <Modal opened={opened} onClose={close} title="Item" centered size={"sm"}>
        <ItemForm onSubmit={onSubmit} />
      </Modal>
    </section>
  );
}

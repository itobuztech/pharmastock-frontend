import React, { useEffect, useState } from "react";
import { Flex, LoadingOverlay, Modal, Space } from "@mantine/core";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { ChildComponentProps, ItemLists, Items } from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GetItemLists } from "query/item/itemList";
import ConfirmationModal from "Components/ConfirmationModal";
import { ItemDelete } from "query/item/itemDelete";
import { toast } from "react-toastify";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";
import EmptyList from "Components/EmptyList";
import Search from "Components/Search";
import ItemFilter from "./components/ItemFilter";

export default function ItemList({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
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
  const [searchInput, setSearchInput] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [sliderValueMrp, setSliderValueMrp] = useState<number>(0);

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
        filterArgs: {
          baseUnit: null,
          mrpBaseUnit: null,
          wholeSalePrice: null,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
  }, [activePage, fetchItemList, refetch, searchInput]);

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

  const [deleteCategory, {loading: loadingStateForProductDelete }] = useMutation(ItemDelete, {
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

  /* ====== Handle Search Function ====== */
  const handleSearch = useDebouncedCallback(async (searchInput: string) => {
    fetchItemList({
      variables: {
        filterArgs: {
          baseUnit: null,
          mrpBaseUnit: null,
          wholeSalePrice: null,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchInput,
      },
    });
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  const maxWholesalePrice = itemList?.items.reduce(
    (max, item) => Math.max(max, item.wholesalePrice),
    0
  );

  console.log({ maxWholesalePrice });

  // const onSubmit = () => {
  //   fetchItemList({
  //     variables: {
  //       filterArgs: {
  //         baseUnit: selectedUnit,
  //         mrpBaseUnit: sliderValueMrp,
  //         wholeSalePrice: sliderValue,
  //       },
  //       pagination: true,
  //       paginationArgs: {
  //         skip: activePage * 10 - 10,
  //         take: 10,
  //       },
  //       searchText: searchInput,
  //     },
  //   });
  // };

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Items"
        showCreateButton={true}
        onClick={open}
        buttonText="Add Item"
      />

      <Flex wrap="wrap">
        {/* ==== Search ==== */}
        <Search
          handleChange={handleChange}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Space w="md" />
        {/* ==== Filter ==== */}
        <ItemFilter
          selectedUnit={selectedUnit}
          sliderValue={sliderValue}
          sliderValueMrp={sliderValueMrp}
          setSelectedUnit={setSelectedUnit}
          setSliderValue={setSliderValue}
          setSliderValueMrp={setSliderValueMrp}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          fetchItemList={fetchItemList}
          activePage={activePage}
          // opened={popOverOpened}
          // popOverOpen={popOverOpen}
        />
      </Flex>

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
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={true}
        />
      )}

      <ConfirmationModal
        title="Item"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteItem()}
        loading={loadingStateForProductDelete}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Add New Item"
        centered
        size={"lg"}
      >
        <ItemForm
          close={close}
          editForm={editForm}
          setEditForm={setEditForm}
          setNewItemList={setNewItemList}
          refetchItem={refetch}
          handleUserPermissions={handleUserPermissions}
        />
      </Modal>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CreateItemCategoryInput } from "gql/graphql";
import { toast } from "react-toastify";
import { GetItemCategoryList } from "query/category/categoryList";
import { ChildComponentProps, CreateItemCategories, ItemCategories } from "interfaces/interfaces";
import ConfirmationModal from "Components/ConfirmationModal";
import { CategoryItemDelete } from "query/category/categoryDelete";
import ItemCategoryTable from "./components/ItemCategoryTable";
import ItemCategoryForm from "./components/ItemCategoryForm";
import EmptyList from "Components/EmptyList";
import Search from "Components/Search";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";

export default function ItemCategory({ handleUserPermissions }:Readonly<ChildComponentProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setActivePage] = useState(1);
  const [itemCategoryList, setItemCategoryList] = useState<ItemCategories>();
  const [totalCount, setTotalCount] = useState(1);
  const [newCategoryList, setNewCategoryList] =
    useState<CreateItemCategoryInput>();
  const [deletedId, setDeletedId] = useState<string>();
  const [editForm, setEditForm] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const permission = useAppSelector((state) => state.user.permission);

  /* ====== Category List Query ====== */
  const [fetchItemCategoryList, { refetch, loading }] =
    useLazyQuery<CreateItemCategories>(GetItemCategoryList, {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const itemCate = d.itemCategories;
          const total = d.itemCategories.total;
          const paginationCount = Math.ceil(total / 10);

          setItemCategoryList(itemCate);
          setTotalCount(paginationCount);
        }
      },
    });

    const hasPermission = handleUserPermissions( permission,USER_PERMISSION_FIELDS.ITEM_CATEGORIES_MANAGEMENT,
      USER_PERMISSION_CAPABILITIES.CREATE);

  /* ====== Category Delete Query ====== */
  const [deleteCategory] = useMutation(CategoryItemDelete, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      refetch().then(({ data }) => {
        if (data) {
          const itemCate = data.itemCategories;
          const total = data.itemCategories.total;
          const paginationCount = Math.ceil(total / 10);
          setItemCategoryList(itemCate);
          setTotalCount(paginationCount);
        }
      });
      toast.success("Pharmacy Deleted Successfully");
      deleteModalClose();
    },
  });

  /* ====== Category Pagination Variable ====== */
  useEffect(() => {
    fetchItemCategoryList({
      variables: {
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
  }, [activePage, fetchItemCategoryList, refetch, searchInput]);

  /* ====== New Category Add In The List ====== */
  useEffect(() => {
    if (newCategoryList) {
      refetch().then(({ data }) => {
        if (data) {
          const itemCate = data.itemCategories;
          const total = data.itemCategories.total;
          const paginationCount = Math.ceil(total / 10);

          setItemCategoryList(itemCate);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newCategoryList, refetch]);

  /* ====== Handle Category Delete Function ====== */
  function handleDelete(catId: string) {
    const deleteItem = itemCategoryList?.itemCategories.find(
      (x) => x.id === catId
    );
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  function getDeleteCategory() {
    deleteCategory({
      variables: { deleteItemCategoryInput: { id: deletedId } },
    });
  }

  /* ====== Handle Search Function ====== */
  function handleSearch() {
    fetchItemCategoryList({
      variables: {
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchInput,
      },
    });
  }

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Category"
        showCreateButton={hasPermission}
        onClick={open}
        buttonText="Add Category"
      />

      {/* ==== Search ==== */}
      <Search
        onSubmit={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {/* ==== Loading State ==== */}
      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {/* ==== Item Category Empty List and List ==== */}
      {itemCategoryList?.itemCategories.length === 0 ? (
        <EmptyList />
      ) : (
        <ItemCategoryTable
          activePage={activePage}
          setActivePage={setActivePage}
          itemCategoryList={itemCategoryList}
          handleDelete={handleDelete}
          totalCount={totalCount}
        />
      )}

      {/* ==== Delete Confirmation Modal ==== */}
      <ConfirmationModal
        title="Category"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteCategory()}
      />

      {/* ==== Create Item Category Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Category"
        centered
        size={"sm"}
      >
        <ItemCategoryForm
          editForm={editForm}
          setEditForm={setEditForm}
          close={close}
          refetchItemCategory={refetch}
          setNewCategoryList={setNewCategoryList}
        />
      </Modal>
    </section>
  );
}

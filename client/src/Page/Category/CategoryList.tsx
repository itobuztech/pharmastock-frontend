import { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CreateItemCategoryInput } from "gql/graphql";
import { toast } from "react-toastify";
import { GetItemCategoryList } from "query/category/categoryList";
import {
  ChildComponentProps,
  CreateItemCategories,
  ItemCategories,
} from "interfaces/interfaces";
import ConfirmationModal from "Components/ConfirmationModal";
import { CategoryItemDelete } from "query/category/categoryDelete";
import CategoryTable from "./components/CategoryTable";
import CategoryCreateUpdateForm from "./components/CategoryCreateUpdateForm";
import EmptyList from "Components/EmptyList";
import { useAppSelector } from "Lib/Store/hooks";
import Search from "Components/Search";
import CategoriesTableSkeleton from "./components/CategoriesTableSkeleton";

export default function CategoryList({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setActivePage] = useState(1);
  const [itemCategoryList, setItemCategoryList] = useState<ItemCategories>();
  const [totalCount, setTotalCount] = useState(1);
  const [newCategoryList, setNewCategoryList] =
    useState<CreateItemCategoryInput>();
  const [deletedId, setDeletedId] = useState<string>();
  const [editForm, setEditForm] = useState(true);
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const permission = useAppSelector((state) => state.user.permission);
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);

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

  /* ====== Category Delete Query ====== */
  const [deleteCategory, { loading: loadingStateForCategoryDelete }] =
    useMutation(CategoryItemDelete, {
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
        toast.success("Category Deleted Successfully");
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
        searchText: searchKeyword,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, refetch, searchKeyword]);

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

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Categories"
        showCreateButton={
          permission.ITEM_CATEGORIES_MANAGEMENT?.CAPABILITIES.CREATE
            ? true
            : false
        }
        onClick={open}
        buttonText="Add Category"
      />

      {/* ==== Search ==== */}
      <Search onChange={(e: string) => setSearchKeyword(e)} />

      {/* ==== Loading State ==== */}
      {loading && <CategoriesTableSkeleton numOfRows={6} />}

      {/* ==== Item Category Empty List and List ==== */}

      {loading && itemCategoryList?.itemCategories.length === 0 && (
        <EmptyList />
      )}

      {!loading && Number(itemCategoryList?.itemCategories.length) > 0 && (
        <CategoryTable
          activePage={activePage}
          setActivePage={setActivePage}
          itemCategoryList={itemCategoryList}
          handleDelete={handleDelete}
          totalCount={totalCount}
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={true}
        />
      )}

      {/* ==== Delete Confirmation Modal ==== */}
      <ConfirmationModal
        title="Category"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteCategory()}
        loading={loadingStateForCategoryDelete}
      />

      {/* ==== Create Item Category Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Category"
        centered
        size={"sm"}
      >
        <CategoryCreateUpdateForm
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

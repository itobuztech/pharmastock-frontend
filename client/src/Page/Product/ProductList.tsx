import { useEffect, useState } from "react";
import { Flex, Modal, Space } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { ChildComponentProps, ItemLists, Items } from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GetItemLists } from "query/item/itemList";
import ConfirmationModal from "Components/ConfirmationModal";
import { ItemDelete } from "query/item/itemDelete";
import { toast } from "react-toastify";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import EmptyList from "Components/EmptyList";
import Search from "Components/Search";
import ProductFilter from "./components/ProductFilter";
import { useAppSelector } from "Lib/Store/hooks";
import ProductTableSkeleton from "./components/ProductTableSkeleton";

export default function ProductList({
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
  const [selectedUnit, setSelectedUnit] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [sliderValueMrp, setSliderValueMrp] = useState<number>(0);
  const permission = useAppSelector((state) => state.user.permission);
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);

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
        searchText: searchKeyword,
      },
    });
  }, [activePage, fetchItemList, refetch, searchKeyword]);

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

  const [deleteCategory, { loading: loadingStateForProductDelete }] =
    useMutation(ItemDelete, {
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
        toast.success("Product Deleted Successfully");
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
      <PageHeader
        title="Products"
        showCreateButton={
          permission.ITEM_MANAGEMENT?.CAPABILITIES.CREATE ? true : false
        }
        onClick={open}
        buttonText="Add Product"
      />

      <Flex wrap="wrap">
        {/* ==== Search ==== */}
        <Search onChange={(e: string) => setSearchKeyword(e)} />
        <Space w="md" />
        {/* ==== Filter ==== */}
        <ProductFilter
          selectedUnit={selectedUnit}
          sliderValue={sliderValue}
          sliderValueMrp={sliderValueMrp}
          setSelectedUnit={setSelectedUnit}
          setSliderValue={setSliderValue}
          setSliderValueMrp={setSliderValueMrp}
          searchInput={searchKeyword}
          setSearchInput={setSearchKeyword}
          fetchItemList={fetchItemList}
          activePage={activePage}
        />
      </Flex>

      {loading && (
       <ProductTableSkeleton numOfRows={6} />
      )}

      {loading && itemList?.items.length === 0 && <EmptyList />}

      {!loading && Number(itemList?.items.length) > 0 && (
        <ProductTable
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
        title="Product"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteItem()}
        loading={loadingStateForProductDelete}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Add New Product"
        centered
        size={"lg"}
      >
        <ProductForm
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

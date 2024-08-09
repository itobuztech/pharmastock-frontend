import { Flex, LoadingOverlay, Modal, Space } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import WarehouseStockForm from "Page/Warehouse/components/WarehouseStockForm";
import {
  ChildComponentProps,
  WarehouseStocks,
  WarehouseStocksData,
} from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { GetWarehouseStocks } from "query/warehouse/warehouseStocks";
import WarehouseStockTable from "./components/WarehouseStockTable";
import EmptyList from "Components/EmptyList";
import { WarehouseStockDelete } from "query/warehouse/warehouseStockDelete";
import ConfirmationModal from "Components/ConfirmationModal";
import { CreateWarehouseStockInput } from "gql/graphql";
import useOrganizationList from "Lib/customHooks/useOrganizationList";
import useWarehouseItems from "Lib/customHooks/useWarehouseItems";
import Search from "Components/Search";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import StockFilter from "Page/PharmacyStock/components/StockFilter";
// import StockFilter from "./components/StockFilter";

export default function WarehouseStock({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const [warehouseStocksList, setWarehouseStocksList] =
    useState<WarehouseStocks>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const permission = useAppSelector((state) => state.user.permission);
  const selectOrganizationItem = useOrganizationList();
  const selectWarehouseItem = useWarehouseItems();
  const [sliderValue, setSliderValue] = useState<number>(0);

  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const [deletedId, setDeletedId] = useState<string>();
  const [newWarehouseStockList, setNewWarehouseStockList] =
    useState<CreateWarehouseStockInput>();

  /* ====== Warehouse Stocks List Query ====== */
  const [
    fetchWarehouseStocksList,
    { refetch: refetchWarehouseStockList, loading },
  ] = useLazyQuery<WarehouseStocksData>(GetWarehouseStocks, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: (d) => {
      if (d) {
        const item = d.warehouseStocks;
        const total = d.warehouseStocks.total;
        const paginationCount = Math.ceil(total / 10);
        setWarehouseStocksList(item);
        setTotalCount(paginationCount);
      }
    },
  });

  /* ====== Warehouse Stocks Pagination Variable ====== */
  useEffect(() => {
    fetchWarehouseStocksList({
      variables: {
        filterArgs: {
          endDate: null,
          qty: null,
          startDate: null,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
  }, [
    activePage,
    fetchWarehouseStocksList,
    refetchWarehouseStockList,
    searchInput,
  ]);

  /* ====== New Warehouse Stocks Add In The List ====== */
  useEffect(() => {
    if (newWarehouseStockList) {
      refetchWarehouseStockList().then(({ data }) => {
        if (data) {
          const items = data.warehouseStocks;
          const total = data.warehouseStocks.total;
          const paginationCount = Math.ceil(total / 10);
          setWarehouseStocksList(items);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newWarehouseStockList, refetchWarehouseStockList]);

  useEffect(() => {
    refetchWarehouseStockList();
  }, [refetchWarehouseStockList]);

  const [deleteWarehouseStock] = useMutation(WarehouseStockDelete, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      refetchWarehouseStockList().then(({ data }) => {
        if (data) {
          const items = data.warehouseStocks;
          const total = data.warehouseStocks.total;
          const paginationCount = Math.ceil(total / 10);

          setWarehouseStocksList(items);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Warehouse Deleted Successfully");
    },
  });

  function handleDelete(itemId: string) {
    const deleteItem = warehouseStocksList?.warehouseStocks.find(
      (x) => x.id === itemId
    );
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  function getDeleteWarehouse() {
    deleteWarehouseStock({
      variables: { deleteWarehouseStockInput: { id: deletedId } },
    });
  }

  /* ====== Handle Search Function ====== */
  const handleSearch = useDebouncedCallback(async (searchInput: string) => {
    fetchWarehouseStocksList({
      variables: {
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

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Stocks"
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.WAREHOUSE_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.CREATE
        )}
        onClick={open}
        buttonText="Add Warehouse Stock"
      />

      <Flex wrap="wrap" justify="space-between">
        {/* ==== Search ==== */}
        <Search handleChange={handleChange} searchInput={searchInput} />
        <Space w="md" />

        {/* ==== Filter ==== */}
        <StockFilter
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          fetchStockList={fetchWarehouseStocksList}
          activePage={activePage}
          warehouseList={true}
        />
      </Flex>

      {/* ==== Loading State ==== */}
      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {/* ==== WarehouseStocks List Empty List and List ==== */}
      {!warehouseStocksList?.warehouseStocks.length ? (
        <EmptyList />
      ) : (
        <WarehouseStockTable
          activePage={activePage}
          setActivePage={setActivePage}
          totalCount={totalCount}
          warehouseStocksList={warehouseStocksList}
          handleUserPermissions={handleUserPermissions}
        />
      )}

      {/* ==== Delete Confirmation Modal ==== */}
      <ConfirmationModal
        title="Warehouse"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteWarehouse()}
      />

      {/* ==== Create WarehouseStock Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Create Stocks"
        centered
        size={"xl"}
      >
        <WarehouseStockForm
          selectOrgItem={selectOrganizationItem}
          selectWarehouseItem={selectWarehouseItem}
          close={close}
          refetchItem={refetchWarehouseStockList}
          setNewWarehouseStockList={setNewWarehouseStockList}
          list={true}
          handleUserPermissions={handleUserPermissions}
        />
      </Modal>
    </section>
  );
}

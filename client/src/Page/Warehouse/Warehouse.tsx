import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { GetWarehouseList } from "query/warehouse/warehouseList";
import {
  CreateWarehouses,
  OrganizationList,
  Warehouses,
} from "interfaces/interfaces";
import { DeleteWarehouse } from "query/warehouse/warehouseDelete";
import ConfirmationModal from "Components/ConfirmationModal";
import WarehouseListTable from "./components/WarehouseListTable";
import WarehouseForm from "./components/WarehouseForm";
import EmptyList from "Components/EmptyList";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";
import Search from "Components/Search";

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
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();

  const [editForm, setEditForm] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  /* ====== Warehouse List Query ====== */
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
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
  }, [activePage, fetchWarehouseList, refetch, searchInput]);

  /* ====== New Warehouse Add In The List ====== */
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

  /* ====== Delete Warehouse Item Query ====== */
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

  /* ====== Handle Delete Function ====== */
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

  // Get Organization List
  const [organizationList] = useLazyQuery<OrganizationList>(
    ORGANIZATIONS_LIST_QUERY,
    {
      onCompleted: (d) => {
        if (d) {
          const orgs = d.organizations;
          setOrganization(orgs);
        }
      },
    }
  );

  useEffect(() => {
    organizationList();
  }, [organizationList]);

  const organizationListArr = organization?.organizations;

  const selectOrgItem = organizationListArr?.map((item) => ({
    value: item.id,
    label: item.name as string,
  }));

  /* ====== Handle Search Function ====== */
  function handleSearch() {
    fetchWarehouseList({
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
      <PageHeader title="Warehouse" showCreateButton={true} onClick={open} />

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

      {/* ==== Warehouse Empty List and List ==== */}
      {!warehouseList?.warehouses.length ? (
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

      {/* ==== Delete Confirmation Modal ==== */}
      <ConfirmationModal
        title="Warehouse"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteWarehouse()}
      />

      {/* ==== Create Warehouse Modal ==== */}
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
          selectOrgItem={selectOrgItem}
        />
      </Modal>
    </section>
  );
}

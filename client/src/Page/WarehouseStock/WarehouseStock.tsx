import { LoadingOverlay, Modal } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import WarehouseStockForm from "Page/Warehouse/components/WarehouseStockForm";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";
import {
  OrganizationList,
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

export default function WarehouseStock() {
  const [opened, { open, close }] = useDisclosure(false);
  const [warehouseStocksList, setWarehouseStocksList] =
    useState<WarehouseStocks>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const [deletedId, setDeletedId] = useState<string>();
  const [newWarehouseStockList, setNewWarehouseStockList] =
    useState<CreateWarehouseStockInput>();

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

  useEffect(() => {
    fetchWarehouseStocksList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchWarehouseStocksList, refetchWarehouseStockList]);

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

  console.log({ warehouseStocksList });
  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Stocks"
        showCreateButton={true}
        onClick={open}
      />

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {!warehouseStocksList?.warehouseStocks.length ? (
        <EmptyList />
      ) : (
        <WarehouseStockTable
          activePage={activePage}
          setActivePage={setActivePage}
          totalCount={totalCount}
          warehouseStocksList={warehouseStocksList}
          handleDelete={handleDelete}
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
        title="Create Stocks"
        centered
        size={"xl"}
      >
        <WarehouseStockForm
          selectOrgItem={selectOrgItem}
          close={close}
          refetchItem={refetchWarehouseStockList}
          setNewWarehouseStockList={setNewWarehouseStockList}
        />
      </Modal>
    </section>
  );
}

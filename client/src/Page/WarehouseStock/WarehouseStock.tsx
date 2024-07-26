import { LoadingOverlay, Modal } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import WarehouseStockForm from "Page/Warehouse/components/WarehouseStockForm";
import { WarehouseStocks, WarehouseStocksData } from "interfaces/interfaces";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { GetWarehouseStocks } from "query/warehouse/warehouseStocks";
import WarehouseStockTable from "./components/WarehouseStockTable";
import EmptyList from "Components/EmptyList";
import useOrganizationList from "Lib/customHooks/useOrganizationList";
import useWarehouseItems from "Lib/customHooks/useWarehouseItems";

export default function WarehouseStock() {
  const [opened, { open, close }] = useDisclosure(false);
  const [warehouseStocksList, setWarehouseStocksList] =
    useState<WarehouseStocks>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const selectOrganizationItem = useOrganizationList();
  const selectWarehouseItem = useWarehouseItems();

  const [fetchWarehouseStocksList, { refetch, loading }] =
    useLazyQuery<WarehouseStocksData>(GetWarehouseStocks, {
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
  }, [activePage, fetchWarehouseStocksList, refetch]);

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Stocks"
        showCreateButton={true}
        onClick={open}
        buttonText="Add Warehouse Stock"
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
        />
      )}

      <Modal
        opened={opened}
        onClose={close}
        title="Stocks"
        centered
        size={"lg"}
      >
        <WarehouseStockForm
          selectOrgItem={selectOrganizationItem}
          selectWarehouseItem={selectWarehouseItem}
          close={close}
        />
      </Modal>
    </section>
  );
}

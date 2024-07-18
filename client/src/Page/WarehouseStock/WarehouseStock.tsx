import { Modal } from "@mantine/core";
import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import WarehouseStockForm from "Page/Warehouse/components/WarehouseStockForm";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";
import {
  CreateWarehouses,
  OrganizationList,
  Warehouses,
  WarehouseStocks,
} from "interfaces/interfaces";
import { useLazyQuery } from "@apollo/client";
import { GetWarehouseList } from "query/warehouse/warehouseList";
import { toast } from "react-toastify";
import { GetWarehouseStocks } from "query/warehouse/warehouseStocks";

export default function WarehouseStock() {
  const [opened, { open, close }] = useDisclosure(false);
  // const [warehouseStocksList, setWarehouseStocksList] = useState<WarehouseStocks>();
  // const [totalCount, setTotalCount] = useState(1);

  const [warehouseList, setWarehouseList] = useState<Warehouses>();
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();

  // const [fetchWarehouseStocksList, { refetch, loading }] =
  //   useLazyQuery<WarehouseStocks>(GetWarehouseStocks, {
  //     onError: (err) => {
  //       toast.error(err.message);
  //     },
  //     onCompleted: (d) => {
  //       if (d) {
  //         const item = d.warehouseStocks;
  //         const total = d.total;
  //         const paginationCount = Math.ceil(total / 10);
  //         setWarehouseStocksList(item);
  //         setTotalCount(paginationCount);
  //       }
  //     },
  //   });

  const [fetchWarehouseList] = useLazyQuery<CreateWarehouses>(
    GetWarehouseList,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const item = d.warehouses;
          setWarehouseList(item);
        }
      },
    }
  );

  const selectWarehouseItem = warehouseList?.warehouses?.map((item) => ({
    value: item.id,
    label: item.name as string,
  }));

  console.log({ selectWarehouseItem });

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
    fetchWarehouseList();
  }, [organizationList, fetchWarehouseList]);

  const organizationListArr = organization?.organizations;

  const selectOrgItem = organizationListArr?.map((item) => ({
    value: item.id,
    label: item.name as string,
  }));

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Stocks"
        showCreateButton={true}
        onClick={open}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Stocks"
        centered
        size={"lg"}
      >
        <WarehouseStockForm
          selectOrgItem={selectOrgItem}
          selectWarehouseItem={selectWarehouseItem}
        />
      </Modal>
    </section>
  );
}

import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetWarehouseDetails } from "query/warehouse/warehouseDetails";
import { CreateWarehouseStockInput, Warehouse } from "gql/graphql";
import WarehouseForm from "./components/WarehouseForm";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import WarehouseStockForm from "./components/WarehouseStockForm";
import {
  ChildComponentProps,
  CreateWarehouseStocksByWarehouse,
  WarehouseStocksByWarehouse,
} from "interfaces/interfaces";
import { GetWarehouseStocksByWarehouse } from "query/warehouse/warehouseStocksByWarehouse";
import { toast } from "react-toastify";
import EmptyList from "Components/EmptyList";
import WarehouseStockTable from "Page/WarehouseStock/components/WarehouseStockTable";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import useOrganizationList from "Lib/customHooks/useOrganizationList";

export default function WarehouseDetails({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [warehouseStocksList, setWarehouseStocksList] =
    useState<WarehouseStocksByWarehouse>();
  const [newWarehouseStockList, setNewWarehouseStockList] =
    useState<CreateWarehouseStockInput>();
  const selectOrganizationItem = useOrganizationList();
  const permission = useAppSelector((state) => state.user.permission);

  const { data: warehouseDetails, refetch } = useQuery<{
    warehouse: Warehouse;
  }>(GetWarehouseDetails, {
    variables: {
      warehouseId: id,
    },
  });

  const [
    fetchWarehouseStocksByWarehouse,
    { loading, refetch: refetchWarehouseStock },
  ] = useLazyQuery<CreateWarehouseStocksByWarehouse>(
    GetWarehouseStocksByWarehouse,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const item = d.warehouseStocksByWarehouse;
          const total = d.warehouseStocksByWarehouse.total;
          const paginationCount = Math.ceil(total / 10);
          setWarehouseStocksList(item);
          setTotalCount(paginationCount);
        }
      },
    }
  );

  useEffect(() => {
    fetchWarehouseStocksByWarehouse({
      variables: {
        warehouseId: id,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, id]);

  useEffect(() => {
    if (newWarehouseStockList) {
      refetchWarehouseStock().then(({ data }) => {
        if (data) {
          const item = data.warehouseStocksByWarehouse;
          const total = data.warehouseStocksByWarehouse.total;
          const paginationCount = Math.ceil(total / 10);
          setWarehouseStocksList(item);
          setTotalCount(paginationCount);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWarehouseStockList, refetch]);

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Details"
        showBackButton={true}
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.WAREHOUSE_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.CREATE
        ) && !id}
        onClick={open}
        buttonText="Add Warehouse Stock"
      />

      <div className="w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2 bg-white rounded-md py-6 px-6">
        <WarehouseForm
          editForm={editForm}
          setEditForm={setEditForm}
          id={id}
          refetchWarehouse={refetch}
          warehouseDetails={warehouseDetails}
          handleUserPermissions={handleUserPermissions}
        />
      </div>

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      <div className="mt-8">
        <h2 className="text-blue-900 text-2xl font-bold m-0 mb-8">
          Warehouse Stocks
        </h2>
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
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Create Stocks"
        centered
        size={"lg"}
      >
        <WarehouseStockForm
          warehouseDetails={warehouseDetails}
          selectOrgItem={selectOrganizationItem}
          id={id}
          close={close}
          refetchItem={refetchWarehouseStock}
          setNewWarehouseStockList={setNewWarehouseStockList}
          handleUserPermissions={handleUserPermissions}
        />
      </Modal>
    </section>
  );
}

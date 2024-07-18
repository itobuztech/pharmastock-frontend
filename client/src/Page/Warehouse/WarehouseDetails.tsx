import PageHeader from "Components/PageHeader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetWarehouseDetails } from "query/warehouse/warehouseDetails";
import { Warehouse } from "gql/graphql";
import WarehouseForm from "./components/WarehouseForm";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import WarehouseStockForm from "./components/WarehouseStockForm";
import { OrganizationList } from "interfaces/interfaces";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";

export default function WarehouseDetails() {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();

  const { data: warehouseDetails, refetch } = useQuery<{
    warehouse: Warehouse;
  }>(GetWarehouseDetails, {
    variables: {
      warehouseId: id,
    },
  });

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

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Warehouse Details"
        showBackButton={true}
        showCreateButton={true}
        onClick={open}
      />

      <div className="w-full lg:w-1/2 bg-white rounded-md py-6 px-6">
        <WarehouseForm
          editForm={editForm}
          setEditForm={setEditForm}
          id={id}
          refetchWarehouse={refetch}
          warehouseDetails={warehouseDetails}
          selectOrgItem={selectOrgItem}
        />
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
          selectOrgItem={selectOrgItem}
          id={id}
          close={close}
        />
      </Modal>
    </section>
  );
}

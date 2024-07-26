import React, { useEffect, useState } from "react";
import {
  createOrganizationInput,
  OrganizationList,
  SelectOrgItem,
} from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";
import { DeleteOrganization } from "query/organization/organizationDelete";
import PageHeader from "Components/PageHeader";
import ConfirmationModal from "Components/ConfirmationModal";
import OrganizationTable from "./components/OrganizationTable";
import OrganizationForm from "./components/OrganizationForm";
import EmptyList from "Components/EmptyList";
import UserCreateForm from "Page/User/components/UserCreateForm";

export default function OrganizationsPage() {
  // Organization listing. STARTS
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();
  const [newOrgList, setNewOrgList] = useState<createOrganizationInput>();
  const [totalCount, setTotalCount] =
    useState<OrganizationList["organizations"]["total"]>(1);
  const [activePage, setActivePage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const [deleteOrgId, setDeleteOrgId] = useState<string>();
  const [editForm, setEditForm] = useState(true);
  const [selectItem, setSelectItem] = useState<SelectOrgItem>();

  const [userModalOpened, { open: userModalOpen, close: userModalClose }] =
    useDisclosure(false);

  const [deleteOrganization] = useMutation(DeleteOrganization, {
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      refetch().then(({ data }) => {
        if (data) {
          const orgs = data.organizations;
          const total = data.organizations.total;
          const paginationCount = Math.ceil(total / 10);
          setOrganization(orgs);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Organization Deleted Successfully");
    },
  });

  const [organizationList, { refetch, loading }] =
    useLazyQuery<OrganizationList>(ORGANIZATIONS_LIST_QUERY, {
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: (d) => {
        if (d) {
          const orgs = d.organizations;
          const total = d.organizations.total;
          const paginationCount = Math.ceil(total / 10);

          setOrganization(orgs);
          setTotalCount(paginationCount);
        }
      },
    });

  useEffect(() => {
    organizationList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [organizationList, activePage, refetch]);

  useEffect(() => {
    if (newOrgList) {
      refetch().then(({ data }) => {
        if (data) {
          const orgs = data.organizations;
          const total = data.organizations.total;
          const paginationCount = Math.ceil(total / 10);

          setOrganization(orgs);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newOrgList, refetch]);

  function handleDelete(orgId: string) {
    const deleteItem = organization?.organizations.find((x) => x.id === orgId);
    setDeleteOrgId(deleteItem?.id);
    deleteModalOpen();
  }

  function getDeleteOrganization() {
    deleteOrganization({
      variables: { deleteOrganizationInput: { id: deleteOrgId } },
    });
  }

  function handleUserModal(orgId: string) {
    const selectItem = organization?.organizations.find((x) => x.id === orgId);
    setSelectItem({
      value: selectItem?.id,
      label: selectItem?.name,
    });
    userModalOpen();
  }

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Organizations List"
        showCreateButton={true}
        onClick={open}
        buttonText="Add Organization"
      />

      {/* ==== Loading State ==== */}
      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {/* ==== Organization Empty List and List ==== */}
      {!organization?.organizations.length ? (
        <EmptyList />
      ) : (
        <OrganizationTable
          organizationList={organization}
          activePage={activePage}
          handleDelete={handleDelete}
          totalCount={totalCount}
          setActivePage={setActivePage}
          handleUserModal={handleUserModal}
        />
      )}

      {/* ==== Delete Confirmation Modal ==== */}
      <ConfirmationModal
        title="Organization"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteOrganization()}
      />

      {/* ==== Create User Modal ==== */}
      <Modal
        opened={userModalOpened}
        onClose={userModalClose}
        title="Create User"
        centered
        size={"lg"}
        zIndex={600}
        overlayProps={{
          zIndex: 500,
        }}
      >
        <UserCreateForm selectItem={selectItem} close={userModalClose} />
      </Modal>

      {/* ==== Create Organization Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Organization"
        centered
        size={"lg"}
      >
        <OrganizationForm
          close={close}
          editForm={editForm}
          setEditForm={setEditForm}
          refetchItem={refetch}
          setNewOrgList={setNewOrgList}
        />
      </Modal>
    </section>
  );
}

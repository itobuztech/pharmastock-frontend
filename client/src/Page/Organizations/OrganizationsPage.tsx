import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Modal } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";

import {
  ChildComponentProps,
  createOrganizationInput,
  OrganizationList,
  SelectOrgItem,
} from "interfaces/interfaces";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";
import { DeleteOrganization } from "query/organization/organizationDelete";
import PageHeader from "Components/PageHeader";
import ConfirmationModal from "Components/ConfirmationModal";
import OrganizationTable from "./components/OrganizationTable";
import EmptyList from "Components/EmptyList";
import UserCreateForm from "Page/User/components/UserCreateForm";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import Search from "Components/Search";
import OrganizationTableSkeleton from "./components/OrganizationTableSkeleton";
import OrganizationForm from "./components/OrganizationForm";

export default function OrganizationsPage({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
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
  const [selectOrgItem, setSelectOrgItem] = useState<SelectOrgItem>();
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);

  const [userModalOpened, { open: userModalOpen, close: userModalClose }] =
    useDisclosure(false);
  const permission = useAppSelector((state) => state.user.permission);

  /* ====== Delete Org Query ====== */
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

  /* ====== Org List Query ====== */
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
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchKeyword,
      },
    });
  }, [organizationList, activePage, refetch, searchKeyword]);

  /* ====== Add New Org List ====== */
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

  /* ====== Handle Org Delete Function ====== */
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

  /* ====== Handle Add User Modal Function ====== */
  function handleUserModal(orgId: string) {
    const selectItem = organization?.organizations.find((x) => x.id === orgId);
    setSelectOrgItem({
      value: selectItem?.id,
      label: selectItem?.name,
    });
    userModalOpen();
  }

  return (
    <section className="min-h-screen bg-opacity-50 py-4 md:py-5 px-4 md:px-8">
      <PageHeader
        title="Organizations List"
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.CREATE
        )}
        onClick={open}
        buttonText="Add Organization"
      />

      {/* ==== Search ==== */}
      <Search size='sm' className="lg:pt-3" onChange={(e: string) => setSearchKeyword(e)} />

      {/* ==== Loading State ==== */}
      {loading && <OrganizationTableSkeleton numOfRows={6} />}

      {/* ==== Organization Empty List and List ==== */}

      {!loading && Number(organization?.organizations.length) > 0 && (
        <OrganizationTable
          organizationList={organization}
          activePage={activePage}
          handleDelete={handleDelete}
          totalCount={totalCount}
          setActivePage={setActivePage}
          handleUserModal={handleUserModal}
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={handleUserPermissions(
            permission,
            USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
            USER_PERMISSION_CAPABILITIES.DELETE
          )}
        />
      )}

      {Number(organization?.organizations?.length) === 0 && !loading && (
        <EmptyList />
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
        <UserCreateForm selectItem={selectOrgItem} close={userModalClose} />
      </Modal>

      {/* ==== Create Organization Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Add New Organization"
        centered
        size={"lg"}
      >
        <OrganizationForm
          close={close}
          editForm={editForm}
          setEditForm={setEditForm}
          refetchItem={refetch}
          setNewOrgList={setNewOrgList}
          handleUserPermissions={handleUserPermissions}
        />
      </Modal>
    </section>
  );
}

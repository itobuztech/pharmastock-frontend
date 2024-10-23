import { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import { Modal } from "@mantine/core";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ChildComponentProps, Pharmacies } from "interfaces/interfaces";
import { GetPharmacyList } from "query/pharmacy/pharmacyList";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { CreatePharmacyInput } from "gql/graphql";
import { toast } from "react-toastify";
import ConfirmationModal from "Components/ConfirmationModal";
import { DeletePharmacy } from "query/pharmacy/pharmacyDelete";
import PharmacyTable from "./components/PharmacyTable";
import PharmacyForm from "./components/PharmacyForm";
import EmptyList from "Components/EmptyList";
import Search from "Components/Search";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";
import WarehouseTableSkeleton from "Page/Warehouse/components/WarehouseTableSkeleton";

export default function Pharmacy({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [pharmacyList, setPharmacyList] = useState<Pharmacies["pharmacies"]>();
  const [activePage, setActivePage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [newPharmacyList, setNewPharmacyList] = useState<CreatePharmacyInput>();
  const [deletedId, setDeletedId] = useState<string>();
  const [totalCount, setTotalCount] = useState(1);
  const [editForm, setEditForm] = useState(true);
  const [searchKeyword, setSearchKeyword] = useDebouncedState("", 700);
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const permission = useAppSelector((state) => state.user.permission);
  /* ====== Pharmacy List Query ====== */
  const [fetchPharmacyList, { refetch, loading }] = useLazyQuery<Pharmacies>(
    GetPharmacyList,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const pharmaList = d.pharmacies;
          const total = d.pharmacies.total;
          const paginationCount = Math.ceil(total / 10);

          setPharmacyList(pharmaList);
          setTotalCount(paginationCount);
        }
      },
    }
  );

  /* ====== Pharmacy Delete Query ====== */
  const [deletePharmacy] = useMutation(DeletePharmacy, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
      refetch().then(({ data }) => {
        if (data) {
          const pharmaList = data.pharmacies;
          const total = data.pharmacies.total;
          const paginationCount = Math.ceil(total / 10);

          setPharmacyList(pharmaList);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Pharmacy Deleted Successfully");
    },
  });

  /* ====== Pharmacy Pagination Variable ====== */
  useEffect(() => {
    fetchPharmacyList({
      variables: {
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchKeyword,
      },
    });
  }, [fetchPharmacyList, activePage, refetch, searchKeyword]);

  /* ====== New Pharmacy Add In The List ====== */
  useEffect(() => {
    if (newPharmacyList) {
      refetch().then(({ data }) => {
        if (data) {
          const pharmaList = data.pharmacies;
          const total = data.pharmacies.total;
          const paginationCount = Math.ceil(total / 10);

          setPharmacyList(pharmaList);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newPharmacyList, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  /* ====== Handle Pharmacy Delete Function ====== */
  function handleDelete(pharmaId: string) {
    const deleteItem = pharmacyList?.pharmacies.find((x) => x.id === pharmaId);
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  function getDeletePharmacy() {
    deletePharmacy({
      variables: { deletePharmacyInput: { id: deletedId } },
    });
    deleteModalClose();
  }

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Pharmacy List"
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.CREATE
        )}
        onClick={open}
        buttonText="Add Pharmacy"
      />

      {/* ==== Search ==== */}
      <Search onChange={(e: string) => setSearchKeyword(e)} />

      {/* ==== Loading State ==== */}
      {loading && <WarehouseTableSkeleton numOfRows={6} />}

      {/* ==== Pharmacy List Empty List and List ==== */}

      {!loading && pharmacyList && pharmacyList?.pharmacies.length > 0 && (
        <PharmacyTable
          activePage={activePage}
          setActivePage={setActivePage}
          pharmacyList={pharmacyList}
          handleDelete={handleDelete}
          totalCount={totalCount}
          handleUserPermissions={handleUserPermissions}
          showDeleteButton={handleUserPermissions(
            permission,
            USER_PERMISSION_FIELDS.PHARMACY_MANAGEMENT,
            USER_PERMISSION_CAPABILITIES.DELETE
          )}
        />
      )}

      {!loading && Number(pharmacyList?.pharmacies.length) === 0 && (
        <EmptyList />
      )}

      {/* ==== Delete Confirmation Modal ==== */}
      <ConfirmationModal
        title="Pharmacy"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeletePharmacy()}
      />

      {/* ==== Create Pharmacy Modal ==== */}
      <Modal
        opened={opened}
        onClose={close}
        title="Add New Pharmacy"
        centered
        size={"lg"}
      >
        <PharmacyForm
          close={close}
          setNewPharmacyList={setNewPharmacyList}
          editForm={editForm}
          setEditForm={setEditForm}
          handleUserPermissions={handleUserPermissions}
        />
      </Modal>
    </section>
  );
}

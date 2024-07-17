import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import { LoadingOverlay, Modal } from "@mantine/core";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Pharmacies } from "interfaces/interfaces";
import { GetPharmacyList } from "query/pharmacy/pharmacyList";
import { useDisclosure } from "@mantine/hooks";
import { CreatePharmacyInput } from "gql/graphql";
import { toast } from "react-toastify";
import ConfirmationModal from "Components/ConfirmationModal";
import { DeletePharmacy } from "query/pharmacy/pharmacyDelete";
import PharmacyTable from "./components/PharmacyTable";
import PharmacyForm from "./components/PharmacyForm";
import EmptyList from "Components/EmptyList";

export default function Pharmacy() {
  const [pharmacyList, setPharmacyList] = useState<Pharmacies["pharmacies"]>();
  const [activePage, setActivePage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [newPharmacyList, setNewPharmacyList] = useState<CreatePharmacyInput>();
  const [deletedId, setDeletedId] = useState<string>();
  const [totalCount, setTotalCount] = useState(1);
  const [editForm, setEditForm] = useState(true);

  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);

  // Pharmacy list query
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

  // Pharmacy delete query
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
    },
  });

  useEffect(() => {
    fetchPharmacyList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [fetchPharmacyList, activePage, refetch]);

  // Update new pharmacy in list
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

  // Pharmacy delete
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

      {!pharmacyList?.pharmacies.length ? (
        <EmptyList />
      ) : (
        <PharmacyTable
          activePage={activePage}
          setActivePage={setActivePage}
          pharmacyList={pharmacyList}
          handleDelete={handleDelete}
          totalCount={totalCount}
        />
      )}
      <ConfirmationModal
        title="Pharmacy"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeletePharmacy()}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Pharmacy"
        centered
        size={"lg"}
      >
        <PharmacyForm
          close={close}
          setNewPharmacyList={setNewPharmacyList}
          editForm={editForm}
          setEditForm={setEditForm}
        />
      </Modal>
    </section>
  );
}

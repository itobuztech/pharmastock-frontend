import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import {
  Flex,
  Modal,
  Pagination,
  Space,
  Table,
  TextInput,
} from "@mantine/core";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Pharmacies } from "interfaces/interfaces";
import { GetPharmacyList } from "query/pharmacy/pharmacyList";
import { useDisclosure } from "@mantine/hooks";
import ButtonComponent from "Components/Button/ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { PharmacyCreate } from "query/pharmacy/pharmacyCreate";
import { CreatePharmacyInput } from "gql/graphql";
import { toast } from "react-toastify";
import ActionPopover from "Components/ActionPopover";
import ConfirmationModal from "Components/ConfirmationModal";
import { DeletePharmacy } from "query/pharmacy/pharmacyDelete";
import { useNavigate } from "react-router-dom";

export default function Pharmacy() {
  const [pharmacyList, setPharmacyList] = useState<Pharmacies>();
  const [activePage, setActivePage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [newPharmacyList, setNewPharmacyList] = useState<CreatePharmacyInput>();
  const [deletedId, setDeletedId] = useState<string>();
  const navigate = useNavigate();

  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);

  const schema = yup
    .object({
      name: yup.string().required(),
      contactInfo: yup.string().required(),
      location: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [pharmacyCreate, { loading: addLoading }] = useMutation(PharmacyCreate);

  const onSubmit = async (data: CreatePharmacyInput) => {
    console.log({ data });
    try {
      const response = await pharmacyCreate({
        variables: { createPharmacyInput: data },
      });
      toast.success("Pharmacy Created Successfully");
      reset();
      close();
      setNewPharmacyList(response.data);
      console.log({ response });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [fetchPharmacyList, { refetch }] = useLazyQuery(GetPharmacyList);
  const [deletePharmacy] = useMutation(DeletePharmacy);

  useEffect(() => {
    fetchPharmacyList().then((data) => {
      setPharmacyList(data.data || []);
    });
  }, [fetchPharmacyList]);

  useEffect(() => {
    if (newPharmacyList) {
      refetch().then(({ data }) => {
        console.log("data--->", data);
        setPharmacyList(data);
      });
    }
  }, [newPharmacyList, refetch]);

  function handleDelete(pharmaId: string) {
    const deleteItem = pharmacyList?.pharmacies.find((x) => x.id === pharmaId);
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  async function getDeletePharmacy() {
    try {
      await deletePharmacy({
        variables: { deletePharmacyInput: { id: deletedId } },
      });
      refetch().then(({ data }) => {
        if (data) {
          console.log({ data });
          // const orgs = data.pharmacy;
          // const total = data.organizations.total;
          // const paginationCount = Math.ceil(total / 10);
          setPharmacyList(data);
          // setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Pharmacy Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function screenSwitch(id: string) {
    navigate(`/dashboard/pharmacies/${id}`);
  }

  const rows = pharmacyList?.pharmacies.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.location}</Table.Td>
      <Table.Td>{item.contactInfo}</Table.Td>
      <Table.Td>
        <ActionPopover
          handleView={() => screenSwitch(item.id)}
          handleDelete={() => handleDelete(item.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-8 px-8">
      <PageHeader
        title="Pharmacy List"
        showCreateButton={true}
        onClick={open}
      />

      <div className="bg-white">
        {
          <Table horizontalSpacing="md" verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Sl No.</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Contact</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        }
        <Space h="md" />
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {
            <Pagination
              total={2}
              value={activePage}
              onChange={setActivePage}
              mt="sm"
            />
          }
        </Flex>
        <Space h="md" />
      </div>

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput placeholder="Name" {...register("name")} />
            {errors.name && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <TextInput
              placeholder="Contact Info"
              {...register("contactInfo")}
            />
            {errors.contactInfo && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <TextInput placeholder="Location" {...register("location")} />
            {errors.location && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="text-right">
            <ButtonComponent type="submit" loading={addLoading}>
              Create
            </ButtonComponent>
          </div>
        </form>
      </Modal>
    </section>
  );
}

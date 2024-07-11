import React, { useEffect, useState } from "react";
import PageHeader from "Components/PageHeader";
import {
  Flex,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  TextInput,
} from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CreateWarehouse } from "query/warehouse/warehouseCreate";
import { CreateWarehouseInput } from "gql/graphql";
import { toast } from "react-toastify";
import { GetWarehouseList } from "query/warehouse/warehouseList";
import { CreateWarehouses, Warehouses } from "interfaces/interfaces";
import ActionPopover from "Components/ActionPopover";
import { useNavigate } from "react-router-dom";
import { DeleteWarehouse } from "query/warehouse/warehouseDelete";
import ConfirmationModal from "Components/ConfirmationModal";

export default function Warehouse() {
  const [opened, { open, close }] = useDisclosure(false);
  const [warehouseList, setWarehouseList] = useState<Warehouses>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const [newWarehouseList, setNewWarehouseList] = useState();
  const [deletedId, setDeletedId] = useState<string>();
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);

  const schema = yup
    .object({
      // name: yup.string().required(),
      location: yup.string().required(),
      area: yup.string().required(),
      // organizationId: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createWarehouse, { loading: addLoading }] =
    useMutation(CreateWarehouse);

  const onSubmit = async (data: CreateWarehouseInput) => {
    try {
      const response = await createWarehouse({
        variables: { createWarehouseInput: data },
      });
      reset();
      close();
      toast.success("Warehouse Created Successfully");
      setNewWarehouseList(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [fetchWarehouseList, { refetch }] = useLazyQuery<CreateWarehouses>(
    GetWarehouseList,
    {
      onCompleted: (d) => {
        if (d) {
          const item = d.warehouses;
          const total = d.warehouses.total;
          const paginationCount = Math.ceil(total / 10);

          setWarehouseList(item);
          setTotalCount(paginationCount);
        }
      },
    }
  );

  useEffect(() => {
    fetchWarehouseList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchWarehouseList]);

  useEffect(() => {
    if (newWarehouseList) {
      refetch().then(({ data }) => {
        if (data) {
          const items = data.warehouses;
          const total = data.warehouses.total;
          const paginationCount = Math.ceil(total / 10);

          setWarehouseList(items);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newWarehouseList, refetch]);

  const [deleteWarehouse] = useMutation(DeleteWarehouse);

  function handleDelete(itemId: string) {
    const deleteItem = warehouseList?.warehouses.find((x) => x.id === itemId);
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  async function getDeleteWarehouse() {
    try {
      await deleteWarehouse({
        variables: { deleteWarehouseInput: { id: deletedId } },
      });
      refetch().then(({ data }) => {
        if (data) {
          const items = data.warehouses;
          const total = data.warehouses.total;
          const paginationCount = Math.ceil(total / 10);

          setWarehouseList(items);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Warehouse Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function screenSwitch(id: string) {
    navigate(`/dashboard/warehouse/${id}`);
  }

  const rows = warehouseList?.warehouses.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{item.location}</Table.Td>
      <Table.Td>{item.area}</Table.Td>
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
      <PageHeader title="Warehouse" showCreateButton={true} onClick={open} />

      <div className="bg-white">
        <Table horizontalSpacing="md" verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Sl No.</Table.Th>
              {/* <Table.Th>Name</Table.Th> */}
              <Table.Th>Location</Table.Th>
              <Table.Th>Area</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Space h="md" />
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Pagination
            total={totalCount}
            value={activePage}
            onChange={setActivePage}
            mt="sm"
          />
        </Flex>
        <Space h="md" />
      </div>

      <ConfirmationModal
        title="Warehouse"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteWarehouse()}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Warehouse"
        centered
        size={"sm"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="mb-4">
            <TextInput placeholder="Name" {...register("name")} />
            {errors.name && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div> */}
          <div className="mb-4">
            <TextInput placeholder="Location" {...register("location")} />
            {errors.location && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <TextInput placeholder="Area" {...register("area")} />
            {errors.area && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          {/* <div className="mb-4">
            <Controller
              name="organizationId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder="Pick value"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
              )}
            />
            {errors.organizationId && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div> */}

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

import React, { useEffect, useState } from "react";
import {
  Flex,
  Modal,
  Pagination,
  Space,
  Table,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ButtonComponent from "Components/Button/ButtonComponent";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CreateCategory } from "query/category/categoryCreate";
import { CreateItemCategoryInput } from "gql/graphql";
import { toast } from "react-toastify";
import { GetItemCategoryList } from "query/category/categoryList";
import { CreateItemCategories, ItemCategories } from "interfaces/interfaces";
import ActionPopover from "Components/ActionPopover";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "Components/ConfirmationModal";
import { CategoryItemDelete } from "query/category/categoryDelete";

export default function ItemCategory() {
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setActivePage] = useState(1);
  const [itemCategoryList, setItemCategoryList] = useState<ItemCategories>();
  const [totalCount, setTotalCount] = useState(1);
  const navigate = useNavigate();
  const [newCategoryList, setNewCategoryList] =
    useState<CreateItemCategoryInput>();
  const [deletedId, setDeletedId] = useState<string>();

  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);

  const schema = yup
    .object({
      name: yup.string().required(),
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

  const [createCategory, { loading: addLoading }] = useMutation(CreateCategory);
  const [fetchItemCategoryList, { refetch }] =
    useLazyQuery<CreateItemCategories>(GetItemCategoryList, {
      onCompleted: (d) => {
        if (d) {
          const itemCate = d.itemCategories;
          const total = d.itemCategories.total;
          const paginationCount = Math.ceil(total / 10);

          setItemCategoryList(itemCate);
          setTotalCount(paginationCount);
        }
      },
    });
  const [deleteCategory] = useMutation(CategoryItemDelete);

  const onSubmit = async (data: CreateItemCategoryInput) => {
    console.log({ data });
    try {
      const response = await createCategory({
        variables: { createItemCategoryInput: data },
      });
      toast.success("Pharmacy Created Successfully");
      reset();
      close();
      setNewCategoryList(response.data);
      console.log({ response });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchItemCategoryList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchItemCategoryList]);

  useEffect(() => {
    if (newCategoryList) {
      refetch().then(({ data }) => {
        if (data) {
          const itemCate = data.itemCategories;
          const total = data.itemCategories.total;
          const paginationCount = Math.ceil(total / 10);

          setItemCategoryList(itemCate);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newCategoryList, refetch]);

  console.log("kunal", newCategoryList);

  function screenSwitch(orgId: string) {
    navigate(`/dashboard/itemCategory/${orgId}`);
  }

  function handleDelete(catId: string) {
    const deleteItem = itemCategoryList?.itemCategories.find(
      (x) => x.id === catId
    );
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  async function getDeleteCategory() {
    try {
      await deleteCategory({
        variables: { deleteItemCategoryInput: { id: deletedId } },
      });
      refetch().then(({ data }) => {
        if (data) {
          console.log({ data });
          const itemCate = data.itemCategories;
          const total = data.itemCategories.total;
          const paginationCount = Math.ceil(total / 10);

          setItemCategoryList(itemCate);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Pharmacy Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const rows = itemCategoryList?.itemCategories.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>12</Table.Td>
      <Table.Td>23</Table.Td>
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
      <PageHeader title="Category" showCreateButton={true} onClick={open} />

      <Table horizontalSpacing="md" verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sl No.</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Items</Table.Th>
            <Table.Th>Stock</Table.Th>
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

      <ConfirmationModal
        title="Category"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteCategory()}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Category"
        centered
        size={"sm"}
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

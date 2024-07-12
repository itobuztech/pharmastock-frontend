import React, { useEffect, useState } from "react";
import {
  Flex,
  Modal,
  MultiSelect,
  Pagination,
  Select,
  Space,
  Table,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import ButtonComponent from "Components/Button/ButtonComponent";
import { GetItemCategoryList } from "query/category/categoryList";
import {
  CreateItemCategories,
  ItemCategories,
  ItemLists,
  Items,
} from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ItemCreate } from "query/item/itemCreate";
import { CreateItemInput } from "gql/graphql";
import { GetItemLists } from "query/item/itemList";
import { useNavigate } from "react-router-dom";
import ActionPopover from "Components/ActionPopover";
import ConfirmationModal from "Components/ConfirmationModal";
import { ItemDelete } from "query/item/itemDelete";
import { toast } from "react-toastify";
import { FaRegSadTear } from "react-icons/fa";

export default function ItemList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryList, setCategoryList] = useState<ItemCategories>();
  const [itemList, setItemList] = useState<Items>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [deletedId, setDeletedId] = useState<string>();
  const [newItemList, setNewItemList] = useState();
  const navigate = useNavigate();
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);

  const schema = yup
    .object({
      // name: yup.string().required(),
      baseUnit: yup.string().required(),
      hsnCode: yup.string().required(),
      instructions: yup.string().required(),
      wholesalePrice: yup.number(),
      mrpBaseUnit: yup.number(),
      // category: yup.string(),
      category: yup.array().of(yup.string()).required(),
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

  const [fetchItemCategoryList] = useLazyQuery<CreateItemCategories>(
    GetItemCategoryList,
    {
      onCompleted: (d) => {
        if (d) {
          const itemCate = d.itemCategories;
          setCategoryList(itemCate);
        }
      },
    }
  );
  const [itemCreate] = useMutation(ItemCreate);

  useEffect(() => {
    fetchItemCategoryList();
  }, [fetchItemCategoryList]);

  // console.log(categoryList);

  const selectCatItem = categoryList?.itemCategories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const onSubmit = async (data: CreateItemInput) => {
    console.log({ data });
    try {
      const response = await itemCreate({
        variables: { createItemInput: data },
      });
      console.log({ response });
      toast.success("Item Created Successfully");
      reset();
      close();
      setNewItemList(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [fetchItemList, { refetch }] = useLazyQuery<ItemLists>(GetItemLists, {
    onCompleted: (d) => {
      if (d) {
        const items = d.items;
        const total = d.items.total;
        const paginationCount = Math.ceil(total / 10);
        setItemList(items);
        setTotalCount(paginationCount);
      }
    },
  });
  const [deleteCategory] = useMutation(ItemDelete);

  useEffect(() => {
    fetchItemList({
      variables: {
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
      },
    });
  }, [activePage, fetchItemList]);

  useEffect(() => {
    if (newItemList) {
      refetch().then(({ data }) => {
        if (data) {
          const itemCate = data.items;
          const total = data.items.total;
          const paginationCount = Math.ceil(total / 10);
          setItemList(itemCate);
          setTotalCount(paginationCount);
        }
      });
    }
  }, [newItemList, refetch]);

  console.log({ itemList });

  function screenSwitch(itemId: string) {
    navigate(`/dashboard/items/${itemId}`);
  }

  function handleDelete(catId: string) {
    const deleteItem = itemList?.items.find((x) => x.id === catId);
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  async function getDeleteItem() {
    try {
      await deleteCategory({
        variables: { deleteItemInput: { id: deletedId } },
      });
      refetch().then(({ data }) => {
        if (data) {
          const item = data.items;
          const total = data.items.total;
          const paginationCount = Math.ceil(total / 10);

          setItemList(item);
          setTotalCount(paginationCount);
        }
      });
      deleteModalClose();
      toast.success("Item Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const rows = itemList?.items.map((item, i) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {activePage === 1 ? i + 1 : (activePage - 1) * 10 + (i + 1)}
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>{item.baseUnit}</Table.Td>
      <Table.Td>{item.hsnCode}</Table.Td>
      <Table.Td>{item.instructions}</Table.Td>
      <Table.Td>{item.wholesalePrice}</Table.Td>
      <Table.Td>{item.mrpBaseUnit}</Table.Td>
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
      <PageHeader title="Items" showCreateButton={true} onClick={open} />

      {!itemList?.items.length ? (
        <div className="text-center h-96 items-center justify-center flex">
          <div>
            <FaRegSadTear size={60} className="text-teal-400" />
            <h3 className="mt-0">No Records</h3>
          </div>
        </div>
      ) : (
        <div className="bg-white">
          <Table horizontalSpacing="md" verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Sl No.</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Base Unit</Table.Th>
                <Table.Th>HSN Code</Table.Th>
                <Table.Th>Instructions</Table.Th>
                <Table.Th>Wholesale Price</Table.Th>
                <Table.Th>MRP Base unit</Table.Th>
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
      )}

      <ConfirmationModal
        title="Item"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteItem()}
      />

      <Modal opened={opened} onClose={close} title="Item" centered size={"sm"}>
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
            <TextInput placeholder="Unit" {...register("baseUnit")} />
            {errors.baseUnit && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <TextInput placeholder="HSN Code" {...register("hsnCode")} />
            {errors.hsnCode && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <Textarea
              placeholder="Instructions"
              {...register("instructions")}
            />
            {errors.instructions && (
              <span className="text-red-500 mt-2 block text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <TextInput
              placeholder="Wholesale Price"
              {...register("wholesalePrice")}
            />
          </div>
          <div className="mb-4">
            <TextInput
              placeholder="MRP Base unit"
              {...register("mrpBaseUnit")}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  placeholder="Select category"
                  data={selectCatItem}
                  maxDropdownHeight={300}
                  onChange={(value) => field.onChange(value)}
                  value={field.value || []}
                />
              )}
            />
          </div>
          <div className="text-right">
            <ButtonComponent type="submit">Create</ButtonComponent>
          </div>
        </form>
      </Modal>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { LoadingOverlay, Modal, Select, Slider, Text } from "@mantine/core";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import PageHeader from "Components/PageHeader";
import { ChildComponentProps, ItemLists, Items } from "interfaces/interfaces";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GetItemLists } from "query/item/itemList";
import ConfirmationModal from "Components/ConfirmationModal";
import { ItemDelete } from "query/item/itemDelete";
import { toast } from "react-toastify";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";
import EmptyList from "Components/EmptyList";
import Search from "Components/Search";
import { BaseUnit } from "gql/graphql";
import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { useAppSelector } from "Lib/Store/hooks";

export default function ItemList({
  handleUserPermissions,
}: Readonly<ChildComponentProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const [itemList, setItemList] = useState<Items>();
  const [totalCount, setTotalCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [deletedId, setDeletedId] = useState<string>();
  const [newItemList, setNewItemList] = useState();
  const [
    deleteModalOpened,
    { open: deleteModalOpen, close: deleteModalClose },
  ] = useDisclosure(false);
  const [editForm, setEditForm] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [wholeSaleRange, setWholeSaleRange] = useState<number>(0);

  const [value, setValue] = useState(50);
  const [endValue, setEndValue] = useState(50);

  const permission = useAppSelector((state) => state.user.permission);
  const [fetchItemList, { refetch, loading }] = useLazyQuery<ItemLists>(
    GetItemLists,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const items = d.items;
          const total = d.items.total;
          const paginationCount = Math.ceil(total / 10);
          setItemList(items);
          setTotalCount(paginationCount);
        }
      },
    }
  );

  useEffect(() => {
    fetchItemList({
      variables: {
        filterArgs: {
          baseUnit: selectedUnit,
          mrpBaseUnit: null,
          wholeSalePrice: null,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
  }, [activePage, fetchItemList, refetch, searchInput, selectedUnit]);

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

  const [deleteCategory] = useMutation(ItemDelete, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: () => {
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
    },
  });

  function handleDelete(catId: string) {
    const deleteItem = itemList?.items.find((x) => x.id === catId);
    setDeletedId(deleteItem?.id);
    deleteModalOpen();
  }

  function getDeleteItem() {
    deleteCategory({
      variables: { deleteItemInput: { id: deletedId } },
    });
  }

  /* ====== Handle Search Function ====== */
  const handleSearch = useDebouncedCallback(async (searchInput: string) => {
    fetchItemList({
      variables: {
        filterArgs: {
          baseUnit: selectedUnit,
          mrpBaseUnit: null,
          wholeSalePrice: null,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchInput,
      },
    });
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  const baseUnitArray = Object.values(BaseUnit);

  const handleUnitChange = (unit: string | null) => {
    setSelectedUnit(unit);
    fetchItemList({
      variables: {
        filterArgs: {
          baseUnit: selectedUnit,
          mrpBaseUnit: null,
          wholeSalePrice: null,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
  };

  const changeRange = useDebouncedCallback(
    async ({ price }: { price: number }) => {
      setWholeSaleRange(price);
      fetchItemList({
        variables: {
          filterArgs: {
            baseUnit: selectedUnit,
            mrpBaseUnit: null,
            wholeSalePrice:
              wholeSaleRange !== undefined ? wholeSaleRange : null,
          },
          pagination: true,
          paginationArgs: {
            skip: activePage * 10 - 10,
            take: 10,
          },
          searchText: "",
        },
      });
    },
    500
  );

  const maxWholesalePrice = itemList?.items.reduce((maxPrice, item) => {
    return item.wholesalePrice > maxPrice ? item.wholesalePrice : maxPrice;
  }, 0);

  console.log({ maxWholesalePrice });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title="Items"
        showCreateButton={handleUserPermissions(
          permission,
          USER_PERMISSION_FIELDS.ORGANIZATION_MANAGEMENT,
          USER_PERMISSION_CAPABILITIES.CREATE
        )}
        onClick={open}
        buttonText="Add Item"
      />

      {/* ==== Search ==== */}
      <Search handleChange={handleChange} searchInput={searchInput} />

      <Select
        label="Unit"
        placeholder="Unit"
        data={baseUnitArray}
        onChange={handleUnitChange}
        value={selectedUnit}
        disabled={!editForm}
      />

      <Slider
        value={value}
        max={maxWholesalePrice}
        onChange={setValue}
        onChangeEnd={(val) => changeRange({ price: val })}
      />

      {/* <Slider
        value={wholeSaleRange}
        min={0}
        max={maxWholesalePrice}
        onChange={(val) => changeRange({ price: val })}
      /> */}

      {/* <Range
        step={0.1}
        min={0}
        max={100}
        values={wholeSaleRange}
        onChange={(val) => changeRange({ price: val })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              backgroundColor: "#999",
            }}
          />
        )}
      /> */}

      {/* <Checkbox.Group
        label="Select your favorite frameworks/libraries"
        description="This is anonymous"
        // value={selectedUnit}
        // onChange={handleUnitChange}
      >
        <Group mt="xs">
          {baseUnitArray.map((item) => (
            <Checkbox value={item} label={item} />
          ))}
        </Group>
      </Checkbox.Group> */}

      {loading && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}

      {itemList?.items.length === 0 ? (
        <EmptyList />
      ) : (
        <ItemTable
          itemList={itemList}
          activePage={activePage}
          handleDelete={handleDelete}
          totalCount={totalCount}
          setActivePage={setActivePage}
          handleUserPermissions={handleUserPermissions}
        />
      )}

      <ConfirmationModal
        title="Item"
        modalOpen={deleteModalOpened}
        modalClose={deleteModalClose}
        deleteItem={() => getDeleteItem()}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Add New Item"
        centered
        size={"lg"}
      >
        <ItemForm
          close={close}
          editForm={editForm}
          setEditForm={setEditForm}
          setNewItemList={setNewItemList}
          refetchItem={refetch}
        />
      </Modal>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { Button, Popover, Select, Text } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { BiFilter } from "react-icons/bi";
import {
  useLazyQuery,
} from "@apollo/client";
import { toast } from "react-toastify";
import { DatePickerInput } from "@mantine/dates";

import { CreateWarehouses, Warehouses } from "interfaces/interfaces";
import useGetStocksMovementLot from "../Hooks/useGetStocksMovementLot";
import { GetWarehouseList } from "query/warehouse/warehouseList";
import { StockMovementsType } from "gql/graphql";

export default function StockMovementFilter({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { control, reset } = useForm();
  const [popOverOpened, setPopOverOpened] = useState(false);
  const [warehouseList, setWarehouseList] = useState<Warehouses>();

  // State for filter values
  const [filters, setFilters] = useState({
    warehouseId: "",
    transactionType: null,
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [filterApplied, setFilterApplied] = useState(false);

  useGetStocksMovementLot({
    searchKeyword: searchInput,
    warehouseId: filters.warehouseId,
    startDate: filters.startDate,
    endDate: filters.endDate,
    transactionType: filters.transactionType
  });

  const onSubmit = () => {
    setFilters({
      warehouseId: filters.warehouseId,
      transactionType: filters.transactionType,
      startDate: dateRange[0],
      endDate: dateRange[1],
    });

    setPopOverOpened(false);
    setFilterApplied(true);
  };

  // Effect to trigger API call when filters change
  useEffect(() => {
    if (filterApplied) {
    //   fetchStockData();
      setFilterApplied(false); // Reset to prevent further calls
    }
  }, [filters, filterApplied]);

  const [fetchWarehouseList] = useLazyQuery<CreateWarehouses>(
    GetWarehouseList,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const item = d.warehouses;
          setWarehouseList(item);
        }
      },
    }
  );

  useEffect(() => {
    fetchWarehouseList();
  }, [fetchWarehouseList]);

  const handleClearFilters = () => {
    setSearchInput("");
    setDateRange([null, null]);

    setFilters({
      warehouseId: "",
      transactionType: null,
      startDate: null,
      endDate: null,
    });

    reset({
      endDate: null,
      qty: null,
      startDate: null,
    });
    setPopOverOpened(false);
  };

  const handlePopoverClose = () => {
    if (!filterApplied) {
      setDateRange([null, null]);
      reset({
        endDate: null,
        qty: null,
        startDate: null,
      });
    }
  };

  const selectWarehouseItems = warehouseList?.warehouses?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Popover
      width={300}
      position="bottom-start"
      withArrow
      shadow="md"
      opened={popOverOpened}
      onChange={setPopOverOpened}
      onClose={handlePopoverClose}
    >
      <Popover.Target>
        <Button
          leftSection={<BiFilter size={24} />}
          onClick={() => setPopOverOpened((o) => !o)}
        >
          Filter
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="popOver">
     
          <div className="flex-1 datePicker">
            <Text size="md" fw={700} className="mb-2">
              Select Date
            </Text>
            <DatePickerInput
              name="date"
              type="range"
              placeholder="Pick dates range"
              value={dateRange}
              onChange={setDateRange}
              popoverProps={{ withinPortal: false }}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="warehouseId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Select Warehouse"
                  placeholder="Select Warehouse"
                  onChange={(value) => {
                    field.onChange(value);
                    setFilters((prev) => ({
                      ...prev,
                      warehouseId: String(value),
                    }));
                  }}
                  value={filters.warehouseId}
                  data={selectWarehouseItems}
                  maxDropdownHeight={300}
                />
              )}
            />
          </div>

          <div className="mt-4">
            <Select
              label="Transaction Type"
              placeholder="Select Transaction Type"
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  transactionType: value || null as any,
                }))
              }
              data={[
                { value: StockMovementsType.Entry, label: "Entry" },
                { value: StockMovementsType.Exit, label: "Exit" },
                { value: StockMovementsType.Movement, label: "Movement" },
              ]}
              maxDropdownHeight={150}
            />
          </div>

          <Button type="submit" fullWidth className="mt-8" onClick={onSubmit}>
            Apply filter
          </Button>
          <Button
            type="button"
            className="mt-3"
            fullWidth
            variant="outline"
            onClick={handleClearFilters}
          >
            Clear
          </Button>

      </Popover.Dropdown>
    </Popover>
  );
}

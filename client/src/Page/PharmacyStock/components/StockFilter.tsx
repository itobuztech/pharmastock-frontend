import React, { useState } from "react";
import { Button, Popover, Slider, Text } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { BiFilter } from "react-icons/bi";
import {
  LazyQueryExecFunction,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import {
  PharmacyStockQty,
  PharmacyStocksLists,
  WarehouseStockQty,
  WarehouseStocksData,
} from "interfaces/interfaces";
import { DatePickerInput } from "@mantine/dates";
import { GetPharmacyStockQty } from "query/pharmacyStock/pharmacyStockQty";
import { GetWarehouseStockQty } from "query/warehouse/warehouseStockQty";

export default function StockFilter({
  sliderValue,
  setSliderValue,
  fetchStockList,
  warehouseList,
  activePage,
  searchInput,
  setSearchInput,
}: {
  sliderValue: number;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  fetchStockList:
    | LazyQueryExecFunction<PharmacyStocksLists, OperationVariables>
    | LazyQueryExecFunction<WarehouseStocksData, OperationVariables>;
  warehouseList?: boolean;
  activePage: number;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { handleSubmit, control, reset } = useForm();
  const [popOverOpened, setPopOverOpened] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [filterValue, setFilterValue] = useState(false);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const onSubmit = () => {
    fetchStockList({
      variables: {
        filterArgs: {
          endDate: endDate,
          qty: sliderValue,
          startDate: startDate,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchInput,
      },
    });
    setPopOverOpened(false);
    setFilterValue(true);
  };

  const handleClearFilters = () => {
    setSliderValue(0);
    setSearchInput("");
    setDateRange([null, null]);

    reset({
      endDate: null,
      qty: null,
      startDate: null,
    });

    fetchStockList({
      variables: {
        filterArgs: {
          endDate: null,
          qty: null,
          startDate: null,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: "",
      },
    });
    setPopOverOpened(false);
  };

  const { data: pharmacyStockQty } =
    useQuery<PharmacyStockQty>(GetPharmacyStockQty);

  const { data: warehouseStockQty } =
    useQuery<WarehouseStockQty>(GetWarehouseStockQty);

  const handlePopoverClose = () => {
    if (!filterValue) {
      setDateRange([null, null]);
      setSliderValue(0);
      reset({
        endDate: null,
        qty: null,
        startDate: null,
      });
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Text size="md" fw={700} className="mb-4">
              Quantity
            </Text>
            <Controller
              name="qty"
              control={control}
              render={({ field }) => (
                <Slider
                  value={sliderValue}
                  min={0}
                  max={
                    warehouseList
                      ? warehouseStockQty?.maxWarehouseStockQty.totalQty
                      : pharmacyStockQty?.maxPharmacyStockQty.totalQty
                  }
                  step={1}
                  onChange={handleSliderChange}
                  onChangeEnd={(val) => field.onChange(val)}
                />
              )}
            />
          </div>
          <Button type="submit" fullWidth className="mt-8">
            Apply filter
          </Button>
          <Button
            type="submit"
            className="mt-3"
            fullWidth
            variant="outline"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}

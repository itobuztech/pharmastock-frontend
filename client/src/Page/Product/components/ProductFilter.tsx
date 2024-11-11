import React, { useState } from "react";
import { Checkbox, Group, Slider, Text } from "@mantine/core";
import { BaseUnit } from "gql/graphql";
import { Controller, useForm } from "react-hook-form";
import {
  LazyQueryExecFunction,
  OperationVariables,
  useQuery,
} from "@apollo/client";

import { ItemLists, MaxPriceData } from "interfaces/interfaces";
import { GetItemMaxPrice } from "query/item/itemMaxPrice";
import CustomPopover from "CustomPopover.tsx/CustomPopover";

const baseUnitArray = Object.values(BaseUnit);

export default function ProductFilter({
  selectedUnit,
  sliderValue,
  sliderValueMrp,
  setSelectedUnit,
  setSliderValue,
  setSliderValueMrp,
  fetchItemList,
  activePage,
  searchInput,
  setSearchInput,
}: {
  selectedUnit: string[];
  sliderValue: number;
  sliderValueMrp: number;
  setSelectedUnit: React.Dispatch<React.SetStateAction<string[]>>;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  setSliderValueMrp: React.Dispatch<React.SetStateAction<number>>;
  fetchItemList: LazyQueryExecFunction<ItemLists, OperationVariables>;
  activePage: number;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { handleSubmit, control, reset } = useForm();
  const [opened, setOpened] = useState(false);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const handleMrpSliderChange = (value: number) => {
    setSliderValueMrp(value);
    console.log(value);
  };

  const handleUnitChange = (unit: string[]) => {
    setSelectedUnit(unit);
  };

  const handleApplyFilter = () => {
    fetchItemList({
      variables: {
        filterArgs: {
          baseUnit: selectedUnit,
          mrpBaseUnit: sliderValueMrp,
          wholeSalePrice: sliderValue,
        },
        pagination: true,
        paginationArgs: {
          skip: activePage * 10 - 10,
          take: 10,
        },
        searchText: searchInput,
      },
    });
    setOpened(false);
  };

  const handleClearFilters = () => {
    setSelectedUnit([]);
    setSliderValue(0);
    setSliderValueMrp(0);
    setSearchInput("");
    reset({
      baseUnit: null,
      mrpBaseUnit: null,
      wholeSalePrice: null,
    });
    fetchItemList({
      variables: {
        filterArgs: {
          baseUnit: null,
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
    setOpened(false);
  };

  const { data: maxPrice } = useQuery<MaxPriceData>(GetItemMaxPrice);

  return (
    <CustomPopover
      popoverOpened={opened}
      setPopoverOpened={setOpened}
      handleApplyFilter={handleApplyFilter}
      handleClearFilters={handleClearFilters}
    >
      <form onSubmit={handleSubmit(handleApplyFilter)}>
        <Text size="md" fw={700} className="mb-4">
          Base Unit
        </Text>
        <Controller
          name="baseUnit"
          control={control}
          render={({ field }) => (
            <Checkbox.Group
              {...field}
              value={selectedUnit}
              onChange={handleUnitChange}
            >
              <Group mt="xs">
                {baseUnitArray.map((item) => (
                  <div key={item} className="w-full">
                    <Checkbox value={item} label={item} />
                  </div>
                ))}
              </Group>
            </Checkbox.Group>
          )}
        />

        <div className="mt-4">
          <Text size="md" fw={700} className="mb-4">
            MRP Base Unit Price
          </Text>
          <Controller
            name="mrpBaseUnit"
            control={control}
            render={({ field }) => (
              <Slider
                value={sliderValueMrp}
                min={0}
                max={maxPrice?.maxPrice.mrpBaseUnit}
                step={1}
                onChange={handleMrpSliderChange}
                onChangeEnd={(val) => field.onChange(val)}
              />
            )}
          />
        </div>

        <div className="mt-4">
          <Text size="md" fw={700} className="mb-4">
            Wholesale Price
          </Text>
          <Controller
            name="wholesalePrice"
            control={control}
            render={({ field }) => (
              <Slider
                value={sliderValue}
                min={0}
                max={maxPrice?.maxPrice.wholesalePrice}
                step={1}
                onChange={handleSliderChange}
                onChangeEnd={(val) => field.onChange(val)}
              />
            )}
          />
        </div>
      </form>
    </CustomPopover>
  );
}

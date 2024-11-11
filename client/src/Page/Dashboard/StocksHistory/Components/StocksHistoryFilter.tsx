import React, { useEffect, useState } from "react";
import { Select, Text } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { DatePickerInput } from "@mantine/dates";

import { CreateWarehouses, Warehouses } from "interfaces/interfaces";
import { GetWarehouseList } from "query/warehouse/warehouseList";
import { StockMovementsType, UserRole } from "gql/graphql";
import { useAppSelector } from "Lib/Store/hooks";
import CustomPopover from "CustomPopover.tsx/CustomPopover";

export interface FilterData {
  warehouseId: string | null;
  transactionType: StockMovementsType | null;
  startDate: Date | null;
  endDate: Date | null;
}

export default function StocksHistoryFilter({
  setSearchInput,
  setFilterData,
}: {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData | undefined>>;
}) {
  const [popOverOpened, setPopOverOpened] = useState(false);
  const [warehouseList, setWarehouseList] = useState<Warehouses>();
  const [transactionType, setTransactionType] = useState<StockMovementsType>();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [warehouseId, setWarehouseId] = useState("");
  const user = useAppSelector((state) => state.user);

  const handleApplyFilter = () => {
    setFilterData({
      warehouseId: warehouseId || null,
      transactionType: transactionType || null,
      startDate: dateRange[0],
      endDate: dateRange[1],
    });

    setPopOverOpened(false);
  };

  const [fetchWarehouseList] = useLazyQuery<CreateWarehouses>(
    GetWarehouseList,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          setWarehouseList(d.warehouses);
        }
      },
    }
  );

  useEffect(() => {
    fetchWarehouseList();
  }, [fetchWarehouseList]);

  const handleClearFilters = () => {
    setSearchInput("");
    setWarehouseId("");
    setTransactionType(undefined);
    setDateRange([null, null]);
    setFilterData(undefined);
    setPopOverOpened(false);
  };

  const selectWarehouseItems = warehouseList?.warehouses?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <CustomPopover
      popoverOpened={popOverOpened}
      setPopoverOpened={setPopOverOpened}
      handleApplyFilter={handleApplyFilter}
      handleClearFilters={handleClearFilters}
    >
      <Text size="md" fw={700}>
        Select Date
      </Text>

      <div className="flex-1 datePicker mt-2">
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
        <Select
          label="Select Warehouse"
          placeholder="Select Warehouse"
          onChange={(value) => setWarehouseId(String(value))}
          value={warehouseId}
          data={selectWarehouseItems}
          maxDropdownHeight={300}
        />
      </div>

      {user.role !== UserRole.Staff && (
        <div className="mt-4">
          <Select
            label="Transaction Type"
            placeholder="Select Transaction Type"
            onChange={(value) =>
              setTransactionType(value as StockMovementsType)
            }
            value={transactionType || undefined}
            data={[
              { value: StockMovementsType.Entry, label: "Entry" },
              { value: StockMovementsType.Exit, label: "Exit" },
              { value: StockMovementsType.Movement, label: "Movement" },
            ]}
            maxDropdownHeight={150}
          />
        </div>
      )}
    </CustomPopover>
  );
}

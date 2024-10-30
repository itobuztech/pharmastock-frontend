import React from "react";
import {
  Card,
  Flex,
  Space,
  Text,
  Badge,
  Group,
  Button,
  Divider,
} from "@mantine/core";
import { format, parseISO } from "date-fns";

import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions } from "interfaces/interfaces";
import { StockMovementsByLotName } from "../Hooks/useGetStocksHistoryDetails";
import appConfig from "Lib/appConfig";

interface StockMovementDetailsProps {
  noOfPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setNoOfPage: React.Dispatch<React.SetStateAction<number>>;
  stocksMovementList: StockMovementsByLotName | null | undefined;
  loadingState: boolean;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function StocksHistoryDetailsCards({
  noOfPage,
  setCurrentPage,
  stocksMovementList,
  loadingState,
  setNoOfPage,
}: Readonly<StockMovementDetailsProps>) {
  const handlePageChange = () => {
    setCurrentPage(noOfPage);
    setNoOfPage(noOfPage + appConfig.pagination.defaultPage);
  };

  const cards =
    stocksMovementList &&
    stocksMovementList.stockMovementsByLotName.map((item) => (
      <div className="p-2" key={item.id}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group className="flex justify-between items-center mb-2">
            <Text className="text-lg font-bold capitalize text-gray-900">
              {item.item}
            </Text>
            <Badge
              color="blue"
              variant="light"
              size="md"
              radius="md"
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm font-semibold"
            >
              {item.transactionType}
            </Badge>
          </Group>
          <Divider />

          <div className="grid grid-cols-2 text-gray-800 mt-2">
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-800">Organisation</Text>
              <Text className="font-medium text-gray-700">
                {item.organisation}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-800">Warehouse</Text>
              <Text className="font-medium text-gray-700">
                {item.warehouse ?? "N/A"}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-800">Pharmacy</Text>
              <Text className="font-medium text-gray-700">
                {item.pharmacy ?? "N/A"}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-800">
                Pharmacy Clearance
              </Text>
              <Text className="font-medium text-gray-700">
                {item.pharmacyClearance ?? "N/A"}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-800">Qty</Text>
              <Text className="font-medium text-gray-700">{item.qty}</Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-800">Batch</Text>
              <Text className="font-medium text-gray-700">
                {item.batchName}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-800">Created On</Text>
              <Text className="font-medium text-gray-700">
                {format(parseISO(item.createdAt), "MM/dd/yyyy")}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-800">Updated On</Text>
              <Text className="font-medium text-gray-700">
                {format(parseISO(item.updatedAt), "MM/dd/yyyy")}
              </Text>
            </div>

            <div className="p-2">
              <Text className="font-bold text-gray-800">Expiry Date</Text>
              <Text className="font-medium text-gray-700">
                {item.expiry
                  ? format(parseISO(String(item.expiry)), "MM/dd/yyyy")
                  : "N/A"}
              </Text>
            </div>
          </div>
        </Card>
      </div>
    ));

  return (
    <div className="bg-white overflow-auto p-4">
      <div className="p-3 text-gray-800 text-xl font-bold">{`Lot Name: ${stocksMovementList?.stockMovementsByLotName[0].lotName}`}</div>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {cards && cards.length > 0 && cards}
      </div>
      <Space h="md" />
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {!loadingState &&
          Number(stocksMovementList?.total) > 0 &&
          Number(stocksMovementList?.total) !==
            stocksMovementList?.stockMovementsByLotName?.length && (
            <div className="flex items-center pl-5 font-medium text-xl">
              <Button
                variant="transparent"
                size="md"
                onClick={handlePageChange}
              >
                Show more
              </Button>
            </div>
          )}
      </Flex>
      <Space h="md" />
    </div>
  );
}

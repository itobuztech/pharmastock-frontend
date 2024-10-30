import React from "react";
import {
  Card,
  Flex,
  Pagination,
  Space,
  Text,
  Badge,
  Group,
} from "@mantine/core";
import { format, parseISO } from "date-fns";

import {
  USER_PERMISSION_CAPABILITIES,
  USER_PERMISSION_FIELDS,
} from "enums/enums";
import { Permissions } from "interfaces/interfaces";
import { StockMovementsByLotName } from "../Hooks/useGetStocksHistoryDetails";

interface StockMovementDetailsProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  stocksMovementList: StockMovementsByLotName | null | undefined;
  totalCount: number;
  handleUserPermissions: (
    permission: Permissions,
    field: USER_PERMISSION_FIELDS,
    capabilities: USER_PERMISSION_CAPABILITIES
  ) => boolean;
}

export default function StocksHistoryDetailsCards({
  activePage,
  setActivePage,
  totalCount,
  stocksMovementList,
}: Readonly<StockMovementDetailsProps>) {
  const cards =
    stocksMovementList &&
    stocksMovementList.stockMovementsByLotName.map((item) => (
      <div className="p-2" key={item.id}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group className="flex justify-between items-center mb-4">
            <Text className="text-xl font-bold capitalize text-gray-800">
              Batch: {item.batchName}
            </Text>
            <Badge
              color="blue"
              variant="light"
              size="lg"
              radius="md"
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm font-semibold"
            >
              {item.transactionType}
            </Badge>
          </Group>

          <div className="grid grid-cols-2 text-gray-700">
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-600">Created On</Text>
              <Text className="font-medium text-gray-800">
                {format(parseISO(item.createdAt), "MM/dd/yyyy")}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-600">Updated On</Text>
              <Text className="font-medium text-gray-800">
                {format(parseISO(item.updatedAt), "MM/dd/yyyy")}
              </Text>
            </div>
            <div className="p-2">
              <Text className="font-bold text-gray-600">Lot Name</Text>
              <Text className="font-medium text-gray-800">{item.lotName}</Text>
            </div>

            <div className="p-2 border-b">
              <Text className="font-bold text-gray-600">Product</Text>
              <Text className="font-medium text-gray-800">{item.item}</Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-600">Organisation</Text>
              <Text className="font-medium text-gray-800">
                {item.organisation}
              </Text>
            </div>

            <div className="p-2 border-b">
              <Text className="font-bold text-gray-600">Warehouse</Text>
              <Text className="font-medium text-gray-800">
                {item.warehouse ?? "N/A"}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-600">Pharmacy</Text>
              <Text className="font-medium text-gray-800">
                {item.pharmacy ?? "N/A"}
              </Text>
            </div>

            <div className="p-2 border-b">
              <Text className="font-bold text-gray-600">
                Pharmacy Clearance
              </Text>
              <Text className="font-medium text-gray-800">
                {item.pharmacyClearance ?? "N/A"}
              </Text>
            </div>
            <div className="p-2">
              <Text className="font-bold text-gray-600">Expiry Date</Text>
              <Text className="font-medium text-gray-800">
                {item.expiry
                  ? format(parseISO(String(item.expiry)), "MM/dd/yyyy")
                  : "N/A"}
              </Text>
            </div>
            <div className="p-2 border-b">
              <Text className="font-bold text-gray-600">Qty</Text>
              <Text className="font-medium text-gray-800">{item.qty}</Text>
            </div>
          </div>
        </Card>
      </div>
    ));

  return (
    <div className="bg-white overflow-auto p-4">
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
        <Pagination
          total={totalCount}
          value={activePage}
          onChange={setActivePage}
          mt="sm"
        />
      </Flex>
      <Space h="md" />
    </div>
  );
}

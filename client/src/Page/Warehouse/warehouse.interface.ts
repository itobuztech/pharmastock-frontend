import {
    CreateWarehouseStockInput,
    Warehouse,
    WarehouseStock,
  } from "gql/graphql";
  import {
    Permissions,
  } from "interfaces/interfaces";
  import {
    USER_PERMISSION_CAPABILITIES,
    USER_PERMISSION_FIELDS,
  } from "enums/enums";

export interface WarehouseStockFormProps {
    close?: () => void;
    warehouseDetails?: { warehouse: Warehouse };
    selectOrgItem?:
      | {
          value: string;
          label: string;
        }[];
    id?: string;
    selectWarehouseItem?:
      | {
          value: string;
          label: string;
        }[];
    warehouseStockDetails?: {
      warehouseStock: WarehouseStock;
    };
    refetchItem: () => void;
    setNewWarehouseStockList?: React.Dispatch<
      React.SetStateAction<CreateWarehouseStockInput | undefined>
    >;
    warehouseStockId?: string;
    list?: boolean;
    handleUserPermissions: (
      permission: Permissions,
      field: USER_PERMISSION_FIELDS,
      capabilities: USER_PERMISSION_CAPABILITIES
    ) => boolean;
  }

  interface WarehouseStockType {
    warehouseId: string;
    itemId: string;
    batchName: string;
    qty: number;
    sku: string;
    expiry: Date | undefined | null;
  }

  export interface WarehouseStockFormSchema {
    warehouseStock?: WarehouseStockType[] | undefined;
  }
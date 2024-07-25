import { useEffect, useState } from "react";
import { CreateWarehouses, Warehouses } from "interfaces/interfaces";
import { useLazyQuery } from "@apollo/client";
import { GetWarehouseList } from "query/warehouse/warehouseList";
import { toast } from "react-toastify";

const useWarehouseItems = () => {
  const [warehouseList, setWarehouseList] = useState<Warehouses>();

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

  const selectWarehouseItems = warehouseList?.warehouses?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return selectWarehouseItems;
};

export default useWarehouseItems;

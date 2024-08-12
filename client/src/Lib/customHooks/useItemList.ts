import { useEffect, useState } from "react";
import { ItemLists, Items } from "interfaces/interfaces";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { GetItemLists } from "query/item/itemList";
import { useParams } from "react-router-dom";

const useItemList = () => {
  const { id } = useParams();
  const [itemList, setItemList] = useState<Items>();

  const [fetchItemList, { refetch }] = useLazyQuery<ItemLists>(GetItemLists, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: (d) => {
      if (d) {
        const items = d.items;
        setItemList(items);
      }
    },
  });

  useEffect(() => {
    fetchItemList();
  }, [fetchItemList, id, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const selectItems = itemList?.items?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return selectItems;
};

export default useItemList;

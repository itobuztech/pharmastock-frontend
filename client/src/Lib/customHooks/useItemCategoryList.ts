import { useEffect, useState } from "react";
import { CreateItemCategories, ItemCategories } from "interfaces/interfaces";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { GetItemCategoryList } from "query/category/categoryList";

const useItemCatList = () => {
  const [itemCategoryList, setItemCategoryList] = useState<ItemCategories>();

  const [fetchItemCategoryList] = useLazyQuery<CreateItemCategories>(
    GetItemCategoryList,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (d) => {
        if (d) {
          const itemCate = d.itemCategories;
          setItemCategoryList(itemCate);
        }
      },
    }
  );

  useEffect(() => {
    fetchItemCategoryList();
  }, [fetchItemCategoryList]);

  const selectItemCatList = itemCategoryList?.itemCategories?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return selectItemCatList;
};

export default useItemCatList;

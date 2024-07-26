import { useEffect, useState } from "react";
import { Pharmacies } from "interfaces/interfaces";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { GetPharmacyList } from "query/pharmacy/pharmacyList";

const usePharmacyList = () => {
  const [pharmacyList, setPharmacyList] = useState<Pharmacies["pharmacies"]>();

  const [fetchPharmacyList] = useLazyQuery<Pharmacies>(GetPharmacyList, {
    onError: (err) => {
      toast.error(err.message);
    },
    onCompleted: (d) => {
      if (d) {
        const pharmaList = d.pharmacies;
        setPharmacyList(pharmaList);
      }
    },
  });

  useEffect(() => {
    fetchPharmacyList();
  }, [fetchPharmacyList]);

  const selectPharmacyList = pharmacyList?.pharmacies?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return selectPharmacyList;
};

export default usePharmacyList;

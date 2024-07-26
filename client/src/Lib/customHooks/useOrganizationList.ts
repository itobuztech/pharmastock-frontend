import { useEffect, useState } from "react";
import { OrganizationList } from "interfaces/interfaces";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { ORGANIZATIONS_LIST_QUERY } from "query/organization/organizationList";

const useOrganizationList = () => {
  const [organization, setOrganization] =
    useState<OrganizationList["organizations"]>();

  const [fetchOrganizationList] = useLazyQuery<OrganizationList>(
    ORGANIZATIONS_LIST_QUERY,
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: (d) => {
        if (d) {
          const orgs = d.organizations;
          setOrganization(orgs);
        }
      },
    }
  );

  useEffect(() => {
    fetchOrganizationList();
  }, [fetchOrganizationList]);

  const selectOrganization = organization?.organizations?.map((item) => ({
    value: item.id,
    label: item.name as string,
  }));

  return selectOrganization;
};

export default useOrganizationList;

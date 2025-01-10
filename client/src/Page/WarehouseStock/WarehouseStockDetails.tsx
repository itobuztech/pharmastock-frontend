import PageHeader from "Components/PageHeader";
import WarehouseStockForm from "Page/Warehouse/components/WarehouseStockForm";
import { useQuery } from "@apollo/client";
import { GetWarehouseStockDetails } from "query/warehouse/warehouseStockDetails";
import { useParams } from "react-router-dom";
import { WarehouseStock } from "gql/graphql";
import { ChildComponentProps } from "interfaces/interfaces";
import { toast } from "react-toastify";

export default function WarehouseStockDetails({ handleUserPermissions }:Readonly<ChildComponentProps>) {
  const { id } = useParams();

  const { data: warehouseStockDetails, refetch } = useQuery<{
    warehouseStock: WarehouseStock;
  }>(GetWarehouseStockDetails, {
    variables: {
      warehouseStockId: id,
    },
    onError: (e) => {
      toast.error(e.message);
    }
  });

  return (
    <section className="min-h-screen bg-blue-50 bg-opacity-50 py-4 md:py-8 px-4 md:px-8">
      <PageHeader
        title={id ? 'Warehouse Stock Details': 'Create Warehouse Stocks'}
        showBackButton={true}
        showCreateButton={false}
      />

      <div className="w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2 bg-white rounded-md py-6 px-6">
        <WarehouseStockForm
          warehouseStockDetails={warehouseStockDetails}
          refetchItem={refetch}
          warehouseStockId={id}
          handleUserPermissions={handleUserPermissions}
        />
      </div>
    </section>
  );
}

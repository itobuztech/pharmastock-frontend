import { Skeleton, Table } from "@mantine/core";

export default function PharmacyTableSkeleton({
  numOfRows,
}: {
  numOfRows: number;
}) {
  return (
    <div className=" bg-white overflow-auto">
      {Array.from({ length: numOfRows }).map((_, index) => (
        <Table
          key={index}
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[700px] md:w-[1000px] lg:w-full"
        >
          <Table.Tr key={index}>
            <Table.Td className="pl-8">
              <Skeleton height={20} width={120} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={100} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={80} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={100} />
            </Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table>
      ))}
    </div>
  );
}

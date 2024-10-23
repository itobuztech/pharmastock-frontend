import { Table } from "@mantine/core";

export default function OrganizationTableSkeleton({
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
          className="w-[600px] md:w-[800px] lg:w-full"
        >
          <Table.Tr>
            <Table.Td>
              <div className="h-4 w-10 bg-gray-200 animate-pulse" />
            </Table.Td>
            <Table.Td>
              <div className="h-4 w-32 bg-gray-200 animate-pulse" />
            </Table.Td>
            <Table.Td className="w-auto lg:w-2/5">
              <div className="h-4 w-full bg-gray-200 animate-pulse" />
            </Table.Td>
            <Table.Td>
              <div className="h-4 w-24 bg-gray-200 animate-pulse" />
            </Table.Td>
            <Table.Td>
              <div className="h-4 w-40 bg-gray-200 animate-pulse" />
            </Table.Td>
            <Table.Td className="flex justify-end">
              <div className="h-4 w-20 bg-gray-200 animate-pulse" />
            </Table.Td>
          </Table.Tr>
        </Table>
      ))}
    </div>
  );
}

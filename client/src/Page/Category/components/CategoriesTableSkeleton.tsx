import { Table } from "@mantine/core";

export default function CategoriesTableSkeleton({
  numOfRows,
}: {
  numOfRows: number;
}) {
  return (
    <div className="bg-white overflow-auto">
      {Array.from({ length: numOfRows }).map((_, index) => (
        <Table
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[700px] md:w-[900px] lg:w-full"
        >
          <Table.Tr>
            <Table.Td>
              <div className="h-4 w-10 bg-gray-200 animate-pulse" />
            </Table.Td>
            <Table.Td>
              <div className="h-4 w-32 bg-gray-200 animate-pulse" />
            </Table.Td>
            <Table.Td>
              <div className="h-4 w-20 bg-gray-200 animate-pulse" />
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

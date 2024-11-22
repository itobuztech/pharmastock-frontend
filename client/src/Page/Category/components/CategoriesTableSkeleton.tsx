import { Skeleton, Table } from "@mantine/core";

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
          <Table.Tr key={index}>
            <Table.Td>
              <Skeleton height={16} width={40} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={128} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={80} />
            </Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table>
      ))}
    </div>
  );
}

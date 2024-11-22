import { Skeleton, Table } from "@mantine/core";

export default function UserTableSkeleton({
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
          <Table.Tr key={index}>
            <Table.Td>
              <Skeleton height={16} width={40} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={96} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={128} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={160} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={128} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={112} />
            </Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table>
      ))}
    </div>
  );
}

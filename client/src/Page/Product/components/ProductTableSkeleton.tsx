import { Skeleton, Table } from "@mantine/core";
import { tableStyles } from "Lib/Styles/tableStyles";

export default function ProductTableSkeleton({
  numOfRows,
}: {
  numOfRows: number;
}) {
  const { classes } = tableStyles();
  return (
    <div className={`${classes.container} custom-shadow rounded-md`}>
      {Array.from({ length: numOfRows }).map((_, index) => (
        <Table
          key={index}
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[900px] md:w-[1000px] lg:w-full"
        >
          <Table.Tr key={index}>
            <Table.Td className="pl-8">
              <Skeleton height={16} width={96} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={96} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={96} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={160} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={64} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={64} />
            </Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table>
      ))}
    </div>
  );
}

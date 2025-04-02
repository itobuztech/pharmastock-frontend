import { Paper, Skeleton, Table } from "@mantine/core";

import { tableStyles } from "Lib/Styles/tableStyles";

export default function WarehouseStockSkeleton({
  numOfRows,
}: {
  numOfRows: number;
}) {
  const { classes } = tableStyles();
  return (
    <Paper
      withBorder
      radius="md"
      className={`${classes.container} custom-shadow`}
    >
      {Array.from({ length: numOfRows }).map((_, index) => (
        <Table
          key={index}
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[700px] md:w-[1000px] lg:w-full"
        >
          <Table.Tr key={index}>
            <Table.Td className="pl-8">
              <Skeleton height={16} width={96} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={128} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={128} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={64} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={96} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={96} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={64} />
            </Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table>
      ))}
    </Paper>
  );
}

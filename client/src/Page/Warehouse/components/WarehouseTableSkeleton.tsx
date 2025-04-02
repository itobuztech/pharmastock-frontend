import { Paper, Skeleton, Table } from "@mantine/core";
import { tableStyles } from "Lib/Styles/tableStyles";

export default function WarehouseTableSkeleton({
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
          withRowBorders
          className="w-[900px] md:w-[1000px] lg:w-full"
        >
          <Table.Tr key={index}>
            <Table.Td className="pl-8">
              <Skeleton height={20} width={80} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={120} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={100} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={50} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={80} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={80} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={70} />
            </Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table>
      ))}
    </Paper>
  );
}

import { Skeleton, Table } from "@mantine/core";

import { tableStyles } from "Lib/Styles/tableStyles";

export default function CategoriesTableSkeleton({
  numOfRows,
}: {
  numOfRows: number;
}) {
  const { classes } = tableStyles();
  return (
    <div className={`${classes.container} custom-shadow rounded-md`}>
      {Array.from({ length: numOfRows }).map((_, index) => (
        <Table
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[700px] md:w-[900px] lg:w-full"
        >
          <Table.Tr key={index}>
            <Table.Td className="pl-8">
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

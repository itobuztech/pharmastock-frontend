import { Skeleton, Table } from "@mantine/core";

import { organizationStyles } from "../organizationStyles";

export default function OrganizationTableSkeleton({
  numOfRows,
}: {
  numOfRows: number;
}) {
  const { classes } = organizationStyles();

  return (
    <div className={`${classes.container} custom-shadow rounded-md`}>
      {Array.from({ length: numOfRows }).map((_, index) => (
        <Table
          key={index}
          horizontalSpacing="md"
          verticalSpacing="md"
          className="w-[600px] md:w-[800px] lg:w-full"
        >
          <Table.Tr key={index}>
            <Table.Td className="pl-8">
              <Skeleton
                height={16}
                width={128}
                className={classes.skeletonBackground}
              />
            </Table.Td>
            <Table.Td className="w-auto lg:w-2/5">
              <Skeleton
                height={16}
                width="100%"
                className={classes.skeletonBackground}
              />
            </Table.Td>
            <Table.Td>
              <Skeleton
                height={16}
                width={96}
                className={classes.skeletonBackground}
              />
            </Table.Td>
            <Table.Td>
              <Skeleton
                height={16}
                width={160}
                className={classes.skeletonBackground}
              />
            </Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table>
      ))}
    </div>
  );
}

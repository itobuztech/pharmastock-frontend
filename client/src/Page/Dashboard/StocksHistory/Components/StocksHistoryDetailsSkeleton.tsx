import { Skeleton, Grid } from "@mantine/core";

export default function StockHistoryDetailsCardLoader({
  numOfRows,
}: {
  numOfRows: number;
}) {
  return (
    <div className=" bg-white p-4">
      <div className='p-3'><Skeleton height={30} width={'30%'} /></div>
      <Grid>
        {Array.from({ length: numOfRows }).map((_, index) => (
          <Grid.Col span={4}>
            <Skeleton height={400} radius='md' />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

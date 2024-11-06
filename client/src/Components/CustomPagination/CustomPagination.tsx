import { Pagination } from "@mantine/core";

import appConfig from "Lib/appConfig";
interface CustomPaginationProps {
  loadingState: boolean;
  setNoOfPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  listItem: any;
}

export default function CustomPagination({
  setNoOfPage,
  setCurrentPage,
  currentPage,
  listItem,
}: CustomPaginationProps) {
  // Calculate the total number of pages based on total items and items per page
  const totalPages = listItem?.total
    ? Math.ceil(listItem.total / appConfig.pagination.defaultPage)
    : 0;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setNoOfPage((newPage - 1) * appConfig.pagination.defaultPage);
  };

  return (
    <>
      <div className="flex justify-center py-5">
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

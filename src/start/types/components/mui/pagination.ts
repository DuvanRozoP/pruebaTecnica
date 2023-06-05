export interface IPaginationOutlineProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

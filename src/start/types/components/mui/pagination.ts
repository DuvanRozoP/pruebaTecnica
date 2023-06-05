export interface IPaginationOutlineProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
}

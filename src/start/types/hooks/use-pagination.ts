export type IusePaginationResponse<T> = {
  totalPages: number;
  currentPage: number;
  getCurrentItems: () => T[];
  handlePageChange: (page: number) => void;
};

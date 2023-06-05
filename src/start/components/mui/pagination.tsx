import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginationOutlineProps } from '@type/components/mui/pagination';

/**
 * componente para el manejo de paginacion con el usePagination
 * @param {number} totalPages - talidades de paginas
 * @param {number} currentPage - pagina actual.
 * @param {(_event: React.ChangeEvent<unknown>, page: number) => void} handlePageChange - function para controlar la navegacion de la pagina actual
 */
const PaginationOutlined = ({
  totalPages,
  currentPage,
  handlePageChange,
}: IPaginationOutlineProps): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="secondary"
      />
    </Stack>
  );
};

export default PaginationOutlined;

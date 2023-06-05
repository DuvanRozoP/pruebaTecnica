import { IusePaginationResponse } from '@type/hooks/use-pagination';
import { useState } from 'react';

/**
 * Hook para controlar la paginacion
 * @param {T[]} initialData - Array la cual quieras paginar (al momento de tipar esta ya lo tipa como si fuera un array)
 * @param {number} itemsPerPage - cantidad de unidades por paginacion
 * @returns {IusePaginationResponse<T>} - devuelve un objeto para controlar los datos necesarios
 * @property {number} totalPages - total de paginas que tendra initialData
 * @property {number} currentPage - pagina actual
 * @property {() => T[]} getCurrentItems - devuelve un array con los item de la pagina actual
 * @property {(page: number) => void} handlePageChange - para cambiar de manera manual la pagina actual
 * @example
 *const { totalPages, currentPage, handlePageChange, getCurrentItems } =
    usePagination<IMovieArticle>(
      moviesFilter.length ? moviesFilter : moviesList,
      4,
    );

  const itemShow = getCurrentItems();

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    handlePageChange(page);
  };

  return (
    <section className="Home">
      <CardMovie dataSet={itemShow?.length ? itemShow : moviesList} />
      <PaginationOutlined
        handlePageChange={handlePagination}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </section>
  );
 */
const usePagination = <T>(
  initialData: T[],
  itemsPerPage: number,
): IusePaginationResponse<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return initialData.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { totalPages, currentPage, getCurrentItems, handlePageChange };
};

export default usePagination;

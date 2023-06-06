/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMoviesAction, IMoviesState, IStore } from '@type/context/movie';
import {
  GetMovieAll,
  GetMoviesSortByActores,
  GetPagination,
  GetSearchByTitle,
} from '@utils/axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const initialValues: IMoviesAction & IMoviesState = {
  showMovies: [],
  orderAscDesc: 'none',
  currentPage: 1,
  totalPage: 0,
  getMovies: async () => {},
  getSearchByTitle: async (_value: string) => {},
  getSortMoviesByActores: async () => {},
  setOrderByActors: (_value: 'asc' | 'desc' | 'none') => {},
  setCurrentPage: (_page: number) => {},
  reset: async () => {},
};

const MovieContext = createContext<IMoviesState & IMoviesAction>(initialValues);

export default function Store({ children }: IStore) {
  const [state, setState] = useState<IMoviesState>({
    showMovies: [],
    orderAscDesc: 'none',
    currentPage: 1,
    totalPage: 0,
  });

  const startApp = async () => {
    try {
      const response = await GetMovieAll('');
      setState(state => ({
        ...state,
        totalPage: Math.ceil(response.length / 5),
      }));
    } catch (error) {
      throw new Error('no se pudo conectar con la base de datos');
    }
  };

  const getMovies = useCallback(async () => {
    try {
      const response = await GetPagination(
        `_page=${state.currentPage}&_limit=5`,
      );
      setState(state => ({
        ...state,
        showMovies: response,
      }));
    } catch (error) {
      throw new Error('no se pudo obtener las peliculas');
    }
  }, [state.currentPage]);

  const getSearchByTitle = async (value: string) => {
    try {
      const response = await GetSearchByTitle(
        `${value}&_page=${state.currentPage}&_limit=5`,
      );
      setState(state => ({
        ...state,
        showMovies: response,
        currentPage: 1,
        totalPage: response.length === 0 ? state.totalPage : 0,
      }));
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else alert('Ocurrió un error desconocido');
    }
  };

  const getSortMoviesByActores = useCallback(async () => {
    try {
      const response = await GetMoviesSortByActores(
        `_sort=actores.length&_order=${state.orderAscDesc}&_page=${state.currentPage}&_limit=5`,
      );
      setState(state => ({
        ...state,
        showMovies: response,
      }));
    } catch (error) {
      throw new Error('no se pudo aplicar el filtrado');
    }
  }, [state.currentPage, state.orderAscDesc]);

  const reset = async () => {
    try {
      await Promise.all([startApp(), getMovies()]);
      setState(state => ({
        ...state,
        currentPage: 1,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
      else alert('Ocurrió un error desconocido');
    }
  };

  const setCurrentPage = (page: number) => {
    setState(prevState => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const setOrderByActors = (value: 'asc' | 'desc' | 'none') => {
    setState(prevState => ({
      ...prevState,
      currentPage: 1,
      orderAscDesc: value,
    }));
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.orderAscDesc === 'asc' || state.orderAscDesc === 'desc')
      getSortMoviesByActores();
  }, [getSortMoviesByActores, state.orderAscDesc, state.currentPage]);

  useEffect(() => {
    if (state.orderAscDesc === 'none') getMovies();
  }, [getMovies, state.orderAscDesc]);

  const value: IMoviesAction & IMoviesState = {
    showMovies: state.showMovies,
    orderAscDesc: state.orderAscDesc,
    currentPage: state.currentPage,
    totalPage: state.totalPage,
    reset,
    getMovies,
    setCurrentPage,
    getSearchByTitle,
    setOrderByActors,
    getSortMoviesByActores,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMovie = () => {
  return useContext(MovieContext);
};

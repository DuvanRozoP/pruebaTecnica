/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFavoritesAction, IFavoritesState } from '@type/context/favorite';
import { IStore } from '@type/context/movie';

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

const initialValues: IFavoritesAction & IFavoritesState = {
  favorites: [],
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

const FavoriteContext = createContext<IFavoritesState & IFavoritesAction>(
  initialValues,
);

export default function StoreFavorite({ children }: IStore) {
  const [state, setState] = useState<IFavoritesState>({
    favorites: [],
    orderAscDesc: 'none',
    currentPage: 1,
    totalPage: 0,
  });

  const startApp = async () => {
    try {
      const response = await GetMovieAll('?isFavorite=true');
      localStorage.setItem('favorites', JSON.stringify(response));
      setState(state => ({
        ...state,
        totalPage: Math.ceil(response.length / 5),
      }));
    } catch (error) {
      alert(error);
    }
  };

  const getMovies = useCallback(async () => {
    try {
      const response = await GetPagination(
        `isFavorite=true&_page=${state.currentPage}&_limit=5`,
      );
      setState(state => ({
        ...state,
        favorites: response,
      }));
    } catch (error) {
      alert(error);
    }
  }, [state.currentPage]);

  const getSearchByTitle = async (value: string) => {
    try {
      const response = await GetSearchByTitle(
        `${value}&isFavorite=true&_page=${state.currentPage}&_limit=5`,
      );
      setState(state => ({
        ...state,
        favorites: response,
        currentPage: 1,
        totalPage: response.length === 0 ? state.totalPage : 0,
      }));
    } catch (error) {
      alert(error);
    }
  };

  const getSortMoviesByActores = useCallback(async () => {
    try {
      const response = await GetMoviesSortByActores(
        `isFavorite=true&_sort=actores.length&_order=${state.orderAscDesc}&_page=${state.currentPage}&_limit=5`,
      );
      setState(state => ({
        ...state,
        favorites: response,
      }));
    } catch (error) {
      alert(error);
    }
  }, [state.currentPage, state.orderAscDesc]);

  const reset = async () => {
    try {
      await startApp();
      await getMovies();
      setState(state => ({
        ...state,
        currentPage: 1,
      }));
    } catch (error) {
      alert(error);
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

  const value: IFavoritesAction & IFavoritesState = {
    favorites: state.favorites,
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
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorite = () => {
  return useContext(FavoriteContext);
};

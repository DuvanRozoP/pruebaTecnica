/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IStore } from '@type/context/movie';
import { IMovieArticle } from '@type/page/Home';
import {
  getAllmovies,
  getFavoritesApi,
  getPaginationQuery,
  getSearchByTitle,
} from '@utils/axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IMovieState {
  showMovies: IMovieArticle[];
  favories: IMovieArticle[];
  orderAscDesc: 'asc' | 'desc' | '';
  currentPage: number;
  totalPage: number;
}

interface IMovieAction {
  getFavorites: () => Promise<void>;
  searByTitle: (query: string) => Promise<void>;
  setPagination: (query: string) => Promise<void>;
  setOrderByActors: (value: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  reset: () => Promise<void>;
}

const initialValues: IMovieAction & IMovieState = {
  showMovies: [],
  favories: [],
  orderAscDesc: '',
  currentPage: 1,
  totalPage: 0,
  getFavorites: async () => {},
  searByTitle: async (_query: string) => {},
  setPagination: async (_query: string) => {},
  setCurrentPage: (_page: number) => {},
  setOrderByActors: (_value: 'asc' | 'desc' | '') => {},
  reset: async () => {},
};

const MovieContext = createContext<IMovieState & IMovieAction>(initialValues);

export default function Store({ children }: IStore) {
  const [state, setState] = useState<IMovieState>({
    showMovies: [],
    favories: [],
    orderAscDesc: '',
    currentPage: 1,
    totalPage: 0,
  });
  const location = useLocation();

  const setPagination = async (query: string) => {
    try {
      const data = await getPaginationQuery(query);
      setState(prevState => ({
        ...prevState,
        showMovies: data,
      }));
    } catch (error) {
      alert('no se pudo paginar');
    }
  };

  const setCurrentPage = (page: number) => {
    setState(prevState => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const setOrderByActors = (value: 'asc' | 'desc') => {
    setState(prevState => ({
      ...prevState,
      currentPage: 1,
      orderAscDesc: value,
    }));

    if (location.pathname === '/favorite')
      setPagination(
        `isFavorite=true&_sort=actores.length&_order=${value}&_page=1`,
      );
    else setPagination(`_sort=actores.length&_order=${value}&_page=1`);
  };

  const reset = async () => {
    try {
      if (location.pathname === '/favorite')
        await setPagination('isFavorite=true&_page=1');
      else await setPagination(`_page=1`);
      totalPages();
    } catch (error) {
      alert('no se pudo reiniciar');
    }
  };

  const searByTitle = async (query: string) => {
    console.log('🚀 ~ file: store.tsx:102 ~ searByTitle ~ query:', query);
    try {
      if (query.length === 0)
        if (location.pathname === '/favorite') {
          setPagination('isFavorite=true&_page=1');
        } else {
          setPagination('_page=1');
        }

      let data: IMovieArticle[];
      if (location.pathname === '/favorite') {
        data = await getSearchByTitle(`${query}&isFavorite=true&_page=1`);
      } else {
        data = await getSearchByTitle(`${query}&_page=1`);
      }

      setState(prevState => ({
        ...prevState,
        showMovies: data,
      }));
      getTotalPages();
    } catch (error) {
      alert('no se encontro el usuario');
    }
  };

  const getFavorites = async () => {
    try {
      const data = await getFavoritesApi();
      setState(prevState => ({
        ...prevState,
        showMovies: data,
        favories: data,
      }));
      getTotalPages();
    } catch (error) {
      alert('no se encontro el usuario');
    }
  };

  //*/ helpers
  const totalPages = async () => {
    try {
      const data = await getAllmovies();
      setState(prevState => ({
        ...prevState,
        totalPage: Math.ceil(data.length / 5),
        currentPage: 1,
      }));
      return data;
    } catch (error) {
      alert('no se pudo paginar');
    }
  };
  const getTotalPages = () => {
    setState(prevState => ({
      ...prevState,
      totalPage: Math.ceil(prevState.showMovies.length / 5),
    }));
  };

  let start: () => Promise<void>;
  if (location.pathname === '/favorite') {
    start = async () => {
      await getFavorites();
    };
  } else {
    start = async () => {
      await totalPages();
      await setPagination(`_page=${state.currentPage}`);
    };
  }

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value: IMovieAction & IMovieState = {
    showMovies: state.showMovies,
    favories: state.favories,
    orderAscDesc: state.orderAscDesc,
    currentPage: state.currentPage,
    totalPage: state.totalPage,
    reset,
    searByTitle,
    getFavorites,
    setPagination,
    setCurrentPage,
    setOrderByActors,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMovie = () => {
  return useContext(MovieContext);
};

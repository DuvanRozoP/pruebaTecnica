/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getApi } from '@utils/axios';
import { reducer } from './reducer';
import { IMovieAction, IMovieState, IStore } from '@type/context/movie';
import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  ADD_OR_DELETE_FAVORITE,
  DELETE_FAVORITE,
  FILTER_BY_TITLE,
  GET_MOVIES,
  ORDER_BY_ACTOR,
  RESET_MOVIES,
} from '@context/movie/actions';
import { IMovieArticle } from '@type/page/Home';

const initialValues: IMovieAction & IMovieState = {
  moviesList: [],
  moviesFilter: [],
  reset: () => {},
  onSelect: (_id: string | number) => {},
  getMovies: (_movies: IMovieArticle[]) => {},
  orderByActor: (_option: 'asc' | 'dsc') => {},
  filterByTitle: (_value: string) => {},
  addFavorite: (_id: string | number) => {},
  deleteFavorite: (_id: string | number) => {},
};

const MovieContext = createContext<IMovieState & IMovieAction>(initialValues);

export default function Store({ children }: IStore) {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const onSelect = (id: string | number) => {
    console.log(id);
  };

  const getMovies = (movies: IMovieArticle[]) => {
    dispatch({
      type: GET_MOVIES,
      payload: [...movies],
    });
  };

  const orderByActor = (option: 'asc' | 'dsc') => {
    dispatch({
      type: ORDER_BY_ACTOR,
      payload: option,
    });
  };

  const filterByTitle = (value: string) => {
    dispatch({
      type: FILTER_BY_TITLE,
      payload: value,
    });
  };

  const addFavorite = (id: string | number) => {
    dispatch({
      type: ADD_OR_DELETE_FAVORITE,
      payload: id,
    });
  };

  const deleteFavorite = (id: string | number) => {
    dispatch({
      type: DELETE_FAVORITE,
      payload: id,
    });
  };

  const reset = () => {
    dispatch({
      type: RESET_MOVIES,
      payload: undefined,
    });
  };

  useEffect(() => {
    const startContext = async () => {
      try {
        const data = await getApi('/peliculas');
        getMovies(data);
      } catch (er) {
        alert('no se pudo cargar la app');
      }
    };

    if (state.moviesList.length === 0) startContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.moviesList.length)
      localStorage.setItem('moviesList', JSON.stringify(state.moviesList));
  }, [state.moviesList]);

  const value: IMovieAction & IMovieState = {
    moviesList: state.moviesList,
    moviesFilter: state.moviesFilter,
    reset,
    onSelect,
    getMovies,
    orderByActor,
    filterByTitle,
    addFavorite,
    deleteFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMovie = () => {
  return useContext(MovieContext);
};

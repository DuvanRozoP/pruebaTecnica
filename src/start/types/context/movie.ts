import { IMovieArticle } from '@type/page/Home';
import {
  GET_MOVIES,
  FILTER_BY_TITLE,
  ORDER_BY_ACTOR,
  ADD_OR_DELETE_FAVORITE,
  DELETE_FAVORITE,
  RESET_MOVIES,
} from '@context/movie/actions';

export interface IMovieState {
  moviesList: IMovieArticle[];
  moviesFilter: IMovieArticle[];
}

export interface IMovieAction {
  onSelect: (id: string | number) => void;
  getMovies: (movies: IMovieArticle[]) => void;
  orderByActor: (option: 'asc' | 'dsc') => void;
  filterByTitle: (value: string) => void;
  addFavorite: (id: string | number) => void;
  deleteFavorite: (id: string | number) => void;
  reset: () => void;
}

export interface IStore {
  children: React.ReactNode;
}

export type TAction =
  | { type: typeof GET_MOVIES; payload: IMovieArticle[] }
  | { type: typeof FILTER_BY_TITLE; payload: string }
  | { type: typeof ORDER_BY_ACTOR; payload: 'asc' | 'dsc' }
  | { type: typeof ADD_OR_DELETE_FAVORITE; payload: string | number }
  | { type: typeof DELETE_FAVORITE; payload: string | number }
  | { type: typeof RESET_MOVIES; payload: undefined };

import {
  ADD_OR_DELETE_FAVORITE,
  FILTER_BY_TITLE,
  GET_MOVIES,
  ORDER_BY_ACTOR,
  RESET_MOVIES,
} from '@context/movie/actions';
import { IMovieState, TAction } from '@type/context/movie';
import { ascDsc, updateFavorite } from '@utils/helpers';

export const reducer = (
  state: IMovieState,
  { type, payload }: TAction,
): IMovieState => {
  switch (type) {
    case FILTER_BY_TITLE:
      return {
        ...state,
        moviesFilter: [
          ...state.moviesList.filter(movie => {
            return movie.titulo
              .toLocaleLowerCase()
              .includes(payload.toLocaleLowerCase());
          }),
        ],
      };
    case GET_MOVIES:
      return {
        ...state,
        moviesList: [...payload],
        moviesFilter: [...payload],
      };
    case ORDER_BY_ACTOR:
      return {
        ...state,
        moviesFilter: ascDsc(state.moviesList, payload),
      };
    case ADD_OR_DELETE_FAVORITE:
      return {
        ...state,
        moviesList: updateFavorite(state.moviesList, payload),
        moviesFilter: updateFavorite(state.moviesFilter, payload),
      };
    case RESET_MOVIES:
      return {
        ...state,
        moviesFilter: [...state.moviesList],
      };
    default:
      return state;
  }
};

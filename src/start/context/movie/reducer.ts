import { SET_MOVIES, ASC_DESC, SET_ACTORS_VALUE } from '@context/movie/actions';
import { IMovieState, TAction } from '@type/context/movie';
import { setMoviesAll, setAscDesc, setValueSort } from '@utils/helpers';

export const reducer = (
  state: IMovieState,
  { type, payload }: TAction,
): IMovieState => {
  switch (type) {
    case SET_MOVIES:
      return setMoviesAll(state, payload);
    case ASC_DESC:
      return setAscDesc(state, payload);
    case SET_ACTORS_VALUE:
      return setValueSort(state, payload);
    default:
      return state;
  }
};

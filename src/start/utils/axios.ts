import { IMovieArticle } from '@type/page/Home';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getAllmovies = async () => {
  try {
    const response = await api.get('/peliculas');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

export const getPaginationQuery = async (query: string) => {
  try {
    console.log('🚀 ~ file: axios.ts:18 ~ getPaginationQuery ~ query:', query);
    const response = await api.get(`/peliculas?${query}&_limit=5`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

export const getSearchByTitle = async (
  query: string,
): Promise<IMovieArticle[]> => {
  try {
    console.log('🚀 ~ ', `/peliculas?q=${query}&_limit=5`);
    const response = await api.get(`/peliculas?q=${query}&_limit=5`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

export const getFavoritesApi = async (): Promise<IMovieArticle[]> => {
  try {
    const response = await api.get('/peliculas?isFavorite=true');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

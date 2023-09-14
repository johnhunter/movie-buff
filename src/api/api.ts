import ky from 'ky';
import { Movie, MovieDetail } from '@/types';

export const API_ROOT = 'https://www.omdbapi.com';

export const defaultParams = {
  apikey: import.meta.env.VITE_API_KEY,
  type: 'movie',
};

const api = ky.extend({
  prefixUrl: API_ROOT,
  searchParams: defaultParams,
});

/**
 * Fetches json data from the API service.
 */
export const getJson = <R = unknown>(params: Record<string, string | number>) =>
  api
    .get('', {
      searchParams: {
        ...defaultParams,
        ...params,
      },
    })
    .json<R>();

export const searchMovies = async (query: string) => {
  const result = await getJson<{ Search: Movie[] }>({ s: query });

  return result.Search ?? [];
};

export const fetchMovieDetail = async (imdbID: string) => {
  const result = await getJson<MovieDetail>({ i: imdbID });

  return result;
};

export default api;

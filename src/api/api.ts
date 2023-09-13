import ky from 'ky';

export const API_ROOT = 'https://www.omdbapi.com';

export const defaultParams = {
  token: import.meta.env.VITE_API_KEY,
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

export default api;

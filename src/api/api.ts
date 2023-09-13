export const API_ROOT = 'https://www.omdbapi.com';
export const API_KEY = import.meta.env.VITE_API_KEY;

export const defaultParams = {
  token: API_KEY,
  type: 'movie',
};

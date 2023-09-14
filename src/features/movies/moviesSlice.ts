import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { Movies, Movie, ViewingHistory } from '@/types';

const name = 'movies';

interface MoviesState {
  movies: Movies;
  viewings: ViewingHistory;
}

const initialState: MoviesState = {
  movies: {},
  viewings: [],
};

export const moviesSlice = createSlice({
  name,
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      state.movies[movie.imdbID] = movie;
    },
    view: (state, action: PayloadAction<Movie['imdbID']>) => {
      const imdbID = action.payload;

      if (!state.viewings.find((v) => v.imdbID === imdbID)) {
        state.viewings.push({ imdbID, date: new Date().toISOString() });
      }
    },
  },
});

export const actions = moviesSlice.actions;
export const { select, view } = actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMovies = (state: RootState) => state.movies;

export default moviesSlice.reducer;

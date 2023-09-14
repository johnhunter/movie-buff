import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { Movies, Movie, ViewingHistory, MovieDetail } from '@/types';
import { fetchMovieDetail } from '@/api';

const name = 'movies';

interface MoviesState {
  movies: Movies;
  viewings: ViewingHistory;
}

const initialState: MoviesState = {
  movies: {},
  viewings: [],
};

const fetchMovieById = createAsyncThunk(
  `${name}/fetchMovieById`,
  async (id: string, _thunkAPI) => {
    return await fetchMovieDetail(id);
  }
);

export const moviesSlice = createSlice({
  name,
  initialState,
  reducers: {
    view: (state, action: PayloadAction<Movie['imdbID']>) => {
      const imdbID = action.payload;

      if (!state.viewings.find((v) => v.imdbID === imdbID)) {
        state.viewings.push({ imdbID, viewedDate: new Date().toISOString() });
      }
    },
  },
  extraReducers: (builder) => {
    // TODO: add actions and state for loading and errors
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      const movie = action.payload;
      state.movies[movie.imdbID] = movie;
    });
  },
});

export const actions = {
  ...moviesSlice.actions,
  fetchMovieById,
};

export const selectRoot = (state: RootState) => state[name];
export const selectMovies = (state: RootState) => selectRoot(state).movies;

export const selectViewed = createSelector(
  selectMovies,
  (state: RootState) => selectRoot(state).viewings,
  (movies, viewings) => {
    return viewings.map((item) => {
      const { Title, Year } = movies[item.imdbID];
      return { ...item, Title, Year };
    });
  }
);

export default moviesSlice.reducer;

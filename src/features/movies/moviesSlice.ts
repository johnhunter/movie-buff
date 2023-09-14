import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type {
  Movies,
  ViewingHistory,
  MovieDetail,
  RecommendationLookup,
} from '@/types';
import { fetchMovieDetail } from '@/api';
import {
  transformMovieData,
  appendRecommendations,
  getMatchingRecommendationIds,
} from './utils';

const name = 'movies';

interface MoviesState {
  movies: Movies;
  viewings: ViewingHistory;
  recommendationLookup: RecommendationLookup;
}

const initialState: MoviesState = {
  movies: {},
  viewings: [],
  recommendationLookup: {},
};

const fetchMovieById = createAsyncThunk(
  `${name}/fetchMovieById`,
  async (id: string, _thunkAPI) => {
    return await fetchMovieDetail(id);
  }
);

type ReviewPayload = PayloadAction<Pick<MovieDetail, 'imdbID' | 'review'>>;

export const moviesSlice = createSlice({
  name,
  initialState,
  reducers: {
    view: (state, action: PayloadAction<MovieDetail['imdbID']>) => {
      const imdbID = action.payload;

      if (!state.viewings.find((v) => v.imdbID === imdbID)) {
        state.viewings.push({ imdbID, viewedDate: new Date().toISOString() });
      }
    },
    updateReview: (state, action: ReviewPayload) => {
      const { imdbID, review = '' } = action.payload;
      state.movies[imdbID].review = review;
    },
  },
  extraReducers: (builder) => {
    // TODO: add actions and state for loading and errors
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      const movie = transformMovieData(action.payload);

      state.movies[movie.imdbID] = movie;
      state.recommendationLookup = appendRecommendations(
        movie,
        state.recommendationLookup
      );
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

export const selectRecommendationsForMovie = createSelector(
  [
    selectRoot,
    // forward 2nd arg to output selector
    (_state, currentId: string) => currentId,
  ],
  ({ recommendationLookup, movies }, currentId) => {
    const { Actors, Genre } = movies[currentId];
    const ids = getMatchingRecommendationIds(
      [...Actors, ...Genre],
      recommendationLookup,
      currentId
    );

    return ids.map((imdbID) => movies[imdbID]);
  }
);

export default moviesSlice.reducer;

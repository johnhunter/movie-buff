import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import moviesReducer from '@/features/movies/moviesSlice';

const namespace = 'store';

const rootReducer = combineReducers({
  movies: moviesReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(save({ namespace })),
  preloadedState: load({ namespace }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

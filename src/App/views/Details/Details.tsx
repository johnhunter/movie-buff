import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { actions, selectMovies } from '@/features/movies/moviesSlice';
import { useAppDispatch, useAppSelector } from '@/App/hooks/store';
import MovieDetail from '../../components/MovieDetail';

const Details = () => {
  const { id = '' } = useParams();
  const movie = useAppSelector(selectMovies)[id];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!movie) {
      dispatch(actions.fetchMovieById(id));
    }
  }, [movie]);

  return (
    <div>{!movie ? <div>Loading...</div> : <MovieDetail movie={movie} />}</div>
  );
};

export default Details;

import { FC } from 'react';
import { useAppSelector } from '@/App/hooks/store';
import { selectMovies } from '@/features/movies/moviesSlice';

interface MovieDetailProps {
  id: string;
}

const MovieDetail: FC<MovieDetailProps> = ({ id }) => {
  const movie = useAppSelector(selectMovies)[id];

  if (!movie) {
    throw new Error(`Cannot find movie in store for id ${id}`);
  }

  return (
    <div>
      <h2>
        {movie.Title} <span>({movie.Year})</span>
      </h2>

      <figure>
        <img src={movie.Poster} alt="A promotional poster for the movie" />
      </figure>
    </div>
  );
};

export default MovieDetail;

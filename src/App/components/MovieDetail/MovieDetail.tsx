import { FC } from 'react';
import type { MovieDetail } from '@/types';

interface MovieDetailProps {
  movie: MovieDetail;
}

const MovieDetail: FC<MovieDetailProps> = ({ movie }) => {
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

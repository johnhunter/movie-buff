import { FC } from 'react';
import type { MovieDetail } from '@/types';
import DetailItem from './DetailItem';
import css from './MovieDetail.module.css';
import { actions, selectMovies } from '@/features/movies/moviesSlice';
import { useAppDispatch, useAppSelector } from '@/App/hooks/store';

interface MovieDetailProps {
  movie: MovieDetail;
}

const MovieDetail: FC<MovieDetailProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const onViewed = () => {
    dispatch(actions.view(movie.imdbID));
  };

  return (
    <div>
      <h2>
        {movie.Title} <span>({movie.Year})</span>
      </h2>

      <div className={css.section}>
        <button onClick={onViewed}>Mark as viewed</button>
      </div>

      <div className={css.section}>
        <DetailItem label="Genre" content={movie.Genre} />
        <DetailItem label="Actors" content={movie.Actors} />
        <DetailItem label="Director" content={movie.Director} />
        <DetailItem label="Released" content={movie.Released} />
        <DetailItem label="Awards" content={movie.Awards} />
      </div>

      <div className={css.section}>
        <h3>The plot</h3>
        <p>{movie.Plot}</p>
      </div>

      <figure>
        <img src={movie.Poster} alt="A promotional poster for the movie" />
      </figure>

      <div className={css.review}>
        <textarea value={movie.Review}></textarea>
        <div>
          <button>Save review</button> <button>Cancel changes</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

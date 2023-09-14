import { FC, useCallback } from 'react';
import type { MovieDetail } from '@/types';
import { actions } from '@/features/movies/moviesSlice';
import { useAppDispatch } from '@/App/hooks/store';
import DetailItem from './DetailItem';
import ReviewForm from './ReviewForm';
import css from './MovieDetail.module.css';

interface MovieDetailProps {
  movie: MovieDetail;
}

const MovieDetail: FC<MovieDetailProps> = ({ movie }) => {
  const { imdbID } = movie;

  const dispatch = useAppDispatch();
  const onViewed = () => {
    dispatch(actions.view(imdbID));
  };
  const onReviewSubmit = useCallback(
    (review: string) => {
      dispatch(actions.updateReview({ imdbID, review: review }));
    },
    [imdbID]
  );

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

      <ReviewForm initialValue={movie.review} onSubmit={onReviewSubmit} />
    </div>
  );
};

export default MovieDetail;

import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { MovieDetail } from '@/types';
import {
  actions,
  selectRecommendationsForMovie,
  selectViewed,
} from '@/features/movies/moviesSlice';
import { useAppDispatch, useAppSelector } from '@/App/hooks/store';
import DetailItem from './DetailItem';
import ReviewForm from './ReviewForm';
import css from './MovieDetail.module.css';

interface MovieDetailProps {
  movie: MovieDetail;
}

const MovieDetailCmp: FC<MovieDetailProps> = ({ movie }) => {
  const { imdbID } = movie;

  const dispatch = useAppDispatch();
  const recommendations = useAppSelector((state) =>
    selectRecommendationsForMovie(state, imdbID)
  );

  const hasBeenViewed = useAppSelector(selectViewed).some(
    (movie) => movie.imdbID === imdbID
  );

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
      <nav className={css.pageNav}>
        <Link to="/">&larr; Home</Link>
      </nav>

      <h2>
        {movie.Title} <span>({movie.Year})</span>
      </h2>

      <div className={css.section}>
        <button onClick={onViewed} disabled={hasBeenViewed}>
          {hasBeenViewed ? 'Viewed' : 'Mark as viewed'}
        </button>
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

      <figure className={css.posterContainer}>
        <img src={movie.Poster} alt="A promotional poster for the movie" />
      </figure>

      <ReviewForm
        initialValue={movie.review}
        onSubmit={onReviewSubmit}
        disabled={!hasBeenViewed}
      />

      <div className={css.section}>
        <h3>Recommended</h3>

        <ul>
          {recommendations.map((movie) => {
            const { imdbID, Title, Year } = movie;
            return (
              <li key={imdbID}>
                <Link to={`/movie/${imdbID}`}>
                  {Title} ({Year})
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetailCmp;

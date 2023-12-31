import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie, Status } from '@/types';
import { searchMovies } from '@/api';

import css from './MovieSearch.module.css';

interface MovieSearchProps {
  /**
   * Number of input chars to ignore before fetching results.
   */
  minChars?: number;
}

/**
 * Provides the movie search UI and linked results.
 *
 * Selecting a movie from the list will add the movie to the store and
 * navigate to the detail view.
 */
const MovieSearch: FC<MovieSearchProps> = ({ minChars = 4 }) => {
  const [query, setQuery] = useState('');
  const [resultList, setResultList] = useState<Movie[]>([]);
  const [status, setStatus] = useState<undefined | Status>();

  const onChange = useCallback(
    async (value: string) => {
      setQuery(value);

      setResultList([]);

      if (value.length < minChars) {
        return;
      }

      setStatus('loading');
      try {
        const results = await searchMovies(query);
        setResultList(results);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    },
    [query]
  );

  const noResults =
    status === 'success' && !resultList.length && query.length > minChars;
  const hasResults = !!(query && resultList.length);

  return (
    <div className={css.container}>
      <input
        type="search"
        value={query}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Start typing to find a movie..."
        className={css.input}
      />
      <div className={css.resultWrapper}>
        {status === 'loading' && <div>loading...</div>}
        {status === 'error' && <div>An error occurred</div>}
        {noResults && <div>No movies found</div>}
        {hasResults && (
          <ul className={css.resultsList}>
            {resultList.map((movie) => {
              const { imdbID, Title, Year } = movie;
              return (
                <li key={imdbID}>
                  <Link to={`movie/${imdbID}`}>
                    {Title} ({Year})
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;

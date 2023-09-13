import { FC, useCallback, useState } from 'react';
import { Movie, Status } from '@/types';
import { fetchMovies } from '@/api';
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
 * Selecting a movie from the list should navigate to the detail view.
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
        const results = await fetchMovies(query);
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

  return (
    <div className={css.container}>
      <input
        type="search"
        value={query}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Start typing to find a movie..."
        className={css.input}
      />
      <div>
        {status === 'loading' && <div>loading...</div>}
        {status === 'error' && <div>An error occurred</div>}
        {noResults ? (
          <div>No movies found</div>
        ) : (
          <ul className={css.resultsList}>
            {resultList.map(({ imdbID, Title, Year }) => (
              <li key={imdbID}>
                <a href={`movie/${imdbID}`}>
                  {Title} ({Year})
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;

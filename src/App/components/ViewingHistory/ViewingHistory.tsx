import { Link } from 'react-router-dom';
import { selectViewed } from '@/features/movies/moviesSlice';
import { useAppSelector } from '@/App/hooks/store';
import css from './ViewingHistory.module.css';

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const ViewingHistory = () => {
  const history = useAppSelector(selectViewed) ?? [];

  return (
    <div>
      <h2>Viewing history</h2>

      <ul className={css.list}>
        {history.map(({ imdbID, Title, Year, viewedDate }) => (
          <li key={imdbID}>
            <Link to={`movie/${imdbID}`}>
              {Title} ({Year}){' '}
              <small className={css.viewedDate}>{formatDate(viewedDate)}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewingHistory;

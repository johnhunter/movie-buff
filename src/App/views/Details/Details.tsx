import { useParams } from 'react-router-dom';
import MovieDetail from '../../components/MovieDetail';

const Details = () => {
  const { id = '' } = useParams();

  return (
    <div>
      <MovieDetail id={id} />
    </div>
  );
};

export default Details;

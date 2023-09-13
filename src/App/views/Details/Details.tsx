import { useParams } from 'react-router-dom';

const Details = () => {
  const { id = '' } = useParams();

  return <div>Details for {id}</div>;
};

export default Details;

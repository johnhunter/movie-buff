import MovieSearch from './components/MovieSearch';
import css from './App.module.css';

const App = () => (
  <div className={css.container}>
    <h1>Movie buff</h1>

    <MovieSearch />
  </div>
);

export default App;

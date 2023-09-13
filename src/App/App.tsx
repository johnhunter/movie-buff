import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import Details from './views/Details';
import css from './App.module.css';

const App = () => (
  <div className={css.container}>
    <h1>Movie buff</h1>

    <BrowserRouter>
      <Routes>
        <Route path="movie/:id?" Component={Details} />
        <Route path="*" Component={MovieSearch} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;

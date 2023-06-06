import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from '@context/Movies';
import StoreFavorite from '@context/Favorites';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Favorite from '@pages/Favorite';
import MovieDetail from '@pages/MovieDetail';

function router() {
  const routes = [
    {
      path: '/',
      element: (
        <Store>
          <Home />
        </Store>
      ),
    },

    {
      path: '/favorite',
      element: (
        <StoreFavorite>
          <Favorite />
        </StoreFavorite>
      ),
    },
    { path: '/notfound', element: <NotFound /> },
    { path: '/movie/:id', element: <MovieDetail /> },
  ];
  return (
    <Router>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default router;

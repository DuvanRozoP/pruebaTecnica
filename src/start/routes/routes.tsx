import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from '@context/movie/store';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import MainNavbar from '@components/layout/MainNavbar';
import Favorite from '@pages/Favorite';

function router() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/notfound', element: <NotFound /> },
    { path: '/favorite', element: <Favorite /> },
  ];

  return (
    <MainNavbar>
      <Store>
        <Router>
          <Routes>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Router>
      </Store>
    </MainNavbar>
  );
}

export default router;

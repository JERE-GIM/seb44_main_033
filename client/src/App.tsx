import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Watchlist from './pages/Watchlist';
import Movie from './pages/Movie';
import Search from './pages/Search';
import Statistics from './pages/Statistics';
import YearlyGenres from './pages/YearlyGenres';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Main /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      { path: 'mypage', element: <Mypage /> },
      { path: 'watchlist', element: <Watchlist /> },
      { path: 'movie/:id', element: <Movie /> },
      { path: 'search', element: <Search /> },
      { path: 'statistics', element: <Statistics /> },
      { path: 'statistics/genre', element: <YearlyGenres /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

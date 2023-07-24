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
import { OauthHandler } from './components/login/OauthHandler';
import Statisticsusers from './pages/Statisticsusers';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: '', element: <Main /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      { path: 'mypage', element: <Mypage /> },
      { path: 'watchlist', element: <Watchlist /> },
      { path: 'movie/:movieId', element: <Movie /> },
      { path: 'search', element: <Search /> },
      { path: 'statistics', element: <Statistics /> },
      { path: 'statistics/genre', element: <YearlyGenres /> },
      { path: 'statistics/users', element: <Statisticsusers /> },
      { path: 'login/oauth2/code/google', element: <OauthHandler /> },
      { path: 'login/oauth2/code/naver', element: <OauthHandler /> },
      { path: 'login/oauth2/code/kakao', element: <OauthHandler /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

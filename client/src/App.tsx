import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Watchlist from './pages/Watchlist';
import Movie from './pages/Movie';
import Search from './pages/Search';
import Statistics from './pages/Statistics';
import YearlyGenres from './pages/YearlyGenres';
import OAuthHandler from './components/login/OauthHandler';
import Statisticsusers from './pages/Statisticsusers';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: '', element: <Main /> },
      { path: 'mypage', element: <Mypage /> },
      { path: 'watchlist', element: <Watchlist /> },
      { path: 'movie/:movieId', element: <Movie /> },
      { path: 'search', element: <Search /> },
      { path: 'statistics', element: <Statistics /> },
      { path: 'statistics/genre', element: <YearlyGenres /> },
      { path: 'statistics/users', element: <Statisticsusers /> },
      { path: 'login/oauth2/code/kakao', element: <OAuthHandler /> }, // 수현님과 상의 필요 리다이렉트url 수정
      { path: 'login/oauth2/code/naver', element: <OAuthHandler /> },
      { path: 'login/oauth2/code/google', element: <OAuthHandler /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

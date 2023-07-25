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
      { path: 'login/oauth2/code/kakao', element: <OAuthHandler /> },
      { path: 'login/oauth2/code/naver', element: <OAuthHandler /> },
      { path: 'login/oauth2/code/google', element: <OAuthHandler /> },
    ],
  },
]);
// 주소/login/oauth2/code/google의 경우 쿼리파람을 가져오지않으니까 OauthHandler가 실행이 안됨.
// 쿼리파람을 유지하면서 리다이렉트 x > 리다이렉트 url 변경 or 억세스토큰을 헤더에서 추출(x)
function App() {
  return <RouterProvider router={router} />;
}

export default App;

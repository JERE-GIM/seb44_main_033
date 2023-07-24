import { Outlet } from 'react-router-dom';
import Header from '../components/share/Header';
import Footer from '../components/share/Footer';
import { StyledRoot } from './styles/Root.styled';
import { useLocation } from 'react-router-dom';
export default function Root() {
  const location = useLocation();
  const isMovieDetailPage = location.pathname.includes('/movie/');
  return (
    <>
      <StyledRoot isMovieDetailPage={isMovieDetailPage}>
        <Header />
        <Outlet />
      </StyledRoot>
      <Footer />
    </>
  );
}

import { Outlet } from 'react-router-dom';
import Header from '../components/share/Header';
import Footer from '../components/share/Footer';
import { StyledRoot } from './styles/Root.styled';

export default function Root() {
  return (
    <>
      <StyledRoot>
        <Header />
        <Outlet />
      </StyledRoot>
      <Footer />
    </>
  );
}

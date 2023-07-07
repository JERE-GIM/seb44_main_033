import styled from 'styled-components';
import Topmovie from '../components/main/Topmovie';

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const Container = styled.div`
  margin-top: 62px;
  padding: 24px 0;
`;

const MainPage: React.FC = () => {
  return (
    <div>
      <Main>
        <Container>
          <Topmovie />
        </Container>
      </Main>
    </div>
  );
};
export default MainPage;

import { Main, TopContainer, BotContainer } from '../pages/styles/Main.styled';
import Topmovie from '../components/main/MovieRank.tsx/Topmovie';
import BotMovieTab from '../components/main/Tabmovie.tsx/Botmovietab';

const MainPage: React.FC = () => {
  return (
    <div>
      <Main>
        <TopContainer>
          <Topmovie />
        </TopContainer>
        <BotContainer>
          <BotMovieTab />
        </BotContainer>
      </Main>
    </div>
  );
};
export default MainPage;

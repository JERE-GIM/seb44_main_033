import { Main, TopContainer, BotContainer } from '../pages/styles/Main.styled';
import Topmovie from '../components/main/movierank/Topmovie';
import BotMovieTab from '../components/main/tabmovie/Botmovietab';
import MonthMovie from '../components/main/monthmovie/Monthmovie';

const MainPage: React.FC = () => {
  return (
    <div>
      <Main>
        <TopContainer>
          <Topmovie />
        </TopContainer>
        <BotContainer>
          <BotMovieTab />
          <MonthMovie />
        </BotContainer>
      </Main>
    </div>
  );
};
export default MainPage;

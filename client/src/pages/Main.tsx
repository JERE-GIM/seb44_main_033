import { Main, TopContainer, BotContainer } from '../pages/styles/Main.styled';
import Topmovie from '../components/main/movierank/Topmovie';
import BotMovieTab from '../components/main/tabmovie/Botmovietab';
import MonthMovie from '../components/main/monthmovie/Monthmovie';

export default function MainPage() {
  return (
    <Main>
      <TopContainer>
        <Topmovie />
      </TopContainer>
      <BotContainer>
        <BotMovieTab />
        <MonthMovie />
      </BotContainer>
    </Main>
  );
}

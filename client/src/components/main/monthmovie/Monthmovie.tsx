import { RightBase } from '../../styles/tabmovie/Botmovie.styled';
import { Title } from '../../styles/monthmovie/Monthmovie';
import MonthSlider from './Monthslider';
import MonthCard from './Monthcard';

//dummy
import { ITop, dummyMonth } from '../../../dummy/dummyMonth';

const MonthMovie: React.FC = () => {
  return (
    <RightBase>
      <Title>7월 상영작</Title>
      <MonthSlider>
        {dummyMonth.map((movie: ITop) => {
          return <MonthCard key={movie.id} poster={movie.poster} />;
        })}
      </MonthSlider>
    </RightBase>
  );
};

export default MonthMovie;

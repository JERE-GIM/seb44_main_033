import { Background, Star } from '../styles/Stars.styled';
import starIcon from '../../assets/starIcon.svg';

interface IStars {
  reviewScore: number;
  setReviewScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Stars({ reviewScore, setReviewScore }: IStars) {
  //reviewScore에 따라서 star 색칠하기

  return (
    <Background>
      <Star src={starIcon} alt="star icon" />
      <Star src={starIcon} alt="star icon" />
      <Star src={starIcon} alt="star icon" />
      <Star src={starIcon} alt="star icon" />
      <Star src={starIcon} alt="star icon" />
    </Background>
  );
}

import {
  Background,
  Label,
  RadioButton,
  ReversedStar,
  Star,
} from '../styles/ReviewStars.styled';
import halfStarIcon from '../../assets/halfStarIcon.png';
import { ratingValues } from './Rating';

interface IStars {
  rating: number;
}

export default function ReviewStars({ rating }: IStars) {
  return (
    <Background>
      {ratingValues.map((ratingValue) => {
        if (ratingValue % 2 === 1)
          return (
            <Label key={ratingValue}>
              <RadioButton type="radio" name="rating" value={ratingValue} />
              <Star
                src={halfStarIcon}
                alt="star icon"
                $rated={rating >= ratingValue}
              />
            </Label>
          );
        else if (ratingValue % 2 === 0)
          return (
            <Label key={ratingValue}>
              <RadioButton type="radio" name="rating" value={ratingValue} />
              <ReversedStar
                src={halfStarIcon}
                alt="star icon"
                $rated={rating >= ratingValue}
              />
            </Label>
          );
      })}
    </Background>
  );
}

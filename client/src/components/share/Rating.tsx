import {
  Background,
  Label,
  RadioButton,
  ReversedStar,
  Star,
} from '../styles/Rating.styled';
import halfStarIcon from '../../assets/halfStarIcon.png';
import { useState } from 'react';

interface IStars {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

export const ratingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Stars({ rating, setRating }: IStars) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <Background>
      {ratingValues.map((ratingValue) => {
        if (ratingValue % 2 === 1)
          return (
            <Label key={ratingValue}>
              <RadioButton
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <Star
                src={halfStarIcon}
                alt="star icon"
                onMouseEnter={() => setHoverValue(ratingValue)}
                onMouseLeave={() => setHoverValue(0)}
                $rated={
                  hoverValue ? hoverValue >= ratingValue : rating >= ratingValue
                }
              />
            </Label>
          );
        else if (ratingValue % 2 === 0)
          return (
            <Label key={ratingValue}>
              <RadioButton
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <ReversedStar
                src={halfStarIcon}
                alt="star icon"
                onMouseEnter={() => setHoverValue(ratingValue)}
                onMouseLeave={() => setHoverValue(0)}
                $rated={
                  hoverValue ? hoverValue >= ratingValue : rating >= ratingValue
                }
              />
            </Label>
          );
      })}
    </Background>
  );
}

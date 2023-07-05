import { useState } from 'react';
import ReviewRegister from '../components/movie/ReviewRegister';
import { dummyMovie } from '../dummy/dummyMovie';
import { dummyReviews } from '../dummy/dummyReview';
import Stars from '../components/share/Stars';
import { StyledStarsContainer } from './styles/Movie.styled';

export default function Movie() {
  // 더미데이터 사용
  const loggedInUser = {
    nickname: '맛있는짜장면',
  };
  const movie = dummyMovie;
  const review = dummyReviews.filter(
    (review) =>
      review.movieTitle === movie.title &&
      review.writer === loggedInUser.nickname,
  )[0];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rating, setRating] = useState(review ? review.rating : 0);

  const handleClickStars = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <StyledStarsContainer onClick={handleClickStars}>
        <Stars rating={rating} setRating={setRating} />
      </StyledStarsContainer>

      {isOpenModal && (
        <ReviewRegister
          movie={movie}
          review={review}
          rating={rating}
          setRating={setRating}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </>
  );
}

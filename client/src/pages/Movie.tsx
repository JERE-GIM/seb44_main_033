import { useState } from 'react';
import ReviewRegister from '../components/movie/ReviewRegister';
import { dummyMovie } from '../dummy/dummyMovie';
import { dummyReviews } from '../dummy/dummyReview';
import Stars from '../components/share/Stars';
import { StyledStarsContainer } from './styles/Movie.styled';

export default function Movie() {
  // 더미데이터 사용
  const loggedInUser = {
    nickname: '짜장면',
  };
  const movie = dummyMovie;
  const review = dummyReviews.filter(
    (review) =>
      review.movieTitle === movie.title &&
      review.writer === loggedInUser.nickname,
  )[0];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [reviewScore, setReviewScore] = useState(review ? review.score : 0);

  const handleClickStars = () => {
    setReviewScore(10);
    setIsOpenModal(true);
  };

  return (
    <>
      <StyledStarsContainer onClick={handleClickStars}>
        <Stars reviewScore={reviewScore} setReviewScore={setReviewScore} />
      </StyledStarsContainer>

      {isOpenModal && (
        <ReviewRegister
          movie={movie}
          review={review}
          reviewScore={reviewScore}
          setReviewScore={setReviewScore}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </>
  );
}

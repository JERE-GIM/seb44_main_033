import { useState } from 'react';
import ReviewRegisterModal from '../components/movie/ReviewRegisterModal';
import { dummyMovie } from '../dummy/dummyMovie';
import { dummyReviews } from '../dummy/dummyReview';
import Rating from '../components/share/Rating';
import {
  StyledMovieCover,
  StyledMovieInfo,
  StyledMyReviewButtons,
  StyledMyReviewContainer,
  StyledMyReviewContent,
  StyledMyReviewControlButton,
  StyledMyReviewRegisterButton,
  StyledReviewList,
  StyledStarsContainer,
} from './styles/Movie.styled';
import ConfirmModal from '../components/movie/ConfirmModal';

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

  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [rating, setRating] = useState(review ? review.rating : 0);

  const handleOpenReviewModal = () => {
    setIsOpenReviewModal(true);
  };

  const handleOpenConfirmModal = () => {
    setIsOpenConfirmModal(true);
  };

  const deleteMyReview = () => {
    console.log('내가 작성한 리뷰 삭제');
  }; // api 요청 함수

  return (
    <>
      <StyledMovieCover>
        <StyledStarsContainer onClick={handleOpenReviewModal}>
          <Rating rating={rating} setRating={setRating} />
        </StyledStarsContainer>
      </StyledMovieCover>
      <StyledMovieInfo>
        {review ? (
          <StyledMyReviewContainer>
            <StyledMyReviewContent>{review.comment}</StyledMyReviewContent>
            <StyledMyReviewButtons>
              <StyledMyReviewControlButton onClick={handleOpenReviewModal}>
                수정
              </StyledMyReviewControlButton>
              <StyledMyReviewControlButton onClick={handleOpenConfirmModal}>
                삭제
              </StyledMyReviewControlButton>
            </StyledMyReviewButtons>
          </StyledMyReviewContainer>
        ) : (
          <StyledMyReviewContainer>
            <StyledMyReviewContent>
              영화를 보고 난 소감을 기록하세요.
            </StyledMyReviewContent>
            <StyledMyReviewRegisterButton onClick={handleOpenReviewModal}>
              리뷰 작성하기
            </StyledMyReviewRegisterButton>
          </StyledMyReviewContainer>
        )}
      </StyledMovieInfo>
      <StyledReviewList></StyledReviewList>
      {isOpenReviewModal && (
        <ReviewRegisterModal
          movie={movie}
          review={review}
          rating={rating}
          setRating={setRating}
          setIsOpenReviewModal={setIsOpenReviewModal}
        />
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          message={'리뷰를 삭제하시겠습니까?'}
          callback={() => deleteMyReview()}
          setIsOpenConfirmModal={setIsOpenConfirmModal}
        />
      )}
    </>
  );
}

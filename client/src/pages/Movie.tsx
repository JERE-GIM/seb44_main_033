import { useState } from 'react';
import ReviewRegisterModal from '../components/movie/ReviewRegisterModal';
import { dummyMovie } from '../dummy/dummyMovie';
import { dummyReviews } from '../dummy/dummyReview';
import Rating from '../components/share/Rating';
import {
  StyledMovieCover,
  StyledMovieDetail,
  StyledMovieDetailCol,
  StyledMovieInfo,
  StyledMovieInfoCol,
  StyledMovieInfoContainer,
  StyledMovieInfoSpan,
  StyledMovieInfoText,
  StyledMoviePoster,
  StyledMyReviewButtons,
  StyledMyReviewContainer,
  StyledMyReviewContent,
  StyledMyReviewControlButton,
  StyledMyReviewRegisterButton,
  StyledReviewList,
  StyledStarsContainer,
} from './styles/Movie.styled';
import ConfirmModal from '../components/movie/ConfirmModal';
import elementalPoster from '../assets/elemental_poster.png';

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
      <StyledMovieDetail>
        <StyledMovieDetailCol>
          <StyledMoviePoster src={elementalPoster} alt="poster image" />
        </StyledMovieDetailCol>
        <StyledMovieDetailCol>
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
          <StyledMovieInfo>
            <StyledMovieInfoContainer>
              <StyledMovieInfoCol>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>개봉</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>{movie.openAt}</StyledMovieInfoSpan>
                </StyledMovieInfoText>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>장르</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>
                    {movie.genres.join('/')}
                  </StyledMovieInfoSpan>
                </StyledMovieInfoText>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>국가</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>{movie.nation}</StyledMovieInfoSpan>
                </StyledMovieInfoText>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>등급</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>{movie.age}</StyledMovieInfoSpan>
                </StyledMovieInfoText>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>러닝타임</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>
                    {movie.runningTime}분
                  </StyledMovieInfoSpan>
                </StyledMovieInfoText>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>출연</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>
                    {movie.actors.join(', ')}
                  </StyledMovieInfoSpan>
                </StyledMovieInfoText>
              </StyledMovieInfoCol>
              <StyledMovieInfoCol>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>평점</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>
                    {movie.averageRating}
                  </StyledMovieInfoSpan>
                </StyledMovieInfoText>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>누적관객</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>
                    {movie.audience.toLocaleString()}명
                  </StyledMovieInfoSpan>
                </StyledMovieInfoText>
                <StyledMovieInfoText>
                  <StyledMovieInfoSpan>박스오피스</StyledMovieInfoSpan>
                  <StyledMovieInfoSpan>{movie.boxOffice}위</StyledMovieInfoSpan>
                </StyledMovieInfoText>
              </StyledMovieInfoCol>
            </StyledMovieInfoContainer>
          </StyledMovieInfo>
        </StyledMovieDetailCol>
      </StyledMovieDetail>
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

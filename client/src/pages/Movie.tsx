import { useState } from 'react';
import ReviewRegisterModal from '../components/movie/ReviewRegisterModal';
import { dummyMovie } from '../dummy/dummyMovie';
import { dummyReviews } from '../dummy/dummyReview';
import Rating from '../components/share/Rating';
import {
  Star,
  AverageRatingContainer,
  AverageRatingSpan,
  AverageRatingText,
  MovieCover,
  MovieCoverImage,
  MovieTitle,
  MovieDetail,
  MovieDetailCol,
  MovieInfo,
  MovieInfoCol,
  MovieInfoContainer,
  MovieInfoSpan,
  MovieInfoText,
  MoviePoster,
  MyReviewButtons,
  MyReviewContainer,
  MyReviewContent,
  MyReviewControlButton,
  MyReviewRegisterButton,
  ReviewList,
  StarsContainer,
} from './styles/Movie.styled';
import ConfirmModal from '../components/movie/ConfirmModal';
import elementalPoster from '../assets/elemental_poster.png';
import elementalCover from '../assets/elemental_cover.png';
import starIcon from '../assets/starIcon.svg';

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
      <MovieCover>
        <MovieCoverImage src={elementalCover} alt="cover image" />
        <MovieTitle>{movie.title}</MovieTitle>
        <StarsContainer onClick={handleOpenReviewModal}>
          <Rating rating={rating} setRating={setRating} />
        </StarsContainer>
        <AverageRatingContainer>
          <Star src={starIcon} alt="average rating icon" />
          <AverageRatingText>
            <AverageRatingSpan>{movie.averageRating}</AverageRatingSpan>
            <AverageRatingSpan>({movie.ratedUsers}명)</AverageRatingSpan>
          </AverageRatingText>
        </AverageRatingContainer>
      </MovieCover>
      <MovieDetail>
        <MovieDetailCol>
          <MoviePoster src={elementalPoster} alt="poster image" />
        </MovieDetailCol>
        <MovieDetailCol>
          {review ? (
            <MyReviewContainer>
              <MyReviewContent>{review.comment}</MyReviewContent>
              <MyReviewButtons>
                <MyReviewControlButton onClick={handleOpenReviewModal}>
                  수정
                </MyReviewControlButton>
                <MyReviewControlButton onClick={handleOpenConfirmModal}>
                  삭제
                </MyReviewControlButton>
              </MyReviewButtons>
            </MyReviewContainer>
          ) : (
            <MyReviewContainer>
              <MyReviewContent>
                영화를 보고 난 소감을 기록하세요.
              </MyReviewContent>
              <MyReviewRegisterButton onClick={handleOpenReviewModal}>
                리뷰 작성하기
              </MyReviewRegisterButton>
            </MyReviewContainer>
          )}
          <MovieInfo>
            <MovieInfoContainer>
              <MovieInfoCol>
                <MovieInfoText>
                  <MovieInfoSpan>개봉</MovieInfoSpan>
                  <MovieInfoSpan>{movie.openAt}</MovieInfoSpan>
                </MovieInfoText>
                <MovieInfoText>
                  <MovieInfoSpan>장르</MovieInfoSpan>
                  <MovieInfoSpan>{movie.genres.join('/')}</MovieInfoSpan>
                </MovieInfoText>
                <MovieInfoText>
                  <MovieInfoSpan>국가</MovieInfoSpan>
                  <MovieInfoSpan>{movie.nation}</MovieInfoSpan>
                </MovieInfoText>
                <MovieInfoText>
                  <MovieInfoSpan>등급</MovieInfoSpan>
                  <MovieInfoSpan>{movie.age}</MovieInfoSpan>
                </MovieInfoText>
                <MovieInfoText>
                  <MovieInfoSpan>러닝타임</MovieInfoSpan>
                  <MovieInfoSpan>{movie.runningTime}분</MovieInfoSpan>
                </MovieInfoText>
                <MovieInfoText>
                  <MovieInfoSpan>출연</MovieInfoSpan>
                  <MovieInfoSpan>{movie.actors.join(', ')}</MovieInfoSpan>
                </MovieInfoText>
              </MovieInfoCol>
              <MovieInfoCol>
                <MovieInfoText>
                  <MovieInfoSpan>평점</MovieInfoSpan>
                  <MovieInfoSpan>{movie.averageRating}</MovieInfoSpan>
                </MovieInfoText>
                <MovieInfoText>
                  <MovieInfoSpan>누적관객</MovieInfoSpan>
                  <MovieInfoSpan>
                    {movie.audience.toLocaleString()}명
                  </MovieInfoSpan>
                </MovieInfoText>
                <MovieInfoText>
                  <MovieInfoSpan>박스오피스</MovieInfoSpan>
                  <MovieInfoSpan>{movie.boxOffice}위</MovieInfoSpan>
                </MovieInfoText>
              </MovieInfoCol>
            </MovieInfoContainer>
          </MovieInfo>
        </MovieDetailCol>
      </MovieDetail>
      <ReviewList></ReviewList>
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

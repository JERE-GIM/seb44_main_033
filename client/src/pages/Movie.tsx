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
  MovieReviews,
  StarsContainer,
  ReviewList,
  PrevButtonTransformed,
  NextButtonTransformed,
  MovieRecommend,
  RecommendList,
  RecommentListItem,
  SectionTitle,
} from './styles/Movie.styled';
import ConfirmModal from '../components/movie/ConfirmModal';
import elementalPoster from '../assets/elemental_poster.png';
import elementalCover from '../assets/elemental_cover.png';
import starIcon from '../assets/starIcon.svg';
import ReviewListitem from '../components/movie/ReviewListitem';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MODAL_ROLE, modalAction } from '../redux/reducers/modal';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Slider from 'react-slick';
import Card from '../components/main/movierank/Card';
import defaultPoster from '../assets/default_poster.png';

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

  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state);
  const [rating, setRating] = useState(review ? review.rating : 0);

  const handleOpenReviewModal = () => {
    dispatch(modalAction.open(MODAL_ROLE.REVIEW_WRITE));
  };

  const handleOpenConfirmModal = () => {
    dispatch(modalAction.open(MODAL_ROLE.REVIEW_DELETE));
  };

  const deleteMyReview = () => {
    console.log('내가 작성한 리뷰 삭제');
  }; // api 요청 함수

  const SLIDE_SETTINGS = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    slidesPerRow: 1,
    swipe: true,
    draggable: false,
    prevArrow: (
      <PrevButtonTransformed>
        <MdArrowBackIos />
      </PrevButtonTransformed>
    ),
    nextArrow: (
      <NextButtonTransformed>
        <MdArrowForwardIos />
      </NextButtonTransformed>
    ),
  };

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
      <MovieReviews>
        <ReviewList>
          <Slider {...SLIDE_SETTINGS}>
            {dummyReviews.map((review, index) => (
              <ReviewListitem key={review.id + index} review={review} />
            ))}
          </Slider>
        </ReviewList>
      </MovieReviews>
      <MovieRecommend>
        <SectionTitle>비슷한 영화 추천</SectionTitle>
        <RecommendList>
          {movie.similarMovies.map((similarMovie, index) => (
            <RecommentListItem key={similarMovie.movieId + index}>
              <Card
                poster={
                  similarMovie.posterPath
                    ? `https://image.tmdb.org/t/p/w200/${similarMovie.posterPath}`
                    : defaultPoster
                }
                title={similarMovie.title}
                country={'미국'}
                openat={Number(similarMovie.releaseDate.slice(0, 4))}
              />
            </RecommentListItem>
          ))}
        </RecommendList>
      </MovieRecommend>
      {modal.status && modal.role === MODAL_ROLE.REVIEW_WRITE && (
        <ReviewRegisterModal
          movie={movie}
          review={review}
          rating={rating}
          setRating={setRating}
        />
      )}
      {modal.status && modal.role === MODAL_ROLE.REVIEW_DELETE && (
        <ConfirmModal
          message={'리뷰를 삭제하시겠습니까?'}
          callback={() => deleteMyReview()}
        />
      )}
    </>
  );
}

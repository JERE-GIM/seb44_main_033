import { useEffect, useState } from 'react';
import ReviewRegisterModal from '../components/movie/ReviewRegisterModal';
import { IMovie, IReview } from '../types/movie';
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
  MovieOTTInfo,
  OTTContainer,
  OTTImage,
  OTTText,
  MovieHeader,
  MovieDescription,
  NonSlider,
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
import { useParams } from 'react-router-dom';
import {
  requestDeleteMyReview,
  requestGetMovieInfo,
  requestGetMyReview,
} from '../api/movie';

const REVIEW_SLIDE_TO_SHOW = 4;

const SLIDE_SETTINGS = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: REVIEW_SLIDE_TO_SHOW,
  slidesToScroll: REVIEW_SLIDE_TO_SHOW,
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

export default function Movie() {
  const [movieInfo, setMovieInfo] = useState<IMovie>();
  const [myReview, setMyReview] = useState<IReview | null>(null);
  const [rating, setRating] = useState(0);

  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state);
  const { movieId } = useParams();

  // 서버 데이터 가져오는 api 요청 함수
  const fetchMovieInfo = () => {
    requestGetMovieInfo(Number(movieId))
      .then((res) => setMovieInfo(res.data))
      .catch((err) => alert(err));
  };

  const fetchMyReview = () => {
    requestGetMyReview(Number(movieId))
      .then((res) => {
        setMyReview(res.data);
        setRating(res.data.score);
      })
      .catch((err) => {
        if (err.response.data.message === '리뷰가 없습니다.') {
          setMyReview(null);
          setRating(0);
        } else alert(err);
      });
  };

  // api 요청 함수
  const deleteMyReview = () => {
    if (myReview)
      requestDeleteMyReview(myReview.reviewId).then(() => {
        dispatch(modalAction.close());
        fetchMyReview();
      });
  };

  // 이벤트 핸들러
  const handleOpenReviewModal = () => {
    dispatch(modalAction.open(MODAL_ROLE.REVIEW_WRITE));
  };

  const handleOpenConfirmModal = () => {
    dispatch(modalAction.open(MODAL_ROLE.REVIEW_DELETE));
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieInfo();
      fetchMyReview();
    }
  }, []);

  return (
    <>
      {movieInfo && (
        <>
          <MovieCover>
            <MovieCoverImage src={elementalCover} alt="cover image" />
            <MovieHeader>
              <MovieTitle>{movieInfo.data.title}</MovieTitle>
              <MovieDescription>{movieInfo.data.overview}</MovieDescription>
            </MovieHeader>
            <StarsContainer onClick={handleOpenReviewModal}>
              <Rating rating={rating} setRating={setRating} />
            </StarsContainer>
            <AverageRatingContainer>
              <Star src={starIcon} alt="average rating icon" />
              <AverageRatingText>
                <AverageRatingSpan>
                  {movieInfo.data.movieVote.voteAverage}
                </AverageRatingSpan>
                <AverageRatingSpan>
                  ({movieInfo.data.movieVote.voteCount}명)
                </AverageRatingSpan>
              </AverageRatingText>
            </AverageRatingContainer>
          </MovieCover>
          <MovieDetail>
            <MovieDetailCol>
              <MoviePoster src={elementalPoster} alt="poster image" />
            </MovieDetailCol>
            <MovieDetailCol>
              {myReview ? (
                <MyReviewContainer>
                  <MyReviewContent>{myReview.content}</MyReviewContent>
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
                  <MovieInfoText>
                    <MovieInfoSpan>개봉</MovieInfoSpan>
                    <MovieInfoSpan>{movieInfo.data.releaseDate}</MovieInfoSpan>
                  </MovieInfoText>
                  <MovieInfoText>
                    <MovieInfoSpan>장르</MovieInfoSpan>
                    <MovieInfoSpan>
                      {movieInfo.data.genres
                        .map((genre) => genre.genreName)
                        .join(', ')}
                    </MovieInfoSpan>
                  </MovieInfoText>
                  <MovieInfoText>
                    <MovieInfoSpan>등급</MovieInfoSpan>
                    <MovieInfoSpan>
                      {movieInfo.data.certification}세
                    </MovieInfoSpan>
                  </MovieInfoText>
                  <MovieInfoText>
                    <MovieInfoSpan>러닝타임</MovieInfoSpan>
                    <MovieInfoSpan>{movieInfo.data.runtime}분</MovieInfoSpan>
                  </MovieInfoText>
                  <MovieInfoText>
                    <MovieInfoSpan>감독</MovieInfoSpan>
                    <MovieInfoSpan>{movieInfo.data.director}</MovieInfoSpan>
                  </MovieInfoText>
                  <MovieInfoText>
                    <MovieInfoSpan>출연</MovieInfoSpan>
                    <MovieInfoSpan>{movieInfo.data.actors}</MovieInfoSpan>
                  </MovieInfoText>
                </MovieInfoContainer>
              </MovieInfo>
            </MovieDetailCol>
          </MovieDetail>
          <MovieReviews>
            <SectionTitle>코멘트</SectionTitle>
            <ReviewList>
              {movieInfo.reviews.length >= REVIEW_SLIDE_TO_SHOW ? (
                <Slider {...SLIDE_SETTINGS}>
                  {movieInfo.reviews.map((review) => (
                    <ReviewListitem key={review.reviewId} review={review} />
                  ))}
                </Slider>
              ) : (
                <NonSlider>
                  {movieInfo.reviews.map((review) => (
                    <ReviewListitem key={review.reviewId} review={review} />
                  ))}
                </NonSlider>
              )}
            </ReviewList>
          </MovieReviews>
          {movieInfo.data.watchProviders.length !== 0 && (
            <MovieOTTInfo>
              <SectionTitle>보러가기</SectionTitle>
              {movieInfo.data.watchProviders.map((provider) => (
                <OTTContainer key={provider.providerId}>
                  <OTTImage
                    src={`https://image.tmdb.org/t/p/w200/${provider.logoPath}`}
                  />
                  <OTTText
                    to={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {provider.providerName}
                  </OTTText>
                </OTTContainer>
              ))}
            </MovieOTTInfo>
          )}
          <MovieRecommend>
            <SectionTitle>비슷한 영화 추천</SectionTitle>
            <RecommendList>
              {movieInfo.data.similarMovies.map((similarMovie, index) => (
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
              movieTitle={movieInfo.data.title}
              movieId={Number(movieId)}
              myReview={myReview}
              rating={rating}
              setRating={setRating}
              callback={fetchMyReview}
            />
          )}
          {modal.status && modal.role === MODAL_ROLE.REVIEW_DELETE && (
            <ConfirmModal
              message={'리뷰를 삭제하시겠습니까?'}
              callback={() => deleteMyReview()}
            />
          )}
        </>
      )}
    </>
  );
}

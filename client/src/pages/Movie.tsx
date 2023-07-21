import { useEffect, useState } from 'react';
import ReviewRegisterModal from '../components/movie/ReviewRegisterModal';
import { IMovieResponse, IReview } from '../types/movie';
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
  MoviePoster,
  MovieReviews,
  StarsContainer,
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
} from './styles/Movie.styled';
import ConfirmModal from '../components/movie/ConfirmModal';
import starIcon from '../assets/starIcon.svg';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MODAL_ROLE, modalAction } from '../redux/reducers/modal';
import Card from '../components/main/movierank/Card';
import defaultPoster from '../assets/default_poster.png';
import { useParams } from 'react-router-dom';
import {
  fetchDeleteMyReview,
  fetchGetMovieInfo,
  fetchGetMyReview,
} from '../api/movie';
import ReviewList from '../components/share/ReviewList';
import MovieInfo from '../components/movie/MovieInfo';
import MyReview from '../components/movie/MyReview';

export default function Movie() {
  const [movieInfo, setMovieInfo] = useState<IMovieResponse>();
  const [myReview, setMyReview] = useState<IReview | null>(null);
  const [rating, setRating] = useState(0);

  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state);
  const { movieId } = useParams();

  const handleFetchGetMovieInfo = () => {
    fetchGetMovieInfo(Number(movieId))
      .then((res) => setMovieInfo(res.data))
      .catch((err) => alert(err));
  };

  const handleFetchGetMyReview = () => {
    fetchGetMyReview(Number(movieId))
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

  const fetchMoviePageData = () => {
    handleFetchGetMovieInfo();
    handleFetchGetMyReview();
  };

  const handleFetchDeleteMyReview = (reviewId: number) => {
    fetchDeleteMyReview(reviewId).then(() => {
      dispatch(modalAction.close());
      fetchMoviePageData();
    });
  };

  const handleOpenReviewModal = () => {
    dispatch(modalAction.open(MODAL_ROLE.REVIEW_WRITE));
  };

  useEffect(() => {
    if (movieId) {
      fetchMoviePageData();
    }
  }, []);

  return (
    <>
      {movieInfo && (
        <>
          <MovieCover>
            <MovieCoverImage
              src={`https://image.tmdb.org/t/p/w500/${movieInfo.data.backdropPath}`}
              alt="cover image"
            />
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
              <MoviePoster
                src={`https://image.tmdb.org/t/p/w500/${movieInfo.data.posterPath}`}
                alt="poster image"
              />
            </MovieDetailCol>
            <MovieDetailCol>
              <MyReview
                myReview={myReview}
                handleOpenReviewModal={handleOpenReviewModal}
              />
              <MovieInfo movieInfo={movieInfo.data} />
            </MovieDetailCol>
          </MovieDetail>
          <MovieReviews>
            <SectionTitle>코멘트</SectionTitle>
            <ReviewList reviewList={movieInfo.reviews} />
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
              callback={fetchMoviePageData}
            />
          )}
          {modal.status && modal.role === MODAL_ROLE.REVIEW_DELETE && (
            <ConfirmModal
              message={'리뷰를 삭제하시겠습니까?'}
              callback={() => {
                if (myReview) handleFetchDeleteMyReview(myReview.reviewId);
              }}
            />
          )}
        </>
      )}
    </>
  );
}

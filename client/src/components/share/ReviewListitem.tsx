import {
  ButtonText,
  Comment,
  IconImage,
  LikeButton,
  MovieTitle,
  Image,
  ReviewBottom,
  ReviewMiddle,
  ReviewTop,
  Stars,
  Username,
  Wrapper,
} from '../../styles/components/share/ReviewListitem.styled';
import thumbUp from '../../assets/thumb-up.svg';
import { IReview } from '../../types/movie';
import { fetchLikeReview, fetchUnlikeReview } from '../../api/movie';
import { useState } from 'react';
import { getAccessTokenAndUserId } from '../../util/func';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { MODAL_ROLE, modalAction } from '../../redux/reducers/modal';

interface IReviewListitem {
  review: IReview;
  hasMovieTitle?: boolean;
}

export default function ReviewListitem({
  review,
  hasMovieTitle,
}: IReviewListitem) {
  const [liked, setLiked] = useState({
    status: review.reviewVoted,
    count: review.votesCount,
  });
  const [isFetching, setIsFetching] = useState(false);
  const { isLogin } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [, userId] = getAccessTokenAndUserId();

  const handleFetchLikeReview = (reviewId: number) => {
    setIsFetching(() => true);
    fetchLikeReview(reviewId)
      .then(() => setLiked((prev) => ({ status: true, count: prev.count + 1 })))
      .catch((err) => console.log(err))
      .finally(() => setIsFetching(() => false));
  };

  const handleFetchUnlikeReview = (reviewId: number) => {
    setIsFetching(() => true);
    fetchUnlikeReview(reviewId)
      .then(() =>
        setLiked((prev) => ({ status: false, count: prev.count - 1 })),
      )
      .catch((err) => console.log(err))
      .finally(() => setIsFetching(() => false));
  };

  const handleClickLike = (reviewId: number) => {
    if (isFetching) return;
    if (!isLogin.status) return dispatch(modalAction.open(MODAL_ROLE.LOGIN));
    if (liked.status) handleFetchUnlikeReview(reviewId);
    else handleFetchLikeReview(reviewId);
  };

  return (
    <Wrapper>
      <ReviewTop>
        {!hasMovieTitle && (
          <>
            <Username>{review.username}</Username>
          </>
        )}
        {hasMovieTitle && (
          <>
            <Image
              src={`${process.env.REACT_APP_IMAGE_BASE_URL}/w200/${review.posterPath}`}
            />
            <MovieTitle to={`/movie/${review.movieId}`}>
              {review.movieTitle}
            </MovieTitle>
          </>
        )}
      </ReviewTop>
      <ReviewMiddle>
        <Stars rating={review.score} />
        <Comment>{review.content}</Comment>
      </ReviewMiddle>
      <ReviewBottom>
        <LikeButton
          $liked={liked.status}
          onClick={() => handleClickLike(review.reviewId)}
          disabled={review.userId === Number(userId)}
        >
          <IconImage $liked={liked.status} src={thumbUp} alt="like icon" />
          <ButtonText $liked={liked.status}>{liked.count}</ButtonText>
        </LikeButton>
      </ReviewBottom>
    </Wrapper>
  );
}

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
} from '../styles/ReviewListitem.styled';
import profile from '../../assets/profile.png';
import thumbUp from '../../assets/thumb-up.svg';
import { IReview } from '../../types/movie';
import { fetchLikeReview, fetchUnlikeReview } from '../../api/movie';
import { useState } from 'react';

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

  const handleFetchLikeReview = (reviewId: number) => {
    fetchLikeReview(reviewId)
      .then(() => setLiked((prev) => ({ status: true, count: prev.count + 1 })))
      .catch((err) => console.log(err));
  };

  const handleFetchUnlikeReview = (reviewId: number) => {
    fetchUnlikeReview(reviewId)
      .then(() =>
        setLiked((prev) => ({ status: false, count: prev.count - 1 })),
      )
      .catch((err) => console.log(err));
  };

  const handleClickLike = (reviewId: number) => {
    if (liked.status) handleFetchUnlikeReview(reviewId);
    else handleFetchLikeReview(reviewId);
  };

  return (
    <Wrapper>
      <ReviewTop>
        {!hasMovieTitle && (
          <>
            <Image src={profile} />
            <Username>{review.username}</Username>
          </>
        )}
        {hasMovieTitle && (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w200/${review.posterPath}`}
            />
            <MovieTitle>{review.movieTitle}</MovieTitle>
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
        >
          <IconImage $liked={liked.status} src={thumbUp} alt="like icon" />
          <ButtonText $liked={liked.status}>{liked.count}</ButtonText>
        </LikeButton>
      </ReviewBottom>
    </Wrapper>
  );
}

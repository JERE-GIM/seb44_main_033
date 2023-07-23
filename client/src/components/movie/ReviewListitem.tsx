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

interface IReviewListitem {
  review: IReview;
  hasMovieTitle?: boolean;
}

export default function ReviewListitem({
  review,
  hasMovieTitle,
}: IReviewListitem) {
  const $liked = false;

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
        <LikeButton $liked={$liked}>
          <IconImage $liked={$liked} src={thumbUp} alt="like icon" />
          <ButtonText $liked={$liked}>{review.votesCount}</ButtonText>
        </LikeButton>
      </ReviewBottom>
    </Wrapper>
  );
}

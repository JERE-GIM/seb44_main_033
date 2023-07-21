import { useMatch } from 'react-router-dom';

import {
  ButtonText,
  Comment,
  IconImage,
  LikeButton,
  MovieTitle,
  ProfileImage,
  ReviewBottom,
  ReviewMiddle,
  ReviewTop,
  Stars,
  Username,
  Wrapper,
} from '../styles/ReviewListitem.styled';
import profile from '../../assets/profile.jpg';
import elementalPoster from '../../assets/elemental_poster.png';
import thumbUp from '../../assets/thumb-up.svg';
import { IReview } from '../../types/movie';

interface IReviewListitem {
  review: IReview;
}

export default function ReviewListitem({ review }: IReviewListitem) {
  const $liked = false;
  const isMoviePage = useMatch('/movie/:id');

  return (
    <Wrapper>
      <ReviewTop>
        {isMoviePage && (
          <>
            <ProfileImage src={profile} />
            <Username>{review.username}</Username>
          </>
        )}
        {!isMoviePage && (
          <>
            <ProfileImage src={elementalPoster} />
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

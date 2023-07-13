import { IReview } from '../../dummy/dummyReview';
import {
  ButtonText,
  Comment,
  IconImage,
  LikeButton,
  ProfileImage,
  ReviewBottom,
  ReviewMiddle,
  ReviewTop,
  Stars,
  Username,
  Wrapper,
} from '../styles/ReviewListitem.styled';
import profile from '../../assets/profile.jpg';
import thumbUp from '../../assets/thumb-up.svg';

interface IReviewListitem {
  review: IReview;
}

export default function ReviewListitem({ review }: IReviewListitem) {
  const $liked = false;

  return (
    <Wrapper>
      <ReviewTop>
        <ProfileImage src={profile} />
        <Username>{review.writer}</Username>
      </ReviewTop>
      <ReviewMiddle>
        <Stars rating={review.rating} />
        <Comment>{review.comment}</Comment>
      </ReviewMiddle>
      <ReviewBottom>
        <LikeButton $liked={$liked}>
          <IconImage $liked={$liked} src={thumbUp} alt="like icon" />
          <ButtonText $liked={$liked}>{review.likes}</ButtonText>
        </LikeButton>
      </ReviewBottom>
    </Wrapper>
  );
}

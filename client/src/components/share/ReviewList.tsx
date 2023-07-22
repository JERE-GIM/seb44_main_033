import Slider from 'react-slick';
import { IReview } from '../../types/movie';
import {
  NextButtonTransformed,
  NonSlider,
  PrevButtonTransformed,
  ReviewListWrapper,
} from '../styles/ReviewList.styled';
import ReviewListitem from '../movie/ReviewListitem';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

export const REVIEW_SLIDE_TO_SHOW = 4;

export const SLIDE_SETTINGS = {
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

interface IReviewListProps {
  reviewList: Array<IReview>;
  hasMovieTitle?: boolean;
}

function ReviewList({ reviewList, hasMovieTitle }: IReviewListProps) {
  return (
    <ReviewListWrapper>
      {reviewList.length >= REVIEW_SLIDE_TO_SHOW ? (
        <Slider {...SLIDE_SETTINGS}>
          {reviewList.map((review) => (
            <ReviewListitem
              key={review.reviewId}
              review={review}
              hasMovieTitle={hasMovieTitle}
            />
          ))}
        </Slider>
      ) : (
        <NonSlider>
          {reviewList.map((review) => (
            <ReviewListitem
              key={review.reviewId}
              review={review}
              hasMovieTitle={hasMovieTitle}
            />
          ))}
        </NonSlider>
      )}
    </ReviewListWrapper>
  );
}

export default ReviewList;

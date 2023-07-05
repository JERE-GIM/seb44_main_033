import { useState } from 'react';
import { IMovie } from '../../dummy/dummyMovie';
import { IReview } from '../../dummy/dummyReview';
import Stars from '../share/Stars';
import {
  StyledBackground,
  StyledCloseButton,
  StyledCommentTextarea,
  StyledController,
  StyledForm,
  StyledHeader,
  StyledModal,
  StyledMovieTitle,
  StyledSubmitButton,
} from '../styles/ReviewRegister.styled';
import closeButton from '../../assets/closeButton.svg';

interface IReviewRegister {
  movie: IMovie;
  review?: IReview;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewRegister({
  movie,
  review,
  rating,
  setRating,
  setIsOpenModal,
}: IReviewRegister) {
  const [comment, setComment] = useState(review ? review.comment : '');

  const handleClickBackground = () => {
    if (review) setRating(review.rating);
    else setRating(0);
    setIsOpenModal(false);
  };

  const handleClickCloseButton = () => {
    if (review) setRating(review.rating);
    else setRating(0);
    setIsOpenModal(false);
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // api 로직 추가
    setIsOpenModal(false);
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setComment(event.target.value);

  return (
    <>
      <StyledBackground onClick={handleClickBackground}>
        <StyledModal onClick={handleClickModal}>
          <StyledHeader>
            <StyledMovieTitle>{movie.title}</StyledMovieTitle>
            <StyledCloseButton onClick={handleClickCloseButton}>
              <img src={closeButton} alt="close button" />
            </StyledCloseButton>
          </StyledHeader>
          <StyledForm onSubmit={handleSubmitForm}>
            <Stars rating={rating} setRating={setRating} />
            <StyledCommentTextarea
              placeholder="이 영화 어떠셨나요?"
              value={comment}
              onChange={handleChangeTextarea}
            />
            <StyledController>
              <StyledSubmitButton>저장</StyledSubmitButton>
            </StyledController>
          </StyledForm>
        </StyledModal>
      </StyledBackground>
    </>
  );
}

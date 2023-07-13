import { useState } from 'react';
import { IMovie } from '../../dummy/dummyMovie';
import { IReview } from '../../dummy/dummyReview';
import Rating from '../share/Rating';
import {
  Background,
  CloseButton,
  CommentTextarea,
  Controller,
  Form,
  ModalHeader,
  Modal,
  MovieTitle,
  SubmitButton,
} from '../styles/ReviewRegisterModal.styled';
import closeButton from '../../assets/closeButton.svg';

interface IReviewRegister {
  movie: IMovie;
  review?: IReview;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewRegister({
  movie,
  review,
  rating,
  setRating,
  setIsOpenReviewModal,
}: IReviewRegister) {
  const [comment, setComment] = useState(review ? review.comment : '');

  const handleCloseModalUnsaved = () => {
    if (review) setRating(review.rating);
    else setRating(0);
    setIsOpenReviewModal(false);
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // api 로직 추가
    setIsOpenReviewModal(false);
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setComment(event.target.value);

  return (
    <>
      <Background onClick={handleCloseModalUnsaved}>
        <Modal onClick={handleClickModal}>
          <ModalHeader>
            <MovieTitle>{movie.title}</MovieTitle>
            <CloseButton onClick={handleCloseModalUnsaved}>
              <img src={closeButton} alt="close button" />
            </CloseButton>
          </ModalHeader>
          <Form onSubmit={handleSubmitForm}>
            <Rating rating={rating} setRating={setRating} />
            <CommentTextarea
              placeholder="이 영화 어떠셨나요?"
              value={comment}
              onChange={handleChangeTextarea}
            />
            <Controller>
              <SubmitButton>저장</SubmitButton>
            </Controller>
          </Form>
        </Modal>
      </Background>
    </>
  );
}

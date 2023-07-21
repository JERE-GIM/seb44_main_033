import { useState } from 'react';
import { IReview } from '../../types/movie';
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
import { useAppDispatch } from '../../redux/store';
import { modalAction } from '../../redux/reducers/modal';
import { fetchCreateMyReview, fetchUpdateMyReview } from '../../api/movie';

interface IReviewRegister {
  movieTitle: string;
  movieId: number;
  myReview: IReview | null;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  callback: () => void;
}

export default function ReviewRegister({
  movieTitle,
  movieId,
  myReview,
  rating,
  setRating,
  callback,
}: IReviewRegister) {
  const [comment, setComment] = useState(myReview ? myReview.content : '');
  const dispatch = useAppDispatch();

  const handleFetchUpdateMyReview = (reviewId: number) => {
    fetchUpdateMyReview(reviewId, {
      content: comment,
      score: rating,
    }).then(() => {
      dispatch(modalAction.close());
      callback();
    });
  };

  const handleFetchCreateMyReview = () => {
    fetchCreateMyReview({
      content: comment,
      score: rating,
      movieId,
    }).then(() => {
      dispatch(modalAction.close());
      callback();
    });
  };

  const handleCloseModalUnsaved = () => {
    if (myReview) setRating(myReview.score);
    else setRating(0);
    dispatch(modalAction.close());
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (myReview) handleFetchUpdateMyReview(myReview.reviewId);
    else handleFetchCreateMyReview();
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setComment(event.target.value);

  return (
    <>
      <Background onClick={handleCloseModalUnsaved}>
        <Modal onClick={handleClickModal}>
          <ModalHeader>
            <MovieTitle>{movieTitle}</MovieTitle>
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
